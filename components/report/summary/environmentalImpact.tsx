import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  EnvironmentalImpactData,
  EnvironmentalImpactItem,
} from "@/app/admin/[bookingNumber]/report/page";
import { Leaf, Footprints, Percent, ChevronUp } from "lucide-react";
import ReportEditableInput from "../common/editableInput";

interface ReportSummarySectionEnvironmentalImpactProps {
  isAdmin?: boolean;
  environmentalImpact?: EnvironmentalImpactData;
  onUpdateValue?: (environmentalImpact: EnvironmentalImpactData) => void;
}

const ReportSummarySectionEnvironmentalImpact = ({
  isAdmin,
  environmentalImpact,
  onUpdateValue,
}: ReportSummarySectionEnvironmentalImpactProps) => {
  const [environmentalImpactData, setEnvironmentalImpactData] =
    useState<EnvironmentalImpactData>(
      environmentalImpact ?? {
        title: "Environmental Impact",
        currentFootprint: { value: "", unit: "lbs of CO2" },
        projectedSavings: { value: "", unit: "%" },
        projectedFootprint: { value: "", unit: "lbs of CO2" },
        totalReduction: { value: "", unit: "lbs of CO2" },
      }
    );

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (onUpdateValue) {
      onUpdateValue(environmentalImpactData);
    }
  }, [environmentalImpactData]);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const cardStyle =
    "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      id="environmental-impact"
      className="w-full border-b border-gray-200 mb-4 mt-4 pb-2"
    >
      <div className="w-full mx-auto px-4 py-4">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Leaf className="text-[#67b502] w-8 h-8 mr-2" />
            <h2 className="text-[#67b502] text-2xl font-bold">
              Environmental Impact
            </h2>
          </div>
          {/* Add toggle button */}
          <button
            onClick={toggleSection}
            className="text-[#67b502] transition-transform duration-300 border-2 border-[#67b502] rounded-full p-0.5"
            aria-label={isOpen ? "Hide section" : "Show section"}
          >
            <ChevronUp
              className={`w-6 h-6 transition-transform duration-300 ${
                isOpen ? "" : "transform rotate-180"
              }`}
            />
          </button>
        </div>

        {/* Wrap content in collapsible div */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="mt-4 space-y-4">
            {/* Household Carbon Footprint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#ffffff] rounded-xl border border-gray-200 px-6 py-5 shadow-sm"
            >
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex items-center justify-center">
                    <Footprints className="h-6 w-6 text-[#67B502]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#545454]">
                      Household Carbon Footprint
                    </h3>
                    <p className="text-xs text-gray-500 text-left">
                      *based on the Utility Bills provided (annually)
                    </p>
                  </div>
                </div>
                <div className="font-semibold text-lg text-[#545454]">
                  <ValueWithUnit
                    isAdmin={isAdmin}
                    data={environmentalImpactData?.currentFootprint}
                    onUpdate={(value) => {
                      setEnvironmentalImpactData((prev) => ({
                        ...prev,
                        currentFootprint: {
                          ...prev.currentFootprint,
                          value: value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Projected Total Energy Savings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#ffffff] rounded-xl border border-gray-200 px-6 py-5 shadow-sm"
            >
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex items-center justify-center">
                    <Percent className="h-6 w-6 text-[#67B502]" />
                  </div>
                  <h3 className="font-semibold text-lg text-[#545454]">
                    Projected Total Energy Savings
                  </h3>
                </div>
                <div className="font-semibold text-lg text-[#545454]">
                  <ValueWithUnit
                    isAdmin={isAdmin}
                    data={environmentalImpactData.projectedSavings}
                    onUpdate={(value) => {
                      setEnvironmentalImpactData((prev) => ({
                        ...prev,
                        projectedSavings: {
                          ...prev.projectedSavings,
                          value: value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Projected Carbon Footprint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#ffffff] rounded-xl border border-gray-200 px-6 py-5 shadow-sm"
            >
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-[#67B502]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#545454]">
                      Projected Carbon Footprint
                    </h3>
                    <p className="text-xs text-gray-500 text-left">
                      *after installing proposed upgrades
                    </p>
                  </div>
                </div>
                <div className="font-semibold text-lg text-[#545454]">
                  <ValueWithUnit
                    isAdmin={isAdmin}
                    data={environmentalImpactData.projectedFootprint}
                    onUpdate={(value) =>
                      setEnvironmentalImpactData((prev) => ({
                        ...prev,
                        projectedFootprint: {
                          ...prev.projectedFootprint,
                          value: value,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </motion.div>

            {/* Total CO2 Reduction Summary Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#ffffff] rounded-xl text-center border border-gray-200 p-8 shadow-sm"
            >
              <h3
                className="text-3xl font-semibold mb-2"
                style={{ color: "#545454" }}
              >
                Projected CO2 Reduction
              </h3>
              <div
                className="font-semibold text-2xl"
                style={{ color: "#67B502" }}
              >
                <ValueWithUnit
                  isAdmin={isAdmin}
                  data={environmentalImpactData.totalReduction}
                  onUpdate={(value) =>
                    setEnvironmentalImpactData((prev) => ({
                      ...prev,
                      totalReduction: {
                        ...prev.totalReduction,
                        value: value,
                      },
                    }))
                  }
                />
              </div>
              <div className="text-xs text-gray-600 mt-2">
                *Over a 10 year period
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportSummarySectionEnvironmentalImpact;

// Value with unit component that displays them inline
interface ValueWithUnitProps {
  data?: EnvironmentalImpactItem;
  isAdmin?: boolean;
  onUpdate: (value: string) => void;
  placeholder?: string;
}

const ValueWithUnit: React.FC<ValueWithUnitProps> = ({
  data,
  isAdmin,
  onUpdate,
  placeholder = "Enter value",
}) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center justify-center gap-1">
        <div className="text-center">
          {isAdmin ? (
            <ReportEditableInput
              placeholder={placeholder}
              value={data?.value ?? ""}
              onChange={(value) => onUpdate(value as string)}
              className="text-center text-gray-400 placeholder:text-gray-300" // Added placeholder color
            />
          ) : (
            data?.value
          )}
        </div>
        <span className="whitespace-nowrap">{data?.unit}</span>
      </div>
    </div>
  );
};
