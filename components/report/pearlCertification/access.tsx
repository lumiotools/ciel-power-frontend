"use client";

import { CheckSquare, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Access() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white max-h-fit p-8">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src="/image 97.png" alt="checklist" />
            <h1 className="text-3xl font-bold text-[#67b502]">
              Accessing Your Pearl Certification
            </h1>
          </div>
          <button
            onClick={toggleExpanded}
            className="w-10 h-10 border-2 border-[#67b502] rounded-full flex items-center justify-center transition-all duration-300 group"
          >
            <ChevronUp
              className={`w-8 h-8 text-[#67b502] transition-all duration-300 ${
                isExpanded ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        </div>

        {/* Collapsible Content */}
        <div
          className={`text-xl transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-8">
            {/* First Paragraph */}
            <p className="text-[#444444] leading-relaxed">
              You'll receive your certification package shortly after your
              installation is complete. It will be available for download
              directly through your Ciel Customer Portal, and you'll be invited
              to activate your Green Door App account at the same time.
            </p>

            {/* Second Paragraph */}
            <p className="text-[#444444] leading-relaxed">
              If you need help interpreting your certification or using the
              materials in a real estate or refinancing context, your Ciel Home
              Performance Consultant is here to help.
            </p>

            {/* Highlighted Conclusion */}
            <p className="text-[#67b502] font-semibold leading-relaxed">
              Pearl Certification is just one more way we ensure that your
              investment in energy efficiency delivers meaningful, measurable
              results — now and into the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
