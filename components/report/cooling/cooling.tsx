import { CoolingData } from "@/app/admin/[bookingNumber]/report/page";
import React, { useEffect, useState } from "react";
import { HouseImage } from "./card";
import ReportCoolingSectioninformation from "./information";
import ReportCoolingSectionCard from "./card";

interface ReportCoolingSectionProps {
  isAdmin?: boolean;
  coolingData?: CoolingData[];
  onUpdateValue?: (cooling: CoolingData[]) => void;
  houseImages?: HouseImage[];
}

const ReportCoolingSection = ({
  isAdmin,
  coolingData,
  houseImages,
  onUpdateValue,
}: ReportCoolingSectionProps) => {
  const [coolingDataSection, setCoolingDataSection] = useState<CoolingData[]>(
    coolingData ?? []
  );

  useEffect(() => {
    if (onUpdateValue) {
      onUpdateValue(coolingDataSection);
    }
  }, [coolingDataSection]);

  const addNewCooling = () => {
    if (!isAdmin) return;
    setCoolingDataSection((prev) => [
      ...prev,
      {
        title: "Your Home's Cooling " + (prev.length + 1),
        type: "Unknown",
        condition: "Unknown",
        year: 0,
        parameter: "SEER",
        current_value: 0,
        recommended_value: 100,
      },
    ]);
  };

  const deleteCooling = (index: number) => {
    if (!isAdmin) return;
    setCoolingDataSection((prev) => prev.filter((_, i) => i !== index));
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

      <ReportCoolingSectioninformation />

      {coolingDataSection?.map((cooling, index) => (
        <ReportCoolingSectionCard
          key={`${cooling.title}_${index}`}
          isAdmin={isAdmin}
          cooling={cooling}
          houseImages={houseImages}
          onUpdateValue={(updatedCooling) => {
            if (!isAdmin) return;
            setCoolingDataSection((prev) =>
              prev.map((item, i) => (i === index ? updatedCooling : item))
            );
          }}
          onDelete={() => deleteCooling(index)}
        />
      ))}

      {isAdmin && (
        <div className="flex justify-center items-center">
          <button
            onClick={addNewCooling}
            className="px-4 py-2 rounded-full bg-[#B18C2E] text-white font-bold"
          >
            Add New Cooling Section
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportCoolingSection;
