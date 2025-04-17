"use client";

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

const REPORT_DATA_KEY = "report_data";

const ReportPage = ({
  params,
}: {
  params: Promise<{ bookingNumber: string }>;
}) => {
  // Unwrap the params Promise using React.use()
  const unwrappedParams = use(params);
  const bookingNumber = unwrappedParams.bookingNumber;

  const [activeSubMenu, setActiveSubMenu] = useState("air-leakage");
  const [overview, setOverview] = useState(true);
  const [reportUrl, setReportUrl] = useState("");
  const [reportData, setReportData] = useState<ReportData>({});
  const [reportStatus, setReportStatus] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [loading, setLoading] = useState(false);
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

        if (!fetchedReportData.insulation.missingDataZones) {
          fetchedReportData.insulation.missingDataZones = [];
        }

        // Save to state
        setReportData(fetchedReportData);
        setReportUrl(data.data.reportUrl || "");
        setReportStatus(data.data.displayReport || "NONE");

        const IsAdmin =
          typeof window !== "undefined" &&
          window.location.href.includes("admin");
        // Save to localStorage only for admin users
        if (IsAdmin) {
          try {
            localStorage.setItem(
              `${REPORT_DATA_KEY}_${bookingNumber}`,
              JSON.stringify(fetchedReportData),
            );
          } catch (e) {
            console.error("Error saving report data to localStorage:", e);
          }
        }
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
    // Admin users can load from localStorage, otherwise always fetch fresh
    const IsAdmin =
      typeof window !== "undefined" && window.location.href.includes("admin");
    if (IsAdmin) {
      const savedData = localStorage.getItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
      );

      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);

          setReportData(parsedData);
        } catch (e) {
          console.error("Error parsing saved report data:", e);
          // If parsing fails, fetch fresh data

          if (bookingNumber) {
            fetchReportDetails();
          }
        }
      } else if (bookingNumber) {
        // If no data in localStorage, fetch from API

        fetchReportDetails();
      }
    } else if (bookingNumber) {
      // Customer users always fetch fresh data

      fetchReportDetails();
    }
  }, [bookingNumber]);

  // Update functions for each section
  const updateAirLeakage = (newValue: string) => {
    if (!isAdmin) return; // Only admin can update

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

    setReportData(newData);

    setIsChangesSaved(false);

    // Save to localStorage
    try {
      localStorage.setItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
        JSON.stringify(newData),
      );
    } catch (e) {
      console.error("Error saving updated report data to localStorage:", e);
    }
  };

  const updateInsulationItem = (updatedItem: InsulationItem) => {
    if (!isAdmin) return;

    if (!reportData.insulation?.data) {
      setReportData({
        ...reportData,
        insulation: {
          ...reportData.insulation,
          data: [],
        },
      });
      return;
    }

    const newData = [...reportData.insulation.data];
    const index = newData.findIndex((item) => item.name === updatedItem.name);

    if (index !== -1) {
      newData[index] = updatedItem;

      const updatedReportData = {
        ...reportData,
        insulation: {
          ...reportData.insulation,
          data: newData,
        },
      };

      setReportData(updatedReportData);

      setIsChangesSaved(false);

      // Save to localStorage
      try {
        localStorage.setItem(
          `${REPORT_DATA_KEY}_${bookingNumber}`,
          JSON.stringify(updatedReportData),
        );
      } catch (e) {
        console.error("Error saving insulation data to localStorage:", e);
      }
    } else {
      const updatedReportData = {
        ...reportData,
        insulation: {
          ...reportData.insulation,
          data: [...newData, updatedItem],
        },
      };

      setReportData(updatedReportData);
      setIsChangesSaved(false);

      // Save to localStorage
      try {
        localStorage.setItem(
          `${REPORT_DATA_KEY}_${bookingNumber}`,
          JSON.stringify(updatedReportData),
        );
      } catch (e) {
        console.error("Error saving insulation data to localStorage:", e);
      }
    }
  };

  // Replace the existing updateHeatingItem function with this one
  // Replace the existing updateHeatingItem function with this one
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

    // Now update the state with our carefully constructed new data
    setReportData(newReportData);
    setIsChangesSaved(false);

    // Save to localStorage
    try {
      localStorage.setItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
        JSON.stringify(newReportData),
      );
      console.log("New report data saved to localStorage:", newReportData);
    } catch (e) {
      console.error("Error saving updated report data to localStorage:", e);
    }
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

    setReportData(updatedReportData);
    setIsChangesSaved(false);
    try {
      localStorage.setItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
        JSON.stringify(updatedReportData),
      );
    } catch (e) {
      console.error("Error saving heating data to localStorage:", e);
    }
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

      setReportData(updatedReportData);
      setIsChangesSaved(false);

      // Save to localStorage
      try {
        localStorage.setItem(
          `${REPORT_DATA_KEY}_${bookingNumber}`,
          JSON.stringify(updatedReportData),
        );
        console.log("Initialized and saved concerns data structure");
      } catch (e) {
        console.error("Error saving concerns to localStorage:", e);
      }

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

      setReportData(updatedReportData);
      setIsChangesSaved(false);

      // Save to localStorage
      try {
        localStorage.setItem(
          `${REPORT_DATA_KEY}_${bookingNumber}`,
          JSON.stringify(updatedReportData),
        );
        console.log("Initialized and saved concerns data array");
      } catch (e) {
        console.error("Error saving concerns to localStorage:", e);
      }

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

    setReportData(updatedReportData);
    setIsChangesSaved(false);

    // Save to localStorage
    try {
      localStorage.setItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
        JSON.stringify(updatedReportData),
      );
      console.log("Updated concerns in localStorage");
    } catch (e) {
      console.error("Error saving concerns to localStorage:", e);
    }
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

    setReportData(updatedReportData);

    setIsChangesSaved(false);

    // Save to localStorage
    try {
      localStorage.setItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
        JSON.stringify(updatedReportData),
      );
    } catch (e) {
      console.error("Error saving recommendations to localStorage:", e);
    }
  };

  const updateFinancials = (newFinancials: FinancialData) => {
    if (!isAdmin) return;

    const updatedReportData = {
      ...reportData,
      financialSummary: newFinancials,
    };

    setReportData(updatedReportData);

    setIsChangesSaved(false);

    // Save to localStorage
    try {
      localStorage.setItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
        JSON.stringify(updatedReportData),
      );
    } catch (e) {
      console.error("Error saving financials to localStorage:", e);
    }
  };

  const updateTaxCredits = (newTaxCredits: any) => {
    if (!isAdmin) return;

    const updatedReportData = {
      ...reportData,
      federalTaxCredits: newTaxCredits,
    };

    setReportData(updatedReportData);

    setIsChangesSaved(false);

    // Save to localStorage
    try {
      localStorage.setItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
        JSON.stringify(updatedReportData),
      );
    } catch (e) {
      console.error("Error saving tax credits to localStorage:", e);
    }
  };

  const updateEnvironmentalImpact = (newEnvironmentalData: any) => {
    if (!isAdmin) return;

    const updatedReportData = {
      ...reportData,
      environmentalImpact: newEnvironmentalData,
    };

    setReportData(updatedReportData);

    setIsChangesSaved(false);

    // Save to localStorage
    try {
      localStorage.setItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
        JSON.stringify(updatedReportData),
      );
    } catch (e) {
      console.error(
        "Error saving environmental impact data to localStorage:",
        e,
      );
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
    switch (activeSubMenu) {
      case "air-leakage":
        return (
          <AirLeakageContent
            data={reportData.airLeakage}
            isAdmin={isAdmin}
            onUpdateValue={updateAirLeakage}
            onSave={() => setIsChangesSaved(true)}
          />
        );
      case "insulation":
        return (
          <InsulationContent
            data={reportData?.insulation}
            driveImages={imgOfUser}
            isAdmin={isAdmin}
            onUpdateItem={updateInsulationItem}
            onSave={() => setIsChangesSaved(true)}
          />
        );
      case "heating":
        return (
          <HeatingContent
            data={getHeatingData()}
            isAdmin={isAdmin}
            onUpdateItem={updateHeatingItem}
            driveImages={imgOfUser}
            onSave={() => setIsChangesSaved(true)}
          />
        );
      case "cooling":
        return (
          <CoolingContent
            data={getCoolingData()}
            isAdmin={isAdmin}
            onUpdateItem={updateCoolingItem}
            driveImages={imgOfUser}
            onSave={() => setIsChangesSaved(true)}
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
            onSave={() => setIsChangesSaved(true)}
          />
        );
      case "future solutions and certifications":
        return <FutureUpgradesAndCertificates />;
      default:
        return (
          <AirLeakageContent
            data={reportData.airLeakage}
            isAdmin={isAdmin}
            onUpdateValue={updateAirLeakage}
            onSave={() => setIsChangesSaved(true)}
          />
        );
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
      </div>
      {overview ? (
        <div className="container mx-auto p-4">
          <div className="space-y-12">
            {/* Section 1 - About Ciel Power */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-green-50 dark:bg-lime-500/50 pb-6">
                <CardTitle className="text-2xl text-black dark:text-lime-200">
                  About Ciel Power
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                  <p className="leading-relaxed">
                    We are a participating contractor in the New Jersey Home
                    Performance with Energy Star Program and a Building
                    Performance Institute Goldstar Contractor.
                  </p>
                  <p className="leading-relaxed">
                    Today&apos;s new home buyers expect energy efficiency to be
                    part of the package. What if your home was built before
                    today&apos;s energy-efficiency standards?
                  </p>
                  <p className="leading-relaxed">
                    From insulation to high-efficiency air-conditioning,
                    heating, and hot water systems, our products and services
                    deliver today&apos;s energy-efficiency solutions to
                    yesterday&apos;s homes for a more comfortable and affordable
                    homeownership experience.
                  </p>
                </div>

                {/* How it Works Section */}
                <div className="pt-6">
                  <h3 className="text-2xl font-semibold mb-8 text-black dark:text-lime-200">
                    How it Works
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {howItWorksSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 bg-green-50 dark:bg-lime-500/50 rounded-xl flex flex-col items-center text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mb-6">
                          <step.icon className="h-8 w-8 text-lime-500" />
                        </div>
                        <h4 className="text-xl font-semibold text-black dark:text-lime-200 mb-4">
                          {step.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional sections omitted for brevity */}

            {/* Call to Action Button */}
            <div className="text-center">
              <button
                onClick={handleScrollToTop}
                className="bg-lime-500 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                View Detailed Reports
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-4" ref={scrollRef}>
          <div className="py-4 px-6 rounded-t-lg shadow-md">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Edit Report</h1>
            </div>
          </div>

          <div className="bg-white rounded-b-lg shadow-md">
            <div className="flex border-b border-gray-200">
              {[
                "air-leakage",
                "insulation",
                "heating",
                "cooling",
                "summary",
                "future solutions and certifications",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`py-3 px-6 text-center font-medium transition-colors duration-200 ${
                    activeSubMenu === tab
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
      )}
    </div>
  );
};

export default ReportPage;
