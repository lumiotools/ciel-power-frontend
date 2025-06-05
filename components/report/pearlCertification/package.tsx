"use client";

import { Mail, ChevronUp, FileText, Home, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Package() {
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
            <img src="/image 94.png" alt="email question mark" />
            <h1 className="text-3xl font-bold text-[#67b502]">
              What's Included in Your Pearl Certification Package
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
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {/* Subtitle */}
          <p className="text-[#444444] text-lg mb-8">
            When your project with Ciel Power is complete, you'll receive:
          </p>

          {/* Package Items */}
          <div className="space-y-6">
            {/* 1. Pearl Certification Certificate */}
            <div className="border-2 border-gray-200 rounded-xl p-6 bg-white">
              <h3 className="text-xl font-bold text-[#67b502] mb-4 flex items-center gap-2">
                <span className="text-[#67b502]">1.</span>
                Pearl Certification Certificate
              </h3>
              <p className="text-[#444444] leading-relaxed">
                A formal document that lists and verifies the energy-efficient
                improvements made to your home. This includes insulation levels,
                air sealing, HVAC efficiency, and other verified features that
                contribute to lower energy usage and a more comfortable home.
              </p>
            </div>

            {/* 2. Green and Energy Efficiency Addendum */}
            <div className="border-2 border-gray-200 rounded-xl p-6 bg-white">
              <h3 className="text-xl font-bold text-[#67b502] mb-4 flex items-center gap-2">
                <span className="text-[#67b502]">2.</span>
                Green and Energy Efficiency Addendum (Green MLS Addendum)
              </h3>
              <p className="text-[#444444] leading-relaxed">
                This addendum is a standardized form designed by the Appraisal
                Institute and used in real estate transactions. It ensures your
                home's improvements are properly documented and visible to
                appraisers, buyers, and agents when you sell or refinance —
                helping you potentially command a higher resale value.
              </p>
            </div>

            {/* 3. Pearl Home Investment Plan */}
            <div className="border-2 border-gray-200 rounded-xl p-6 bg-white">
              <h3 className="text-xl font-bold text-[#67b502] mb-4 flex items-center gap-2">
                <span className="text-[#67b502]">3.</span>
                Pearl Home Investment Plan
              </h3>
              <p className="text-[#444444] leading-relaxed">
                This personalized document outlines future improvement
                opportunities and helps you plan additional upgrades that can
                increase your certification level and home performance over
                time.
              </p>
            </div>

            {/* 4. Real Estate Marketing Materials */}
            <div className="border-2 border-gray-200 rounded-xl p-6 bg-white">
              <h3 className="text-xl font-bold text-[#67b502] mb-4 flex items-center gap-2">
                <span className="text-[#67b502]">4.</span>
                Real Estate Marketing Materials
              </h3>
              <p className="text-[#444444] leading-relaxed">
                If you choose to list your home, Pearl provides branded
                resources and guidance to help real estate professionals promote
                its energy-efficient features — from listing language to
                printable flyers and MLS support.
              </p>
            </div>

            {/* 5. Access to the Green Door App */}
            <div className="border-2 border-gray-200 rounded-xl p-6 bg-white">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="col-span-2">
                  <h3 className="text-xl font-bold text-[#67b502] mb-4 flex items-center gap-2">
                    <span className="text-[#67b502]">5.</span>
                    Access to the Green Door App
                  </h3>
                  <p className="text-[#444444] leading-relaxed mb-6">
                    The Green Door App is your digital hub for managing your
                    certified home. Inside the app, you can:
                  </p>
                  <ul className="space-y-3 text-[#444444]">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#67b502] rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        View your certification documents and track your home's
                        features
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#67b502] rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Explore personalized recommendations for future upgrades
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#67b502] rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Connect with Pearl Network contractors for additional
                        work
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#67b502] rounded-full mt-2 flex-shrink-0"></div>
                      <span>Access available rebates and incentives</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#67b502] rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Store and organize important home performance
                        documentation
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Laptop Mockup */}
                <div className="relative">
                  <img
                    src="/image 92.png"
                    alt="Laptop Mockup"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
