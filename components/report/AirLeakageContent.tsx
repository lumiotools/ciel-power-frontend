"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Home, ArrowUp, ArrowDown, Info, Pencil, Check, X } from "lucide-react"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import AirChangesGauge from "@/components/report/AirChangesGauge"

interface AirLeakageData {
  parameter: string
  title: string
  value: string
}

interface AirLeakageContentProps {
  data?: AirLeakageData
  isAdmin?: boolean
  onUpdateValue?: (newValue: string) => void
  onSave?: () => void
}

export function AirLeakageContent({ data, isAdmin = false, onUpdateValue, onSave }: AirLeakageContentProps) {
  const airLeakagePoints = [
    { id: 1, label: "Air Barrier and Thermal Barrier Alignment" },
    { id: 2, label: "Attic Air Sealing" },
    { id: 3, label: "Attic Kneewalls" },
    { id: 4, label: "Shaft for Piping or Ducts" },
    { id: 5, label: "Dropped Ceiling / Soffit" },
    { id: 6, label: "Staircase Framing at Exterior Wall" },
    { id: 7, label: "Porch Roof" },
    { id: 8, label: "Flue or Chimney Shaft" },
    { id: 9, label: "Attic Access" },
    { id: 10, label: "Recessed Lighting" },
    { id: 11, label: "Ducts" },
    { id: 12, label: "Whole-House Fan" },
    { id: 13, label: "Exterior Wall Penetrations" },
    { id: 14, label: "Fireplace Wall" },
    { id: 15, label: "Garage/Living Space Walls" },
    { id: 16, label: "Cantilevered Floor" },
    { id: 17, label: "Rim Joists, Sill Plate, Foundation, Floor" },
    { id: 18, label: "Windows & Doors" },
    { id: 19, label: "Common Walls Between Attached Dwelling Units" },
  ]

  console.log("AirLeakageContent data:", data)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const [value, setValue] = useState<number>(Number.parseFloat(data?.value || "0.00"))
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setValue(Number.parseFloat(data?.value || "0.00"))
  }, [data?.value])

  const handleSave = () => {
    if (onUpdateValue && isAdmin) {
      onUpdateValue(value.toFixed(2)) // Save the updated value
    }
    setIsEditing(false) // Exit editing mode
  }

  const handleCancel = () => {
    setValue(Number.parseFloat(data?.value || "0.00")) // Reset to the initial value
    setIsEditing(false) // Exit editing mode
  }

  const params = useParams()

  const bookingNumber = params.bookingNumber

  // Use the parent's onSave callback directly instead of handling API calls here
  const handleSubmit = () => {
    if (onSave) {
      onSave()
      toast.success("Air leakage data saved successfully!")
    }
  }

  // Custom card style to ensure shadow on all sides
  const cardStyle = "rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-gray-100 mb-2"

  return (
    <div className="space-y-8">
      {isAdmin && (
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-[#4caf50] text-white font-medium hover:bg-[#43a047] transition-colors"
          >
            Save
          </button>
        </div>
      )}
      {/* Introduction Section */}
      <motion.div {...fadeInUp} id="introduction">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="py-3 px-5" style={{ backgroundColor: "#031A821A" }}>
            <h2 className="font-medium" style={{ color: "#031A82" }}>BPI Approach to Air Sealing</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-8">
              The air sealing Ciel Power, LLC performs is a BPI approach. First, the attic top plates and penetration
              are sealed. Next, the attached garage is sealed from the living space. Then, the basement sill plate and
              penetrations are sealed. Finally, the exterior of the home around windows, baseboards, and doors are
              sealed.
            </p>

            <div className="flex items-start">
              <div className="flex-shrink-0 mr-6">
                <img src="/image 18.png" alt="Window illustration" className="w-32" />
              </div>

              <div className="flex-1">
                <div className="flex items-center p-4 rounded-lg" style={{ backgroundColor: "#F5F9FF" }}>
                  <Info className="h-5 w-5 mr-3 flex-shrink-0" style={{ color: "#031A82" }} />
                  <span style={{ color: "#031A82" }}>
                    A 1/16th inch unsealed crack around a window lets in as much cold air as leaving the window open 1/2 inch.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Air Flow Rates Section */}
      <motion.div {...fadeInUp} id="air-flow-rates">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="py-3 px-5" style={{ backgroundColor: "#031A821A" }}>
            <h2 className="font-medium" style={{ color: "#031A82" }}>Understanding Air Flow Rates</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-700 mb-4">
                  35% of the air in your home should exhaust each hour to maintain healthy ventilation.
                  Airflow rates above these levels create excessive strain on heating & cooling systems.
                </p>
                <div className="flex items-center">
                  <div className="w-48 h-3 bg-gray-200 rounded-md overflow-hidden mr-3">
                    <div className="h-full rounded-md" style={{ backgroundColor: "#031A821A" }}></div>
                  </div>
                  <span className="text-[#031A82] font-medium">Recommended: 35%</span>
                </div>
              </div>
              <div className="flex-shrink-0 ml-8">
                <svg width="100" height="80" viewBox="0 0 121 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M63.4165 85.3334C64.2616 85.9672 65.2452 86.3911 66.2862 86.5702C67.3273 86.7493 68.396 86.6784 69.4043 86.3635C70.4126 86.0485 71.3316 85.4984 72.0856 84.7586C72.8396 84.0188 73.407 83.1104 73.7411 82.1082C74.0751 81.1061 74.1662 80.0389 74.0069 78.9947C73.8476 77.9504 73.4424 76.9589 72.8248 76.102C72.2071 75.245 71.3947 74.5471 70.4544 74.0658C69.5141 73.5844 68.4729 73.3334 67.4165 73.3334H27.4165" stroke="#031A82" stroke-opacity="0.5" stroke-width="6.66667" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M79.0832 46.6667C79.9355 45.5303 81.0641 44.6307 82.3618 44.0532C83.6596 43.4757 85.0835 43.2395 86.4982 43.367C87.9129 43.4946 89.2716 43.9817 90.4451 44.782C91.6187 45.5824 92.5681 46.6694 93.2034 47.9399C93.8387 49.2104 94.1386 50.6222 94.0747 52.0413C94.0109 53.4603 93.5854 54.8395 92.8386 56.0478C92.0918 57.2561 91.0485 58.2535 89.8079 58.9452C88.5672 59.6369 87.1703 60 85.7498 60H27.4165" stroke="#031A82" stroke-opacity="0.5" stroke-width="6.66667" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M53.4165 34.6667C54.2616 34.0329 55.2452 33.609 56.2862 33.4299C57.3273 33.2508 58.396 33.3216 59.4043 33.6366C60.4126 33.9516 61.3316 34.5016 62.0856 35.2415C62.8396 35.9813 63.407 36.8897 63.7411 37.8919C64.0751 38.894 64.1662 39.9612 64.0069 41.0054C63.8476 42.0497 63.4424 43.0412 62.8248 43.8981C62.2071 44.7551 61.3947 45.453 60.4544 45.9343C59.5141 46.4157 58.4729 46.6667 57.4165 46.6667H27.4165" stroke="#031A82" stroke-opacity="0.5" stroke-width="6.66667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Air Changes Per Hour Section */}
      <motion.div {...fadeInUp} id="air-changes-per-hour">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="py-3 px-5" style={{ backgroundColor: "#031A821A" }}>
            <h2 className="font-medium" style={{ color: "#031A82" }}>Your Home's Air Changes Per Hour (ACH)</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              A measure of how many times the air within a dened space is replaced. This is determined based on the
              blower door reading of the space and the volume of the space.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Your Results</p>
                    <div className="flex items-center">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(Number.parseFloat(e.target.value))}
                            className="border rounded px-2 py-1 w-20"
                            min={0}
                            max={100}
                            step="0.01"
                            autoFocus
                          />
                          <button
                            onClick={handleSave}
                            className="p-1 bg-green-100 hover:bg-green-200 rounded text-green-600"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={handleCancel} className="p-1 bg-red-100 hover:bg-red-200 rounded text-red-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <p className="text-4xl font-bold" style={{ color: "#031A82" }}>{value.toFixed(2)}</p>
                          {isAdmin && (
                            <button onClick={() => setIsEditing(true)} className="p-1 hover:bg-gray-100 rounded">
                              <Pencil className="w-4 h-4" />
                            </button>
                          )}
                          <span className="ml-2 text-gray-600">ACH</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative w-28 h-24">
                    <ArrowUp className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-6 w-6 text-red-500" />
                    <Home className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14" style={{ color: "#031A82" }} />
                    <ArrowDown className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-6 w-6 text-green-500" />
                  </div>
                </div>
                
                <div className="inline-block p-4 rounded-lg" style={{ backgroundColor: "#031A820A", border: "0.5px solid #031A8233" }}>
                  <div className="flex items-center">
                    <Info className="h-5 w-5 mr-3 flex-shrink-0" style={{ color: "#031A82" }} />
                    <span style={{ color: "#031A82" }}>
                      BPI recommends the Air Changes per Hour be 0.35
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Gauge */}
              <div className="h-[260px] flex flex-col items-center"> {/* Reduced height */}
                <AirChangesGauge
                  value={value}
                  title="Your Air Changes"
                  subtitle="per Hour (ACH)"
                  showCard={false}
                  width="100%"
                  height="220px" // Adjusted height for better alignment
                />
                {/* Text directly below the gauge */}
                <div className="text-center mt-[-50px]"> {/* Negative margin to bring text closer */}
                  <p className="text-lg font-bold" style={{ color: "#031A82" }}>{value.toFixed(2)} ACH</p>
                  <p className="text-lg font-bold" style={{ color: "#031A82" }}>Your Air Changes</p>
                  <p className="text-sm text-gray-600">per Hour (ACH)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Common Air Leak Points */}
      <motion.div {...fadeInUp} id="common-air-leak-points">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="py-3 px-5" style={{ backgroundColor: "#031A821A" }}>
            <h3 className="font-medium" style={{ color: "#031A82" }}>Common Air Leak Points</h3>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              Air leakage rates and sources vary from house to house. To pinpoint air infiltration sources in your home,
              technicians use specialized equipment including blower door devices and infra red cameras.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {airLeakagePoints.map((point) => (
                <div
                  key={point.id}
                  className="flex items-center p-4 rounded-lg"
                  style={{ backgroundColor: "#031A820A", border: "0.5px solid #031A8233" }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: "#EBF1FF" }}>
                    <span className="font-medium" style={{ color: "#031A82" }}>{point.id}</span>
                  </div>
                  <span className="text-gray-700">{point.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

interface InPlaceEditProps {
  initialValue: string
  isAdmin: boolean
  onUpdate: (value: string) => void
}

function InPlaceEdit({ initialValue, isAdmin, onUpdate }: InPlaceEditProps) {
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
}
