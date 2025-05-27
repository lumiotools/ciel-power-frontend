import type React from "react";
import ReportAirLeakageSectionIntroduction from "./introduction";
import ReportAirLeakageSectionAirFlowRate from "./airFlowRate";
import ReportAirLeakageSectionCommonAirLeakPoints from "./commonAirLeakPoints";
import ReportAirLeakageSectionACH from "./ach";
import { AirLeakageData } from "@/app/admin/[bookingNumber]/report/page";
import { motion } from "framer-motion";

interface AirLeakageProps {
  isAdmin?: boolean;
  airLeakage?: AirLeakageData;
  onUpdateValue?: (airLeakage: AirLeakageData) => void;
}

const ReportAirLeakageSection = ({
  isAdmin,
  airLeakage,
  onUpdateValue,
}: AirLeakageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="summary-of-concerns"
    >
      {/* {isAdmin && (
        <div className="flex justify-end items-center mb-4">
          <button
            // onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-[#4caf50] text-white font-medium hover:bg-[#43a047] transition-colors"
          >
            Save
          </button>
        </div>
      )} */}

      <ReportAirLeakageSectionIntroduction />

      <ReportAirLeakageSectionAirFlowRate />

      <ReportAirLeakageSectionACH
        isAdmin={isAdmin}
        airLeakage={airLeakage}
        onUpdateValue={onUpdateValue}
      />

      <ReportAirLeakageSectionCommonAirLeakPoints />
    </motion.div>
  );
};

export default ReportAirLeakageSection;
