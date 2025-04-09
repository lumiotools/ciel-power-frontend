"use client";

import { AirLeakageContent } from "@/components/report/AirLeakageContent";
import { CoolingContent } from "@/components/report/CoolingContent";
import { HeatingContent } from "@/components/report/HeatingContent";
import { InsulationContent } from "@/components/report/InsulationContent";
import { ReportSummary } from "@/components/report/ReportSummary";
import { FutureUpgradesAndCertificates } from "@/components/report/FutureUpgradesAndCertificates";
import { motion } from "framer-motion";
import React, { useRef, useState, useEffect, use } from "react";
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

  const [activeSubMenu, setActiveSubMenu] = useState("air-leakage");
  const [overview, setOverview] = useState(true);
  const [reportUrl, setReportUrl] = useState("");
  const [reportData, setReportData] = useState<ReportData>({});
  const [reportStatus, setReportStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch report data when component mounts
    if (bookingNumber) {
      fetchReportDetails();
    }
  }, [bookingNumber]);

  const fetchReportDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/user/bookings/${bookingNumber}/report`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch report details");
        return;
      }

      const data = await response.json();

      if (data.success) {
        console.log("Report data:", data.data);
        setReportData(data.data.reportData || {});
        setReportUrl(data.data.reportUrl || "");
        setReportStatus(data.data.displayReport || false);
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

  // console.log(reportData);

  // Filter heating and cooling items from heatingAndCooling data
  const getHeatingData = () => {
    if (!reportData.heatingAndCooling?.data)
      return { data: [], title: "Heating Systems" };

    const heatingItems = reportData.heatingAndCooling.data.filter(
      (item) =>
        item.name.toLowerCase().includes("furnace") ||
        item.name.toLowerCase().includes("boiler") ||
        item.name.toLowerCase().includes("heat"),
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
        item.name.toLowerCase().includes("heat pump"),
    );

    return {
      data: coolingItems,
      title: "Cooling Systems",
    };
  };

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

  const renderContent = () => {
    switch (activeSubMenu) {
      case "air-leakage":
        return <AirLeakageContent data={reportData.airLeakage} />;
      case "insulation":
        return <InsulationContent data={reportData.insulation} />;
      case "heating":
        return <HeatingContent data={getHeatingData()} />;
      case "cooling":
        return <CoolingContent data={getCoolingData()} />;
      case "summary":
        return <ReportSummary data={reportData} />;
      case "future solutions and certifications":
        return <FutureUpgradesAndCertificates />;
      default:
        return <AirLeakageContent data={reportData.airLeakage} />;
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
                    id={`gqbovx_${index}`}
                  >
                    <div
                      className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mb-6"
                      id={`8u4oam_${index}`}
                    >
                      <step.icon
                        className="h-8 w-8 text-lime-500"
                        id={`4a995d_${index}`}
                      />
                    </div>
                    <h4
                      className="text-xl font-semibold text-black dark:text-lime-200 mb-4"
                      id={`jd8h3m_${index}`}
                    >
                      {step.title}
                    </h4>
                    <p
                      className="text-gray-600 dark:text-gray-300"
                      id={`goy6ef_${index}`}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2 - Goals of the Audit */}
        <Card>
          <CardHeader className="bg-green-50 dark:bg-green-900/50 pb-6">
            <CardTitle className="text-2xl text-black dark:text-green-200">
              Goals of the Audit
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Safety",
                  description:
                    "We tested the ambient air in your home, gas lines, heating systems, hot water systems and ventilation systems",
                  color: "text-blue-600",
                  bgColor: "bg-blue-50 dark:bg-blue-900/50",
                },
                {
                  icon: Thermometer,
                  title: "Comfort",
                  description:
                    "We examined your home's air flow rates and insulation levels. We determined the sources of comfort and conditioning issues",
                  color: "text-purple-600",
                  bgColor: "bg-purple-50 dark:bg-purple-900/50",
                },
                {
                  icon: Target,
                  title: "Efficiency",
                  description:
                    "We determined the efficiency of your home's heating, cooling and hot water systems. We analyzed the impact of your home's construction, insulation and air flow rates",
                  color: "text-lime-500",
                  bgColor: "bg-green-50 dark:bg-green-900/50",
                },
              ].map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`p-8 rounded-xl flex flex-col items-center text-center ${goal.bgColor}`}
                  id={`ylrudz_${index}`}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mb-6`}
                    id={`1qtrgr_${index}`}
                  >
                    <goal.icon
                      className={`h-8 w-8 ${goal.color}`}
                      id={`41gq0c_${index}`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-semibold ${goal.color} mb-4`}
                    id={`vxh9f0_${index}`}
                  >
                    {goal.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-300 leading-relaxed"
                    id={`fvegcg_${index}`}
                  >
                    {goal.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 3 - About Energy Star Program */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-green-50 dark:bg-lime-500/50 pb-6">
            <CardTitle className="text-2xl text-black dark:text-lime-200">
              About New Jersey Home Performance with ENERGY STAR Program
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <p className="leading-relaxed">
                Home Performance with ENERGY STAR is a national program from the
                U.S. Department of Energy and U.S. Environmental Protection
                Agency that helps homeowners save money on energy bills while
                increasing their home&apos;s comfort.
              </p>
              <p className="leading-relaxed">
                The program connects homeowners with qualified contractors who
                conduct comprehensive home energy assessments and make
                recommended improvements.
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-lime-500 dark:text-lime-200 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Program Benefits
                  </h4>
                  <p>
                    Access to certified contractors, quality assurance, and
                    potential rebates
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-lime-500 dark:text-lime-200 flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5" />
                    Certification
                  </h4>
                  <p>
                    Work performed by Building Performance Institute (BPI)
                    certified professionals
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-lime-500 dark:text-lime-200 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Results
                  </h4>
                  <p>
                    Average energy savings of 20-30% after recommended
                    improvements
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                {programFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="p-6 bg-green-50 dark:bg-lime-500/50 rounded-xl flex flex-col items-center text-center"
                    id={`25er7c_${index}`}
                  >
                    <feature.icon
                      className="h-8 w-8 text-lime-500 mb-4"
                      id={`r1npep_${index}`}
                    />
                    <h4
                      className="text-lg font-semibold text-black dark:text-lime-200 mb-2"
                      id={`r51ddk_${index}`}
                    >
                      {feature.title}
                    </h4>
                    <p className="text-sm" id={`co6z3o_${index}`}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 bg-green-50 dark:bg-lime-500/50 p-6 rounded-xl mt-8">
                <h4 className="text-lg font-semibold text-black dark:text-lime-200">
                  Financial Incentives
                </h4>
                <p>
                  The program offers various financial incentives including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Up to $4,000 in rebates for eligible improvements</li>
                  <li>Special financing options with low interest rates</li>
                  <li>Additional local utility incentives</li>
                  <li>
                    Federal tax credits for energy efficiency improvements
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4 - House as a System */}
        <HouseSystem />

        {/* Call to Action Button */}
        <div className="text-center">
          <button
            onClick={handleScrollToTop}
            className="bg-lime-500 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            View Detailed Reports
          </button>
        </div>

        {/* Chatbot */}
        {/* <Chatbot activeMenu="overview" /> */}
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
