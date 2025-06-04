import React, { useEffect, useState } from "react";
import ReportInsulationSectionOverview from "./overview";
import { InsulationData } from "@/app/admin/[bookingNumber]/report/page";
import ReportInsulationSectionTechnicalAspects from "./technicalAspects";
import ReportInsulationSectionSeasonalPerformance from "./seasonalPerformance";
import ReportInsulationSectionBenefits from "./benefits";
import ReportInsulationSectionCard, { HouseImage } from "./card";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface ReportInsulationSectionProps {
  isAdmin?: boolean;
  insulationData?: InsulationData[];
  onUpdateValue?: (insulationData: InsulationData[]) => void;
  houseImages?: HouseImage[];
}

const ReportInsulationSection = ({
  isAdmin,
  insulationData,
  houseImages,
  onUpdateValue,
}: ReportInsulationSectionProps) => {
  const addNewInsulation = () => {
    if (!isAdmin) return;
    if (onUpdateValue && insulationData) {
      const emptyInsulation: InsulationData = {
        title: "Your Home's Insulation " + (insulationData.length + 1),
        material: "Unknown",
        condition: "Unknown",
        current_rValue: 0,
        recommended_rValue: 60,
      };
      onUpdateValue([...insulationData, emptyInsulation]);
    }
  };

  const deleteInsulation = (index: number) => {
    if (!isAdmin) return;
    if (onUpdateValue && insulationData) {
      const updatedInsulation = insulationData.filter((_, i) => i !== index);
      onUpdateValue(updatedInsulation);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 container bg-[#eaeaea]"
    >
      {/* {isAdmin && (
        <div className="flex justify-end items-center">
          <button
            // onClick={handleSubmit}
            className=" px-4 py-2 rounded-full bg-green-500 text-white font-bold "
          >
            Save
          </button>
        </div>
      )} */}

      <section
        id="insulation-overview-intro"
        className="min-h-screen flex items-center justify-center"
      >
        <ReportInsulationSectionOverview />
      </section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white p-4"
        id="technical-aspects"
      >
        <ReportInsulationSectionTechnicalAspects />
        <ReportInsulationSectionSeasonalPerformance />
      </motion.div>
      <div
        id="insulation-benefits"
        className="min-h-screen flex items-center justify-center"
      >
        <ReportInsulationSectionBenefits />
      </div>

      {insulationData &&
        insulationData.map((insulation, index) => (
          <div
            key={`insulation-zone-${index}`}
            id={`insulation-zone-${index}`}
            className="flex items-center justify-center"
          >
            <ReportInsulationSectionCard
              key={`${insulation.title}-${index}`}
              isAdmin={isAdmin}
              insulation={insulation}
              houseImages={houseImages}
              onUpdateValue={(updatedInsulation) => {
                if (onUpdateValue)
                  onUpdateValue([
                    ...insulationData.slice(0, index),
                    updatedInsulation,
                    ...insulationData.slice(index + 1),
                  ]);
              }}
              onDelete={() => deleteInsulation(index)}
            />
          </div>
        ))}

      {isAdmin && (
        <div className="flex justify-center items-center fixed bottom-5 left-[40%]">
          <button
            onClick={addNewInsulation}
            className="px-4 py-2 rounded-full bg-[#308883] text-white font-bold"
          >
            Add New Insulation Section
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ReportInsulationSection;
