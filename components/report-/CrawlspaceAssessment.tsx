"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Check, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "./ImageUpload"

interface EditableFieldProps {
  value: string
  onSave: (value: string) => void
  type: "text" | "select" | "number"
  options?: string[]
  min?: number
  max?: number
}

interface CrawlspaceData {
  material: string
  condition: string
  rValue: number
  recommendedValue: number
  maxValue: number
  efficiency: number
  image: string
}

interface InsulationItemData {
  condition: string
  material: string
  name: string
  rValue: number
  image?: string
}

interface CrawlspaceAssessmentProps {
  data?: InsulationItemData | null
  isAdmin?: boolean
  onUpdate?: (updatedItem: InsulationItemData) => void
  driveImages?: string[]
}

interface FieldItem {
  label: string
  value: string
  field: keyof CrawlspaceData
  type: "text" | "select" | "number"
  options?: string[]
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onSave, type, options = [], min, max }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  const handleSave = () => {
    onSave(editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <span>{value}</span>
        <button onClick={() => setIsEditing(true)} className="p-1 hover:bg-gray-100 rounded">
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {type === "number" ? (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={editValue}
            min={min}
            max={max}
            onChange={(e) => setEditValue(e.target.value)}
            className="border rounded px-2 py-1 w-32"
          />
          <button onClick={handleSave} className="p-1 hover:bg-green-100 rounded text-green-600">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={handleCancel} className="p-1 hover:bg-red-100 rounded text-red-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : type === "select" ? (
        <div className="flex items-center gap-2">
          <Select
            value={editValue}
            onValueChange={(value) => {
              setEditValue(value)
              onSave(value)
              setIsEditing(false)
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue>{editValue}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button onClick={handleCancel} className="p-1 hover:bg-red-100 rounded text-red-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="border rounded px-2 py-1 w-32"
          />
          <button onClick={handleSave} className="p-1 hover:bg-green-100 rounded text-green-600">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={handleCancel} className="p-1 hover:bg-red-100 rounded text-red-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export function CrawlspaceAssessment({ data, isAdmin = false, driveImages, onUpdate }: CrawlspaceAssessmentProps) {
  // Default data to use if no report data is provided
  const defaultCrawlspaceData: CrawlspaceData = {
    material: "None",
    condition: "N/A",
    rValue: 0,
    recommendedValue: 10,
    maxValue: 15,
    efficiency: 0,
    image: "https://i.postimg.cc/SQ7Hv3LP/Screenshot-2024-11-25-033547.png",
  }

  // Process the provided data into the format expected by our component
  const processCrawlspaceData = (): CrawlspaceData => {
    if (!data) return defaultCrawlspaceData

    return {
      material: data.material || "None",
      condition: data.condition || "N/A",
      rValue: data.rValue || 0,
      recommendedValue: 10, // Standard recommendation for crawlspace
      maxValue: 15, // Standard max value for scale
      efficiency: data.rValue ? Math.round((data.rValue / 10) * 100) : 0,
      // Use the image from data if available, otherwise use default
      image: data.image || defaultCrawlspaceData.image,
    }
  }

  const [crawlspaceData, setCrawlspaceData] = useState<CrawlspaceData>(processCrawlspaceData())

  useEffect(() => {
    // Update crawlspace data if report data changes
    setCrawlspaceData(processCrawlspaceData())
  }, [data])

  const updateCrawlspaceData = (field: keyof CrawlspaceData, value: string | number) => {
    console.log(`CrawlspaceAssessment: updateCrawlspaceData called with field=${field}, value=`, value);
    
    setCrawlspaceData((prev) => {
      const newData = { ...prev, [field]: value }

      const updatedField: Partial<InsulationItemData> = {}

      if (field === "rValue") {
        const numericValue = typeof value === "string" ? Number.parseInt(value.replace("R", "")) : value

        if (!isNaN(numericValue)) {
          newData.rValue = numericValue
          newData.efficiency = Math.round((numericValue / newData.recommendedValue) * 100)
          updatedField.rValue = numericValue
        }
      } else if (field === "efficiency") {
        const numericValue = typeof value === "string" ? Number.parseInt(value) : value

        if (!isNaN(numericValue)) {
          newData.efficiency = numericValue
          const calculatedRValue = Math.round((numericValue * newData.recommendedValue) / 100)
          newData.rValue = calculatedRValue
          updatedField.rValue = calculatedRValue
        }
      } else if (field === "material" || field === "condition") {
        updatedField[field] = value as string
      } else if (field === "image") {
        console.log("CrawlspaceAssessment: Updating image to:", value);
        updatedField.image = value as string
      }

      // Call onUpdate only when a change is relevant
      if (onUpdate && Object.keys(updatedField).length > 0) {
        const updatedItem: InsulationItemData = {
          ...(data ?? { name: "Your Home's Crawlspace Wall Insulation" }),
          ...updatedField,
        }
        console.log("CrawlspaceAssessment: Calling onUpdate with:", updatedItem);
        onUpdate(updatedItem)
      }

      return newData
    })
  }

  // Determine description text based on crawlspace data
  const getDescriptionText = () => {
    if (crawlspaceData.rValue < 3) {
      return "Uninsulated crawlspace walls"
    } else if (crawlspaceData.rValue < crawlspaceData.recommendedValue) {
      return "Partially insulated crawlspace walls"
    } else {
      return "Well-insulated crawlspace walls"
    }
  }

  return (
    <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <CardHeader className="bg-[#E0F7F5] py-4 px-5 border-b border-gray-100">
        <CardTitle className="text-lg font-medium text-[#256C68]">
          Your Home&apos;s Crawlspace Wall Insulation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Column */}
          <div className="p-5">
            <div className="grid grid-cols-2 gap-y-4 mt-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">Material</p>
                <p className="text-[#256C68] font-medium">
                  {isAdmin ? (
                    <EditableField
                      value={crawlspaceData.material}
                      onSave={(value) => updateCrawlspaceData("material", value)}
                      type="text"
                    />
                  ) : (
                    crawlspaceData.material
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Condition</p>
                <p className="text-[#256C68] font-medium">
                  {isAdmin ? (
                    <EditableField
                      value={crawlspaceData.condition}
                      onSave={(value) => updateCrawlspaceData("condition", value)}
                      type="select"
                      options={["N/A", "Poor", "Fair", "Good", "Excellent"]}
                    />
                  ) : (
                    crawlspaceData.condition
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Current R-Value</p>
                <p className="text-[#256C68] font-medium">
                  {isAdmin ? (
                    <EditableField
                      value={`R${crawlspaceData.rValue}`}
                      onSave={(value) => {
                        const numericValue = Number.parseInt(value.replace("R", ""))
                        if (!isNaN(numericValue)) {
                          updateCrawlspaceData("rValue", numericValue)
                        }
                      }}
                      type="text"
                    />
                  ) : (
                    `R${crawlspaceData.rValue}`
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Recommended</p>
                <p className="text-[#256C68] font-medium">{`R${crawlspaceData.recommendedValue}`}</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Efficiency Impact</span>
                <span className="text-[#256C68] font-medium">
                  {Math.round((crawlspaceData.rValue / crawlspaceData.recommendedValue) * 100)}%
                </span>
              </div>
              <Progress
                value={(crawlspaceData.rValue / crawlspaceData.maxValue) * 100}
                className="h-1.5 bg-[#44BFB83D]"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="p-5">
            <div className="relative rounded-md overflow-hidden h-[200px] w-full">
              {isAdmin ? (
                <ImageUpload
                  image={crawlspaceData.image || "/placeholder.svg"}
                  driveImages={driveImages}
                  onImageChange={(newImage) => updateCrawlspaceData("image", newImage)}
                />
              ) : (
                <div className="relative rounded-md overflow-hidden h-full w-full">
                  <img
                    src={crawlspaceData.image || "/placeholder.svg"}
                    alt="Crawlspace wall"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold mb-1">Current Condition</h3>
                    <p className="text-sm">{getDescriptionText()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Impact Analysis */}
          <div className="p-5">
            <h3 className="font-medium text-gray-900 mb-2">Impact Analysis</h3>
            {crawlspaceData.rValue < crawlspaceData.recommendedValue ? (
              <>
                <p className="text-gray-700 text-sm mb-2">
                  Uninsulated crawlspace walls can lead to:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Increased energy costs</li>
                  <li>• Cold floors above the crawlspace</li>
                  <li>• Potential moisture issues</li>
                  <li>• Reduced comfort in rooms above</li>
                </ul>
              </>
            ) : (
              <>
                <p className="text-gray-700 text-sm mb-2">
                  Your well-insulated crawlspace provides these benefits:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Lower energy costs</li>
                  <li>• Warmer floors above the crawlspace</li>
                  <li>• Better moisture control</li>
                  <li>• Improved comfort throughout your home</li>
                </ul>
              </>
            )}
          </div>

          {/* BPI Recommendation */}
          <div className="p-5">
            <div className="bg-[#F7FDFC] rounded-md p-4 h-full">
              <h3 className="font-medium mb-2 text-[#256C68]">BPI Recommendation</h3>
              <p className="text-gray-700 text-sm">
                BPI recommends Crawlspace Walls be insulated to R{crawlspaceData.recommendedValue} for optimal energy efficiency and moisture control.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
