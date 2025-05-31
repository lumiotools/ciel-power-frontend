"use client";

import type { CoolingData } from "@/app/admin/[bookingNumber]/report/page";
import { useState } from "react";
import type { HouseImage } from "./card";
import ReportCoolingSectioninformation from "./information";
import ReportCoolingSectionCard from "./card";
import AirConditioningAssessment from "./assessment";
import { motion } from "framer-motion";

interface ReportCoolingSectionProps {
  isAdmin?: boolean;
  coolingData?: CoolingData[];
  onUpdateValue?: (cooling: CoolingData[]) => void;
  houseImages?: HouseImage[];
}

const ReportCoolingSection = ({
  isAdmin,
  coolingData = [],
  houseImages,
  onUpdateValue,
}: ReportCoolingSectionProps) => {
  const [coolingDataSection, setCoolingDataSection] =
    useState<CoolingData[]>(coolingData);

  const addNewCooling = () => {
    if (!isAdmin) return;
    const newCooling: CoolingData = {
      title: "Your Home's Cooling " + (coolingDataSection.length + 1),
      type: "Unknown",
      condition: "Unknown",
      year: 0,
      parameter: "SEER",
      current_value: 0,
      recommended_value: 100,
    };

    const updatedData = [...coolingDataSection, newCooling];
    setCoolingDataSection(updatedData);
    onUpdateValue?.(updatedData);
  };

  const deleteCooling = (index: number) => {
    if (!isAdmin) return;
    const updatedData = coolingDataSection.filter((_, i) => i !== index);
    setCoolingDataSection(updatedData);
    onUpdateValue?.(updatedData);
  };

  const updateCooling = (index: number, updatedCooling: CoolingData) => {
    if (!isAdmin) return;
    const updatedData = coolingDataSection.map((c, i) =>
      i === index ? updatedCooling : c
    );
    setCoolingDataSection(updatedData);
    onUpdateValue?.(updatedData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 container bg-[#eaeaea]"
    >
      <div
        id="cooling-header"
        className="min-h-screen flex items-center justify-center"
      >
        <ReportCoolingSectioninformation />
      </div>

      {/* Air Conditioning Assessment Section */}
      <div
        id="air-conditioning-assessment"
        className="min-h-screen flex items-center justify-center"
      >
        <AirConditioningAssessment
          isAdmin={isAdmin}
          houseImages={houseImages}
          selectedImages={[]} // You can add state management for this if needed
          onUpdateImages={(images) => {
            // Add state management logic here if needed
            console.log("Assessment images updated:", images);
          }}
        />
      </div>

      {coolingDataSection?.map((cooling, index) => (
        <div
          key={`cooling-system-${index}`}
          id={`cooling-system-${index}`}
          className="min-h-screen flex items-center justify-center"
        >
          <ReportCoolingSectionCard
            isAdmin={isAdmin}
            cooling={cooling}
            houseImages={houseImages}
            onUpdateValue={(updatedCooling) =>
              updateCooling(index, updatedCooling)
            }
            onDelete={() => deleteCooling(index)}
          />
        </div>
      ))}

      {isAdmin && (
        <div className="flex justify-center items-center fixed bottom-5 left-[40%]">
          <button
            onClick={addNewCooling}
            className="px-4 py-2 rounded-full bg-[#d47c02] text-white font-bold"
          >
            Add New Cooling Section
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ReportCoolingSection;
