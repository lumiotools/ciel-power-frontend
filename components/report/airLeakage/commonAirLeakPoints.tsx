"use client";
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

  return (
    <motion.div
      {...fadeInUp}
      id="common-air-leak-points"
      className="bg-white max-h-fit p-8 border-t border-gray-200"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#031a82" }}>
        Air Sealing Trouble Spots
      </h1>

      {/* Content Container */}
      <div className="bg-[#ffffff] rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex flex-row gap-8">
          {/* House Diagram */}
          <div className="w-[42.5%] border-r-[3px] border-gray-200 pr-4">
            <img
              src="/images/air-sealing-diagram.png"
              alt="House air sealing trouble spots diagram"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Air Leak Points List */}
          <div className="w-[57.5%]">
            <div className="flex gap-8">
              {/* First Column (1-10) */}
              <div className="flex-1">
                {airLeakagePoints.slice(0, 10).map((point) => (
                  <div key={point.id} className="flex items-start gap-3 mb-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: "#031A82" }}
                    >
                      <span className="font-medium text-white text-sm leading-none">
                        {point.id}
                      </span>
                    </div>
                    <span className="text-gray-800 text-sm font-semibold leading-relaxed flex-1">
                      {point.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Second Column (11-19) */}
              <div className="flex-1">
                {airLeakagePoints.slice(10).map((point) => (
                  <div key={point.id} className="flex items-start gap-3 mb-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: "#031A82" }}
                    >
                      <span className="font-medium text-white text-sm leading-none">
                        {point.id}
                      </span>
                    </div>
                    <span className="text-gray-800 text-sm font-semibold leading-relaxed flex-1">
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
