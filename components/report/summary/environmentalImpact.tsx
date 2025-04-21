import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  EnvironmentalImpactData,
  EnvironmentalImpactItem,
} from "@/app/admin/[bookingNumber]/report/page";
import { Leaf } from "lucide-react";
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

  useEffect(() => {
    if (onUpdateValue) {
      onUpdateValue(environmentalImpactData);
    }
  }, [environmentalImpactData]);

  const cardStyle =
    "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      id="environmental-impact"
    >
      <div className={cardStyle}>
        <div className="py-3 px-5 bg-[#67B5021A] dark:bg-green-900/20">
          <h2 className="flex items-center gap-2 font-medium text-[#67B502] dark:text-[#67B502]">
            <Leaf className="h-5 w-5 text-[#67B502]" />
            Environmental Impact
          </h2>
        </div>
        <div className="p-6 bg-white">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="flex items-start gap-3">
                <div className="bg-[#67B5021A] dark:bg-green-900/20 rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
                  <Leaf className="h-5 w-5 text-[#67B502]" />
                </div>
                <div>
                  <span className="font-medium text-[#67B502] dark:text-[#67B502]">
                    Household Carbon Footprint
                  </span>
                  <p className="text-xs text-gray-500">
                    *based on the Utility Bills provided (annually)
                  </p>
                </div>
              </div>
              <div className="text-[#67B502] font-semibold">
                <ValueWithUnit
                  isAdmin={isAdmin}
                  data={environmentalImpactData?.currentFootprint}
                  onUpdate={(currentFootprintValue) => {
                    setEnvironmentalImpactData((prev) => ({
                      ...prev,
                      currentFootprint: {
                        ...prev.currentFootprint,
                        value: currentFootprintValue,
                      },
                    }));
                  }}
                  placeholder="Enter value"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="flex items-start gap-3">
                <div className="bg-[#67B5021A] dark:bg-green-900/20 rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
                  <Leaf className="h-5 w-5 text-[#67B502]" />
                </div>
                <span className="font-medium text-[#67B502] dark:text-[#67B502]">
                  Projected Total Energy Savings
                </span>
              </div>
              <div className="text-[#67B502] font-semibold">
                <ValueWithUnit
                  isAdmin={isAdmin}
                  data={environmentalImpactData.projectedSavings}
                  onUpdate={(projectedSavingsValue) => {
                    setEnvironmentalImpactData((prev) => ({
                      ...prev,
                      projectedSavings: {
                        ...prev.projectedSavings,
                        value: projectedSavingsValue,
                      },
                    }));
                  }}
                  placeholder="Enter value"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="flex items-start gap-3">
                <div className="bg-[#67B5021A] dark:bg-green-900/20 rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
                  <Leaf className="h-5 w-5 text-[#67B502]" />
                </div>
                <div>
                  <span className="font-medium text-[#67B502] dark:text-[#67B502]">
                    Projected Carbon Footprint
                  </span>
                  <p className="text-xs text-gray-500">
                    *after installing proposed upgrades
                  </p>
                </div>
              </div>
              <div className="text-[#67B502] font-semibold">
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
                  placeholder="Enter value"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-[#67B5021A] p-6 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-md flex items-center justify-center aspect-square w-10 md:w-12">
                  <Leaf className="h-5 w-5 text-[#67B502]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#67B502] dark:text-[#67B502]">
                    Projected CO2 Reduction
                  </h4>
                  <p className="text-xs text-gray-500">
                    *Over a 10 year period
                  </p>
                </div>
              </div>
              <div className="text-[#67B502] text-xl font-bold">
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
                  placeholder="Enter value"
                />
              </div>
            </div>
          </motion.div>
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
    <div className="flex items-center">
      <div className="mr-1">
        {isAdmin ? (
          <ReportEditableInput
            placeholder={placeholder}
            value={data?.value ?? ""}
            onChange={(value) => onUpdate(value as string)}
          />
        ) : (
          data?.value
        )}
      </div>
      <span>{data?.unit}</span>
    </div>
  );
};
