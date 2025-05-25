import React from "react";
import { motion } from "framer-motion";

const ReportAirLeakageSectionCommonAirLeakPoints = () => {
  const airLeakagePoints = [
    { id: 1, label: "Air Barrier and Thermal Barrier Alignment" },
    { id: 2, label: "Attic Air Sealing" },
    { id: 3, label: "Attic Kneewalls" },
    { id: 4, label: "Shaft for Piping or Ducts" },
    { id: 5, label: "Dropped Ceiling / Soffit" },
    { id: 6, label: "Staircase Framing at Exterior Wall" },
    { id: 7, label: "Porch Roof" },
    { id: 8, label: "Flue or Chimney Shaft" },
    { id: 9, label: "Attic Access" },
    { id: 10, label: "Recessed Lighting" },
    { id: 11, label: "Ducts" },
    { id: 12, label: "Whole-House Fan" },
    { id: 13, label: "Exterior Wall Penetrations" },
    { id: 14, label: "Fireplace Wall" },
    { id: 15, label: "Garage/Living Space Walls" },
    { id: 16, label: "Cantilevered Floor" },
    { id: 17, label: "Rim Joists, Sill Plate, Foundation, Floor" },
    { id: 18, label: "Windows & Doors" },
    { id: 19, label: "Common Walls Between Attached Dwelling Units" },
  ];
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const cardStyle = "bg-white rounded-lg overflow-hidden";
  return (
    <motion.div {...fadeInUp} id="common-air-leak-points">
      <div className="border border-gray-200 rounded-xl p-6">
        <h2 className="text-[#002366] text-2xl font-bold mb-6">
          Air Sealing Trouble Spots
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* House Diagram */}
          <div className="md:w-[40%]">
            <img
              src="/images/air-sealing-diagram.png"
              alt="House air sealing trouble spots diagram"
              className="w-full h-auto"
            />
          </div>

          {/* Air Leak Points List */}
          <div className="md:w-[60%]">
            <div className="flex relative">
              {/* First Column (1-10) */}
              <div className="flex-1 pr-4">
                {airLeakagePoints.slice(0, 10).map((point) => (
                  <div key={point.id} className="flex items-center gap-2 mb-2">
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#002366" }}
                    >
                      <span className="font-medium text-white text-xs">
                        {point.id}
                      </span>
                    </div>
                    <span className="text-[#002366] text-xs font-medium">
                      {point.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Vertical Separator Line */}
              <div className="w-[1px] bg-gray-200 absolute h-full top-0 left-1/2"></div>

              {/* Second Column (11-19) */}
              <div className="flex-1 pl-4">
                {airLeakagePoints.slice(10).map((point) => (
                  <div key={point.id} className="flex items-center gap-2 mb-2">
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#002366" }}
                    >
                      <span className="font-medium text-white text-xs">
                        {point.id}
                      </span>
                    </div>
                    <span className="text-[#002366] text-xs font-medium">
                      {point.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportAirLeakageSectionCommonAirLeakPoints;
