"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Flame, Droplets, Info, AlertCircle } from 'lucide-react';

interface GaugeChartProps {
  value: number;
  maxValue: number;
  label: string;
  animate: boolean;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, maxValue, label, animate }) => {
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
          animate={animate ? { strokeDasharray: `${percentage * 3.14}, 314` } : { strokeDasharray: "0, 314" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Center percentage text */}
        <text
          x="100"
          y="95"
          textAnchor="middle"
          className="text-4xl font-bold"
          fill="currentColor"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
};

export function HeatingContent() {
  const [animateAFUE, setAnimateAFUE] = useState(false);
  const [animateUEF, setAnimateUEF] = useState(false);
  const afueRef = useRef<HTMLDivElement>(null);
  const uefRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === afueRef.current) {
            setAnimateAFUE(true);
          } else if (entry.target === uefRef.current) {
            setAnimateUEF(true);
          }
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (afueRef.current) observer.observe(afueRef.current);
    if (uefRef.current) observer.observe(uefRef.current);

    return () => {
      if (afueRef.current) observer.unobserve(afueRef.current);
      if (uefRef.current) observer.unobserve(uefRef.current);
    };
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const furnaceData = {
    type: "Atmospheric",
    condition: "Fair",
    afue: 80,
    recommendedAfue: 92,
  };

  const waterHeaterData = {
    type: "Atmospheric",
    condition: "Fair",
    uef: 54,
    recommendedUef: 62,
  };

  return (
    <div className="space-y-8">
      {/* Introduction Section */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader className="bg-green-50 dark:bg-green-900/50">
            <CardTitle className="text-2xl text-lime-500 dark:text-green-200 flex items-center gap-2">
              <Thermometer className="h-6 w-6" />
              Understanding Your Home&apos;s Heating Systems
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4 text-gray-600 dark:text-gray-300">
              <Info className="h-5 w-5 mt-1 flex-shrink-0 text-lime-500" />
              <p className="text-sm leading-relaxed">
                Your home&apos;s heating system is crucial for comfort and
                energy efficiency. We assess both your furnace&apos;s AFUE
                (Annual Fuel Utilization Efficiency) and your water
                heater&apos;s UEF (Uniform Energy Factor) to ensure optimal
                performance and identify potential savings opportunities.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AFUE Section */}
      <motion.div {...fadeInUp}>
        <Card className="overflow-hidden">
          <CardHeader className="bg-green-50 dark:bg-green-900/50">
            <CardTitle className="text-2xl text-lime-500 dark:text-green-200 flex items-center gap-2">
              <Flame className="h-6 w-6" />
              Furnace Performance (AFUE)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div ref={afueRef} className="relative bg-[#f0fdf4] dark:bg-green-900/20 rounded-lg p-6">
                  {/* Rainbow gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-5 rounded-lg"
                    style={{
                      mixBlendMode: 'overlay',
                    }}
                  />
                  <h3 className="relative text-2xl font-semibold text-lime-500 dark:text-green-300 mb-6">
                    Current Performance
                  </h3>
                  <GaugeChart
                    value={furnaceData.afue}
                    maxValue={100}
                    label="AFUE"
                    animate={animateAFUE}
                  />
                  <div className="mt-8 grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        Current AFUE
                      </p>
                      <p className="text-2xl font-bold text-[#16a34a] dark:text-green-400">
                        {furnaceData.afue}%
                      </p>
                    </div>
                    <div>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        BPI Recommends
                      </p>
                      <p className="text-2xl font-bold text-[#ea580c] dark:text-orange-400">
                        {furnaceData.recommendedAfue}%
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
                      Improvement Opportunity
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Your furnace&apos;s current AFUE rating of {furnaceData.afue}% means it&apos;s operating below optimal
                    efficiency. Upgrading to a high-efficiency model with {furnaceData.recommendedAfue}% AFUE could result in
                    significant energy savings.
                  </p>
                  <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Type
                      </p>
                      <p className="font-medium">{furnaceData.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Condition
                      </p>
                      <p className="font-medium">{furnaceData.condition}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Water Heater Section */}
      <motion.div {...fadeInUp}>
        <Card className="overflow-hidden">
          <CardHeader className="bg-green-50 dark:bg-green-900/50">
            <CardTitle className="text-2xl text-lime-500 dark:text-green-200 flex items-center gap-2">
              <Droplets className="h-6 w-6" />
              Water Heater Efficiency (UEF)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div ref={uefRef} className="relative bg-[#f0fdf4] dark:bg-green-900/20 rounded-lg p-6">
                  {/* Rainbow gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-5 rounded-lg"
                    style={{
                      mixBlendMode: 'overlay',
                    }}
                  />
                  <h3 className="relative text-2xl font-semibold text-lime-500 dark:text-green-300 mb-6">
                    Current Performance
                  </h3>
                  <GaugeChart
                    value={waterHeaterData.uef}
                    maxValue={100}
                    label="UEF"
                    animate={animateUEF}
                  />
                  <div className="mt-8 grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        Current UEF
                      </p>
                      <p className="text-3xl font-bold text-[#16a34a] dark:text-green-400">
                        {waterHeaterData.uef}%
                      </p>
                    </div>
                    <div>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        BPI Recommends
                      </p>
                      <p className="text-3xl font-bold text-[#ea580c] dark:text-orange-400">
                        {waterHeaterData.recommendedUef}%
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
                      Efficiency Analysis
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Your water heater&apos;s UEF of {waterHeaterData.uef}% indicates room for improvement. Modern units with a UEF of{" "}
                    {waterHeaterData.recommendedUef}% or higher can provide better energy efficiency and lower operating costs.
                  </p>
                  <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Type
                      </p>
                      <p className="font-medium">{waterHeaterData.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Condition
                      </p>
                      <p className="font-medium">{waterHeaterData.condition}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
