"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Check, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

// New interface for the data coming from reportData
interface InsulationItemData {
  condition: string;
  material: string;
  name: string;
  rValue: number;
}

interface RimJoistAssessmentProps {
  data?: InsulationItemData;
  isAdmin?: boolean;
  onUpdate?: (updatedItem: InsulationItemData) => void;
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
    setEditValue(value);
  }, [value]);

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

const ImageUpload: React.FC<{
  src: string
  onImageChange: (newImage: string) => void
}> = ({ src, onImageChange }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      onImageChange(imageUrl)
      setIsEditing(false)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="relative aspect-video rounded-lg overflow-hidden">
      <img src={src || "/placeholder.svg"} alt="Rim joist area" className="object-cover w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-semibold mb-1">Current Condition</h3>
        <p className="text-sm">Uninsulated rim joist area</p>
      </div>
      {isEditing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Choose New Image
            </button>
            <button onClick={() => setIsEditing(false)} className="ml-2 px-4 py-2 rounded border hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </div>
      )}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  )
}

export function RimJoistAssessment({ data, isAdmin = false, onUpdate }: RimJoistAssessmentProps) {
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
    if (!data) return defaultRimJoistData;
    
    return {
      material: data.material || "None",
      condition: data.condition || "N/A",
      rValue: data.rValue || 0,
      recommendedValue: 13, // Standard recommendation for rim joist
      maxValue: 20,        // Standard max value for scale
      efficiency: data.rValue ? Math.round((data.rValue / 13) * 100) : 0,
      image: "https://i.postimg.cc/jSVNngms/Screenshot-2024-11-25-033709.png",
    };
  };
  
  const [rimJoistData, setRimJoistData] = useState<RimJoistData>(processRimJoistData())

  useEffect(() => {
    // Update rim joist data if report data changes
    setRimJoistData(processRimJoistData());
  }, [data]);

  const updateRimJoistData = (field: keyof RimJoistData, value: string | number) => {
    setRimJoistData((prev) => {
      const newData = { ...prev, [field]: value }

      // Update rValue and efficiency together
      if (field === "rValue") {
        const numericValue = typeof value === "string" ? Number.parseInt(value.replace("R", "")) : value
        if (!isNaN(numericValue)) {
          newData.rValue = numericValue
          newData.efficiency = (numericValue / prev.recommendedValue) * 100
          
          // Notify parent of update
          if (onUpdate && data) {
            onUpdate({
              ...data,
              rValue: numericValue
            });
          }
        }
      } else if (field === "efficiency") {
        const numericValue = typeof value === "string" ? Number.parseInt(value) : value
        if (!isNaN(numericValue)) {
          newData.efficiency = numericValue
          newData.rValue = (numericValue * prev.recommendedValue) / 100
          
          // Notify parent of update
          if (onUpdate && data) {
            onUpdate({
              ...data,
              rValue: Math.round((numericValue * prev.recommendedValue) / 100)
            });
          }
        }
      } else if ((field === "material" || field === "condition") && onUpdate && data) {
        // For material and condition updates, notify parent
        onUpdate({
          ...data,
          [field]: value as string
        });
      }

      return newData
    })
  }

  // Get the appropriate description based on the R-value
  const getConditionDescription = () => {
    if (rimJoistData.rValue < 3) {
      return "Uninsulated rim joist area";
    } else if (rimJoistData.rValue < rimJoistData.recommendedValue) {
      return "Partially insulated rim joist area";
    } else {
      return "Well-insulated rim joist area";
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="text-2xl text-teal-600 dark:text-teal-300">
            Your Home&apos;s Rim Joist Insulation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {(
                  [
                    {
                      label: "Material",
                      value: rimJoistData.material,
                      field: "material" as const,
                      type: "text" as const,
                    },
                    {
                      label: "Condition",
                      value: rimJoistData.condition,
                      field: "condition" as const,
                      type: "select" as const,
                      options: ["N/A", "Poor", "Fair", "Good", "Excellent"],
                    },
                    {
                      label: "Current R-Value",
                      value: `R${rimJoistData.rValue}`,
                      field: "rValue" as const,
                      type: "text" as const,
                    },
                    {
                      label: "Recommended",
                      value: `R${rimJoistData.recommendedValue}`,
                      field: "recommendedValue" as const,
                      type: "text" as const,
                    },
                  ] satisfies FieldItem[]
                ).map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                      <div className="font-medium mt-1 text-gray-900 dark:text-gray-100">
                        {isAdmin ? (
                          <EditableField
                            value={item.value}
                            onSave={(value) => {
                              if (item.field === "rValue" || item.field === "recommendedValue") {
                                updateRimJoistData(item.field, Number.parseInt(value.replace("R", "")))
                              } else {
                                updateRimJoistData(item.field, value)
                              }
                            }}
                            type={item.type}
                            options={item.options}
                          />
                        ) : (
                          item.value
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Current Efficiency</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {isAdmin ? (
                        <EditableField
                          value={`${Math.round((rimJoistData.rValue / rimJoistData.recommendedValue) * 100)}`}
                          onSave={(value) => {
                            const efficiency = Number.parseInt(value)
                            if (!isNaN(efficiency)) {
                              updateRimJoistData("efficiency", efficiency)
                            }
                          }}
                          type="number"
                          min={0}
                          max={100}
                        />
                      ) : (
                        `${Math.round((rimJoistData.rValue / rimJoistData.recommendedValue) * 100)}%`
                      )}
                    </span>
                  </div>
                  <Progress
                    value={(rimJoistData.rValue / rimJoistData.maxValue) * 100}
                    className="h-2 bg-teal-100 dark:bg-teal-700"
                  />
                </CardContent>
              </Card>

              <Card className="bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-teal-600 dark:text-teal-300">BPI Recommendation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    BPI recommends Rim Joists be insulated to R{rimJoistData.recommendedValue} for optimal energy
                    efficiency and to prevent air infiltration.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {isAdmin ? (
                <ImageUpload
                  src={rimJoistData.image || "/placeholder.svg"}
                  onImageChange={(newImage) => updateRimJoistData("image", newImage)}
                />
              ) : (
                <motion.div whileHover={{ scale: 1.02 }} className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={rimJoistData.image || "/placeholder.svg"}
                    alt="Rim joist area"
                    className="object-cover w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold mb-1">Current Condition</h3>
                    <p className="text-sm">{getConditionDescription()}</p>
                  </div>
                </motion.div>
              )}

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Technical Details</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      The rim joist is a critical area for insulation as it&apos;s often a significant source of heat
                      loss and air infiltration. {rimJoistData.rValue < rimJoistData.recommendedValue ? (
                        "Improving insulation here can:"
                      ) : (
                        "Your well-insulated rim joist provides these benefits:"
                      )}
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>• {rimJoistData.rValue < rimJoistData.recommendedValue ? "Prevent" : "Prevents"} cold air infiltration</li>
                      <li>• {rimJoistData.rValue < rimJoistData.recommendedValue ? "Reduce" : "Reduces"} energy costs</li>
                      <li>• {rimJoistData.rValue < rimJoistData.recommendedValue ? "Improve" : "Improves"} comfort in rooms above</li>
                      <li>• {rimJoistData.rValue < rimJoistData.recommendedValue ? "Protect" : "Protects"} against moisture issues</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}