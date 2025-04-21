import { HeatingData } from "@/app/admin/[bookingNumber]/report/page";
import React from "react";
import { HouseImage } from "../heating/card";
import ReportHeatingSectioninformation from "./information";
import ReportHeatingSectionCard from "./card";

interface ReportHeatingSectionProps {
  isAdmin?: boolean;
  heatingData?: HeatingData[];
  onUpdateValue?: (heating: HeatingData[]) => void;
  houseImages?: HouseImage[];
}

const ReportHeatingSection = ({
  isAdmin,
  heatingData,
  houseImages,
  onUpdateValue,
}: ReportHeatingSectionProps) => {
  const addNewHeating = () => {
    if (!isAdmin) return;
    if (onUpdateValue && heatingData) {
      const emptyHeating: HeatingData = {
        title: "Your Home's Heating " + (heatingData.length + 1),
        type: "Unknown",
        condition: "Unknown",
        year: 0,
        parameter: "AFUE",
        current_value: "0%",
        recommended_value: "100%",
      };
      onUpdateValue([...heatingData, emptyHeating]);
    }
  };

  const deleteHeating = (index: number) => {
    if (!isAdmin) return;
    if (onUpdateValue && heatingData) {
      const updatedHeating = heatingData.filter((_, i) => i !== index);
      onUpdateValue(updatedHeating);
    }
  };

  return (
    <div className="space-y-8">
      {/* {isAdmin && (
        <div className="flex justify-end items-center mb-4">
          <button
            // onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors"
            style={{ backgroundColor: "#B18C2E" }}
          >
            Save
          </button>
        </div>
      )} */}

      <ReportHeatingSectioninformation />

      {heatingData?.map((heating, index) => (
        <ReportHeatingSectionCard
          key={`${heating.title}_${index}`}
          isAdmin={isAdmin}
          heating={heating}
          houseImages={houseImages}
          onUpdateValue={(updatedHeating) => {
            if (onUpdateValue)
              onUpdateValue([
                ...heatingData.slice(0, index),
                updatedHeating,
                ...heatingData.slice(index + 1),
              ]);
          }}
          onDelete={() => deleteHeating(index)}
        />
      ))}
      {isAdmin && (
        <div className="flex justify-center items-center">
          <button
            onClick={addNewHeating}
            className="px-4 py-2 rounded-full bg-[#B18C2E] text-white font-bold"
          >
            Add New Heating Section
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportHeatingSection;
