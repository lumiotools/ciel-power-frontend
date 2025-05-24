"use client";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Home, InfoIcon } from "lucide-react";
import ReportAirLeakageSectionGauge from "./gauge";
import ReportEditableInput from "../common/editableInput";
import type { AirLeakageData } from "@/app/admin/[bookingNumber]/report/page";

interface AirLeakageACHProps {
  isAdmin?: boolean;
  airLeakage?: AirLeakageData;
  onUpdateValue?: (airLeakage: AirLeakageData) => void;
}

const ReportAirLeakageSectionACH = ({
  isAdmin,
  airLeakage,
  onUpdateValue,
}: AirLeakageACHProps) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      {...fadeInUp}
      id="air-changes-per-hour"
      className="p-6 border-t border-gray-200"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#031a82" }}>
        Your Home's Air Changes Per Hour (ACH)
      </h1>

      {/* Content Container */}
      <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
        <p className="text-gray-800 leading-relaxed text-base mb-6 max-w-[70%]">
          A measure of how many times the air within a defined space <br />
          is replaced. This is determined based on the blower <br />
          door reading of the space and the volume of the space.
        </p>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[15px]">
          {/* Left Side - Results */}
          <div className="flex-1">
            <h2 className="text-[#545454] text-xl font-medium mb-4">
              Your Results
            </h2>

            <div className="flex items-center gap-2 mb-6">
              {isAdmin ? (
                <ReportEditableInput
                  className="!text-[#031a82] !text-4xl !font-bold !w-32"
                  type="number"
                  value={airLeakage?.current_value || 0}
                  onChange={(value: string | number) => {
                    if (onUpdateValue) {
                      onUpdateValue({
                        title: "Air Leakage",
                        parameter: "ACH",
                        current_value: Number(value),
                        recommended_value: 0.35,
                      });
                    }
                  }}
                />
              ) : (
                <div className="text-[#031a82] text-4xl font-bold">
                  {airLeakage?.current_value}
                </div>
              )}
              <div className="text-[#031a82] text-2xl font-medium">ACH</div>

              <div className="flex flex-col items-center ml-[30px]">
                <ArrowUp className="text-red-500 w-6 h-6" />
                <Home className="text-[#031a82] w-12 h-12 stroke-2" />
                <ArrowDown className="text-[#03c412] w-6 h-6" />
              </div>
            </div>

            <div
              className="inline-block p-4 rounded-lg border"
              style={{
                borderColor: "#031A8233",
              }}
            >
              <div className="flex items-center">
                <InfoIcon
                  className="h-5 w-5 mr-3 flex-shrink-0"
                  style={{ color: "#031A82" }}
                />
                <span style={{ color: "#031A82" }}>
                  BPI recommends the Air Changes per Hour be 0.35
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Gauge */}
          <div className="h-[260px] flex flex-col items-center">
            <ReportAirLeakageSectionGauge
              value={airLeakage?.current_value || 0}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportAirLeakageSectionACH;
