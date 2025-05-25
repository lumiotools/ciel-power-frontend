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

  const cardStyle =
    "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden";
  return (
    <motion.div {...fadeInUp} id="common-air-leak-points">
      <div className={cardStyle}>
        <div className="py-3 px-5" style={{ backgroundColor: "#031A821A" }}>
          <h3 className="font-medium" style={{ color: "#031A82" }}>
            Common Air Leak Points
          </h3>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Air leakage rates and sources vary from house to house. To pinpoint
            air infiltration sources in your home, technicians use specialized
            equipment including blower door devices and infra red cameras.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {airLeakagePoints.map((point) => (
              <div
                key={point.id}
                className="flex items-center p-4 rounded-lg"
                style={{
                  backgroundColor: "#031A820A",
                  border: "0.5px solid #031A8233",
                }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: "#EBF1FF" }}
                >
                  <span className="font-medium" style={{ color: "#031A82" }}>
                    {point.id}
                  </span>
                </div>
                <span className="text-gray-700">{point.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportAirLeakageSectionCommonAirLeakPoints;
