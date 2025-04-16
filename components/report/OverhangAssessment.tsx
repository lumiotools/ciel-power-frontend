"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { ThermometerIcon, Edit2, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "./ImageUpload"
import ImageCustomer from "./ImageCustomer"
import RValueGauge from "@/components/report/RValueGauge"

interface EditableFieldProps {
  value: string
  onSave: (value: string) => void
  type: "text" | "select" | "number"
  options?: string[]
  min?: number
  max?: number
}

interface OverhangData {
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

interface OverhangAssessmentProps {
  data?: InsulationItemData | null
  isAdmin?: boolean
  onUpdate?: (updatedItem: InsulationItemData) => void
  driveImages?: string[]
}

interface FieldItem {
  label: string
  value: string
  field: keyof OverhangData
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

export function OverhangAssessment({ data, isAdmin = false, onUpdate, driveImages }: OverhangAssessmentProps) {
  const [animateChart, setAnimateChart] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  // Default data to use if no report data is provided
  const defaultOverhangData: OverhangData = {
    material: "None",
    condition: "N/A",
    rValue: 0,
    recommendedValue: 30,
    maxValue: 40,
    efficiency: 100,
    image: "https://i.postimg.cc/sgBfY3FS/Screenshot-2024-11-25-033139.png",
  }

  // Process the provided data into the format expected by our component
  const processOverhangData = (): OverhangData => {
    if (!data) return defaultOverhangData

    // Create overhang data from report data
    return {
      material: data.material || "None",
      condition: data.condition || "N/A",
      rValue: data.rValue || 0,
      recommendedValue: 30, // Standard recommendation for overhang insulation
      maxValue: 40, // Standard max value for gauge
      efficiency: data.rValue ? Math.round((data.rValue / 30) * 100) : 0,
      image: data.image,
    }
  }

  const [overhangData, setOverhangData] = useState<OverhangData>(processOverhangData())

  useEffect(() => {
    // Update overhang data if report data changes
    setOverhangData(processOverhangData())
  }, [data])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateChart(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 },
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current)
      }
    }
  }, [])

  const updateOverhangData = (field: keyof OverhangData, value: string | number) => {
    setOverhangData((prev) => {
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
          const calculatedR = Math.round((numericValue * newData.recommendedValue) / 100)
          newData.rValue = calculatedR
          updatedField.rValue = calculatedR
        }
      } else if (field === "material" || field === "condition") {
        updatedField[field] = value as string
      } else if (field === "image") {
        updatedField.image = value as string
      }

      // Fire update if there's something to save
      if (onUpdate && Object.keys(updatedField).length > 0) {
        const updatedItem: InsulationItemData = {
          ...(data ?? {
            name: "Your Home's Overhang Insulation",
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

  // Get appropriate feedback message based on R-value
  const getEfficiencyFeedback = () => {
    const percentage = Math.round((overhangData.rValue / overhangData.recommendedValue) * 100)

    if (percentage >= 100) {
      return "Your overhang insulation is meeting the recommended standards, providing optimal thermal protection for your home."
    } else if (percentage >= 70) {
      return "Your overhang insulation is performing well but falls slightly below the recommended level. Consider upgrading for optimal thermal protection."
    } else if (percentage >= 40) {
      return "Your overhang insulation is below recommended standards. Upgrading would significantly improve your home's energy efficiency."
    } else {
      return "Your overhang insulation is substantially below recommended standards. Upgrading should be a priority for energy efficiency."
    }
  }

  return (
    <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <CardHeader className="bg-[#E0F7F5] py-4 px-5 border-b border-gray-100">
        <CardTitle className="text-lg font-medium text-[#256C68]">
          Your Home&apos;s Overhang Insulation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Column */}
          <div className="p-5">
            <div className="relative rounded-lg overflow-hidden mb-5">
              {isAdmin ? (
                <ImageUpload
                  image={overhangData.image || "/placeholder.svg"}
                  onImageChange={(newImage) => updateOverhangData("image", newImage)}
                  driveImages={driveImages}
                />
              ) : (
                <ImageCustomer image={overhangData.image || "/placeholder.svg"} driveImages={driveImages} />
              )}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-sm text-gray-500 mb-1">Material</p>
                <p className="text-[#256C68] font-medium">
                  {isAdmin ? (
                    <EditableField
                      value={overhangData.material}
                      onSave={(value) => updateOverhangData("material", value)}
                      type="text"
                    />
                  ) : (
                    overhangData.material
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Condition</p>
                <p className="text-[#256C68] font-medium">
                  {isAdmin ? (
                    <EditableField
                      value={overhangData.condition}
                      onSave={(value) => updateOverhangData("condition", value)}
                      type="select"
                      options={["N/A", "Poor", "Fair", "Good", "Excellent"]}
                    />
                  ) : (
                    overhangData.condition
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Current R-Value</p>
                <p className="text-[#256C68] font-medium text-xl">
                  {isAdmin ? (
                    <EditableField
                      value={`R${overhangData.rValue}`}
                      onSave={(value) => {
                        const numericValue = Number.parseInt(value.replace("R", ""))
                        if (!isNaN(numericValue)) {
                          updateOverhangData("rValue", numericValue)
                        }
                      }}
                      type="text"
                    />
                  ) : (
                    `R${overhangData.rValue}`
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Recommended</p>
                <p className="text-[#256C68] font-medium text-xl">{`R${overhangData.recommendedValue}`}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="p-5 space-y-5">
            {/* Current Performance Box */}
            <div className="bg-[#F7FDFC] p-4 rounded-lg">
              <h3 className="text-lg font-medium text-[#256C68] mb-5">Current Performance</h3>

              {/* Gauge Visualization */}
              <div ref={chartRef} className="relative">
                <div className="max-w-[250px] mx-auto mb-6">
                  <RValueGauge
                    value={overhangData.rValue}
                    maxValue={overhangData.maxValue}
                    title=""
                    showCard={false}
                    width="100%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current R-Value</p>
                  <p className="text-xl font-bold text-[#4CAF50]">R{overhangData.rValue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">BPI Recommends</p>
                  <p className="text-xl font-bold text-[#4CAF50]">R{overhangData.recommendedValue}</p>
                </div>
              </div>
            </div>

            {/* Efficiency Rating Box */}
            <div className="bg-[#F7FDFC] p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <ThermometerIcon className="h-5 w-5 text-[#00BFA5] mr-2" />
                <h3 className="font-medium text-[#44BFB8]">Efficiency Rating</h3>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Efficiency Impact</span>
                <span className="text-[#256C68] font-medium">
                  {Math.round((overhangData.rValue / overhangData.recommendedValue) * 100)}%
                </span>
              </div>
              <Progress
                value={(overhangData.rValue / overhangData.maxValue) * 100}
                className="h-1.5 bg-[#44BFB83D]"
              />
              
              <div className="mt-4">
                <p className="text-sm text-gray-700">
                  {getEfficiencyFeedback()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
