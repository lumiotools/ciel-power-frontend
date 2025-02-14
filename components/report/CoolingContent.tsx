"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Snowflake,
  AlertCircle,
  Info,
  Zap,
} from "lucide-react";
// import { Chatbot } from "./Chatbot";

const GaugeChart = ({
  value,
  maxValue,
  label,
}: {
  value: number;
  maxValue: number;
  label: string;
}) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      <svg viewBox="-10 0 220 110" className="w-full">
        {/* Background arc */}
        <path
          d="M 0 110 A 100 100 0 0 1 200 110"
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="16"
          strokeLinecap="round"
        />
        
        {/* Colored arc with gradient */}
        <defs>
          <linearGradient id={`gauge-gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="33%" stopColor="#f97316" />
            <stop offset="66%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M 0 110 A 100 100 0 0 1 200 110"
          fill="none"
          stroke={`url(#gauge-gradient-${label})`}
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ strokeDasharray: "0, 314" }}
          animate={{ strokeDasharray: `${percentage * 3.14}, 314` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Center text */}
        <text
          x="100"
          y="95"
          textAnchor="middle"
          className="text-4xl font-bold"
          fill="currentColor"
        >
          {value}
        </text>
      </svg>
    </div>
  );
};

export function CoolingContent() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const acData = {
    type: "Central",
    condition: "Fair",
    currentSEER: 10,
    recommendedSEER: 16,
  };

  return (
    <div className="space-y-8">
      {/* Introduction Section */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader className="bg-green-50 dark:bg-green-900/50">
            <CardTitle className="text-2xl text-green-800 dark:text-green-200 flex items-center gap-2">
              <Snowflake className="h-6 w-6" />
              Air Conditioning Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              During your Home Energy Assessment, our technician closely
              examined your cooling equipment to determine the efficiency level
              of the system.
            </p>
            <div className="flex items-start space-x-4 text-gray-600 dark:text-gray-300">
              <Info className="h-5 w-5 mt-1 flex-shrink-0 text-green-600" />
              <p className="text-sm leading-relaxed">
                SEER (Seasonal Energy Efficiency Ratio) - A ratio of the cooling
                output during a typical cooling season with the total electric
                energy input during the same period.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* SEER Section */}
      <motion.div {...fadeInUp}>
        <Card className="overflow-hidden">
          <CardHeader className="bg-green-50 dark:bg-green-900/50">
            <CardTitle className="text-2xl text-green-800 dark:text-green-200 flex items-center gap-2">
              <Snowflake className="h-6 w-6" />
              Your Home&apos;s Air Conditioner SEER
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="relative bg-[#f0fdf4] dark:bg-green-900/20 rounded-lg p-6">
                  {/* Rainbow gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-10 rounded-lg"
                    style={{
                      mixBlendMode: 'overlay',
                      filter: 'blur(8px)',
                    }}
                  />
                  <h3 className="relative text-2xl font-semibold text-[#166534] dark:text-green-300 mb-6">
                    Current Performance
                  </h3>
                  <GaugeChart
                    value={acData.currentSEER}
                    maxValue={20}
                    label="SEER"
                  />
                  <div className="mt-8 grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        Current SEER
                      </p>
                      <p className="text-3xl font-bold text-[#16a34a] dark:text-green-400">
                        {acData.currentSEER}
                      </p>
                    </div>
                    <div>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        BPI Recommends
                      </p>
                      <p className="text-3xl font-bold text-[#ea580c] dark:text-orange-400">
                        {acData.recommendedSEER}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-amber-50 dark:bg-amber-900/50 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-300">
                      System Details
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Your air conditioner&apos;s current SEER rating of {acData.currentSEER} means it&apos;s operating below optimal
                    efficiency. Upgrading to a high-efficiency model with {acData.recommendedSEER} SEER could result in
                    significant energy savings.
                  </p>
                  <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Type
                      </p>
                      <p className="font-medium">{acData.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Condition
                      </p>
                      <p className="font-medium">{acData.condition}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-amber-600 mt-4">
                    <Zap className="h-5 w-5" />
                    <span className="text-sm">
                      *Estimated based on Age & Type
                    </span>
                  </div>
                </div>
                <motion.div
                  className="relative h-48 overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src="https://picsum.photos/seed/ac-unit/800/400"
                    alt="Air Conditioning Unit"
                    className="object-cover w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <p className="text-white text-sm">
                      Example of a central air conditioning unit
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Chatbot */}
      {/* <Chatbot activeMenu="cooling" /> */}
    </div>
  );
}
