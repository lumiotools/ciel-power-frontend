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
      className="bg-white max-h-fit p-8"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#031a82" }}>
        Your Home&apos;s Air Changes Per Hour (ACH)
      </h1>

      {/* Content Container */}
      <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex flex-row">
          {/* Left side content */}
          <div className="w-1/2 pr-8">
            {/* Description text */}
            <p className="text-gray-800 leading-relaxed text-base mb-10">
              A measure of how many times the air within a defined space is
              replaced. This is determined based on the blower door reading of
              the space and the volume of the space.
            </p>

            {/* Results section */}
            <div className="space-y-6">
              <h2 className="text-[#545454] text-xl font-medium">
                Your Results
              </h2>

              <div className="flex items-center gap-x-8">
                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <ReportEditableInput
                      className="!text-[#031a82] !text-5xl !font-bold !w-32"
                      type="number"
                      value={airLeakage?.current_value || 0.95}
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
                    <div className="text-[#031a82] text-5xl font-bold">
                      {airLeakage?.current_value || 0.95}
                    </div>
                  )}
                  <div className="text-[#031a82] text-2xl font-medium">ACH</div>
                </div>

                <div id="air-leakage-svg" className="relative w-28 h-24">
                  <ArrowUp className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-6 w-6 text-[#d20000]" />
                  <Home
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14"
                    style={{ color: "#031A82" }}
                  />
                  <ArrowDown className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-6 w-6 text-[#03c412]" />
                </div>
              </div>

              <div
                className="inline-block p-4 rounded-lg border mt-4"
                style={{
                  backgroundColor: "#031A820A",
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
          </div>

          {/* Right side gauge */}
          <div className="w-1/2">
            <div className="h-full flex items-center justify-center">
              <ReportAirLeakageSectionGauge
                value={airLeakage?.current_value || 0.95}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportAirLeakageSectionACH;
