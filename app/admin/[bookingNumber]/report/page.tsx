"use client";

import { Overview } from "@/components/report/Overview";
import { AirLeakageContent } from "@/components/report/AirLeakageContent";
import { CoolingContent } from "@/components/report/CoolingContent";
import { HeatingContent } from "@/components/report/HeatingContent";
import { InsulationContent } from "@/components/report/InsulationContent";
import { ReportSummary } from "@/components/report/ReportSummary";
import { FutureUpgradesAndCertificates } from "@/components/report/FutureUpgradesAndCertificates";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Info,
  HelpCircle,
  CheckCircle2,
  Home,
  DollarSign,
  Leaf,
  Percent,
  ArrowLeft,
} from "lucide-react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { set } from "date-fns";
import { DefaultReportData } from "./utils";
import { useDebouncedCallback } from "use-debounce";

// Define interfaces for specific data types
interface AirLeakageData {
  parameter: string;
  title: string;
  value: string;
}

interface InsulationItem {
  condition: string;
  material: string;
  name: string;
  rValue: number;
  image: string;
}

interface InsulationData {
  data: InsulationItem[];
  missingDataZones: string[];
  missingZones: string[];
  title: string;
}

interface HeatingCoolingItem {
  condition: string;
  name: string;
  parameter: string;
  type: string;
  value: number | string;
  year?: number;
}

interface HeatingCoolingData {
  data: HeatingCoolingItem[];
  title: string;
}

interface WaterHeaterData {
  data: HeatingCoolingItem[];
  title: string;
}

// Replace the existing FinancialData interface with the same one as in ReportSummary
interface FinancialItem {
  title: string;
  amount: string;
}

interface FinancialData {
  title: string;
  data: FinancialItem[];
  monthlyPayment: string;
  financingPeriodYears: number;
}

// Define the type for reportData
interface ReportData {
  airLeakage?: AirLeakageData;
  insulation?: InsulationData;
  heatingAndCooling?: HeatingCoolingData;
  waterHeater?: WaterHeaterData;
  summaryOfConcerns?: any;
  solutionsAndRecommendations?: any;
  financialSummary?: FinancialData;
  [key: string]: any;
}

const ReportPage = ({
  params,
}: {
  params: Promise<{ bookingNumber: string }>;
}) => {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);
  const bookingNumber = unwrappedParams.bookingNumber;

  const [activeSubMenu, setActiveSubMenu] = useState("overview");
  const [overview, setOverview] = useState(true);
  const [reportUrl, setReportUrl] = useState("");
  const [reportData, setReportData] = useState<ReportData>({});
  const [reportStatus, setReportStatus] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [imgOfUser, SetImageOfUser] = useState([]);

  const router = useRouter();

  const handleNavigateBack = () => {
    if (!isChangesSaved) {
      toast.error("Please save the changes before going back.");
    } else {
      router.replace(`/admin/${bookingNumber}`);
    }
  };

  const handleChangeActiveSubMenu = (menu: string) => {
    if (!isChangesSaved) {
      toast.error("Please save the changes before switching the tab.");
    } else {
      setActiveSubMenu(menu);
    }
  };

  // Debounced save function to avoid too many API calls
  const debouncedSaveReportData = useDebouncedCallback(async (data: ReportData) => {
    if (!isAdmin) return;
    
    setIsSaving(true);
    try {
      // Use the previous API format and endpoint
      const response = await fetch(`/api/admin/bookings/${bookingNumber}/report/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportData: data,
          reportUrl: reportUrl || ""
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to save report data');
      }

      const responseData = await response.json();
      if (responseData.success) {
        setIsChangesSaved(true);
        // Subtle toast for auto-save success
        toast.success("Changes saved automatically", { duration: 2000 });
      } else {
        throw new Error(responseData.message || 'Failed to save report data');
      }
    } catch (error) {
      console.error('Error saving report data:', error);
      toast.error("Failed to save changes automatically. Please try again.");
      setIsChangesSaved(false);
    } finally {
      setIsSaving(false);
    }
  }, 2000); // 2 second debounce

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  = await fetchImages({ userid: bookingNumber });

        const imagesOfUser = await fetch(
          `/api/admin/bookings/${bookingNumber}/pictures`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "default",
            next: { revalidate: 3600 }, // Revalidate every 3600 seconds
          },
        );
        const data = await imagesOfUser.json();

        SetImageOfUser(data?.data?.pictures);
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Failed to fetch images");
      }
    };
    fetchData();
  }, [bookingNumber]);

  // Check if admin
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(window.location.href.includes("admin"));
    }
  }, []);

  const fetchReportDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/bookings/${bookingNumber}/report`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch report details");
        return;
      }

      const data = await response.json();

      if (data.success) {
        const fetchedReportData = data.data.reportData || DefaultReportData;

        // Ensure all required arrays exist to avoid TypeScript errors
        if (!fetchedReportData.insulation) {
          fetchedReportData.insulation = {
            data: [],
            missingDataZones: [],
            missingZones: [],
            title: "Insulation",
          };
        } else if (!fetchedReportData.insulation.missingDataZones) {
          fetchedReportData.insulation.missingDataZones = [];
        }
        
        if (!fetchedReportData.insulation.missingZones) {
          fetchedReportData.insulation.missingZones = [];
        }

        // Ensure all insulation items have an image property
        if (fetchedReportData.insulation.data) {
          fetchedReportData.insulation.data = fetchedReportData.insulation.data.map((item: Partial<InsulationItem>) => ({
            ...item,
            image: item.image || "" // Provide empty string default for missing image properties
          }));
        }

        // Save to state
        setReportData(fetchedReportData);
        setReportUrl(data.data.reportUrl || "");
        setReportStatus(data.data.displayReport || "NONE");
        setIsChangesSaved(true);
      } else {
        toast.error(data.message || "Failed to fetch report details");
      }
    } catch (error) {
      console.error("Error fetching report details:", error);
      toast.error("An error occurred while fetching report details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookingNumber) {
      fetchReportDetails();
    }
  }, [bookingNumber]);

  // Common function to update report data and trigger autosave
  const updateReportDataField = (updatedData: ReportData) => {
    if (!isAdmin) return;
    
    setReportData(updatedData);
    setIsChangesSaved(false);
    
    // Trigger debounced save
    debouncedSaveReportData(updatedData);
  };

  // Update functions for each section
  const updateAirLeakage = (newValue: string) => {
    if (!isAdmin) return;

    // Handle the case where airLeakage might not exist or might be incomplete
    const currentAirLeakage = reportData.airLeakage || {
      parameter: "",
      title: "",
      value: "",
    };

    // Create a complete AirLeakageData object
    const updatedAirLeakage: AirLeakageData = {
      parameter: currentAirLeakage.parameter,
      title: currentAirLeakage.title,
      value: newValue,
    };

    // Update the state with the properly typed object
    const newData: ReportData = {
      ...reportData,
      airLeakage: updatedAirLeakage,
    };

    updateReportDataField(newData);
  };

  const updateInsulationItem = (updatedItem: InsulationItem) => {
    if (!isAdmin) return;

    console.log("ReportPage: updateInsulationItem called with:", updatedItem);

    if (!reportData.insulation?.data) {
      const initializedData = {
        ...reportData,
        insulation: {
          data: [],
          missingDataZones: [],
          missingZones: [],
          title: "Insulation",
        },
      };
      updateReportDataField(initializedData);
      return;
    }

    // Ensure image property exists
    const itemWithImage = {
      ...updatedItem,
      image: updatedItem.image || "" // Provide empty string default for missing image properties
    };

    console.log("ReportPage: Processing insulation item update:", itemWithImage);

    const newData = [...reportData.insulation.data];
    const index = newData.findIndex((item) => item.name === itemWithImage.name);

    if (index !== -1) {
      // Update existing item
      // Preserve any properties from the original item that aren't being updated
      newData[index] = {
        ...newData[index],
        ...itemWithImage,
      };

      console.log("ReportPage: Updated item at index", index, "New data:", newData[index]);

      const updatedReportData = {
        ...reportData,
        insulation: {
          ...reportData.insulation,
          data: newData,
        },
      };

      updateReportDataField(updatedReportData);
    } else {
      // Add new item
      console.log("ReportPage: Item not found, adding new item");
      
      const updatedReportData = {
        ...reportData,
        insulation: {
          ...reportData.insulation,
          data: [...newData, itemWithImage],
        },
      };

      updateReportDataField(updatedReportData);
    }
  };

  const updateHeatingItem = (updatedItem: HeatingCoolingItem) => {
    console.log(
      "ReportPage.updateHeatingItem called with:",
      updatedItem,
      "Current state:",
      reportData.heatingAndCooling?.data,
      reportData.waterHeater?.data,
    );

    if (!isAdmin) return;

    // Check if it's a water heater item
    const isWaterHeater = updatedItem.name.toLowerCase().includes("water");

    // Create a deep copy of the current state to work with
    const newReportData = { ...reportData };

    if (isWaterHeater) {
      // Update in waterHeater data
      let newWaterHeaterData = [];

      if (newReportData.waterHeater?.data) {
        // We have existing water heater data
        newWaterHeaterData = [...newReportData.waterHeater.data];
        const index = newWaterHeaterData.findIndex(
          (item) => item.name === updatedItem.name,
        );

        if (index !== -1) {
          // Update existing item
          newWaterHeaterData[index] = updatedItem;
        } else {
          // Add new item
          newWaterHeaterData.push(updatedItem);
        }
      } else {
        // Initialize with this item if water heater data doesn't exist yet
        newWaterHeaterData = [updatedItem];
      }

      // Update water heater data in our copy
      newReportData.waterHeater = {
        ...(newReportData.waterHeater || {}),
        data: newWaterHeaterData,
        title: "Water Heating Systems",
      };

      // IMPORTANT: If we don't have heating data yet, ensure we add the default heating item
      if (!newReportData.heatingAndCooling?.data) {
        newReportData.heatingAndCooling = {
          data: [
            {
              condition: "N/A",
              name: "Primary Heating System",
              parameter: "AFUE",
              type: "None",
              value: 0,
              year: new Date().getFullYear(),
            },
          ],
          title: "Heating and Cooling Systems",
        };
      }
    } else {
      // Update in heatingAndCooling data
      let newHeatingData = [];

      if (newReportData.heatingAndCooling?.data) {
        // We have existing heating data
        newHeatingData = [...newReportData.heatingAndCooling.data];

        // Filter out cooling items to handle separately
        const coolingItems = newHeatingData.filter(
          (item) =>
            item.name.toLowerCase().includes("a/c") ||
            item.name.toLowerCase().includes("air condition") ||
            item.name.toLowerCase().includes("cooling") ||
            item.name.toLowerCase().includes("heat pump"),
        );

        // Filter out heating items (excluding cooling and water heaters)
        const heatingItems = newHeatingData.filter(
          (item) =>
            !(
              item.name.toLowerCase().includes("a/c") ||
              item.name.toLowerCase().includes("air condition") ||
              item.name.toLowerCase().includes("cooling") ||
              item.name.toLowerCase().includes("heat pump") ||
              item.name.toLowerCase().includes("water")
            ),
        );

        // Find the specific item we're updating
        const index = heatingItems.findIndex(
          (item) => item.name === updatedItem.name,
        );

        if (index !== -1) {
          // Update existing item
          heatingItems[index] = updatedItem;
        } else {
          // Add new item
          heatingItems.push(updatedItem);
        }

        // Combine all items back together
        newHeatingData = [...coolingItems, ...heatingItems];
      } else {
        // Initialize with this item if heating data doesn't exist yet
        newHeatingData = [updatedItem];
      }

      // Update heating data in our copy
      newReportData.heatingAndCooling = {
        ...(newReportData.heatingAndCooling || {}),
        data: newHeatingData,
        title: "Heating and Cooling Systems",
      };

      // IMPORTANT: If we don't have water heater data yet, ensure we add the default water heater item
      if (!newReportData.waterHeater?.data) {
        newReportData.waterHeater = {
          data: [
            {
              condition: "N/A",
              name: "Water Heater",
              parameter: "UEF",
              type: "None",
              value: 0,
              year: new Date().getFullYear(),
            },
          ],
          title: "Water Heating Systems",
        };
      }
    }

    // Now update with our carefully constructed new data
    updateReportDataField(newReportData);
  };

  // Improved updateCoolingItem function to ensure state preservation

  const updateCoolingItem = (updatedItem: HeatingCoolingItem) => {
    if (!isAdmin) return;

    // Initialize or update heatingAndCooling data
    let newHeatingAndCoolingData = [];
    let existingHeatingItems = [];

    if (reportData.heatingAndCooling?.data) {
      // Get existing heating items (non-cooling)
      existingHeatingItems = reportData.heatingAndCooling.data.filter(
        (item) =>
          !(
            item.name.toLowerCase().includes("a/c") ||
            item.name.toLowerCase().includes("air condition") ||
            item.name.toLowerCase().includes("cooling") ||
            item.name.toLowerCase().includes("heat pump")
          ),
      );

      // Get existing cooling items
      const existingCoolingItems = reportData.heatingAndCooling.data.filter(
        (item) =>
          item.name.toLowerCase().includes("a/c") ||
          item.name.toLowerCase().includes("air condition") ||
          item.name.toLowerCase().includes("cooling") ||
          item.name.toLowerCase().includes("heat pump"),
      );

      // Find if we already have this item
      const index = existingCoolingItems.findIndex(
        (item) => item.name === updatedItem.name,
      );

      if (index !== -1) {
        // Update existing item with new values
        const updatedCoolingItems = [...existingCoolingItems];
        updatedCoolingItems[index] = updatedItem;

        // Combine cooling and heating items
        newHeatingAndCoolingData = [
          ...existingHeatingItems,
          ...updatedCoolingItems,
        ];
      } else {
        // Add new cooling item
        newHeatingAndCoolingData = [
          ...existingHeatingItems,
          ...existingCoolingItems,
          updatedItem,
        ];
      }
    } else {
      // No existing data, start with this item
      newHeatingAndCoolingData = [updatedItem];
    }

    // Update state with new data
    const updatedReportData = {
      ...reportData,
      heatingAndCooling: {
        ...(reportData.heatingAndCooling || {}),
        data: newHeatingAndCoolingData,
        title: "Heating and Cooling Systems",
      },
    };

    updateReportDataField(updatedReportData);
  };

  const updateConcerns = (newConcerns: any) => {
    if (!isAdmin) return;

    // Check if the summaryOfConcerns structure exists
    if (!reportData.summaryOfConcerns) {
      console.log("Initializing summaryOfConcerns data structure from scratch");
      // Create the entire structure if it doesn't exist
      const updatedReportData = {
        ...reportData,
        summaryOfConcerns: {
          title: "Summary of Concerns",
          data: [
            {
              name: "Basic Health and Safety",
              data: newConcerns.healthSafety || [],
            },
            {
              name: "Combustion Testing",
              data: newConcerns.combustion || [],
            },
          ],
        },
      };

      updateReportDataField(updatedReportData);
      return;
    }

    // If the data array doesn't exist, initialize it
    if (!reportData.summaryOfConcerns.data) {
      console.log("Initializing summaryOfConcerns.data array");

      const updatedReportData = {
        ...reportData,
        summaryOfConcerns: {
          ...reportData.summaryOfConcerns,
          data: [
            {
              name: "Basic Health and Safety",
              data: newConcerns.healthSafety || [],
            },
            {
              name: "Combustion Testing",
              data: newConcerns.combustion || [],
            },
          ],
        },
      };

      updateReportDataField(updatedReportData);
      return;
    }

    // If we get here, the data structure exists, so update normally
    const newSummaryData = [...reportData.summaryOfConcerns.data];

    // Update health safety section
    const healthSafetyIndex = newSummaryData.findIndex(
      (section) => section.name === "Basic Health and Safety",
    );

    if (healthSafetyIndex !== -1 && newConcerns.healthSafety) {
      newSummaryData[healthSafetyIndex].data = newConcerns.healthSafety;
    } else if (healthSafetyIndex === -1 && newConcerns.healthSafety) {
      // Add the section if it doesn't exist
      newSummaryData.push({
        name: "Basic Health and Safety",
        data: newConcerns.healthSafety,
      });
    }

    // Update combustion section
    const combustionIndex = newSummaryData.findIndex(
      (section) => section.name === "Combustion Testing",
    );

    if (combustionIndex !== -1 && newConcerns.combustion) {
      newSummaryData[combustionIndex].data = newConcerns.combustion;
    } else if (combustionIndex === -1 && newConcerns.combustion) {
      // Add the section if it doesn't exist
      newSummaryData.push({
        name: "Combustion Testing",
        data: newConcerns.combustion,
      });
    }

    const updatedReportData = {
      ...reportData,
      summaryOfConcerns: {
        ...reportData.summaryOfConcerns,
        title: "Summary of Concerns",
        data: newSummaryData,
      },
    };

    updateReportDataField(updatedReportData);
  };

  const updateRecommendations = (newRecommendations: any[]) => {
    if (!isAdmin) return;

    const updatedReportData = {
      ...reportData,
      solutionsAndRecommendations: {
        ...reportData.solutionsAndRecommendations,
        recommendations: newRecommendations,
      },
    };

    updateReportDataField(updatedReportData);
  };

  const updateFinancials = (newFinancials: FinancialData) => {
    if (!isAdmin) return;

    const updatedReportData = {
      ...reportData,
      financialSummary: newFinancials,
    };

    updateReportDataField(updatedReportData);
  };

  const updateTaxCredits = (newTaxCredits: any) => {
    if (!isAdmin) return;

    const updatedReportData = {
      ...reportData,
      federalTaxCredits: newTaxCredits,
    };

    updateReportDataField(updatedReportData);
  };

  const updateEnvironmentalImpact = (newEnvironmentalData: any) => {
    if (!isAdmin) return;

    const updatedReportData = {
      ...reportData,
      environmentalImpact: newEnvironmentalData,
    };

    updateReportDataField(updatedReportData);
  };

  // Manual save function for the save button
  const handleManualSave = async () => {
    if (!isAdmin) return;
    
    setIsSaving(true);
    try {
      // Use the previous API format and endpoint
      const response = await fetch(`/api/admin/bookings/${bookingNumber}/report/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportData: reportData,
          reportUrl: reportUrl || ""
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to save report data');
      }

      const data = await response.json();
      if (data.success) {
        setIsChangesSaved(true);
        toast.success("All changes saved successfully");
      } else {
        throw new Error(data.message || 'Failed to save report data');
      }
    } catch (error) {
      console.error('Error saving report data:', error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f9f0]">
        <AdminHeader />
        <main className="container mx-auto px-6 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5cb85c]"></div>
          </div>
        </main>
      </div>
    );
  }

  const howItWorksSteps = [
    {
      icon: Info,
      title: "Initial Assessment",
      description: "We perform a comprehensive energy audit of your home",
    },
    {
      icon: HelpCircle,
      title: "Analysis",
      description: "We analyze the data and identify improvement opportunities",
    },
    {
      icon: CheckCircle2,
      title: "Implementation",
      description: "We implement the recommended energy-saving solutions",
    },
  ];

  // Filter heating and cooling items from heatingAndCooling data
  // Update getHeatingData to ensure it combines data correctly
  const getHeatingData = () => {
    console.log("getHeatingData called with state:", reportData);

    // Return defaults with empty arrays if no data exists
    if (!reportData.heatingAndCooling?.data && !reportData.waterHeater?.data) {
      console.log(
        "No heating or water heater data found, returning empty arrays",
      );
      return {
        data: [],
        title: "Heating & Water Heating Systems",
      };
    }

    // Get heating items (excluding cooling items)
    const heatingItems =
      reportData.heatingAndCooling?.data?.filter((item) => {
        // Check if it's a heating item (not cooling and not water heater)
        return !(
          item.name.toLowerCase().includes("a/c") ||
          item.name.toLowerCase().includes("air condition") ||
          item.name.toLowerCase().includes("cooling") ||
          item.name.toLowerCase().includes("heat pump") ||
          item.name.toLowerCase().includes("water")
        );
      }) || [];

    // Get water heater items
    const waterHeaterItems = reportData.waterHeater?.data || [];

    return {
      data: [...heatingItems, ...waterHeaterItems],
      title: "Heating & Water Heating Systems",
    };
  };

  const getCoolingData = () => {
    if (!reportData.heatingAndCooling?.data)
      return { data: [], title: "Cooling Systems" };

    const coolingItems = reportData.heatingAndCooling.data.filter(
      (item) =>
        item.name.toLowerCase().includes("a/c") ||
        item.name.toLowerCase().includes("air condition") ||
        item.name.toLowerCase().includes("cooling") ||
        item.name.toLowerCase().includes("heat pump"),
    );

    return {
      data: coolingItems,
      title: "Cooling Systems",
    };
  };

  const renderContent = () => {
    console.log(activeSubMenu);
    switch (activeSubMenu) {
      case "overview":
        return <Overview />;
      case "air-leakage":
        return (
          <AirLeakageContent
            data={reportData.airLeakage}
            isAdmin={isAdmin}
            onUpdateValue={updateAirLeakage}
            onSave={handleManualSave}
          />
        );
      case "insulation":
        return (
          <InsulationContent
            data={reportData?.insulation}
            driveImages={imgOfUser}
            isAdmin={isAdmin}
            onUpdateItem={updateInsulationItem}
            onSave={handleManualSave}
          />
        );
      case "heating":
        return (
          <HeatingContent
            data={getHeatingData()}
            isAdmin={isAdmin}
            onUpdateItem={updateHeatingItem}
            driveImages={imgOfUser}
            onSave={handleManualSave}
          />
        );
      case "cooling":
        return (
          <CoolingContent
            data={getCoolingData()}
            isAdmin={isAdmin}
            onUpdateItem={updateCoolingItem}
            driveImages={imgOfUser}
            onSave={handleManualSave}
          />
        );
      case "summary":
        return (
          <ReportSummary
            data={reportData}
            isAdmin={isAdmin}
            onUpdateConcerns={updateConcerns}
            onUpdateRecommendations={updateRecommendations}
            onUpdateFinancials={updateFinancials}
            onUpdateTaxCredits={updateTaxCredits}
            onUpdateEnvironmentalImpact={updateEnvironmentalImpact}
            onSave={handleManualSave}
          />
        );
      default:
        return <Overview />;
    }
  };

  const handleScrollToTop = () => {
    // First update the state
    setOverview(false);

    // Use setTimeout to ensure state has updated before scrolling
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Also scroll the specific ref if it exists
      // if (scrollRef.current) {
      //   scrollRef.current.scrollIntoView({
      //     behavior: "smooth",
      //     block: "start",
      //   });
      // }
    }, 100);
  };

  return (
    <div>
      {isAdmin && <AdminHeader />}
      <div className="container mx-auto px-6 pt-6 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={handleNavigateBack}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Booking Details
        </Button>
        
        {isAdmin && !isChangesSaved && (
          <div className="flex items-center gap-2">
            {isSaving ? (
              <span className="text-yellow-600 text-sm">Saving changes...</span>
            ) : (
              <span className="text-orange-600 text-sm">Unsaved changes</span>
            )}
            <Button 
              onClick={handleManualSave}
              disabled={isSaving || isChangesSaved}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSaving ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        )}
      </div>

      <div className="container mx-auto p-4" ref={scrollRef}>
        <div className="bg-gradient-to-r from-lime-400 to-lime-400 py-4 px-6 rounded-t-lg shadow-md">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Reports</h1>
          </div>
        </div>

        <div className="bg-white rounded-b-lg shadow-md">
          <div className="flex border-b border-gray-200">
            {[
              "overview",
              "air-leakage",
              "insulation",
              "heating",
              "cooling",
              "summary",
            ].map((tab) => (
              <button
                key={tab}
                className={`py-3 px-6 text-center font-medium transition-colors duration-200 ${activeSubMenu === tab
                    ? "border-b-2 border-lime-500 text-lime-500"
                    : "text-gray-600 hover:text-lime-500"
                  }`}
                onClick={() => handleChangeActiveSubMenu(tab)}
              >
                {["air-leakage", "insulation", "heating", "cooling"].includes(
                  tab,
                )
                  ? `${tab.charAt(0).toUpperCase() + tab.slice(1)} Reports`
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
