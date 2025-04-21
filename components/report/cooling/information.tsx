import React from "react";
import { motion } from "framer-motion";
import { Info, Sun } from "lucide-react";

const ReportCoolingSectioninformation = () => {
  const cardStyle =
    "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden";
  return (
    <div>
     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} id="cooling-header">
        <div className={cardStyle}>
          <div className="py-3 px-5" style={{ backgroundColor: "#FFFCF3" }}>
            <h2 className="flex items-center gap-3 font-medium" style={{ color: "#B18C2E" }}>
              <Sun style={{ color: "#B18C2E" }} className="h-6 w-6" />
              Understanding Your Home&apos;s Cooling Systems
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-5 font-normal">
              During your Home Energy Assessment, our technician closely examined your cooling equipment to determine
              the efficiency level of the system.
            </p>
            <div className="flex items-center gap-3 py-2">
              <Info className="h-5 w-5 flex-shrink-0" style={{ color: "#B18C2E" }} />
              <p className="text-sm text-gray-700 font-normal">
                SEER (Seasonal Energy Efficiency Ratio) - A ratio of the cooling output during a typical cooling season
                with the total electric energy input during the same period.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportCoolingSectioninformation;
