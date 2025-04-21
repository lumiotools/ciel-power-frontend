import { HeatingData } from "@/app/admin/[bookingNumber]/report/page";
import React, { useEffect, useState } from "react";
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
  const [heatingDataSection, setHeatingDataSection] = useState<HeatingData[]>(
    heatingData ?? []
  );

  useEffect(() => {
    if (onUpdateValue) {
      onUpdateValue(heatingDataSection);
    }
  }, [heatingDataSection]);

  const addNewHeating = () => {
    if (!isAdmin) return;
    setHeatingDataSection((prev) => [
      ...prev,
      {
        title: "Your Home's Heating " + (prev.length + 1),
        type: "Unknown",
        condition: "Unknown",
        year: 0,
        parameter: "AFUE",
        current_value: "0%",
        recommended_value: "100%",
      },
    ]);
  };

  const deleteHeating = (index: number) => {
    if (!isAdmin) return;
    setHeatingDataSection((prev) => prev.filter((_, i) => i !== index));
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

      <div id="heating-header">
        <ReportHeatingSectioninformation />
      </div>

      {heatingData?.map((heating, index) => (
        <div id={`heating-system-${index}`}>
          <ReportHeatingSectionCard
          key={`heating-system-${index}`}
          isAdmin={isAdmin}
          heating={heating}
          houseImages={houseImages}
          onUpdateValue={(updatedHeating) => {
            if (!isAdmin) return;
            setHeatingDataSection((prev) => [
              ...prev.map((h, i) => (i === index ? updatedHeating : h)),
            ]);
          }}
          onDelete={() => deleteHeating(index)}
        />
        </div>
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
