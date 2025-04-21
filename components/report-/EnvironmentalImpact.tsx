"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Leaf, Pencil, Check, X } from "lucide-react"
import { motion } from "framer-motion"

// Define the interfaces for our data
interface FootprintData {
  value: string
  unit: string
}

interface EnvironmentalData {
  title: string
  currentFootprint: FootprintData
  projectedSavings: FootprintData
  projectedFootprint: FootprintData
  totalReduction: FootprintData
}

// This component will be part of ReportSummary which is in ReportPage
interface EnvironmentalImpactProps {
  data?: EnvironmentalData
  isAdmin?: boolean
  onUpdate?: (data: EnvironmentalData) => void
  bookingNumber?: string
  reportData?: any // Access to the overall report data if needed
}

// In-place edit component
interface InPlaceEditProps {
  initialValue?: string
  isAdmin: boolean
  onUpdate: (value: string) => void
  multiline?: boolean
  placeholder?: string
}

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
            className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-[#67B502]"
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
            className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-[#67B502]"
          />
        )}
        <button onClick={handleSave} className="p-1 hover:bg-[#67B5021A] rounded text-[#67B502] transition-colors">
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

// Value with unit component that displays them inline
interface ValueWithUnitProps {
  data: FootprintData
  isAdmin: boolean
  onUpdate: (value: string) => void
  placeholder?: string
}

const ValueWithUnit: React.FC<ValueWithUnitProps> = ({ data, isAdmin, onUpdate, placeholder = "Enter value" }) => {
  return (
    <div className="flex items-center">
      <div className="mr-1">
        <InPlaceEdit initialValue={data.value || "-"} isAdmin={isAdmin} onUpdate={onUpdate} placeholder={placeholder} />
      </div>
      <span>{data.unit}</span>
    </div>
  )
}

export function EnvironmentalImpact({
  data,
  isAdmin = false,
  onUpdate,
  bookingNumber,
  reportData,
}: EnvironmentalImpactProps) {
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData>({
    title: "Environmental Impact",
    currentFootprint: { value: "", unit: "lbs of CO2" },
    projectedSavings: { value: "", unit: "%" },
    projectedFootprint: { value: "", unit: "lbs of CO2" },
    totalReduction: { value: "", unit: "lbs of CO2" },
  })

  const REPORT_DATA_KEY = "report_data"

  // Load data from props or create default
  useEffect(() => {
    if (data) {
      setEnvironmentalData(data)
    } else if (bookingNumber) {
      // Try to load from localStorage if no data was passed
      const savedData = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`)
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          if (parsedData.environmentalImpact) {
            setEnvironmentalData(parsedData.environmentalImpact)
          }
        } catch (e) {
          console.error("Error parsing environmental data from localStorage:", e)
        }
      }
    }
  }, [data, bookingNumber])

  // Handle updating a specific field within a specific metric
  const updateMetricField = (metricKey: keyof EnvironmentalData, field: string, value: string) => {
    if (!isAdmin) return

    const updatedData = {
      ...environmentalData,
      [metricKey]: {
        ...environmentalData[metricKey as keyof EnvironmentalData],
        [field]: value,
      },
    }

    setEnvironmentalData(updatedData)

    // Call the onUpdate prop if provided
    if (onUpdate) {
      onUpdate(updatedData)
    }
  }

  // Consistent card style matching Overview component
  const cardStyle = "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden"

  return (
    <div className={cardStyle}>
      <div className="py-3 px-5 bg-[#67B5021A] dark:bg-green-900/20">
        <h2 className="flex items-center gap-2 font-medium text-[#67B502] dark:text-[#67B502]">
          <Leaf className="h-5 w-5 text-[#67B502]" />
          Environmental Impact
        </h2>
      </div>
      <div className="p-6 bg-white">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center py-2 border-b"
          >
            <div className="flex items-start gap-3">
              <div className="bg-[#67B5021A] dark:bg-green-900/20 rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
                <Leaf className="h-5 w-5 text-[#67B502]" />
              </div>
              <div>
                <span className="font-medium text-[#67B502] dark:text-[#67B502]">Household Carbon Footprint</span>
                <p className="text-xs text-gray-500">*based on the Utility Bills provided (annually)</p>
              </div>
            </div>
            <div className="text-[#67B502] font-semibold">
              <ValueWithUnit
                data={environmentalData.currentFootprint}
                isAdmin={isAdmin}
                onUpdate={(value) => updateMetricField("currentFootprint", "value", value)}
                placeholder="Enter value"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-between items-center py-2 border-b"
          >
            <div className="flex items-start gap-3">
              <div className="bg-[#67B5021A] dark:bg-green-900/20 rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
                <Leaf className="h-5 w-5 text-[#67B502]" />
              </div>
              <span className="font-medium text-[#67B502] dark:text-[#67B502]">Projected Total Energy Savings</span>
            </div>
            <div className="text-[#67B502] font-semibold">
              <ValueWithUnit
                data={environmentalData.projectedSavings}
                isAdmin={isAdmin}
                onUpdate={(value) => updateMetricField("projectedSavings", "value", value)}
                placeholder="Enter value"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-between items-center py-2 border-b"
          >
            <div className="flex items-start gap-3">
              <div className="bg-[#67B5021A] dark:bg-green-900/20 rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
                <Leaf className="h-5 w-5 text-[#67B502]" />
              </div>
              <div>
                <span className="font-medium text-[#67B502] dark:text-[#67B502]">Projected Carbon Footprint</span>
                <p className="text-xs text-gray-500">*after installing proposed upgrades</p>
              </div>
            </div>
            <div className="text-[#67B502] font-semibold">
              <ValueWithUnit
                data={environmentalData.projectedFootprint}
                isAdmin={isAdmin}
                onUpdate={(value) => updateMetricField("projectedFootprint", "value", value)}
                placeholder="Enter value"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-[#67B5021A] p-6 rounded-lg"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
                <Leaf className="h-5 w-5 text-[#67B502]" />
              </div>
              <div>
                <h4 className="font-medium text-[#67B502] dark:text-[#67B502]">Projected CO2 Reduction</h4>
                <p className="text-xs text-gray-500">*Over a 10 year period</p>
              </div>
            </div>
            <div className="text-[#67B502] text-xl font-bold">
              <ValueWithUnit
                data={environmentalData.totalReduction}
                isAdmin={isAdmin}
                onUpdate={(value) => updateMetricField("totalReduction", "value", value)}
                placeholder="Enter value"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}