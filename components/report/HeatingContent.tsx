"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageCustomer } from "@/components/report/ImageCustomer"
import { Thermometer, Flame, Info, AlertCircle, Edit2, Check, X, Pencil } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { ImageUpload } from "./ImageUpload"
import PercentageGauge from "@/components/report/PercentageGauge"

// All interfaces remain the same
interface EditableFieldProps {
  value: string
  onSave: (value: string) => void
  type: "text" | "select" | "number"
  options?: string[]
  min?: number
  max?: number
}

interface HeatingCoolingItem {
  condition: string
  name: string
  parameter: string
  type: string
  value: number | string
  year?: number
  image?: string
}

interface HeatingData {
  data: HeatingCoolingItem[]
  title: string
}

interface HeatingContentProps {
  data?: HeatingData
  isAdmin?: boolean
  onUpdateItem?: (updatedItem: HeatingCoolingItem) => void
  driveImages?: any[]
  onSave?: () => void
}

interface PerformanceCardProps {
  isAdmin: boolean
  value: number
  recommended: number
  label: string
  onUpdate: (value: number) => void
}

interface SystemDetailsProps {
  isAdmin: boolean
  type: string
  condition: string
  year?: number
  value: number | string
  parameterName: string
  onUpdateType: (value: string) => void
  onUpdateCondition: (value: string) => void
  onUpdateYear?: (value: number) => void
  onUpdateValue: (value: number | string) => void
}

interface HeatingSystemCardProps {
  item: HeatingCoolingItem
  index: number
  isAdmin: boolean
  recommendedValue?: number
  onUpdateItem?: (updatedItem: HeatingCoolingItem) => void
  driveImages?: any[]
}

interface InPlaceEditProps {
  initialValue: string
  isAdmin: boolean
  onUpdate: (value: string) => void
  label?: string | null
}

interface EditableAFUEProps {
  value: number
  onChange: (value: number) => void
  label?: string
}

// Enhanced EditableAFUE component with better UI and validation
const EditableAFUE: React.FC<EditableAFUEProps> = ({ value, onChange, label = "%" }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep local state in sync with props
  useEffect(() => {
    setEditValue(value)
  }, [value])

  // Auto-focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = () => {
    // Ensure we have a valid number
    const numValue = Number(editValue)
    if (!isNaN(numValue)) {
      onChange(numValue)
      setIsEditing(false)
    } else {
      // Reset to original value if invalid input
      setEditValue(value)
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setEditValue(value)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(Number(e.target.value))}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="border border-amber-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-amber-500"
          min={0}
          max={100}
          step="0.1"
        />
        <span className="text-gray-500">{label}</span>
        <button
          onClick={handleSave}
          className="p-1 bg-green-100 hover:bg-green-200 rounded text-green-600 transition-colors"
          title="Save"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setEditValue(value)
            setIsEditing(false)
          }}
          className="p-1 bg-red-100 hover:bg-red-200 rounded text-red-600 transition-colors"
          title="Cancel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 group">
      <p className="text-xl font-bold" style={{ color: "#D62501" }}>
        {value}
        {label}
      </p>
      <button
        onClick={() => setIsEditing(true)}
        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-amber-100 rounded transition-all"
        title="Edit value"
      >
        <Pencil className="w-4 h-4" style={{ color: "#B18C2E" }} />
      </button>
    </div>
  )
}

// Original EditableField component - unchanged
const EditableField: React.FC<EditableFieldProps> = ({ value, onSave, type, options = [], min, max }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)

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

// MODIFIED: PerformanceCard using EditableAFUE component
const PerformanceCard: React.FC<PerformanceCardProps> = ({ isAdmin, value, recommended, label, onUpdate }) => (
  <div className="mt-8 grid grid-cols-2 gap-8">
    <div>
      <p className="text-base text-gray-600 dark:text-gray-400">Current {label}</p>
      {isAdmin ? (
        <EditableAFUE value={value} onChange={onUpdate} />
      ) : (
        <p className="text-2xl font-bold" style={{ color: "#D62501" }}>
          {value}%
        </p>
      )}
    </div>
    <div>
      <p className="text-base text-gray-600 dark:text-gray-400">BPI Recommends</p>
      <p className="text-2xl font-bold" style={{ color: "#22C80F" }}>
        {recommended}%
      </p>
    </div>
  </div>
)

// Original InPlaceEdit component
const InPlaceEdit: React.FC<InPlaceEditProps> = ({ initialValue, isAdmin, onUpdate, label = null }) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="text-2xl font-bold bg-transparent border-b outline-none"
        style={{ color: "#B18C2E", borderBottomColor: "#B18C2E" }}
      />
    )
  }

  return (
    <div
      className="text-2xl font-bold flex items-center cursor-pointer"
      onClick={handleClick}
      style={{ color: "#B18C2E" }}
    >
      {value}
      {label ? ` ${label}` : ""}
      {isAdmin && <Pencil className="ml-2 h-5 w-5 text-gray-400" />}
    </div>
  )
}

// Enhanced SystemDetails component with AFUE/UEF value as part of the details
const SystemDetails: React.FC<SystemDetailsProps> = ({
  isAdmin,
  type,
  condition,
  year,
  value,
  parameterName,
  onUpdateType,
  onUpdateCondition,
  onUpdateYear,
  onUpdateValue,
}) => (
  <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 rounded-lg p-4">
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
      {isAdmin ? (
        <EditableField value={type} onSave={onUpdateType} type="text" />
      ) : (
        <p className="font-medium">{type}</p>
      )}
    </div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Condition</p>
      {isAdmin ? (
        <EditableField
          value={condition}
          onSave={onUpdateCondition}
          type="select"
          options={["Poor", "Fair", "Good", "Excellent"]}
        />
      ) : (
        <p className="font-medium">{condition}</p>
      )}
    </div>
    {/* Add AFUE/UEF value to system details */}
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{parameterName}</p>
      {isAdmin ? (
        <EditableAFUE value={typeof value === "number" ? value : 0} onChange={onUpdateValue} />
      ) : (
        <p className="font-medium">{typeof value === "number" ? `${value}%` : value}</p>
      )}
    </div>
    {year && (
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Year</p>
        {isAdmin && onUpdateYear ? (
          <EditableField
            value={`${year}`}
            onSave={(value) => onUpdateYear(Number(value))}
            type="number"
            min={1900}
            max={new Date().getFullYear()}
          />
        ) : (
          <p className="font-medium">{year}</p>
        )}
      </div>
    )}
  </div>
)

// Update the HeatingSystemCard component to match the new layout
const HeatingSystemCard: React.FC<HeatingSystemCardProps> = ({
  item,
  index,
  isAdmin,
  recommendedValue = 92,
  onUpdateItem,
  driveImages,
}) => {
  const [systemData, setSystemData] = useState({
    type: item?.type ?? "null",
    condition: item?.condition ?? "null",
    value: typeof item?.value === "number" ? item.value : 0,
    parameterName: item?.parameter ?? "null",
    year: item?.year,
    image: item?.image,
  })

  const [animate, setAnimate] = useState(false)
  const itemRef = useRef(null)

  // Set up intersection observer for animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (itemRef.current) observer.observe(itemRef.current)

    return () => {
      if (itemRef.current) observer.unobserve(itemRef.current)
    }
  }, [])

  // Update state when props change
  useEffect(() => {
    setSystemData({
      type: item.type || "null",
      condition: item.condition || "null",
      value: typeof item.value === "number" ? item.value : 0,
      parameterName: item.parameter || "null",
      year: item.year,
      image: item?.image,
    })
  }, [item])

  // Update local state and propagate changes to parent component
  const updateSystemData = (field: keyof typeof systemData, value: any) => {
    console.log("System Data", systemData)
    const updatedData = {
      ...systemData,
      [field]: value,
    }

    setSystemData(updatedData)

    console.log("Item: ", item)

    // Only call onUpdateItem if it exists
    if (onUpdateItem) {
      const updatedItem = {
        ...item,
        type: field === "type" ? value : item.type,
        condition: field === "condition" ? value : item.condition,
        value: field === "value" ? value : item.value,
        parameter: field === "parameterName" ? value : item.parameter,
        year: field === "year" ? value : item.year,
        image: field === "image" ? value : item.image,
      }

      onUpdateItem(updatedItem)
    }
  }

  // Helper function to determine if we should show a numeric gauge chart
  const shouldShowGaugeChart = () => {
    return typeof systemData.value === "number" && systemData.value > 0
  }

  const renderValue = () => {
    if (typeof systemData.value === "number") {
      return systemData.value
    } else if (systemData.value === "") {
      return "N/A"
    } else {
      return systemData.value
    }
  }

  // Determine if this is a water heater based on name
  const isWaterHeater = item?.name?.toLowerCase()?.includes("water")

  // Get description text based on item type
  const getDescriptionText = () => {
    if (isWaterHeater) {
      return shouldShowGaugeChart()
        ? `Your ${item?.name?.toLowerCase()} has a ${systemData.parameterName} rating of ${systemData.value}%. Upgrading to a high-efficiency model with ${recommendedValue}% ${systemData.parameterName} could result in significant energy savings.`
        : `This ${item?.name?.toLowerCase()} does not have a specified ${systemData.parameterName} rating.`
    } else {
      return shouldShowGaugeChart()
        ? `Your ${item?.name?.toLowerCase()} has a ${systemData.parameterName} rating of ${systemData.value}%. ${systemData.value < recommendedValue
          ? `Upgrading to a high-efficiency model with ${recommendedValue}% ${systemData.parameterName} could result in significant energy savings.`
          : `This is an efficient unit that meets or exceeds recommended standards.`
        }`
        : `This ${item?.name?.toLowerCase()} does not have a specified ${systemData.parameterName} rating.`
    }
  }

  // Common heading style for section headings
  const sectionHeadingStyle = {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0%",
    color: "#B18C2E",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="rounded-xl border border-amber-100 shadow-sm overflow-hidden mb-8">
        <CardHeader className="py-4 px-6" style={{ backgroundColor: "#FFFCF3" }}>
          <CardTitle
            className="flex items-center gap-3"
            style={{
              fontFamily: "Poppins",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#B18C2E",
            }}
          >
            <Flame style={{ color: "#B18C2E" }} className="h-6 w-6" />
            {item.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column - Current Performance and Type/Condition/Year/AFUE */}
            <div className="space-y-6">
              {/* Current Performance Box */}
              <div
                ref={itemRef}
                className="rounded-lg p-6"
                style={{ backgroundColor: "#FFFCF3", border: "0.5px solid #FDC02529" }}
              >
                <h3 className="flex items-center mb-6" style={sectionHeadingStyle}>
                  Current Performance
                </h3>

                {shouldShowGaugeChart() ? (
                  <div className="space-y-6">
                    <PercentageGauge
                      value={systemData.value as number}
                      maxValue={100}
                      title={systemData.parameterName}
                      showCard={false}
                      width="100%"
                    />

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Current {systemData.parameterName}</p>
                        <p className="text-2xl font-bold" style={{ color: "#D62501" }}>
                          {systemData.value}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">BPI Recommends</p>
                        <p className="text-2xl font-bold" style={{ color: "#22C80F" }}>
                          {recommendedValue}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40">
                    {isAdmin && onUpdateItem ? (
                      <InPlaceEdit
                        initialValue={renderValue().toString()}
                        isAdmin={Boolean(isAdmin && onUpdateItem)}
                        onUpdate={(newValue) => {
                          const numValue = Number(newValue)
                          const isNumeric = !isNaN(numValue)
                          updateSystemData("value", isNumeric ? numValue : newValue)
                        }}
                      />
                    ) : (
                      <p className="text-4xl font-bold" style={{ color: "#D62501" }}>
                        {renderValue()}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Type and Condition Grid */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="font-medium">
                    {isAdmin ? (
                      <EditableField
                        value={systemData.type}
                        onSave={(value) => updateSystemData("type", value)}
                        type="text"
                      />
                    ) : (
                      systemData.type || "Standard"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Condition</p>
                  <p className="font-medium">
                    {isAdmin ? (
                      <EditableField
                        value={systemData.condition}
                        onSave={(value) => updateSystemData("condition", value)}
                        type="select"
                        options={["Poor", "Fair", "Good", "Excellent"]}
                      />
                    ) : (
                      systemData.condition
                    )}
                  </p>
                </div>
              </div>

              {/* Year and AFUE/UEF Grid */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Year</p>
                  <p className="font-medium">
                    {isAdmin ? (
                      <EditableField
                        value={`${systemData.year || new Date().getFullYear()}`}
                        onSave={(value) => updateSystemData("year", Number(value))}
                        type="number"
                        min={1900}
                        max={new Date().getFullYear()}
                      />
                    ) : (
                      systemData.year || new Date().getFullYear()
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">{systemData.parameterName}</p>
                  <p className="font-medium">
                    {isAdmin ? (
                      <EditableAFUE
                        value={typeof systemData.value === "number" ? systemData.value : 0}
                        onChange={(value) => updateSystemData("value", value)}
                      />
                    ) : typeof systemData.value === "number" ? (
                      `${systemData.value}%`
                    ) : (
                      systemData.value
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - System Details and Image */}
            <div className="space-y-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: "#FFFCF3", border: "0.5px solid #FDC02529" }}>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6" style={{ color: "#B18C2E" }} />
                  <h3 style={sectionHeadingStyle}>System Details</h3>
                </div>

                <p className="text-gray-700 mb-4">{getDescriptionText()}</p>

                <div className="flex items-center space-x-3 mt-4 py-2" style={{ color: "#B18C2E" }}>
                  <Info className="h-5 w-5" />
                  <span className="text-sm">
                    *{systemData.parameterName} ={" "}
                    {isWaterHeater ? "Uniform Energy Factor" : "Annual Fuel Utilization Efficiency"}
                  </span>
                </div>
              </div>

              {/* Image section */}
              <div className="rounded-lg overflow-hidden">
                {isAdmin && onUpdateItem ? (
                  <ImageUpload
                    image={systemData.image ?? ""}
                    onImageChange={(newImage) => updateSystemData("image", newImage)}
                    driveImages={driveImages}
                  />
                ) : (
                  <div className="relative">
                    <ImageCustomer image={systemData.image} driveImages={driveImages} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const DEFAULT_HEATING_ITEMS = [
  {
    condition: "N/A",
    name: "Primary Heating System",
    parameter: "AFUE",
    type: "None",
    value: 0,
    year: new Date().getFullYear(),
  },
  {
    condition: "N/A",
    name: "Water Heater",
    parameter: "UEF",
    type: "None",
    value: 0,
    year: new Date().getFullYear(),
  },
]

// HeatingContent component with the ability to save data
// Modified HeatingContent component with default data cards
export function HeatingContent({ data, isAdmin = false, onUpdateItem, driveImages, onSave }: HeatingContentProps) {
  const params = useParams()
  const bookingNumber = params.bookingNumber

  // Default heating items
  const DEFAULT_HEATING_ITEMS = {
    heatingSystem: {
      condition: "N/A",
      name: "Primary Heating System",
      parameter: "AFUE",
      type: "None",
      value: 0,
      year: new Date().getFullYear(),
    },
    waterHeater: {
      condition: "N/A",
      name: "Water Heater",
      parameter: "UEF",
      type: "None",
      value: 0,
      year: new Date().getFullYear(),
    },
  }

  // State for each card separately
  const [heatingSystemItem, setHeatingSystemItem] = useState([])
  const [waterHeaterItem, setWaterHeaterItem] = useState([])
  useEffect(() => {
    console.log("Heating system item:", heatingSystemItem)
  }, [heatingSystemItem])

  // Initialize state from provided data
  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      // Look for heating system and water heater in provided data
      console.log("Data received:", data.data)
      const heatingItem = data.data.filter((item) => !item?.name?.toLowerCase()?.includes("water"))

      console.log("heating item", heatingItem)

      const waterItem = data.data.find((item) => item?.name?.toLowerCase().includes("water"))

      // Update state if items are found
      if (heatingItem) {
        console.log("heating item", heatingItem)
        setHeatingSystemItem(heatingItem)
      }

      if (waterItem) {
        setWaterHeaterItem(waterItem)
      }
    } else {
      setHeatingSystemItem([DEFAULT_HEATING_ITEMS.heatingSystem])
      setWaterHeaterItem(DEFAULT_HEATING_ITEMS.waterHeater)
    }
  }, [data])

  // Handle update for either card
  const handleUpdateItem = (updatedItem: HeatingCoolingItem) => {
    if (!isAdmin || !onUpdateItem) return

    // Pass update to parent
    onUpdateItem(updatedItem)
  }

  // Use the parent's onSave callback directly instead of handling API calls
  const handleSubmit = () => {
    if (onSave) {
      onSave()
      toast.success("Heating systems data saved successfully!")
    }
  }

  console.log("heating system item", heatingSystemItem)

  return (
    <div className="space-y-8">
      {isAdmin && (
        <div className="flex justify-end items-center">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-full bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors"
            style={{ backgroundColor: "#B18C2E" }}
          >
            Save
          </button>
        </div>
      )}

      {/* Header card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} id="heating-header">
        <Card
          className="rounded-xl border border-amber-100 shadow-sm overflow-hidden"
          style={{ backgroundColor: "#FFFCF3" }}
        >
          <CardHeader className="py-4 px-6" style={{ backgroundColor: "#FFFCF3" }}>
            <CardTitle
              className="flex items-center gap-3"
              style={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#B18C2E",
              }}
            >
              <Thermometer style={{ color: "#B18C2E" }} className="h-6 w-6" />
              Understanding Your Home&apos;s Heating Systems
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6" style={{ backgroundColor: "#FFFFFF" }}>
            <p className="text-gray-700 mb-5 font-normal">
              During your Home Energy Assessment, our technician closely examined the insulation levels in your home
            </p>
            <div className="flex items-center gap-3 py-2">
              <Info className="h-5 w-5 flex-shrink-0" style={{ color: "#B18C2E" }} />
              <p className="text-sm text-gray-700 font-normal">
                (Unified) Energy Factor - A measure of efficiency by how effective the heat from the energy source is
                transferred to the water
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Primary Heating System Card - always displayed */}
      {heatingSystemItem.length > 0 ? (
        heatingSystemItem.map((item, i) => {
          return (
            <div id={`heating-system-${i}`}>
              <HeatingSystemCard
                key={`heating-system-${i}`}
                item={item}
                index={0}
                isAdmin={isAdmin}
                recommendedValue={92}
                onUpdateItem={handleUpdateItem}
                driveImages={driveImages}
              />
            </div>
          )
        })
      ) : (
        <div id="heating-system-1">
          <HeatingSystemCard
            key="heating-system-default"
            item={DEFAULT_HEATING_ITEMS.heatingSystem}
            index={0}
            isAdmin={isAdmin}
            recommendedValue={92}
            onUpdateItem={handleUpdateItem}
            driveImages={driveImages}
          />
        </div>
      )}

      {/* Water Heater Card - always displayed */}
      <div id="heating-system-water-heater">
        <HeatingSystemCard
          key="water-heater"
          item={waterHeaterItem}
          index={1}
          isAdmin={isAdmin}
          recommendedValue={62}
          onUpdateItem={handleUpdateItem}
          driveImages={driveImages}
        />
      </div>
    </div>
  )
}
