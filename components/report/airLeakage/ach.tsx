import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Home, InfoIcon } from "lucide-react";
import ReportAirLeakageSectionGauge from "./gauge";
import ReportEditableInput from "../common/editableInput";
import { AirLeakageData } from "@/app/admin/[bookingNumber]/report/page";

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

  const cardStyle =
    "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden";
  return (
    <motion.div {...fadeInUp} id="air-changes-per-hour">
      <div className={cardStyle}>
        <div className="py-3 px-5" style={{ backgroundColor: "#031A821A" }}>
          <h2 className="font-medium" style={{ color: "#031A82" }}>
            Your Home's Air Changes Per Hour (ACH)
          </h2>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            A measure of how many times the air within a defined space is
            replaced. This is determined based on the blower door reading of the
            space and the volume of the space.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-700 mb-2">Your Results</p>
                  <div className="flex items-center">
                    {isAdmin ? (
                      <ReportEditableInput
                        className="!text-4xl !font-bold !text-[#031A82] !w-32"
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
                      <p className="!text-4xl !font-bold !text-[#031A82]">
                        {airLeakage?.current_value}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative w-28 h-24">
                  <ArrowUp className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-6 w-6 text-red-500" />
                  <Home
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14"
                    style={{ color: "#031A82" }}
                  />
                  <ArrowDown className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-6 w-6 text-green-500" />
                </div>
              </div>

              <div
                className="inline-block p-4 rounded-lg"
                style={{
                  backgroundColor: "#031A820A",
                  border: "0.5px solid #031A8233",
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
      </div>
    </motion.div>
  );
};

export default ReportAirLeakageSectionACH;
