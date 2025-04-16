"use client"

import { Overview } from "@/components/report/Overview"
import { AirLeakageContent } from "@/components/report/AirLeakageContent"
import { CoolingContent } from "@/components/report/CoolingContent"
import { HeatingContent } from "@/components/report/HeatingContent"
import { InsulationContent } from "@/components/report/InsulationContent"
import { ReportSummary } from "@/components/report/ReportSummary"
import { FutureUpgradesAndCertificates } from "@/components/report/FutureUpgradesAndCertificates"
import { useRef, useState, useEffect, use, useContext } from "react"
import { Download, Share2 } from "lucide-react"
import { toast } from "sonner"
import { AUTH_CONTEXT } from "@/providers/auth"

// Define interfaces for specific data types
interface AirLeakageData {
  parameter: string
  title: string
  value: string
}

interface InsulationItem {
  condition: string
  material: string
  name: string
  rValue: number
}

interface InsulationData {
  data: InsulationItem[]
  missingDataZones: string[]
  missingZones: string[]
  title: string
}

interface HeatingCoolingItem {
  condition: string
  name: string
  parameter: string
  type: string
  value: number | string
  year?: number
}

interface HeatingCoolingData {
  data: HeatingCoolingItem[]
  title: string
}

interface WaterHeaterData {
  data: HeatingCoolingItem[]
  title: string
}

interface FinancialItem {
  title: string
  amount: string
}

interface FinancialData {
  title: string
  data: FinancialItem[]
  monthlyPayment: string
  financingPeriodYears: number
}

// Define the type for reportData
interface ReportData {
  airLeakage?: AirLeakageData
  insulation?: InsulationData
  heatingAndCooling?: HeatingCoolingData
  waterHeater?: WaterHeaterData
  summaryOfConcerns?: any
  solutionsAndRecommendations?: any
  financialSummary?: FinancialData
  [key: string]: any
}

const ReportPage = ({
  params,
}: {
  params: Promise<{ bookingNumber: string }>
}) => {
  // Unwrap the params Promise using React.use()
  const { userDetails } = useContext(AUTH_CONTEXT);
  const bookingNumber = userDetails?.bookingNumber;

  // Define tab colors for the underlines
  const tabColors = {
    overview: "bg-lime-500",
    "air-leakage": "bg-blue-600",
    insulation: "bg-teal-500",
    heating: "bg-amber-500",
    cooling: "bg-amber-500",
    summary: "bg-orange-500",
    "future solutions and certifications": "bg-purple-500",
  }

  const [activeSubMenu, setActiveSubMenu] = useState("overview")
  const [overview, setOverview] = useState(true)
  const [reportUrl, setReportUrl] = useState("")
  const [reportData, setReportData] = useState<ReportData>({})
  const [reportStatus, setReportStatus] = useState<"NONE" | "STATIC" | "AUTOMATED">("NONE")
  const [loading, setLoading] = useState(false)
  const [imgOfUser, SetImageOfUser] = useState([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch report data when component mounts
    if (bookingNumber) {
      fetchReportDetails()
    }
  }, [bookingNumber])

  const fetchReportDetails = async () => {
    setLoading(true)
    console.log("Booking Number:", bookingNumber)
    try {
      const response = await fetch(`/api/user/bookings/${bookingNumber}/report`)

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.detail || "Failed to fetch report details")
        setReportStatus("NONE") // Set status to NONE on failure
        return
      }

      const data = await response.json()

      if (data.success) {
        console.log("Report data:", data.data)
        setReportData(data.data.reportData || {})
        setReportUrl(data.data.reportUrl || "")
        setReportStatus(data.data.displayReport || "NONE") // Ensure it matches "NONE", "STATIC", or "AUTOMATED"
      } else {
        toast.error(data.message || "Failed to fetch report details")
        setReportStatus("NONE") // Set status to NONE on failure
      }
    } catch (error) {
      console.error("Error fetching report details:", error)
      toast.error("An error occurred while fetching report details")
      setReportStatus("NONE") // Set status to NONE on error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesOfUser = await fetch(`/api/user/bookings/${bookingNumber}/pictures`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "default",
          next: { revalidate: 3600 }, // Revalidate every 3600 seconds
        })
        const data = await imagesOfUser.json()

        SetImageOfUser(data?.data?.pictures)
      } catch (error) {
        console.log("Error fetching images:", error)
        toast.error("Failed to fetch images")
      }
    }
    fetchData()
  }, [bookingNumber])

  // Filter heating and cooling items from heatingAndCooling data
  const getHeatingData = () => {
    if (!reportData.heatingAndCooling?.data) return { data: [], title: "Heating Systems" }

    const heatingItems = reportData.heatingAndCooling.data.filter(
      (item) =>
        item.name.toLowerCase().includes("furnace") ||
        item.name.toLowerCase().includes("boiler") ||
        item.name.toLowerCase().includes("heat"),
    )

    const waterHeaterItems = reportData.waterHeater?.data || []

    return {
      data: [...heatingItems, ...waterHeaterItems],
      title: "Heating & Water Heating Systems",
    }
  }

  const getCoolingData = () => {
    if (!reportData.heatingAndCooling?.data) return { data: [], title: "Cooling Systems" }

    const coolingItems = reportData.heatingAndCooling.data.filter(
      (item) =>
        item.name.toLowerCase().includes("a/c") ||
        item.name.toLowerCase().includes("air condition") ||
        item.name.toLowerCase().includes("cooling") ||
        item.name.toLowerCase().includes("heat pump"),
    )

    return {
      data: coolingItems,
      title: "Cooling Systems",
    }
  }

  // Format tab name for display
  const formatTabName = (tab) => {
    if (tab === "air-leakage") return "Air Leakage Reports"
    if (tab === "summary") return "Report Summary"
    if (tab === "future solutions and certifications") return "Future Solutions"
    return tab.charAt(0).toUpperCase() + tab.slice(1) + (tab !== "overview" ? " Reports" : "")
  }

  // Get current breadcrumb based on active tab
  const getCurrentBreadcrumb = () => {
    return formatTabName(activeSubMenu)
  }

  const renderContent = () => {
    if (reportStatus === "NONE") {
      return (
        <div className="text-center text-gray-600 py-10">
          <h2 className="text-xl font-semibold">Your Report Has Not Been Generated</h2>
          <p>Please check back later or contact support for assistance.</p>
        </div>
      )
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
      )
    }

    if (reportStatus === "AUTOMATED") {
      // Render the existing structure for automated reports
      switch (activeSubMenu) {
        case "overview":
          return <Overview />
        case "air-leakage":
          return <AirLeakageContent data={reportData.airLeakage} />
        case "insulation":
          return <InsulationContent data={reportData.insulation} driveImages={imgOfUser} />
        case "heating":
          return <HeatingContent data={getHeatingData()} driveImages={imgOfUser} />
        case "cooling":
          return <CoolingContent data={getCoolingData()} driveImages={imgOfUser} />
        case "summary":
          return <ReportSummary data={reportData} />
        default:
          return <Overview />
      }
    }

    return null
  }

  const handleDownloadReport = () => {
    if (reportUrl) {
      window.open(reportUrl, "_blank")
    } else {
      toast.error("Report download link is not available")
    }
  }

  const handleShareReport = () => {
    // Implement share functionality
    toast.info("Share functionality will be implemented soon")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f9f0]">
        <main className="container mx-auto px-6 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5cb85c]"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4" ref={scrollRef}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">View Report</h1>
          <div className="flex gap-2">
            <button
              className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded flex items-center gap-2 transition-colors"
              onClick={handleDownloadReport}
            >
              <Download className="h-5 w-5" />
              <span>Download Report</span>
            </button>
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

      <div>
        <div className="flex overflow-x-auto border-b border-gray-100">
          {["overview", "air-leakage", "insulation", "heating", "cooling", "summary"].map((tab) => (
            <button
              key={tab}
              className={`relative py-4 px-6 text-center font-medium transition-colors duration-200 whitespace-nowrap ${
                activeSubMenu === tab
                  ? `text-${tab === "air-leakage" ? "blue" : tab === "insulation" ? "teal" : tab === "heating" || tab === "cooling" ? "amber" : tab === "summary" ? "orange" : "lime"}-600`
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveSubMenu(tab)}
            >
              {formatTabName(tab)}
              {activeSubMenu === tab && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${tabColors[tab]}`}></div>
              )}
            </button>
          ))}
        </div>

        <div className="py-6">{renderContent()}</div>
      </div>
    </div>
  )
}

export default ReportPage
