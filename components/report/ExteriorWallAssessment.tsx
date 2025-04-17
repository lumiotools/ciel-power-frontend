"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Check, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageCustomer from "./ImageCustomer"
import { ImageUpload } from "./ImageUpload"

interface EditableFieldProps {
  value: string
  onSave: (value: string) => void
  type: "text" | "select" | "number"
  options?: string[]
  min?: number
  max?: number
}

interface WallData {
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
}

interface ExteriorWallAssessmentProps {
  data?: InsulationItemData | null
  isAdmin?: boolean
  onUpdate?: (updatedItem: InsulationItemData) => void
  driveImages?: string[]
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

interface FieldItem {
  label: string
  value: string
  field: keyof WallData
  type: "text" | "select" | "number"
  options?: string[]
}

export function ExteriorWallAssessment({ data, isAdmin = false, onUpdate, driveImages }: ExteriorWallAssessmentProps) {
  const defaultWallData: WallData = {
    material: "None",
    condition: "N/A",
    rValue: 0,
    recommendedValue: 13,
    maxValue: 20,
    efficiency: 0,
    image: "/placeholder.svg",
  }

  const processWallData = (): WallData => {
    if (!data) return defaultWallData

    return {
      material: data.material || "None",
      condition: data.condition || "N/A",
      rValue: data.rValue || 0,
      recommendedValue: 13,
      maxValue: 20,
      efficiency: data.rValue ? Math.round((data.rValue / 13) * 100) : 0,
      image: "/placeholder.svg",
    }
  }

  const [wallData, setWallData] = useState<WallData>(processWallData())

  useEffect(() => {
    setWallData(processWallData())
  }, [data])

  const updateWallData = (field: keyof WallData, value: string | number | string[]) => {
    setWallData((prev) => {
      const newData = { ...prev, [field]: value }

      let updatedField: Partial<InsulationItemData> = {}

      if (field === "rValue") {
        const numericValue = typeof value === "number" ? value : Number.parseInt(value.toString().replace("R", ""))

        if (!isNaN(numericValue)) {
          newData.rValue = numericValue
          newData.efficiency = Math.round((numericValue / newData.recommendedValue) * 100)
          updatedField = { rValue: numericValue }
        }
      } else if (field === "material" || field === "condition" || field === "image") {
        updatedField = { [field]: value as string }
      }

      if (onUpdate && Object.keys(updatedField).length > 0) {
        const updatedItem: InsulationItemData = {
          ...(data ?? { name: "Your Home's Exterior Wall Insulation" }),
          ...updatedField,
        }
        onUpdate(updatedItem)
      }

      return newData
    })
  }

  const updateImage = (newImage: string) => {
    updateWallData("image", newImage)
  }

  return (
    <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <CardHeader className="bg-[#E0F7F5] py-4 px-5 border-b border-gray-100">
        <CardTitle className="text-lg font-medium text-[#256C68]">
          Your Home&apos;s Exterior Wall Insulation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Top Section with two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left Column - Details */}
            <div className="p-5">
              <div className="space-y-5 mt-3">
                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Material</p>
                    <p className="text-[#256C68] font-medium">
                      {isAdmin ? (
                        <EditableField
                          value={wallData.material}
                          onSave={(value) => updateWallData("material", value)}
                          type="text"
                        />
                      ) : (
                        wallData.material
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Condition</p>
                    <p className="text-[#256C68] font-medium">
                      {isAdmin ? (
                        <EditableField
                          value={wallData.condition}
                          onSave={(value) => updateWallData("condition", value)}
                          type="select"
                          options={["N/A", "Poor", "Fair", "Good", "Excellent"]}
                        />
                      ) : (
                        wallData.condition
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Current R-Value</p>
                    <p className="text-[#256C68] font-medium">
                      {isAdmin ? (
                        <EditableField
                          value={`R${wallData.rValue}`}
                          onSave={(value) => {
                            const numericValue = Number.parseInt(value.replace("R", ""))
                            if (!isNaN(numericValue)) {
                              updateWallData("rValue", numericValue)
                            }
                          }}
                          type="text"
                        />
                      ) : (
                        `R${wallData.rValue}`
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Recommended</p>
                    <p className="text-[#256C68] font-medium">{`R${wallData.recommendedValue}`}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <p className="text-gray-700">Efficiency Impact</p>
                    <p className="text-[#256C68] font-medium">
                      {Math.round((wallData.rValue / wallData.recommendedValue) * 100)}%
                    </p>
                  </div>
                  <Progress
                    value={(wallData.rValue / wallData.maxValue) * 100}
                    className="h-1.5 bg-[#44BFB83D]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="p-5">
              <div className="h-[200px] w-full">
                <div className="relative rounded-md overflow-hidden h-full">
                  {isAdmin ? (
                    <ImageUpload
                      driveImages={driveImages}
                      image={wallData.image || "/placeholder.svg"}
                      onImageChange={(newImage) => updateImage(newImage)}
                    />
                  ) : (
                    <div className="relative rounded-md overflow-hidden h-full w-full">
                      <ImageCustomer 
                        image={wallData.image || "/placeholder.svg"} 
                        driveImages={driveImages} 
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
                        Thermal Image
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section with two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left Column - Analysis */}
            <div className="p-5">
              <h3 className="font-medium text-gray-900 mb-2">Analysis</h3>
              <p className="text-gray-700 text-sm">
                {wallData.rValue < 10 ? (
                  <>
                    Thermal imaging reveals significant heat loss through the exterior walls, indicating insufficient
                    insulation. The current R-value of R{wallData.rValue} is well below the recommended R
                    {wallData.recommendedValue} standard.
                  </>
                ) : wallData.rValue < wallData.recommendedValue ? (
                  <>
                    The walls have some insulation with an R-value of R{wallData.rValue}, but it falls short of the
                    recommended R{wallData.recommendedValue} standard. Upgrading would improve energy efficiency.
                  </>
                ) : (
                  <>
                    Your exterior walls are well insulated with an R-value of R{wallData.rValue}, meeting or exceeding
                    the recommended R{wallData.recommendedValue} standard. This contributes to a well-insulated and
                    energy-efficient home.
                  </>
                )}
              </p>
            </div>

            {/* Right Column - BPI Recommendation */}
            <div className="p-5">
              <div className="bg-[#F7FDFC] rounded-md p-4 h-full">
                <h3 className="font-medium mb-2 text-[#256C68]">BPI Recommendation</h3>
                <p className="text-gray-700 text-sm">
                  BPI recommends Exterior Walls be insulated to R{wallData.recommendedValue} for optimal energy efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
