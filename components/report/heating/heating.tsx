"use client"

import type { HeatingData } from "@/app/admin/[bookingNumber]/report/page"
import { useState } from "react"
import type { HouseImage } from "../heating/card"
import ReportHeatingSectioninformation from "./information"
import ReportHeatingSectionCard from "./card"
import ClientsEquipment from "./clients-equipment"

interface ReportHeatingSectionProps {
  isAdmin?: boolean
  heatingData?: HeatingData[]
  onUpdateValue?: (heating: HeatingData[]) => void
  houseImages?: HouseImage[]
  clientEquipmentImages?: HouseImage[]
  onUpdateClientEquipment?: (images: HouseImage[]) => void
}

const ReportHeatingSection = ({
  isAdmin,
  heatingData = [],
  houseImages,
  onUpdateValue,
  clientEquipmentImages = [],
  onUpdateClientEquipment,
}: ReportHeatingSectionProps) => {
  const [heatingDataSection, setHeatingDataSection] = useState<HeatingData[]>(heatingData)

  const addNewHeating = () => {
    if (!isAdmin) return
    const newHeating: HeatingData = {
      title: "Your Home's Heating " + (heatingDataSection.length + 1),
      type: "Unknown",
      condition: "Unknown",
      year: 0,
      parameter: "AFUE",
      current_value: "0%",
      recommended_value: "100%",
    }

    const updatedData = [...heatingDataSection, newHeating]
    setHeatingDataSection(updatedData)
    onUpdateValue?.(updatedData)
  }

  const deleteHeating = (index: number) => {
    if (!isAdmin) return
    const updatedData = heatingDataSection.filter((_, i) => i !== index)
    setHeatingDataSection(updatedData)
    onUpdateValue?.(updatedData)
  }

  const updateHeating = (index: number, updatedHeating: HeatingData) => {
    if (!isAdmin) return
    const updatedData = heatingDataSection.map((h, i) => (i === index ? updatedHeating : h))
    setHeatingDataSection(updatedData)
    onUpdateValue?.(updatedData)
  }

  return (
    <div className="space-y-8">
      <div id="heating-header">
        <ReportHeatingSectioninformation />
      </div>

      {heatingDataSection?.map((heating, index) => (
        <div key={`heating-system-${index}`} id={`heating-system-${index}`}>
          <ReportHeatingSectionCard
            isAdmin={isAdmin}
            heating={heating}
            houseImages={houseImages}
            onUpdateValue={(updatedHeating) => updateHeating(index, updatedHeating)}
            onDelete={() => deleteHeating(index)}
          />
        </div>
      ))}

      {isAdmin && (
        <div className="flex justify-center items-center">
          <button onClick={addNewHeating} className="px-4 py-2 rounded-full bg-[#d47c02] text-white font-bold">
            Add New Heating Section
          </button>
        </div>
      )}

      {/* Client's Equipment Section */}
      <div id="clients-equipment">
        <ClientsEquipment
          isAdmin={isAdmin}
          houseImages={houseImages}
          selectedImages={clientEquipmentImages}
          onUpdateImages={onUpdateClientEquipment}
        />
      </div>
    </div>
  )
}

export default ReportHeatingSection
