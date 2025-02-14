"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { ThermometerIcon, InfoIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GaugeChartProps {
  value: number;
  maxValue: number;
  label: string;
  animate: boolean;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, maxValue, label, animate }) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <svg viewBox="-10 0 220 120" className="w-full">
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
          animate={animate ? { strokeDasharray: `${percentage * 3.14}, 314` } : { strokeDasharray: "0, 314" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Markers inside the rainbow */}
        {[0, 10, 20, 30, 40].map((markerValue, index) => (
          <g
            key={index}
            transform={`rotate(${-135 + index * 67.5}, 100, 110)`}
          >
            <line
              x1="100"
              y1="35"
              x2="100"
              y2="45"
              stroke="#374151"
              strokeWidth="2"
            />
            <text
              x="100"
              y="30"
              textAnchor="middle"
              fill="#374151"
              className="text-xs"
            >
              {markerValue > 0 ? `R${markerValue}` : ''}
            </text>
          </g>
        ))}

        {/* Center text */}
        <text
          x="100"
          y="85"
          textAnchor="middle"
          className="text-3xl font-bold"
          fill="currentColor"
        >
          R{value}
        </text>
        <text
          x="100"
          y="105"
          textAnchor="middle"
          className="text-xs"
          fill="currentColor"
        >
          current
        </text>
      </svg>
    </div>
  );
};

export function OverhangAssessment() {
  const rValue = 30; // Current R-Value
  const recommendedValue = 30; // BPI recommended R-Value
  const maxValue = 40; // Maximum value on the gauge

  const [animateChart, setAnimateChart] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateChart(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="dark:bg-green-950/20">
        <CardHeader className="bg-green-50 dark:bg-green-900/50">
          <CardTitle className="text-2xl text-green-800 dark:text-green-200">
            Your Home&apos;s Overhang Insulation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm">
                  Current Status
                </div>
                <img
                  src="https://i.postimg.cc/sgBfY3FS/Screenshot-2024-11-25-033139.png"
                  alt="Overhang insulation"
                  className="w-full h-64 object-cover rounded-lg mt-4"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Material", value: '9.5" Fiberglass' },
                  { label: "Condition", value: "Good" },
                  { label: "Current R-Value", value: "R30" },
                  { label: "Recommended", value: "R30" },
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                      <div className="font-medium mt-1 text-gray-900 dark:text-gray-100">{item.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-[#f0fdf4] dark:bg-green-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ThermometerIcon className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Efficiency Rating
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Current Efficiency</span>
                      <span className="text-gray-900 dark:text-gray-100">
                        {Math.round((rValue / recommendedValue) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(rValue / maxValue) * 100}
                      className="h-2 bg-green-100 dark:bg-green-700"
                    />

                    <div className="flex items-start gap-2 mt-4 text-sm text-gray-600 dark:text-gray-300">
                      <InfoIcon className="h-4 w-4 mt-0.5 shrink-0" />
                      <p>
                        Your overhang insulation is meeting the recommended standards,
                        providing optimal thermal protection for your home.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    R-Value Distribution
                  </h3>
                  <div ref={chartRef} className="relative">
                    <GaugeChart
                      value={rValue}
                      maxValue={maxValue}
                      label="distribution"
                      animate={animateChart}
                    />
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