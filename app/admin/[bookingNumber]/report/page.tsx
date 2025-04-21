"use client";

import { Overview } from "@/components/report-/Overview";
import { AirLeakageContent } from "@/components/report-/AirLeakageContent";
import { CoolingContent } from "@/components/report-/CoolingContent";
import { HeatingContent } from "@/components/report-/HeatingContent";
import { InsulationContent } from "@/components/report-/InsulationContent";
import { ReportSummary } from "@/components/report-/ReportSummary";
import { FutureUpgradesAndCertificates } from "@/components/report-/FutureUpgradesAndCertificates";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect, use, useContext } from "react";
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
import { AUTH_CONTEXT } from "@/providers/auth";
import ReportOverviewSection from "@/components/report/overview/overview";
import ReportAirLeakageSection from "@/components/report/airLeakage/airLeakage";
import ReportInsulationSection from "@/components/report/insulation/insulation";
import ReportHeatingSection from "@/components/report/heating/heating";
import ReportSummarySection from "@/components/report/summary/summary";
import ReportCoolingSection from "@/components/report/cooling/cooling";

// Define interfaces for specific data types
export interface ImageData {
  id: string;
  description?: string;
}

export interface DescriptionData {
  title: string;
  content: string;
  footer?: string;
}

export interface AirLeakageData {
  title: string;
  parameter: string;
  current_value?: number;
  recommended_value?: number;
  image?: string;
}

export interface InsulationData {
  title: string;
  material: string;
  condition: string;
  current_rValue?: number;
  recommended_rValue?: number;
  description?: DescriptionData;
  images?: ImageData[];
}

export interface HeatingData {
  title: string;
  type: string;
  condition: string;
  year?: number;
  parameter: string;
  current_value?: string;
  recommended_value?: string;
  description?: DescriptionData;
  images?: ImageData[];
}

export interface CoolingData {
  title: string;
  type: string;
  condition: string;
  year?: number;
  parameter: string;
  current_value?: number;
  recommended_value?: number;
  description?: DescriptionData;
  images?: ImageData[];
}

export interface SummaryOfConcernsData {
  name: string;
  concern: string;
  flag?: boolean;
}

export interface SolutionsAndRecommendationsData {
  title: string;
  benefits: string;
}

export interface FinancialSummaryItem {
  title: string;
  amount: number | string;
}

export interface FinancialSummaryData {
  title: string;
  data?: FinancialSummaryItem[];
  monthlyPayment?: number;
  financingPeriodYears?: number;
}

export interface FederalTaxCreditData {
  title: string;
  amount: number | string;
  note?: string;
}

export interface EnvironmentalImpactItem {
  value: string;
  unit: string;
}

export interface EnvironmentalImpactData {
  title: string;
  currentFootprint: EnvironmentalImpactItem;
  projectedFootprint: EnvironmentalImpactItem;
  projectedSavings: EnvironmentalImpactItem;
  totalReduction: EnvironmentalImpactItem;
}

// Define the type for reportData
export interface ReportData {
  airLeakage?: AirLeakageData;
  insulation?: InsulationData[];
  heating?: HeatingData[];
  cooling?: CoolingData[];
  summaryOfConcerns?: SummaryOfConcernsData[];
  solutionsAndRecommendations?: SolutionsAndRecommendationsData[];
  financialSummary?: FinancialSummaryData;
  federalTaxCredits?: FederalTaxCreditData[];
  environmentalImpact?: EnvironmentalImpactData;
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
  const [reportData, setReportData] = useState<ReportData>({});
  const [isChangesSaved, setIsChangesSaved] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [houseImages, setHouseImages] = useState([]);

  const { userDetails } = useContext(AUTH_CONTEXT);
  const isAdmin = userDetails?.admin || false;

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
    setIsChangesSaved(false);
    updateReportDataField(reportData);
  }, [reportData]);

  // Debounced save function to avoid too many API calls
  const debouncedSaveReportData = useDebouncedCallback(
    async (data: ReportData) => {
      if (!isAdmin) return;

      setIsSaving(true);
      try {
        // Use the previous API format and endpoint
        const response = await fetch(
          `/api/admin/bookings/${bookingNumber}/report/update`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: data,
              url: "",
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to save report data");
        }

        const responseData = await response.json();
        if (responseData.success) {
          setIsChangesSaved(true);
          // Subtle toast for auto-save success
          toast.success("Changes saved automatically", { duration: 2000 });
        } else {
          throw new Error(responseData.message || "Failed to save report data");
        }
      } catch (error) {
        console.error("Error saving report data:", error);
        toast.error("Failed to save changes automatically. Please try again.");
        setIsChangesSaved(false);
      } finally {
        setIsSaving(false);
      }
    },
    2000
  ); // 2 second debounce

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
          }
        );
        const data = await imagesOfUser.json();

        setHouseImages(data?.data?.pictures);
      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Failed to fetch images");
      }
    };
    fetchData();
  }, [bookingNumber]);

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
        const fetchedReportData = data.data.data;

        // Save to state
        setReportData(fetchedReportData);
        setTimeout(() => setIsChangesSaved(true), 500);
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

  // Manual save function for the save button
  const handleManualSave = async () => {
    if (!isAdmin) return;

    setIsSaving(true);
    try {
      // Use the previous API format and endpoint
      const response = await fetch(
        `/api/admin/bookings/${bookingNumber}/report/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: reportData,
            url: "",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to save report data");
      }

      const data = await response.json();
      if (data.success) {
        setIsChangesSaved(true);
        toast.success("All changes saved successfully");
      } else {
        throw new Error(data.message || "Failed to save report data");
      }
    } catch (error) {
      console.error("Error saving report data:", error);
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

  const renderContent = () => {
    switch (activeSubMenu) {
      case "overview":
        return <ReportOverviewSection />;
      case "air-leakage":
        return (
          <ReportAirLeakageSection
            isAdmin={isAdmin}
            airLeakage={reportData?.airLeakage}
            onUpdateValue={(airLeakage) =>
              setReportData({ ...reportData, airLeakage })
            }
          />
        );
      case "insulation":
        return (
          <ReportInsulationSection
            isAdmin={isAdmin}
            insulationData={reportData?.insulation}
            onUpdateValue={(insulation) =>
              setReportData({ ...reportData, insulation })
            }
            houseImages={houseImages}
          />
        );
      case "heating":
        return (
          <ReportHeatingSection
            isAdmin={isAdmin}
            heatingData={reportData?.heating}
            onUpdateValue={(heating) =>
              setReportData({ ...reportData, heating })
            }
            houseImages={houseImages}
          />
        );
      case "cooling":
        return (
          <ReportCoolingSection
            isAdmin={isAdmin}
            coolingData={reportData?.cooling}
            onUpdateValue={(cooling) =>
              setReportData({ ...reportData, cooling })
            }
            houseImages={houseImages}
          />
        );
      case "summary":
        return (
          <ReportSummarySection
            isAdmin={isAdmin}
            reportData={reportData}
            onUpdateValue={(reportData: ReportData) =>
              setReportData(reportData)
            }
          />
        );
      default:
        return <Overview />;
    }
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
                className={`py-3 px-6 text-center font-medium transition-colors duration-200 ${
                  activeSubMenu === tab
                    ? "border-b-2 border-lime-500 text-lime-500"
                    : "text-gray-600 hover:text-lime-500"
                }`}
                onClick={() => handleChangeActiveSubMenu(tab)}
              >
                {["air-leakage", "insulation", "heating", "cooling"].includes(
                  tab
                )
                  ? `${tab.charAt(0).toUpperCase() + tab.slice(1)} Reports`
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex justify-end px-8 mt-8">
            {isAdmin && (
              <div className="flex items-center gap-2">
                {isSaving ? (
                  <span className="text-yellow-600 text-sm">
                    Saving changes...
                  </span>
                ) : !isChangesSaved ? (
                  <span className="text-orange-600 text-sm">
                    Unsaved changes
                  </span>
                ) : null}
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

          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
