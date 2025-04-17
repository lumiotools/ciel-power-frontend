"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThermometerIcon, InfoIcon, Edit2, Check, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "./ImageUpload"
import ImageCustomer from "./ImageCustomer"
import RValueGauge from "@/components/report/RValueGauge"

interface InsulationZoneProps {
  data: {
    condition: string
    material: string
    name: string
    rValue: number
    image: string
  }
  isAdmin?: boolean
  onUpdate?: (updatedItem: {
    condition: string
    material: string
    name: string
    rValue: number
  }) => void
  driveImages?: string[]
}

interface EditableFieldProps {
  value: string
  onSave: (value: string) => void
  type: "text" | "select" | "number"
  options?: string[]
  min?: number
  max?: number
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

export function InsulationZoneAssessment({ data, isAdmin = false, onUpdate, driveImages }: InsulationZoneProps) {
  // Get recommended R-value based on zone name
  function getRecommendedValue(zoneName: string): number {
    const name = zoneName.toLowerCase()

    if (name.includes("attic")) {
      return 49; // High R-value for attics/ceilings
    } else if (name.includes("wall") && !name.includes("knee")) {
      return 13; // Standard for walls
    } else if (name.includes("garage") || name.includes("ceiling")) {
      return 30; // Standard for garage areas
    } else if (name.includes("basement") || name.includes("crawl")) {
      return 10 // Standard for basements
    } else if (name.includes("knee") || name.includes("kw")) {
      return 13; // Standard for kneewalls
    } else {
      return 13 // Default value if no specific match
    }
  }

  // Get zone type description
  function getZoneTypeDescription(zoneName: string): string {
    const name = zoneName.toLowerCase()

    if (name.includes("attic")) {
      return "Attic Insulation"
    } else if (name.includes("wall") && !name.includes("knee")) {
      return "Wall Insulation"
    } else if (name.includes("basement")) {
      return "Basement Insulation"
    } else if (name.includes("crawl")) {
      return "Crawlspace Insulation"
    } else if (name.includes("knee") || name.includes("kw")) {
      return "Kneewall Insulation"
    } else if (name.includes("garage")) {
      return "Garage Insulation"
    } else if (name.includes("ceiling")) {
      return "Ceiling Insulation"
    } else {
      return "Zone Insulation"
    }
  }

  // Get image based on zone type
  function getZoneImage(zoneName: string): string {
    const name = zoneName.toLowerCase()

    if (name.includes("attic")) {
      return "https://i.postimg.cc/vHVnqZhb/Screenshot-2024-11-25-030211.png"
    } else if (name.includes("wall") && !name.includes("knee")) {
      return "https://i.postimg.cc/tJYRBb1L/Screenshot-2024-11-25-033358.png"
    } else if (name.includes("basement") || name.includes("rim") || name.includes("rj")) {
      return "https://i.postimg.cc/jSVNngms/Screenshot-2024-11-25-033709.png"
    } else if (name.includes("crawl")) {
      return "https://i.postimg.cc/SQ7Hv3LP/Screenshot-2024-11-25-033547.png"
    } else if (name.includes("knee") || name.includes("kw")) {
      return "https://i.postimg.cc/dQbxhDSy/Screenshot-2024-11-25-025748.png"
    } else if (name.includes("garage")) {
      return "https://i.postimg.cc/XYcVfdpZ/garage-insulation.jpg"
    } else if (name.includes("ceiling")) {
      return "https://i.postimg.cc/vHVnqZhb/Screenshot-2024-11-25-030211.png"
    } else {
      return "https://i.postimg.cc/sgBfY3FS/Screenshot-2024-11-25-033139.png" // Generic insulation image
    }
  }

  const [animateChart, setAnimateChart] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)
  const [zoneData, setZoneData] = useState({
    material: data.material || "Unspecified",
    condition: data.condition || "Unknown",
    rValue: data.rValue || 0,
    recommendedValue: getRecommendedValue(data.name),
    name: data.name,
    image: getZoneImage(data.name),
  })

  // Update zone data if report data changes
  useEffect(() => {
    setZoneData({
      material: data.material || "Unspecified",
      condition: data.condition || "Unknown",
      rValue: data.rValue || 0,
      recommendedValue: getRecommendedValue(data.name),
      name: data.name,
      image: data.image,
    })
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

  // Update zone data and notify parent if onUpdate is provided
  const updateZoneData = (field: keyof typeof zoneData, value: string | number) => {
    setZoneData((prev) => {
      const newData = { ...prev, [field]: value }

      if (field === "rValue") {
        const numericValue = typeof value === "string" ? Number.parseInt(value.replace("R", "")) : value
        if (!isNaN(numericValue)) {
          newData.rValue = numericValue

          // Notify parent of update
          if (onUpdate) {
            onUpdate({
              ...data,
              rValue: numericValue,
            })
          }
        }
      } else if ((field === "material" || field === "condition" || field === "image") && onUpdate) {
        // For material and condition updates, notify parent
        onUpdate({
          ...data,
          [field]: value as string,
        })
      }

      return newData
    })
  }

  // Get recommended action based on current R-value vs recommended
  function getRecommendedAction(): string {
    const efficiencyPercentage = Math.round((zoneData.rValue / zoneData.recommendedValue) * 100)

    if (zoneData.rValue === 0) {
      return `This area requires insulation. We recommend adding insulation to achieve an R-value of R${zoneData.recommendedValue}.`
    } else if (efficiencyPercentage < 50) {
      return `This area is significantly under-insulated. Consider upgrading to improve energy efficiency.`
    } else if (efficiencyPercentage < 100) {
      return `This area could benefit from additional insulation to reach the recommended R${zoneData.recommendedValue}.`
    } else {
      return `This area meets or exceeds the recommended insulation levels.`
    }
  }

  return (
    <Card className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <CardHeader className="bg-[#E0F7F5] py-4 px-5 border-b border-gray-100">
        <CardTitle className="text-lg font-medium text-[#256C68]">
          {getZoneTypeDescription(zoneData.name)}: {zoneData.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Column */}
          <div className="p-5">
            <div className="relative rounded-lg overflow-hidden mb-5">
              {isAdmin ? (
                <ImageUpload
                  image={zoneData.image || "/placeholder.svg"}
                  onImageChange={(newImage) => updateZoneData("image", newImage)}
                  driveImages={driveImages}
                />
              ) : (
                <ImageCustomer image={zoneData.image || "/placeholder.svg"} driveImages={driveImages} />
              )}
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-sm text-gray-500 mb-1">Material</p>
                <p className="text-[#256C68] font-medium">
                  {isAdmin ? (
                    <EditableField
                      value={zoneData.material}
                      onSave={(value) => updateZoneData("material", value)}
                      type="text"
                    />
                  ) : (
                    zoneData.material
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Condition</p>
                <p className="text-[#256C68] font-medium">
                  {isAdmin ? (
                    <EditableField
                      value={zoneData.condition}
                      onSave={(value) => updateZoneData("condition", value)}
                      type="select"
                      options={["Unknown", "Poor", "Fair", "Good", "Excellent"]}
                    />
                  ) : (
                    zoneData.condition
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Current R-Value</p>
                <p className="text-[#256C68] font-medium text-xl">
                  {isAdmin ? (
                    <EditableField
                      value={`R${zoneData.rValue}`}
                      onSave={(value) => updateZoneData("rValue", Number.parseInt(value.replace("R", "")) || 0)}
                      type="text"
                    />
                  ) : (
                    `R${zoneData.rValue}`
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Recommended</p>
                <p className="text-[#256C68] font-medium text-xl">
                  {isAdmin ? (
                    <EditableField
                      value={`R${zoneData.recommendedValue}`}
                      onSave={(value) =>
                        updateZoneData("recommendedValue", Number.parseInt(value.replace("R", "")) || 13)
                      }
                      type="text"
                    />
                  ) : (
                    `R${zoneData.recommendedValue}`
                  )}
                </p>
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
                    value={zoneData.rValue}
                    maxValue={Math.max(zoneData.recommendedValue * 1.3, 40)}
                    title=""
                    showCard={false}
                    width="100%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current R-Value</p>
                  <p className="text-xl font-bold text-[#4CAF50]">R{zoneData.rValue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">BPI Recommends</p>
                  <p className="text-xl font-bold text-[#4CAF50]">R{zoneData.recommendedValue}</p>
                </div>
              </div>
            </div>

            {/* Efficiency Rating Box */}
            <div className="bg-[#F7FDFC] p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <ThermometerIcon className="h-5 w-5 text-[#44BFB8] mr-2" />
                <h3 className="font-medium text-[#44BFB8]">Efficiency Rating</h3>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Efficiency Impact</span>
                <span className="text-[#256C68] font-medium">
                  {Math.min(Math.round((zoneData.rValue / zoneData.recommendedValue) * 100), 100)}%
                </span>
              </div>
              <Progress
                value={Math.min((zoneData.rValue / zoneData.recommendedValue) * 100, 100)}
                className="h-1.5 bg-[#44BFB83D]"
              />
              
              <div className="mt-4">
                <p className="text-sm text-gray-700">
                  {getRecommendedAction()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
