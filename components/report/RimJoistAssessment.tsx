"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Check, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "./ImageUpload"
import { ImageCustomer } from "@/components/report/ImageCustomer"

interface EditableFieldProps {
  value: string
  onSave: (value: string) => void
  type: "text" | "select" | "number"
  options?: string[]
  min?: number
  max?: number
}

interface RimJoistData {
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
  image: string
}

interface RimJoistAssessmentProps {
  data?: InsulationItemData | null
  isAdmin?: boolean
  onUpdate?: (updatedItem: InsulationItemData) => void
  driveImages?: string[]
}

interface FieldItem {
  label: string
  value: string
  field: keyof RimJoistData
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

export function RimJoistAssessment({ data, isAdmin = false, onUpdate, driveImages }: RimJoistAssessmentProps) {
  // Default data to use if no report data is provided
  const defaultRimJoistData: RimJoistData = {
    material: "None",
    condition: "N/A",
    rValue: 0,
    recommendedValue: 13,
    maxValue: 20,
    efficiency: 0,
    image: "https://i.postimg.cc/jSVNngms/Screenshot-2024-11-25-033709.png",
  }

  // Process the provided data into the format expected by our component
  const processRimJoistData = (): RimJoistData => {
    if (!data) return defaultRimJoistData

    return {
      material: data.material || "None",
      condition: data.condition || "N/A",
      rValue: data.rValue || 0,
      recommendedValue: 13, // Standard recommendation for rim joist
      maxValue: 20, // Standard max value for scale
      efficiency: data.rValue ? Math.round((data.rValue / 13) * 100) : 0,
      image: data.image,
    }
  }

  const [rimJoistData, setRimJoistData] = useState<RimJoistData>(processRimJoistData())

  useEffect(() => {
    // Update rim joist data if report data changes
    setRimJoistData(processRimJoistData())
  }, [data])

  const updateRimJoistData = (field: keyof RimJoistData, value: string | number) => {
    setRimJoistData((prev) => {
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
        updatedField.image = value as string
      }

      // Fire update only when something changed
      if (onUpdate && Object.keys(updatedField).length > 0) {
        const updatedItem: InsulationItemData = {
          ...(data ?? {
            name: "Your Home's Rim Joist Insulation",
            rValue: 0,
            material: "None",
            condition: "N/A",
            image: "",
          }),
          ...updatedField,
        }
        onUpdate(updatedItem)
      }

      return newData
    })
  }

  // Get the appropriate description based on the R-value
  const getConditionDescription = () => {
    if (rimJoistData.rValue < 3) {
      return "Uninsulated rim joist area"
    } else if (rimJoistData.rValue < rimJoistData.recommendedValue) {
      return "Partially insulated rim joist area"
    } else {
      return "Well-insulated rim joist area"
    }
  }

  return (
    <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <CardHeader className="bg-[#E0F7F5] py-4 px-5 border-b border-gray-100">
        <CardTitle className="text-lg font-medium text-[#256C68]">
          Your Home&apos;s Rim Joist Insulation
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
                      value={rimJoistData.material}
                      onSave={(value) => updateRimJoistData("material", value)}
                      type="text"
                    />
                  ) : (
                    rimJoistData.material
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Condition</p>
                <p className="text-[#256C68] font-medium">
                  {isAdmin ? (
                    <EditableField
                      value={rimJoistData.condition}
                      onSave={(value) => updateRimJoistData("condition", value)}
                      type="select"
                      options={["N/A", "Poor", "Fair", "Good", "Excellent"]}
                    />
                  ) : (
                    rimJoistData.condition
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Current R-Value</p>
                <p className="text-[#256C68] font-medium">
                  {isAdmin ? (
                    <EditableField
                      value={`R${rimJoistData.rValue}`}
                      onSave={(value) => {
                        const numericValue = Number.parseInt(value.replace("R", ""))
                        if (!isNaN(numericValue)) {
                          updateRimJoistData("rValue", numericValue)
                        }
                      }}
                      type="text"
                    />
                  ) : (
                    `R${rimJoistData.rValue}`
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Recommended</p>
                <p className="text-[#256C68] font-medium">{`R${rimJoistData.recommendedValue}`}</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Efficiency Impact</span>
                <span className="text-[#256C68] font-medium">
                  {Math.round((rimJoistData.rValue / rimJoistData.recommendedValue) * 100)}%
                </span>
              </div>
              <Progress
                value={(rimJoistData.rValue / rimJoistData.maxValue) * 100}
                className="h-1.5 bg-[#44BFB83D]"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="p-5">
            <div className="relative rounded-md overflow-hidden h-[200px] w-full">
              {isAdmin ? (
                <ImageUpload
                  image={rimJoistData.image || "/placeholder.svg"}
                  onImageChange={(newImage) => updateRimJoistData("image", newImage)}
                  driveImages={driveImages}
                />
              ) : (
                <div className="relative rounded-md overflow-hidden h-full w-full">
                  <ImageCustomer image={rimJoistData.image} driveImages={driveImages} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold mb-1">Current Condition</h3>
                    <p className="text-sm">{getConditionDescription()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Technical Details */}
          <div className="p-5">
            <h3 className="font-medium text-gray-900 mb-2">Technical Details</h3>
            <div className="text-gray-700 text-sm">
              <p className="mb-2">
                The rim joist is a critical area for insulation as it&apos;s often a significant source of heat loss
                and air infiltration.{" "}
                {rimJoistData.rValue < rimJoistData.recommendedValue
                  ? "Improving insulation here can:"
                  : "Your well-insulated rim joist provides these benefits:"}
              </p>
              <ul className="space-y-1">
                <li>
                  • {rimJoistData.rValue < rimJoistData.recommendedValue ? "Prevent" : "Prevents"} cold air
                  infiltration
                </li>
                <li>• {rimJoistData.rValue < rimJoistData.recommendedValue ? "Reduce" : "Reduces"} energy costs</li>
                <li>
                  • {rimJoistData.rValue < rimJoistData.recommendedValue ? "Improve" : "Improves"} comfort in rooms
                  above
                </li>
                <li>
                  • {rimJoistData.rValue < rimJoistData.recommendedValue ? "Protect" : "Protects"} against moisture
                  issues
                </li>
              </ul>
            </div>
          </div>

          {/* BPI Recommendation */}
          <div className="p-5">
            <div className="bg-[#F7FDFC] rounded-md p-4 h-full">
              <h3 className="font-medium mb-2 text-[#256C68]">BPI Recommendation</h3>
              <p className="text-gray-700 text-sm">
                BPI recommends Rim Joists be insulated to R{rimJoistData.recommendedValue} for optimal energy
                efficiency and to prevent air infiltration.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
