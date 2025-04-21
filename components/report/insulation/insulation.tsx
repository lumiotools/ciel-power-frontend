import React from "react";
import ReportInsulationSectionOverview from "./overview";
import { InsulationData } from "@/app/admin/[bookingNumber]/report/page";
import ReportInsulationSectionTechnicalAspects from "./technicalAspects";
import ReportInsulationSectionSeasonalPerformance from "./seasonalPerformance";
import ReportInsulationSectionBenefits from "./benefits";
import ReportInsulationSectionCard, { HouseImage } from "./card";
import { motion } from "framer-motion";

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
    <div className="space-y-8">
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

      <div id="insulation-overview">
        <ReportInsulationSectionOverview />
      </div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        id="technical-aspects"
      >
        <ReportInsulationSectionTechnicalAspects />
        <ReportInsulationSectionSeasonalPerformance />
      </motion.div>

      <div id="insulation-benefits">
        <ReportInsulationSectionBenefits />
      </div>

      {insulationData &&
        insulationData.map((insulation, index) => (
          <div key={`insulation-zone-${index}`} id={`insulation-zone-${index}`}>
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
        <div className="flex justify-center items-center">
          <button
            onClick={addNewInsulation}
            className="px-4 py-2 rounded-full bg-[#256C68] text-white font-bold"
          >
            Add New Insulation Section
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportInsulationSection;
