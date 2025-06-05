"use client";

import { HelpCircle, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function WhyItMatters() {
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
            <img src="/image 95.png" alt="help" />
            <h1 className="text-3xl font-bold text-[#67b502]">
              Why It Matters
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
          {/* Introduction */}
          <p className="text-[#444444] italic leading-relaxed mb-8">
            Most energy-efficient upgrades are invisible — behind the walls,
            under the floors, or inside mechanical systems. Without proper
            documentation, these features can be overlooked during a home
            appraisal or sale. That's where Pearl comes in.
          </p>

          {/* Subheading */}
          <h2 className="text-2xl font-bold text-[#444444] mb-8">
            With Pearl Certification:
          </h2>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Benefit 1 */}
            <div className="border-2 border-gray-200 rounded-xl p-6 bg-white">
              <p className="text-[#444444] leading-relaxed">
                Your improvements are{" "}
                <span className="text-[#67b502] font-semibold">
                  officially recognized
                </span>{" "}
                and{" "}
                <span className="text-[#67b502] font-semibold">
                  professionally documented
                </span>
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="border-2 border-gray-200 rounded-xl p-6 bg-white">
              <p className="text-[#444444] leading-relaxed">
                Your home is more{" "}
                <span className="text-[#67b502] font-semibold">marketable</span>
                , especially to environmentally conscious buyers
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="border-2 border-gray-200 rounded-xl p-6 bg-white">
              <p className="text-[#444444] leading-relaxed">
                You gain a{" "}
                <span className="text-[#67b502] font-semibold">
                  competitive edge
                </span>{" "}
                in the real estate market
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="border-2 border-gray-200 rounded-xl p-6 bg-white">
              <p className="text-[#444444] leading-relaxed">
                You're able to show the{" "}
                <span className="text-[#67b502] font-semibold">
                  value and quality of your upgrades
                </span>{" "}
                — not just describe them
              </p>
            </div>
          </div>

          {/* Closing Statement */}
          <p className="text-[#444444] leading-relaxed">
            Homes with Pearl Certification have been shown to sell for{" "}
            <span className="font-bold text-[#444444]">5% more on average</span>{" "}
            compared to similar homes without it, according to national market
            studies.
          </p>
        </div>
      </div>
    </div>
  );
}
