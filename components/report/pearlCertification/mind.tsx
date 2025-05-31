"use client";

import { Leaf, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function PeaceOfMind() {
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
            <img src="/image 96.png" alt="globe" />
            <h1 className="text-3xl font-bold text-[#67b502]">
              Peace of Mind and Real-World Impact
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
              At Ciel Power, we know that every homeowner's goals are different
              — comfort, efficiency, lower bills, a healthier space, or
              long-term value. Pearl Certification supports all of those goals,
              giving you clear, third-party validation of the choices you've
              made to improve your home.
            </p>

            {/* Second Paragraph */}
            <p className="text-[#444444] leading-relaxed">
              This certification is more than a paper trail — it's a lasting
              asset that stays with your home, and with you, wherever the road
              takes you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
