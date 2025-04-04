"use client";

import { AirLeakageContent } from "@/components/report/AirLeakageContent";
import { CoolingContent } from "@/components/report/CoolingContent";
import { HeatingContent } from "@/components/report/HeatingContent";
import { InsulationContent } from "@/components/report/InsulationContent";
import { ReportSummary } from "@/components/report/ReportSummary";
import { FutureUpgradesAndCertificates } from "@/components/report/FutureUpgradesAndCertificates";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect, use, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Info,
  HelpCircle,
  CheckCircle2,
  Shield,
  Target,
  Thermometer,
  Home,
  DollarSign,
  Leaf,
  Award,
  Percent,
  BadgeCheck,
} from "lucide-react";
import { HouseSystem } from "@/components/report/HouseSystem";
import { toast } from "sonner";


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

// Define the type for reportData
interface ReportData {
  airLeakage?: AirLeakageData;
  insulation?: InsulationData;
  heatingAndCooling?: HeatingCoolingData;
  waterHeater?: WaterHeaterData;
  summaryOfConcerns?: any;
  solutionsAndRecommendations?: any;
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
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [imgOfUser, SetImageOfUser] = useState([]);

  useEffect( () => {
    const fetchData=async()=>{
      try {
        //  = await fetchImages({ userid: bookingNumber });

         const imagesOfUser = await fetch(
          `/api/admin/bookings/${bookingNumber}/pictures`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache:"default",
            next: { revalidate: 3600 }, // Revalidate every 3600 seconds        
          }
        );
        const data = await imagesOfUser.json();
        console.log("Fetched images:", data);
        SetImageOfUser(data?.data?.pictures);
        console.log("imagesOfUser", imagesOfUser);
      } catch (error) {
        console.log("Error fetching images:", error);
        toast.error("Failed to fetch images");
      }
    }
    fetchData();
  }, [bookingNumber]);

  // Check if admin
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(window.location.href.includes("admin"));
    }
  }, []);

  useEffect(() => {
    // Admin users can load from localStorage, otherwise always fetch fresh
    if (isAdmin) {
      const savedData = localStorage.getItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`
      );
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setReportData(parsedData);
          console.log("Loaded report data from localStorage");
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
  }, [bookingNumber, isAdmin]);

  const fetchReportDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/bookings/${bookingNumber}/report`
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch report details");
        return;
      }

      const data = await response.json();

      if (data.success) {
        console.log("Fetched report data:", data.data);
        const fetchedReportData = data.data.reportData || {};

        // Save to state
        setReportData(fetchedReportData);
        setReportUrl(data.data.reportUrl || "");
        setReportStatus(data.data.displayReport || false);

        // Save to localStorage only for admin users
        if (isAdmin) {
          try {
            localStorage.setItem(
              `${REPORT_DATA_KEY}_${bookingNumber}`,
              JSON.stringify(fetchedReportData)
            );
            console.log("Saved initial report data to localStorage");
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

    // Save to localStorage
    try {
      localStorage.setItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
        JSON.stringify(newData)
      );
    } catch (e) {
      console.error("Error saving updated report data to localStorage:", e);
    }
  };

  const updateInsulationItem = (updatedItem: InsulationItem) => {
    if (!isAdmin || !reportData.insulation?.data) return;

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

      // Save to localStorage
      try {
        localStorage.setItem(
          `${REPORT_DATA_KEY}_${bookingNumber}`,
          JSON.stringify(updatedReportData)
        );
      } catch (e) {
        console.error("Error saving insulation data to localStorage:", e);
      }
    }
  };

  const updateHeatingItem = (updatedItem: HeatingCoolingItem) => {
    if (!isAdmin || !reportData.heatingAndCooling?.data) return;

    // Check if it's a heating item or water heater
    const isHeatingItem =
      updatedItem.name.toLowerCase().includes("furnace") ||
      updatedItem.name.toLowerCase().includes("boiler") ||
      updatedItem.name.toLowerCase().includes("heat");

    if (isHeatingItem) {
      // Update in heatingAndCooling data
      const newHeatingData = [...reportData.heatingAndCooling.data];
      const index = newHeatingData.findIndex(
        (item) =>
          item.name === updatedItem.name && item.type === updatedItem.type
      );

      if (index !== -1) {
        newHeatingData[index] = updatedItem;

        const updatedReportData = {
          ...reportData,
          heatingAndCooling: {
            ...reportData.heatingAndCooling,
            data: newHeatingData,
          },
        };

        setReportData(updatedReportData);

        // Save to localStorage
        try {
          localStorage.setItem(
            `${REPORT_DATA_KEY}_${bookingNumber}`,
            JSON.stringify(updatedReportData)
          );
        } catch (e) {
          console.error("Error saving heating data to localStorage:", e);
        }
      }
    } else if (reportData.waterHeater?.data) {
      // Update in waterHeater data
      const newWaterHeaterData = [...reportData.waterHeater.data];
      const index = newWaterHeaterData.findIndex(
        (item) =>
          item.name === updatedItem.name && item.type === updatedItem.type
      );

      if (index !== -1) {
        newWaterHeaterData[index] = updatedItem;

        const updatedReportData = {
          ...reportData,
          waterHeater: {
            ...reportData.waterHeater,
            data: newWaterHeaterData,
          },
        };

        setReportData(updatedReportData);

        // Save to localStorage
        try {
          localStorage.setItem(
            `${REPORT_DATA_KEY}_${bookingNumber}`,
            JSON.stringify(updatedReportData)
          );
        } catch (e) {
          console.error("Error saving water heater data to localStorage:", e);
        }
      }
    }
  };

  const updateCoolingItem = (updatedItem: HeatingCoolingItem) => {
    if (!isAdmin || !reportData.heatingAndCooling?.data) return;

    const newData = [...reportData.heatingAndCooling.data];
    const index = newData.findIndex(
      (item) => item.name === updatedItem.name && item.type === updatedItem.type
    );

    if (index !== -1) {
      newData[index] = updatedItem;

      const updatedReportData = {
        ...reportData,
        heatingAndCooling: {
          ...reportData.heatingAndCooling,
          data: newData,
        },
      };

      setReportData(updatedReportData);

      // Save to localStorage
      try {
        localStorage.setItem(
          `${REPORT_DATA_KEY}_${bookingNumber}`,
          JSON.stringify(updatedReportData)
        );
      } catch (e) {
        console.error("Error saving cooling data to localStorage:", e);
      }
    }
  };

  const updateConcerns = (newConcerns: any) => {
    if (!isAdmin || !reportData.summaryOfConcerns?.data) return;

    const newSummaryData = [...reportData.summaryOfConcerns.data];

    // Update health safety section
    const healthSafetyIndex = newSummaryData.findIndex(
      (section) => section.name === "Basic Health and Safety"
    );

    if (healthSafetyIndex !== -1 && newConcerns.healthSafety) {
      newSummaryData[healthSafetyIndex].data = newConcerns.healthSafety;
    }

    // Update combustion section
    const combustionIndex = newSummaryData.findIndex(
      (section) => section.name === "Combustion Testing"
    );

    if (combustionIndex !== -1 && newConcerns.combustion) {
      newSummaryData[combustionIndex].data = newConcerns.combustion;
    }

    const updatedReportData = {
      ...reportData,
      summaryOfConcerns: {
        ...reportData.summaryOfConcerns,
        data: newSummaryData,
      },
    };

    setReportData(updatedReportData);

    // Save to localStorage
    try {
      localStorage.setItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
        JSON.stringify(updatedReportData)
      );
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

    // Save to localStorage
    try {
      localStorage.setItem(
        `${REPORT_DATA_KEY}_${bookingNumber}`,
        JSON.stringify(updatedReportData)
      );
    } catch (e) {
      console.error("Error saving recommendations to localStorage:", e);
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

  const programFeatures = [
    {
      icon: Home,
      title: "Home Assessment",
      description: "Comprehensive energy evaluation",
    },
    {
      icon: Percent,
      title: "Energy Efficiency",
      description: "Improved home performance",
    },
    {
      icon: DollarSign,
      title: "Cost Savings",
      description: "Reduced energy bills",
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description: "Reduced carbon footprint",
    },
  ];

  // Filter heating and cooling items from heatingAndCooling data
  const getHeatingData = () => {
    if (!reportData.heatingAndCooling?.data)
      return { data: [], title: "Heating Systems" };

    const heatingItems = reportData.heatingAndCooling.data.filter(
      (item) =>
        item.name.toLowerCase().includes("furnace") ||
        item.name.toLowerCase().includes("boiler") ||
        item.name.toLowerCase().includes("heat")
    );

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
        item.name.toLowerCase().includes("heat pump")
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
          />
        );
      case "insulation":
        return (
          <InsulationContent
            data={reportData.insulation}
            driveImages={imgOfUser}
            isAdmin={isAdmin}
            onUpdateItem={updateInsulationItem}
          />
        );
      case "heating":
        return (
          <HeatingContent
            data={getHeatingData()}
            isAdmin={isAdmin}
            onUpdateItem={updateHeatingItem}
          />
        );
      case "cooling":
        return (
          <CoolingContent
            data={getCoolingData()}
            isAdmin={isAdmin}
            onUpdateItem={updateCoolingItem}
          />
        );
      case "summary":
        return (
          <ReportSummary
            data={reportData}
            isAdmin={isAdmin}
            onUpdateConcerns={updateConcerns}
            onUpdateRecommendations={updateRecommendations}
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
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return overview ? (
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
                Performance with Energy Star Program and a Building Performance
                Institute Goldstar Contractor.
              </p>
              <p className="leading-relaxed">
                Today&apos;s new home buyers expect energy efficiency to be part
                of the package. What if your home was built before today&apos;s
                energy-efficiency standards?
              </p>
              <p className="leading-relaxed">
                From insulation to high-efficiency air-conditioning, heating,
                and hot water systems, our products and services deliver
                today&apos;s energy-efficiency solutions to yesterday&apos;s
                homes for a more comfortable and affordable homeownership
                experience.
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
      <div className="bg-gradient-to-r from-lime-400 to-lime-400 py-4 px-6 rounded-t-lg shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Reports</h1>
        </div>
      </div>

      <div className="bg-white rounded-b-lg shadow-md">
        <div className="flex border-b border-gray-200">
          {["air-leakage", "insulation", "heating", "cooling", "summary", "future solutions and certifications"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-6 text-center font-medium transition-colors duration-200 ${activeSubMenu === tab
                ? "border-b-2 border-lime-500 text-lime-500"
                : "text-gray-600 hover:text-lime-500"
                }`}
              onClick={() => setActiveSubMenu(tab)}
            >
              {["air-leakage", "insulation", "heating", "cooling"].includes(tab)
                ? `${tab.charAt(0).toUpperCase() + tab.slice(1)} Reports`
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">{renderContent()}</div>
      </div>

    </div>
  );
};

export default ReportPage;
