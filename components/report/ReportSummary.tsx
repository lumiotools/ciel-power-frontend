"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  AlertTriangle,
  Fan,
  Leaf,
  Home,
  ArrowUp,
  Thermometer,
  Shield,
  Activity,
  Pencil,
  Check,
  X,
  Trash2,
  PlusCircle,
  Calculator,
} from "lucide-react"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { FutureSolutions } from "@/components/report/FutureUpgrades"
import { ProjectCosts } from "@/components/report/ProjectCosts"
import { FederalTaxCredits } from "@/components/report/TaxCredits"
import { EnvironmentalImpact } from "@/components/report/EnvironmentalImpact"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define interfaces for data types
interface ConcernItem {
  name: string
  concern: string
  flag: boolean
  [key: string]: any
}

// Updated Recommendation interface with only title and benefits
interface Recommendation {
  title: string
  benefits: string
  progress?: number
  [key: string]: any
}

// Replace the existing FinancialData interface with this:
interface FinancialItem {
  title: string
  amount: string
}

// New Financial Data interface that matches ProjectCosts
interface FinancialData {
  title: string
  data: FinancialItem[]
  monthlyPayment: string
  financingPeriodYears: number
}

interface ReportSummaryProps {
  data?: {
    summaryOfConcerns?: {
      data: Array<{
        name: string
        data: ConcernItem[]
      }>
    }
    // Updated solutionsAndRecommendations structure
    solutionsAndRecommendations?: {
      title: string
      recommendations: Recommendation[]
    }
    financialSummary?: FinancialData
    federalTaxCredits?: {
      title: string
      data: Array<{
        title: string
        amount: string
        note?: string
      }>
    }
    environmentalImpact?: {
      title: string
      currentFootprint: { value: string; unit: string }
      projectedSavings: { value: string; unit: string }
      projectedFootprint: { value: string; unit: string }
      totalReduction: { value: string; unit: string }
    }
    [key: string]: any
  }
  isAdmin?: boolean
  onUpdateConcerns?: (concerns: any) => void
  onUpdateRecommendations?: (recommendations: any) => void
  onUpdateFinancials?: (financials: any) => void
  onUpdateTaxCredits?: (taxCredits: any) => void
  onUpdateEnvironmentalImpact?: (environmentalData: any) => void
  onSave?: () => void
}

interface InPlaceEditProps {
  initialValue?: string
  isAdmin: boolean
  onUpdate: (value: string) => void
  multiline?: boolean
  placeholder?: string
}

interface InPlaceEditNumberProps {
  initialValue: number
  isAdmin: boolean
  onUpdate: (value: number) => void
  min?: number
  max?: number
}

// In-place editing component for text
const InPlaceEdit: React.FC<InPlaceEditProps> = ({
  initialValue,
  isAdmin,
  onUpdate,
  multiline = false,
  placeholder = "Enter text",
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue || "")
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    setValue(initialValue || "")
  }, [initialValue])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleClick = () => {
    if (isAdmin) {
      setIsEditing(true)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    if (value !== initialValue) {
      onUpdate(value)
    }
  }

  const handleCancel = () => {
    setValue(initialValue || "")
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!multiline && e.key === "Enter") {
      handleSave()
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
        )}
        <button onClick={handleSave} className="p-1 hover:bg-green-100 rounded text-green-600 transition-colors">
          <Check className="w-4 h-4" />
        </button>
        <button onClick={handleCancel} className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div
      className={`${isAdmin ? "cursor-pointer hover:bg-gray-50 rounded p-1 group" : ""} ${!value ? "text-gray-400 italic" : ""}`}
      onClick={handleClick}
    >
      {value || (!isAdmin ? "No content" : placeholder)}
      {isAdmin && (
        <Pencil className="ml-2 h-4 w-4 inline-block text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  )
}

const InPlaceEditNumber: React.FC<InPlaceEditNumberProps> = ({
  initialValue,
  isAdmin,
  onUpdate,
  min = 0,
  max = 100,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleClick = () => {
    if (isAdmin) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (value !== initialValue) {
      onUpdate(value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false)
      if (value !== initialValue) {
        onUpdate(value)
      }
    }
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => setValue(Number(e.target.value))}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-20 p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-green-500"
      />
    )
  }

  return (
    <div
      className={`font-medium ${isAdmin ? "cursor-pointer hover:bg-gray-50 rounded p-1 group" : ""}`}
      onClick={handleClick}
    >
      {value}%
      {isAdmin && (
        <Pencil className="ml-2 h-4 w-4 inline-block text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  )
}

// Progress bar component
interface ProgressBarProps {
  value: number
  color?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = "green" }) => {
  const colorClasses = {
    green: "bg-green-500",
    orange: "bg-orange-500",
  }

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`${colorClasses[color as keyof typeof colorClasses]} h-2 rounded-full`}
      ></motion.div>
    </div>
  )
}

export function ReportSummary({
  data,
  isAdmin = false,
  onUpdateConcerns,
  onUpdateRecommendations,
  onUpdateFinancials,
  onUpdateTaxCredits,
  onUpdateEnvironmentalImpact,
  onSave,
}: ReportSummaryProps) {
  // States
  const [concerns, setConcerns] = useState<ConcernItem[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [animate, setAnimate] = useState(false)
  const elemRef = useRef(null)

  // Set up intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    if (elemRef.current) observer.observe(elemRef.current)
    return () => elemRef.current && observer.unobserve(elemRef.current)
  }, [])

  // Process concerns data
  useEffect(() => {
    if (!data?.summaryOfConcerns?.data) return

    try {
      const healthSafety =
        data.summaryOfConcerns.data.find((section) => section.name === "Basic Health and Safety")?.data || []

      const combustion =
        data.summaryOfConcerns.data.find((section) => section.name === "Combustion Testing")?.data || []

      // Filter for flagged items with concerns
      const flaggedHealthSafety = healthSafety.filter((item) => item && item.flag && item.concern)

      const flaggedCombustion = combustion.filter(
        (item) => item && item.flag && item.concern && item.concern !== "Testing required",
      )

      setConcerns([...flaggedHealthSafety, ...flaggedCombustion])
    } catch (error) {
      console.error("Error processing concerns data:", error)
      setConcerns([])
    }
  }, [data?.summaryOfConcerns])

  // Process recommendations data - Updated for new format
  useEffect(() => {
    if (!data?.solutionsAndRecommendations?.recommendations) return

    try {
      // Use the new data structure with title and benefits only
      const recs = data.solutionsAndRecommendations.recommendations.map((rec) => ({
        ...rec,
        progress: rec.progress || Math.floor(Math.random() * 100), // Add random progress if not provided
      }))

      setRecommendations(recs)
    } catch (error) {
      console.error("Error processing recommendations data:", error)
      setRecommendations([])
    }
  }, [data?.solutionsAndRecommendations])

  // Concern functions
  const getIconForConcern = (name?: string) => {
    if (!name) return AlertTriangle

    const nameLower = name.toLowerCase()
    if (nameLower.includes("vent") || nameLower.includes("fan") || nameLower.includes("dryer")) {
      return Fan
    } else if (nameLower.includes("combustion") || nameLower.includes("gas")) {
      return Activity
    } else if (nameLower.includes("water") || nameLower.includes("heating")) {
      return Thermometer
    } else {
      return AlertTriangle
    }
  }

  const updateConcern = (index: number, field: keyof ConcernItem, value: string | boolean) => {
    setConcerns((prev) => {
      const newConcerns = [...prev]
      if (newConcerns[index]) {
        newConcerns[index] = {
          ...newConcerns[index],
          [field]: value,
        }
      }

      // If onUpdateConcerns callback is provided, call it with the updated data
      if (onUpdateConcerns) {
        // Separate concerns into health safety and combustion
        const healthSafety = newConcerns.filter(
          (item) => !item.name.toLowerCase().includes("combustion") && !item.name.toLowerCase().includes("gas"),
        )

        const combustion = newConcerns.filter(
          (item) => item.name.toLowerCase().includes("combustion") || item.name.toLowerCase().includes("gas"),
        )

        onUpdateConcerns({
          healthSafety,
          combustion,
        })
      }

      return newConcerns
    })
  }

  const addConcern = () => {
    // Create the new concern object
    const newConcern = {
      name: "New Concern",
      concern: "Description of the new concern",
      flag: true,
    }

    // Update our local state first
    setConcerns((prevConcerns) => [newConcern, ...prevConcerns])

    // If onUpdateConcerns callback is provided, prepare the data for the parent
    if (onUpdateConcerns) {
      // Determine if this is a combustion-related concern
      const isCombustionConcern =
        newConcern.name.toLowerCase().includes("combustion") || newConcern.name.toLowerCase().includes("gas")

      // Prepare the data structure for the parent component
      const healthSafety = isCombustionConcern
        ? [
          ...concerns.filter(
            (item) => !item.name.toLowerCase().includes("combustion") && !item.name.toLowerCase().includes("gas"),
          ),
        ]
        : [
          newConcern,
          ...concerns.filter(
            (item) => !item.name.toLowerCase().includes("combustion") && !item.name.toLowerCase().includes("gas"),
          ),
        ]

      const combustion = isCombustionConcern
        ? [
          newConcern,
          ...concerns.filter(
            (item) => item.name.toLowerCase().includes("combustion") || item.name.toLowerCase().includes("gas"),
          ),
        ]
        : [
          ...concerns.filter(
            (item) => item.name.toLowerCase().includes("combustion") || item.name.toLowerCase().includes("gas"),
          ),
        ]

      // Call the parent update function
      onUpdateConcerns({
        healthSafety,
        combustion,
      })
    }
  }

  const deleteConcern = (index: number) => {
    setConcerns((prev) => {
      const newConcerns = prev.filter((_, i) => i !== index)

      // If onUpdateConcerns callback is provided, call it with the updated data
      if (onUpdateConcerns) {
        // Separate concerns into health safety and combustion
        const healthSafety = newConcerns.filter(
          (item) => !item.name.toLowerCase().includes("combustion") && !item.name.toLowerCase().includes("gas"),
        )

        const combustion = newConcerns.filter(
          (item) => item.name.toLowerCase().includes("combustion") || item.name.toLowerCase().includes("gas"),
        )

        onUpdateConcerns({
          healthSafety,
          combustion,
        })
      }

      return newConcerns
    })
  }

  // Recommendation functions
  const getIconForRecommendation = (title?: string) => {
    if (!title) return Home

    const titleLower = title.toLowerCase()
    if (titleLower.includes("air") || titleLower.includes("seal")) {
      return Fan
    } else if (titleLower.includes("attic") || titleLower.includes("insulation")) {
      return Home
    } else if (titleLower.includes("hatch")) {
      return ArrowUp
    } else if (titleLower.includes("rim") || titleLower.includes("joist")) {
      return Thermometer
    } else if (titleLower.includes("crawl") || titleLower.includes("space")) {
      return Home
    } else {
      return Leaf
    }
  }

  // Updated to only handle title and benefits
  const updateRecommendation = (index: number, field: keyof Recommendation, value: string | number) => {
    setRecommendations((prev) => {
      const newRecommendations = [...prev]
      if (newRecommendations[index]) {
        newRecommendations[index] = {
          ...newRecommendations[index],
          [field]: value,
        }
      }

      // If onUpdateRecommendations callback is provided, call it with the updated data
      if (onUpdateRecommendations) {
        onUpdateRecommendations(newRecommendations)
      }

      return newRecommendations
    })
  }

  // Updated to add a new recommendation with only title and benefits
  const addRecommendation = () => {
    setRecommendations((prev) => {
      const newRecommendations = [
        {
          title: "New Recommendation",
          benefits: "Benefits of this recommendation",
          progress: 0,
        },
        ...prev,
      ]

      // If onUpdateRecommendations callback is provided, call it with the updated data
      if (onUpdateRecommendations) {
        onUpdateRecommendations(newRecommendations)
      }

      return newRecommendations
    })
  }

  const deleteRecommendation = (index: number) => {
    setRecommendations((prev) => {
      const newRecommendations = prev.filter((_, i) => i !== index)

      // If onUpdateRecommendations callback is provided, call it with the updated data
      if (onUpdateRecommendations) {
        onUpdateRecommendations(newRecommendations)
      }

      return newRecommendations
    })
  }

  const updateFinancials = (financials: FinancialData): void => {
    // Update the financials in reportData
    if (onUpdateFinancials) {
      onUpdateFinancials(financials)
    }
  }

  const updateTaxCredits = (taxCreditsData: any) => {
    // If onUpdateTaxCredits callback is provided, call it with the updated data
    if (onUpdateTaxCredits) {
      onUpdateTaxCredits(taxCreditsData)
    }
  }

  const updateEnvironmentalImpact = (environmentalData: any) => {
    // If onUpdateEnvironmentalImpact callback is provided, call it with the updated data
    if (onUpdateEnvironmentalImpact) {
      onUpdateEnvironmentalImpact(environmentalData)
    }
  }

  const pathname = usePathname()
  const match = pathname.match(/\/admin\/(\d+)\/report/)
  const bookingNumber = match?.[1]

  // Use the parent's onSave callback directly instead of handling API calls
  const handleSubmit = () => {
    if (onSave) {
      onSave()
      toast.success("Report summary data saved successfully!")
    }
  }

  return (
    <div className="space-y-8">
      {isAdmin && (
        <div className="top-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
          >
            Save
          </button>
        </div>
      )}

      {/* Summary of Concerns Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} id="summary-of-concerns">
        <Card className="rounded-xl border shadow-sm overflow-hidden">
          <CardHeader className="py-4 px-6" style={{ backgroundColor: "#FF67001A" }}>
            <CardTitle className="text-xl flex items-center gap-2" style={{ fontFamily: "Poppins", fontWeight: 500, fontSize: 16, color: "#FF6700" }}>
              <AlertTriangle className="h-5 w-5" style={{ color: "#FF6700" }} />
              Summary of Concerns
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 bg-white">
            <div className="grid gap-4">
              {concerns.length > 0 ? (
                <div>
                  {/* Add New Concern button when there are already concerns */}
                  {isAdmin && (
                    <div className="flex justify-end pb-4">
                      <button
                        onClick={addConcern}
                        className="px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1"
                        style={{ backgroundColor: "#FF67001A", color: "#FF6700" }}
                        type="button"
                      >
                        <PlusCircle className="h-4 w-4" />
                        Add New Concern
                      </button>
                    </div>
                  )}

                  {concerns.map((concern, index) => {
                    const ConcernIcon = getIconForConcern(concern.name)
                    return (
                      <motion.div
                        key={`concern-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="p-4 rounded-lg mb-4"
                        style={{ backgroundColor: "#FF67000A" }}
                      >
                        <div className="flex items-center mb-2">
                          <ConcernIcon className="h-5 w-5 mr-2 text-orange-500" />
                          <div className="font-medium" style={{ color: "#FF6700" }}>
                            {isAdmin ? (
                              <InPlaceEdit
                                initialValue={concern.name}
                                isAdmin={isAdmin}
                                onUpdate={(value) => updateConcern(index, "name", value)}
                                placeholder="Enter concern title"
                              />
                            ) : (
                              `Health & Safety: ${concern.name}`
                            )}
                          </div>
                          {isAdmin && (
                            <button
                              onClick={() => deleteConcern(index)}
                              className="ml-auto text-red-500 hover:text-red-700 px-2 py-1 text-xs rounded hover:bg-red-50 flex items-center gap-1 transition-colors"
                              type="button"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="text-gray-700 text-sm">
                          {isAdmin ? (
                            <InPlaceEdit
                              initialValue={concern.concern}
                              isAdmin={isAdmin}
                              onUpdate={(value) => updateConcern(index, "concern", value)}
                              multiline={true}
                              placeholder="Enter concern description"
                            />
                          ) : (
                            concern.concern
                          )}
                        </div>

                        {isAdmin && (
                          <div className="mt-3 flex items-center">
                            <label className="flex items-center text-xs text-gray-500 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!concern.flag}
                                onChange={(e) => updateConcern(index, "flag", e.target.checked)}
                                className="mr-2"
                              />
                              Flagged for attention
                            </label>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: "#FF67001A" }}
                >
                  <div className="flex items-start gap-3">
                    <Shield className="text-orange-500" size={20} />
                    <div className="flex-1">
                      <h3 className="font-medium text-orange-500">No Concerns Detected</h3>
                      <p className="text-gray-700 text-sm mt-1">
                        No significant health, safety, or combustion issues were found during the assessment.
                      </p>

                      {isAdmin && (
                        <button
                          onClick={addConcern}
                          className="mt-4 px-4 py-2 rounded text-sm font-medium transition-colors"
                          style={{ backgroundColor: "#FF67001A", color: "#FF6700" }}
                          type="button"
                        >
                          + Add New Concern
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Solutions & Recommended Upgrades Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        id="solutions-and-recommendations"
      >
        <Card className="rounded-xl border shadow-sm overflow-hidden">
          <CardHeader className="py-4 px-6" style={{ backgroundColor: "#67B5021A" }}>
            <CardTitle
              className="flex items-center gap-2"
              style={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: 16,
                color: "#67B502"
              }}
            >
              <Calculator className="h-5 w-5" style={{ color: "#67B502" }} />
              Solutions & Recommended Upgrades
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6" style={{ backgroundColor: "#ffffff" }}>
            <div className="space-y-4">
              {recommendations.length > 0 ? (
                recommendations.map((recommendation, index) => {
                  const RecommendationIcon = getIconForRecommendation(recommendation.title)

                  return (
                    <motion.div
                      key={`recommendation-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
                      className="p-5 rounded-lg"
                      style={{ backgroundColor: "#67B5020A" }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12"
                          style={{ backgroundColor: "#67B5021A" }}
                        >
                          <RecommendationIcon className="h-5 w-5" style={{ color: "#67B502" }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="font-medium mb-1" style={{ color: "#67B502" }}>
                              {isAdmin ? (
                                <InPlaceEdit
                                  initialValue={recommendation.title}
                                  isAdmin={isAdmin}
                                  onUpdate={(value) => updateRecommendation(index, "title", value)}
                                  placeholder="Enter recommendation title"
                                />
                              ) : (
                                recommendation.title
                              )}
                            </div>
                            {isAdmin && (
                              <button
                                onClick={() => deleteRecommendation(index)}
                                className="text-red-500 hover:text-red-700 px-2 py-1 text-xs rounded hover:bg-red-50 flex items-center gap-1 transition-colors"
                                type="button"
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                            )}
                          </div>
                          <div className="text-gray-700 text-sm my-2">
                            {isAdmin ? (
                              <InPlaceEdit
                                initialValue={recommendation.benefits}
                                isAdmin={isAdmin}
                                onUpdate={(value) => updateRecommendation(index, "benefits", value)}
                                multiline={true}
                                placeholder="Enter benefits"
                              />
                            ) : (
                              recommendation.benefits
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: "#67B5020A" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12" style={{ backgroundColor: "#67B5021A" }}>
                      <Leaf className="h-5 w-5" style={{ color: "#67B502" }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium" style={{ color: "#67B502" }}>No Recommendations</h3>
                      <p className="text-gray-700 text-sm mt-1">No recommendations or solutions have been added yet.</p>

                      {isAdmin && (
                        <button
                          onClick={addRecommendation}
                          className="mt-4 px-4 py-2 rounded text-sm font-medium transition-colors"
                          style={{ backgroundColor: "#67B5021A", color: "#67B502" }}
                          type="button"
                        >
                          + Add Recommendation
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Add New Recommendation button */}
              {isAdmin && recommendations.length > 0 && (
                <div className="flex justify-end p-4">
                  <button
                    onClick={addRecommendation}
                    className="px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1"
                    style={{ backgroundColor: "#67B5021A", color: "#67B502" }}
                    type="button"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add New Recommendation
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Future Solutions Section - Without styled wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        id="future-solutions"
      >
        <FutureSolutions />
      </motion.div>

      {/* Environmental Impact Section - Without styled wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        id="environmental-impact"
      >
        <EnvironmentalImpact
          data={data?.environmentalImpact}
          isAdmin={isAdmin}
          bookingNumber={bookingNumber}
          reportData={data}
          onUpdate={updateEnvironmentalImpact}
        />
      </motion.div>

      {/* Project Costs Section - Without styled wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        id="project-costs"
      >
        <ProjectCosts
          data={{
            financialSummary: data?.financialSummary,
          }}
          isAdmin={isAdmin}
          bookingNumber={bookingNumber || ""}
          onUpdateFinancials={updateFinancials}
        />
      </motion.div>

      {/* Federal Tax Credits Section - Without styled wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        id="tax-credits"
      >
        <FederalTaxCredits
          data={data?.federalTaxCredits}
          isAdmin={isAdmin}
          bookingNumber={bookingNumber}
          reportData={data}
          onUpdate={updateTaxCredits}
        />
      </motion.div>
    </div>
  )
}
