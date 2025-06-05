"use client";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

const ReportAirLeakageSectionIntroduction = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      {...fadeInUp}
      id="introduction"
      className="bg-white max-h-fit p-8"
    >
      {/* Header */}
      <h1
        className="bg-white text-3xl font-bold mb-6"
        style={{ color: "#031a82" }}
      >
        Understanding Air Leakage
      </h1>

      {/* Content Container */}
      <div className="bg-[#ffffff] rounded-2xl border border-gray-200 p-8 shadow-sm">
        <p className="text-gray-800 leading-relaxed text-base">
          This section explains how uncontrolled air leakage affects your home's
          energy efficiency, comfort, and air quality. It highlights the
          consequences of relying on natural ventilation through leaks, such as
          inconsistent airflow and potential health or structural issues, and
          introduces the benefits of sealing cracks and openings to improve
          indoor comfort and durability.
        </p>

        {/* <div className="flex items-center px-16">
          <div className="flex-shrink-0 mr-6">
            <img
              src="/image 18.png"
              alt="Window illustration"
              className="w-32"
            />
          </div>

          <div className="flex-1">
            <div
              className="flex items-center p-4 rounded-lg"
              style={{ backgroundColor: "#F5F9FF" }}
            >
              <Info
                className="h-5 w-5 mr-3 flex-shrink-0"
                style={{ color: "#031A82" }}
              />
              <span style={{ color: "#031A82" }}>
                A 1/16th inch unsealed crack around a window lets in as much
                cold air as leaving the window open 1/2 inch.
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </motion.div>
  );
};

export default ReportAirLeakageSectionIntroduction;
