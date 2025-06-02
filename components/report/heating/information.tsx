"use client";
import { motion } from "framer-motion";
import { Info, Thermometer } from "lucide-react";

const ReportHeatingSectioninformation = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        id="heating-header"
        className="bg-white min-w-[99vw] max-h-fit p-8"
      >
        {/* Outer Container with Border */}
        <div className="bg-white rounded-lg p-6 mb-6">
          {/* Header Section - Inside outer border */}
          <div className="mb-6">
            <h2
              className="flex items-center gap-3 font-bold text-xl"
              style={{ color: "#d47c02" }}
            >
              <Thermometer style={{ color: "#d47c02" }} className="h-6 w-6" />
              Understanding Your Home&apos;s Heating Systems
            </h2>
          </div>

          {/* Inner Content Box */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <p className="text-gray-700 mb-6 font-normal text-lg">
              During your Home Energy Assessment, our technician closely
              examined the insulation levels in your home
            </p>

            {/* Info Section */}
            <div className="flex items-start gap-3">
              <Info
                className="h-5 w-5 flex-shrink-0 mt-1"
                style={{ color: "#d47c02" }}
              />
              <p className="text-base text-gray-700 font-normal">
                (Unified) Energy Factor - A measure of efficiency by how
                effective the heat from the energy source is transferred to the
                water
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportHeatingSectioninformation;
