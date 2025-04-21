/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Overview } from "@/components/report-/Overview";
import { AirLeakageContent } from "@/components/report-/AirLeakageContent";
import { CoolingContent } from "@/components/report-/CoolingContent";
import { HeatingContent } from "@/components/report-/HeatingContent";
import { InsulationContent } from "@/components/report-/InsulationContent";
import { ReportSummary } from "@/components/report-/ReportSummary";
import { FutureUpgradesAndCertificates } from "@/components/report-/FutureUpgradesAndCertificates";
import { useRef, useState, useEffect, use, useContext } from "react";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { AUTH_CONTEXT } from "@/providers/auth";
import handleDownloadReport, { ReportSection } from "./download";
import DownloadModal from "./downloadModal";
import ReportOverviewSection from "@/components/report/overview/overview";
import ReportAirLeakageSection from "@/components/report/airLeakage/airLeakage";
import ReportInsulationSection from "@/components/report/insulation/insulation";
import ReportHeatingSection from "@/components/report/heating/heating";
import ReportCoolingSection from "@/components/report/cooling/cooling";
import ReportSummarySection from "@/components/report/summary/summary";

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
  const { userDetails } = useContext(AUTH_CONTEXT);
  const bookingNumber = userDetails?.bookingNumber;

  // Define tab colors for the underlines
  const tabColors = {
    overview: "bg-lime-500",
    airLeakage: "bg-blue-600",
    insulation: "bg-teal-500",
    heating: "bg-amber-500",
    cooling: "bg-amber-500",
    summary: "bg-orange-500",
    "future solutions and certifications": "bg-purple-500",
  };

  const [activeSubMenu, setActiveSubMenu] = useState("overview");
  const [overview, setOverview] = useState(true);
  const [reportUrl, setReportUrl] = useState("");
  const [reportData, setReportData] = useState<ReportData>({});
  const [reportStatus, setReportStatus] = useState<
    "NONE" | "STATIC" | "AUTOMATED"
  >("NONE");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Add these state variables near your other useState declarations
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedSections, setSelectedSections] = useState<ReportSection[]>([
    "overview",
    "airLeakage",
    "insulation",
    "heating",
    "cooling",
    "summary",
  ]);
  useEffect(() => {
    // Fetch report data when component mounts
    if (bookingNumber) {
      fetchReportDetails();
    }
  }, [bookingNumber]);

  const fetchReportDetails = async () => {
    setLoading(true);
    console.log("Booking Number:", bookingNumber);
    try {
      const response = await fetch(
        `/api/user/bookings/${bookingNumber}/report`
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch report details");
        setReportStatus("NONE"); // Set status to NONE on failure
        return;
      }

      const data = await response.json();

      if (data.success) {
        console.log("Report data:", data.data);
        setReportData(data.data.data || {});
        setReportUrl(data.data.url || "");
        setReportStatus(data.data.displayReport || "NONE"); // Ensure it matches "NONE", "STATIC", or "AUTOMATED"
      } else {
        toast.error(data.message || "Failed to fetch report details");
        setReportStatus("NONE"); // Set status to NONE on failure
      }
    } catch (error) {
      console.error("Error fetching report details:", error);
      toast.error("An error occurred while fetching report details");
      setReportStatus("NONE"); // Set status to NONE on error
    } finally {
      setLoading(false);
    }
  };

  // Format tab name for display
  const formatTabName = (tab) => {
    if (tab === "airLeakage") return "Air Leakage Reports";
    if (tab === "summary") return "Report Summary";
    if (tab === "future solutions and certifications")
      return "Future Solutions";
    return (
      tab.charAt(0).toUpperCase() +
      tab.slice(1) +
      (tab !== "overview" ? " Reports" : "")
    );
  };

  // Get current breadcrumb based on active tab
  const getCurrentBreadcrumb = () => {
    return formatTabName(activeSubMenu);
  };

  const renderContent = () => {
    if (reportStatus === "NONE") {
      return (
        <div className="text-center text-gray-600 py-10">
          <h2 className="text-xl font-semibold">
            Your Report Has Not Been Generated
          </h2>
          <p>Please check back later or contact support for assistance.</p>
        </div>
      );
    }

    if (reportStatus === "STATIC") {
      return (
        <div className="py-10">
          <iframe
            src={reportUrl}
            title="Static Report"
            className="w-full h-screen border-0"
          ></iframe>
        </div>
      );
    }

    if (reportStatus === "AUTOMATED") {
      // Render the existing structure for automated reports
      switch (activeSubMenu) {
        case "overview":
          return <ReportOverviewSection />;
        case "airLeakage":
          return (
            <ReportAirLeakageSection airLeakage={reportData?.airLeakage} />
          );
        case "insulation":
          return (
            <ReportInsulationSection insulationData={reportData?.insulation} />
          );
        case "heating":
          return <ReportHeatingSection heatingData={reportData?.heating} />;
        case "cooling":
          return <ReportCoolingSection coolingData={reportData?.cooling} />;
        case "summary":
          return <ReportSummarySection reportData={reportData} />;
        default:
          return <Overview />;
      }
    }

    return null;
  };

  const handleShareReport = () => {
    // Implement share functionality
    toast.info("Share functionality will be implemented soon");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f9f0]">
        <main className="container mx-auto px-6 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5cb85c]"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white" ref={scrollRef}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">View Report</h1>
          <div className="flex gap-2">
            {reportStatus === "NONE" ? (
              <button
                className="bg-gray-300 text-gray-500 py-2 px-4 rounded flex items-center gap-2 cursor-not-allowed"
                disabled
              >
                <Download className="h-5 w-5" />
                <span>Download Report</span>
              </button>
            ) : reportStatus === "STATIC" ? (
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded flex items-center gap-2 transition-colors"
              >
                <Download className="h-5 w-5" />
                <span>Download Report</span>
              </a>
            ) : (
              <button
                className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded flex items-center gap-2 transition-colors"
                onClick={() => setShowDownloadModal(true)}
              >
                <Download className="h-5 w-5" />
                <span>Download Report</span>
              </button>
            )}
            <button
              className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 p-2 rounded shadow-sm"
              onClick={handleShareReport}
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span>Dashboard</span>
          <span className="mx-1 text-lime-500">›</span>
          <span>View Report</span>
          <span className="mx-1 text-lime-500">›</span>
          <span>{getCurrentBreadcrumb()}</span>
        </div>
      </div>
      <DownloadModal
        showDownloadModal={showDownloadModal}
        setShowDownloadModal={setShowDownloadModal}
        selectedSections={selectedSections}
        setSelectedSections={setSelectedSections}
        handleDownloadReport={handleDownloadReport}
      />
      <div>
        {reportStatus === "AUTOMATED" && (
          <div className="flex overflow-x-auto border-b border-gray-100">
            {[
              "overview",
              "airLeakage",
              "insulation",
              "heating",
              "cooling",
              "summary",
            ].map((tab) => (
              <button
                key={tab}
                className={`relative py-4 px-6 text-center font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeSubMenu === tab
                    ? `text-${tab === "airLeakage" ? "blue" : tab === "insulation" ? "teal" : tab === "heating" || tab === "cooling" ? "amber" : tab === "summary" ? "orange" : "lime"}-600`
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActiveSubMenu(tab)}
              >
                {formatTabName(tab)}
                {activeSubMenu === tab && (
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${tabColors[tab]}`}
                  ></div>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="py-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ReportPage;
