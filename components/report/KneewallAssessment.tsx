"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Check, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageCustomer from "./ImageCustomer"
import { ImageUpload } from "./ImageUpload"
import RValueGauge from "@/components/report/RValueGauge"

interface KneewallData {
  title: string
  material: string
  condition: string
  rValue: string
  recommendation: string
  currentValue: number
  maxValue: number
  image: string
}

interface InsulationItemData {
  condition: string
  material: string
  name: string
  rValue: number
  image: string
}

interface KneewallAssessmentProps {
  data?: InsulationItemData | null
  isAdmin?: boolean
  onUpdate?: (updatedItem: InsulationItemData) => void
  driveImages?: string[]
}

const EditableField = ({
  value,
  onSave,
  type = "text",
  options = [],
}: {
  value: string
  onSave: (value: string) => void
  type?: "text" | "select"
  options?: string[]
}) => {
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
      {type === "select" ? (
        <Select value={editValue} onValueChange={(value) => setEditValue(value)}>
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
      ) : (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="border rounded px-2 py-1 w-32"
        />
      )}
      <button onClick={handleSave} className="p-1 hover:bg-green-100 rounded text-green-600">
        <Check className="w-4 h-4" />
      </button>
      <button onClick={handleCancel} className="p-1 hover:bg-red-100 rounded text-red-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function KneewallAssessment({ data, isAdmin = false, onUpdate, driveImages }: KneewallAssessmentProps) {
  // Default data to use if no report data is provided
  const defaultKneewallData: KneewallData[] = [
    {
      title: "Your Home's Kneewall Flat Insulation",
      material: "None",
      condition: "N/A",
      rValue: "R0",
      recommendation: "R60",
      currentValue: 0,
      maxValue: 60,
      image: "/placeholder.jpg",
    },
    {
      title: "Your Kneewall Insulation",
      material: "None",
      condition: "N/A",
      rValue: "R0",
      recommendation: "R13",
      currentValue: 0,
      maxValue: 13,
      image: "/placeholder.jpg",
    },
  ]

  // Process the provided data into the format expected by our component
  const processedKneewallData = (): KneewallData[] => {
    if (!data) return defaultKneewallData

    // Create single kneewall data item from report data
    const kneewallItem: KneewallData = {
      title: data.name || "Your Kneewall Insulation",
      material: data.material || "Not specified",
      condition: data.condition || "Not assessed",
      rValue: data.rValue ? `R${data.rValue}` : "Not assessed",
      recommendation: data.name?.toLowerCase().includes("flat") ? "R60" : "R13", // Default recommendations based on type
      currentValue: data.rValue,
      maxValue: data.name?.toLowerCase().includes("flat") ? 60 : 13,
      image: data?.image ?? "/placeholder.jpg", // Default image
    }

    // If we have data for a single kneewall, return it as a single item array
    return [kneewallItem]
  }

  const [kneewallData, setKneewallData] = useState<KneewallData[]>(processedKneewallData())
  const [animateCharts, setAnimateCharts] = useState<boolean[]>([])

  // Update data when the report data changes
  useEffect(() => {
    setKneewallData(processedKneewallData())
    setAnimateCharts(new Array(processedKneewallData().length).fill(false))
  }, [data])

  useEffect(() => {
    // Use Intersection Observer with element IDs instead of refs
    const observers: IntersectionObserver[] = []

    kneewallData.forEach((_, index) => {
      const chartId = `kneewall-chart-${index}`
      const chartElement = document.getElementById(chartId)

      if (chartElement) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setAnimateCharts((prev) => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
                observer.unobserve(chartElement)
              }
            })
          },
          { threshold: 0.5 },
        )

        observer.observe(chartElement)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [kneewallData])

  const updateKneewallData = (index: number, field: keyof KneewallData, value: string) => {
    console.log("Updating kneewall data:", index, field, value)
    console.log("Current kneewall data and function:", data, onUpdate)

    setKneewallData((prev) => {
      const newData = [...prev]
      newData[index] = { ...newData[index], [field]: value }

      console.log("New kneewall data:", newData)

      // Update currentValue if rValue changes
      if (field === "rValue") {
        console.log("Inside rvalue")
        const numericValue = Number.parseInt(value.replace("R", ""))
        if (!isNaN(numericValue)) {
          newData[index].currentValue = numericValue
        }
      }

      // Trigger update to parent
      if (onUpdate) {
        const updatedItem: InsulationItemData = {
          ...(data ?? {}), // if data exists, spread it; else create new
          name: newData[index].title,
          material: field === "material" ? value : newData[index].material,
          condition: field === "condition" ? value : newData[index].condition,
          rValue: field === "rValue" ? Number.parseInt(value.replace("R", "")) : (newData[index].currentValue ?? 0),
          image: field === "image" ? value : newData[index].image,
        }

        console.log("Sending update to parent:", updatedItem)
        onUpdate(updatedItem)
      }

      return newData
    })
  }

  return (
    <div className="space-y-8">
      {kneewallData.map((item, index) => (
        <Card key={index} className="rounded-lg border border-gray-100 shadow-sm overflow-hidden">
          <CardHeader className="bg-[#E0F7F5] py-4 px-5 border-b border-gray-100">
            <CardTitle className="text-lg font-medium text-[#256C68]">{item.title}</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left Column */}
            <div className="p-5">
              <div className="relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#E0F7F5] text-[#256C68] px-4 py-1 rounded-full text-sm z-10">
                  CURRENT STATUS
                </div>
                <div className="rounded-lg overflow-hidden">
                  {isAdmin ? (
                    <ImageUpload
                      image={item.image}
                      driveImages={driveImages}
                      onImageChange={(newImage) => updateKneewallData(index, "image", newImage)}
                    />
                  ) : (
                    <ImageCustomer image={item.image} driveImages={driveImages} />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Material</p>
                  <p className="text-[#256C68] font-medium">
                    {isAdmin ? (
                      <EditableField
                        value={item.material ?? "null"}
                        onSave={(value) => updateKneewallData(index, "material", value)}
                      />
                    ) : (
                      item.material
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Condition</p>
                  <p className="text-[#256C68] font-medium">
                    {isAdmin ? (
                      <EditableField
                        value={item.condition}
                        onSave={(value) => updateKneewallData(index, "condition", value)}
                        type="select"
                        options={["Poor", "Fair", "Good", "Excellent"]}
                      />
                    ) : (
                      item.condition
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current R-Value</p>
                  <p className="text-[#256C68] font-medium">
                    {isAdmin ? (
                      <EditableField
                        value={item.rValue}
                        onSave={(value) => updateKneewallData(index, "rValue", value)}
                      />
                    ) : (
                      item.rValue
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Recommended</p>
                  <p className="text-[#256C68] font-medium">{item.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-[#F7FDFC] p-5">
              <h3 className="text-lg font-medium text-[#256C68] mb-5">Current Performance</h3>

              {/* Gauge Visualization */}
              <div id={`kneewall-chart-${index}`} className="relative">
                <div className="max-w-[250px] mx-auto mb-6">
                  <RValueGauge
                    value={item.currentValue}
                    maxValue={item.maxValue}
                    title=""
                    showCard={false}
                    width="100%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current R-Value</p>
                  <p className="text-xl font-bold text-[#F44336]">{item.rValue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">BPI Recommends</p>
                  <p className="text-xl font-bold text-[#4CAF50]">{item.recommendation}</p>
                </div>
              </div>

              <div className="mt-5 p-4 bg-[#E0F7F5] rounded-lg">
                <h3 className="font-medium mb-2 text-[#256C68]">BPI Recommendation</h3>
                <p className="text-sm text-gray-700">
                  BPI recommends {item.title.includes("Flat") ? "Kneewall Flats" : "Kneewalls"} be insulated to{" "}
                  {item.recommendation} for optimal energy efficiency. Your current insulation is at {item.rValue},
                  which is {Math.round((item.currentValue / item.maxValue) * 100)}% of the recommended value.
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
