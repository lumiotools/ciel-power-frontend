"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Wind,
  Home,
  ArrowUp,
  ArrowDown,
  Info,
} from "lucide-react";
// import { Chatbot } from "./Chatbot";

export function AirLeakageContent() {
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
    <div className="space-y-8">
      {/* Introduction Section */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader className="bg-green-50 dark:bg-green-900/50">
            <CardTitle
              className="text-2xl text-lime-500 dark:text-green-200"
            >
              BPI Approach to Air Sealing
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              The air sealing Ciel Power, LLC performs is a BPI approach. First,
              the attic top plates and penetration are sealed. Next, the
              attached garage is sealed from the living space. Then, the
              basement sill plate and penetrations are sealed. Finally, the
              exterior of the home around windows, baseboards, and doors are
              sealed.
            </p>
            <div
              className="flex items-center space-x-2 text-lime-500 dark:text-green-400"
            >
              <Info className="h-5 w-5" />
              <span className="font-medium">
                A 1/16th inch unsealed crack around a window lets in as much
                cold air as leaving the window open 1/2 inch.
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Air Flow Rates Section */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader className="bg-green-50 dark:bg-green-900/50">
            <CardTitle
              className="text-2xl text-lime-500 dark:text-green-200"
            >
              Understanding Air Flow Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  35% of the air in your home should exhaust each hour to
                  maintain healthy ventilation. Airflow rates above these levels
                  create excessive strain on heating & cooling systems.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-32">
                    <Progress value={35} className="h-2 bg-green-100 dark:bg-green-700" />
                  </div>
                  <span
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Recommended: 35%
                  </span>
                </div>
              </div>
              <div className="relative h-48">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Wind
                    className="h-24 w-24 text-green-500 opacity-50"
                  />
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Air Changes Per Hour Section */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader className="bg-green-50 dark:bg-green-900/50">
            <CardTitle
              className="text-2xl text-lime-500 dark:text-green-200"
            >
              Your Home&apos;s Air Changes Per Hour (ACH)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4">
                  <p
                    className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                  >
                    Your Results
                  </p>
                  <div className="flex items-center space-x-4">
                    <div
                      className="text-4xl font-bold text-lime-500"
                    >
                      0.95
                    </div>
                    <div className="text-sm text-gray-600">
                      ACH
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    BPI recommends the Air Changes per Hour be 0.35
                  </p>
                </div>
              </div>
              <div className="relative h-48">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="h-full w-full flex items-center justify-center"
                  >
                    <div className="relative w-32 h-32">
                      <ArrowUp
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 h-8 w-8 text-red-500"
                      />

                      <ArrowDown
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-8 w-8 text-green-500"
                      />

                      <Home
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-gray-400"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Common Air Leak Points */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader className="bg-green-50 dark:bg-green-900/50">
            <CardTitle
              className="text-2xl text-lime-500 dark:text-green-200"
            >
              Common Air Leak Points
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {airLeakagePoints.map((point, index) => (
                <motion.div
                  key={point.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  id={`6v76oh_${index}`}
                >
                  <div
                    className="flex items-center space-x-3"
                    id={`17fjqk_${index}`}
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-lime-100 dark:bg-green-900 flex items-center justify-center"
                      id={`b46dud_${index}`}
                    >
                      <span
                        className="text-lime-600 dark:text-green-400 font-medium"
                        id={`9c0odf_${index}`}
                      >
                        {point.id}
                      </span>
                    </div>
                    <span
                      className="text-sm text-gray-700 dark:text-gray-300"
                      id={`msjkjr_${index}`}
                    >
                      {point.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Chatbot */}
      {/* <Chatbot activeMenu="air-leakage" /> */}
    </div>
  );
}