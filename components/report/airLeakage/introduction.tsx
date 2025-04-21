import React from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

const ReportAirLeakageSectionIntroduction = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const cardStyle =
    "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden";

  return (
    <motion.div {...fadeInUp} id="introduction">
      <div className={cardStyle}>
        <div className="py-3 px-5" style={{ backgroundColor: "#031A821A" }}>
          <h2 className="font-medium" style={{ color: "#031A82" }}>
            BPI Approach to Air Sealing
          </h2>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-8">
            The air sealing Ciel Power, LLC performs is a BPI approach. First,
            the attic top plates and penetration are sealed. Next, the attached
            garage is sealed from the living space. Then, the basement sill
            plate and penetrations are sealed. Finally, the exterior of the home
            around windows, baseboards, and doors are sealed.
          </p>

          <div className="flex items-center px-16">
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
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportAirLeakageSectionIntroduction;
