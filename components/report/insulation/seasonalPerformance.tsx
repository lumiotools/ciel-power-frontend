import React from "react";
import Image from "next/image";

const ReportInsulationSectionSeasonalPerformance = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-[#308883] mb-6">
        Seasonal Performance
      </h2>
      <div className="border border-gray-200 rounded-lg p-4">
        <Image
          src="/image 83.png"
          alt="Diagram showing how insulation performs in summer and winter seasons"
          width={600}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default ReportInsulationSectionSeasonalPerformance;
