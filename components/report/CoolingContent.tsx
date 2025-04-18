// First, the updated CoolingContent component:

"use client"

import { Info, Sun } from "lucide-react"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import CoolingSystemCard from "@/components/report/CoolingSystemCard"

interface HeatingCoolingItem {
  condition: string
  name: string
  parameter: string
  type: string
  value: number | string
  year?: number
  image?: string
}

interface CoolingData {
  data: HeatingCoolingItem[]
  title: string
}

interface CoolingContentProps {
  data?: CoolingData
  isAdmin?: boolean
  onUpdateItem?: (updatedItem: HeatingCoolingItem) => void
  driveImages?: any[]
  onSave?: () => void
}

export function CoolingContent({ data, isAdmin = false, onUpdateItem, driveImages, onSave }: CoolingContentProps) {
  const params = useParams()
  const bookingNumber = params.bookingNumber

  // Get the cooling items to display
  const getCoolingItems = () => {
    // Use the provided data if available
    if (data?.data?.length > 0) {
      return data.data.filter(
        (item) =>
          item.name.toLowerCase().includes("a/c") ||
          item.name.toLowerCase().includes("air condition") ||
          item.name.toLowerCase().includes("cooling") ||
          item.name.toLowerCase().includes("heat pump"),
      )
    }

    // Otherwise, use default cooling items
    return [
      {
        condition: "Fair",
        name: "Central Air Conditioning",
        parameter: "SEER",
        type: "Central",
        value: 10,
        year: new Date().getFullYear(),
      },
    ]
  }

  // Get items to display
  const coolingItems = getCoolingItems()

  // Handle updating cooling items - directly pass to parent
  const handleUpdateItem = (updatedItem: HeatingCoolingItem) => {
    if (isAdmin && onUpdateItem) {
      console.log("Updating cooling item in CoolingContent:", updatedItem)
      onUpdateItem(updatedItem)
    }
  }

  // Use the parent's onSave callback directly instead of handling API calls
  const handleSubmit = () => {
    if (onSave) {
      onSave()
      toast.success("Cooling systems data saved successfully!")
    }
  }

  // Consistent card style matching Overview component
  const cardStyle = "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden"

  return (
    <div className="space-y-8">
      {isAdmin && (
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors"
            style={{ backgroundColor: "#B18C2E" }}
          >
            Save
          </button>
        </div>
      )}

      {/* Header card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} id="cooling-header">
        <div className={cardStyle}>
          <div className="py-3 px-5" style={{ backgroundColor: "#FFFCF3" }}>
            <h2 className="flex items-center gap-3 font-medium" style={{ color: "#B18C2E" }}>
              <Sun style={{ color: "#B18C2E" }} className="h-6 w-6" />
              Understanding Your Home&apos;s Cooling Systems
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-5 font-normal">
              During your Home Energy Assessment, our technician closely examined your cooling equipment to determine
              the efficiency level of the system.
            </p>
            <div className="flex items-center gap-3 py-2">
              <Info className="h-5 w-5 flex-shrink-0" style={{ color: "#B18C2E" }} />
              <p className="text-sm text-gray-700 font-normal">
                SEER (Seasonal Energy Efficiency Ratio) - A ratio of the cooling output during a typical cooling season
                with the total electric energy input during the same period.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {coolingItems.map((item, index) => (
        <div id={`cooling-system-${index}`}>
          <CoolingSystemCard
            key={`${item.name}-${index}`}
            item={item}
            index={index}
            isAdmin={isAdmin}
            onUpdateItem={handleUpdateItem}
            driveImages={driveImages}
          />
        </div>
      ))}
    </div>
  )
}