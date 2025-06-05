"use client";

import { Info, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

const ReportCoolingSectioninformation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white w-full p-4 rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <div className="py-3 px-2 bg-white">
          <h1 className="flex items-center gap-3 font-bold text-xl text-[#d47c02]">
            <Thermometer className="h-6 w-6 text-[#d47c02]" />
            Understanding Your Home&apos;s Cooling Systems
          </h1>
        </div>
        <div className="p-6 border-2 border-gray-200 rounded-xl mx-5 mb-5">
          <p className="text-gray-700 mb-5 font-normal">
            During your Home Energy Assessment, our technician closely examined
            your cooling equipment to determine the efficiency level of the
            system.
          </p>
          <div className="flex items-center gap-3 py-2">
            <Info className="h-5 w-5 flex-shrink-0 text-[#d47c02]" />
            <p className="text-sm text-gray-700 font-normal">
              SEER (Seasonal Energy Efficiency Ratio) - A ratio of the cooling
              output during a typical cooling season with the total electric
              energy input during the same period.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportCoolingSectioninformation;
