"use client"

import { Info, Sun,Thermometer} from "lucide-react"

const ReportCoolingSectioninformation = () => {
  const cardStyle = "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden"
  return (
    <div>
      <div className={cardStyle} id="cooling-header">
        <div className="py-3 px-5 bg-white">
          <h1 className="flex items-center gap-3 font-bold text-xl text-[#d47c02]">
            <Thermometer className="h-6 w-6 text-[#d47c02]" />
            Understanding Your Home's Cooling Systems
          </h1>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-5 font-normal">
            During your Home Energy Assessment, our technician closely examined your cooling equipment to determine
            the efficiency level of the system.
          </p>
          <div className="flex items-center gap-3 py-2">
            <Info className="h-5 w-5 flex-shrink-0 text-[#d47c02]" />
            <p className="text-sm text-gray-700 font-normal">
              SEER (Seasonal Energy Efficiency Ratio) - A ratio of the cooling output during a typical cooling season
              with the total electric energy input during the same period.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportCoolingSectioninformation
