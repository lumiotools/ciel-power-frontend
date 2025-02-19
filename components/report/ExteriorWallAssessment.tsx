"use client";

import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExteriorWallAssessment() {
  const rValue = 0; // Current R-Value
  const recommendedValue = 13; // BPI recommended R-Value
  const maxValue = 20; // Maximum value on the gauge

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <CardHeader className="bg-green-50 dark:bg-green-900/50">
          <CardTitle className="text-2xl text-lime-500 dark:text-green-200">
            Your Home&apos;s Exterior Wall Insulation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Material", value: "None" },
                  { label: "Condition", value: "N/A" },
                  { label: "Current R-Value", value: "R0" },
                  { label: "Recommended", value: "R13" },
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                      <div className="font-medium mt-1 text-gray-900 dark:text-gray-100">{item.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Current Efficiency</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {Math.round((rValue / recommendedValue) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(rValue / maxValue) * 100}
                    className="h-2 bg-green-200 dark:bg-green-700"
                  />
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-lime-500 dark:text-green-200">BPI Recommendation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    BPI recommends Exterior Walls be insulated to R13 for optimal
                    energy efficiency.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  "https://i.postimg.cc/tJYRBb1L/Screenshot-2024-11-25-033358.png",
                  "https://i.postimg.cc/T2D35d6D/Screenshot-2024-11-25-033443.png",
                ].map((src, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`Thermal image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 text-white text-sm">
                      {index === 0 ? "Thermal Image" : "Regular Image"}
                    </div>
                  </motion.div>
                ))}
              </div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Analysis</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Thermal imaging reveals significant heat loss through the exterior
                    walls, indicating insufficient insulation. The current R-value of
                    R0 is well below the recommended R13 standard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
