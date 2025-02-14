"use client";

import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RimJoistAssessment() {
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
          <CardTitle className="text-2xl text-green-800 dark:text-green-200">
            Your Home&apos;s Rim Joist Insulation
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
                  <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">BPI Recommendation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    BPI recommends Rim Joists be insulated to R13 for optimal energy
                    efficiency and to prevent air infiltration.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative aspect-video rounded-lg overflow-hidden"
              >
                <img
                  src="https://i.postimg.cc/jSVNngms/Screenshot-2024-11-25-033709.png"
                  alt="Rim joist area"
                  className='object-cover w-full'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold mb-1">Current Condition</h3>
                  <p className="text-sm">Uninsulated rim joist area</p>
                </div>
              </motion.div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Technical Details</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      The rim joist is a critical area for insulation as it&apos;s often a
                      significant source of heat loss and air infiltration. Proper
                      insulation here can:
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li>• Prevent cold air infiltration</li>
                      <li>• Reduce energy costs</li>
                      <li>• Improve comfort in rooms above</li>
                      <li>• Protect against moisture issues</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}