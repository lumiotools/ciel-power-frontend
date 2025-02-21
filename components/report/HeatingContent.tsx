"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Thermometer,
  Flame,
  Droplets,
  Info,
  AlertCircle,
  Edit2,
  Check,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GaugeChartProps {
  value: number;
  maxValue: number;
  label: string;
  animate: boolean;
}

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  type: "text" | "select" | "number";
  options?: string[];
  min?: number;
  max?: number;
}

interface HeatingData {
  furnace: {
    type: string;
    condition: string;
    afue: number;
    recommendedAfue: number;
  };
  waterHeater: {
    type: string;
    condition: string;
    uef: number;
    recommendedUef: number;
  };
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  maxValue,
  label,
  animate,
}) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      <svg viewBox="-10 0 220 110" className="w-full">
        <path
          d="M 0 110 A 100 100 0 0 1 200 110"
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="16"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient
            id={`gauge-gradient-${label}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
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
          animate={
            animate
              ? { strokeDasharray: `${percentage * 3.14}, 314` }
              : { strokeDasharray: "0, 314" }
          }
          transition={{ duration: 1, ease: "easeOut" }}
        />

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

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  type,
  options = [],
  min,
  max,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <span>{value}</span>
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {type === "number" ? (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={editValue}
            min={min}
            max={max}
            onChange={(e) => setEditValue(e.target.value)}
            className="border rounded px-2 py-1 w-32"
          />
          <button
            onClick={handleSave}
            className="p-1 hover:bg-green-100 rounded text-green-600"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-red-100 rounded text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : type === "select" ? (
        <div className="flex items-center gap-2">
          <Select
            value={editValue}
            onValueChange={(value) => {
              setEditValue(value);
              onSave(value);
              setIsEditing(false);
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue>{editValue}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-red-100 rounded text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="border rounded px-2 py-1 w-32"
          />
          <button
            onClick={handleSave}
            className="p-1 hover:bg-green-100 rounded text-green-600"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-red-100 rounded text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

const PerformanceCard: React.FC<{
  isAdmin: boolean;
  value: number;
  recommended: number;
  label: string;
  onUpdate: (value: number) => void;
}> = ({ isAdmin, value, recommended, label, onUpdate }) => (
  <div className="mt-8 grid grid-cols-2 gap-8">
    <div>
      <p className="text-base text-gray-600 dark:text-gray-400">
        Current {label}
      </p>
      {isAdmin ? (
        <EditableField
          value={`${value}`}
          onSave={(newValue) => onUpdate(parseInt(newValue))}
          type="number"
          min={0}
          max={100}
        />
      ) : (
        <p className="text-2xl font-bold text-[#16a34a] dark:text-green-400">
          {value}%
        </p>
      )}
    </div>
    <div>
      <p className="text-base text-gray-600 dark:text-gray-400">
        BPI Recommends
      </p>
      <p className="text-2xl font-bold text-[#ea580c] dark:text-orange-400">
        {recommended}%
      </p>
    </div>
  </div>
);

const SystemDetails: React.FC<{
  isAdmin: boolean;
  type: string;
  condition: string;
  onUpdateType: (value: string) => void;
  onUpdateCondition: (value: string) => void;
}> = ({ isAdmin, type, condition, onUpdateType, onUpdateCondition }) => (
  <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 rounded-lg p-4">
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
      {isAdmin ? (
        <EditableField value={type} onSave={onUpdateType} type="text" />
      ) : (
        <p className="font-medium">{type}</p>
      )}
    </div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Condition</p>
      {isAdmin ? (
        <EditableField
          value={condition}
          onSave={onUpdateCondition}
          type="select"
          options={["Poor", "Fair", "Good", "Excellent"]}
        />
      ) : (
        <p className="font-medium">{condition}</p>
      )}
    </div>
  </div>
);

export function HeatingContent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [animateAFUE, setAnimateAFUE] = useState(false);
  const [animateUEF, setAnimateUEF] = useState(false);
  const afueRef = useRef<HTMLDivElement>(null);
  const uefRef = useRef<HTMLDivElement>(null);

  const [heatingData, setHeatingData] = useState<HeatingData>({
    furnace: {
      type: "Atmospheric",
      condition: "Fair",
      afue: 80,
      recommendedAfue: 92,
    },
    waterHeater: {
      type: "Atmospheric",
      condition: "Fair",
      uef: 54,
      recommendedUef: 62,
    },
  });

  useEffect(() => {
    const isAdminUrl = window.location.href.includes("admin");
    setIsAdmin(isAdminUrl);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
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

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (afueRef.current) observer.observe(afueRef.current);
    if (uefRef.current) observer.observe(uefRef.current);

    return () => {
      if (afueRef.current) observer.unobserve(afueRef.current);
      if (uefRef.current) observer.unobserve(uefRef.current);
    };
  }, []);

  const updateFurnaceData = (
    field: keyof typeof heatingData.furnace,
    value: string | number
  ) => {
    setHeatingData((prev) => ({
      ...prev,
      furnace: {
        ...prev.furnace,
        [field]: value,
      },
    }));
  };

  const updateWaterHeaterData = (
    field: keyof typeof heatingData.waterHeater,
    value: string | number
  ) => {
    setHeatingData((prev) => ({
      ...prev,
      waterHeater: {
        ...prev.waterHeater,
        [field]: value,
      },
    }));
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="space-y-8">
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
                <div
                  ref={afueRef}
                  className="relative bg-[#f0fdf4] dark:bg-green-900/20 rounded-lg p-6"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-5 rounded-lg"
                    style={{
                      mixBlendMode: "overlay",
                    }}
                  />
                  <h3 className="relative text-2xl font-semibold text-lime-500 dark:text-green-300 mb-6">
                    Current Performance
                  </h3>
                  <GaugeChart
                    value={heatingData.furnace.afue}
                    maxValue={100}
                    label="AFUE"
                    animate={animateAFUE}
                  />
                  <PerformanceCard
                    isAdmin={isAdmin}
                    value={heatingData.furnace.afue}
                    recommended={heatingData.furnace.recommendedAfue}
                    label="AFUE"
                    onUpdate={(value) => updateFurnaceData("afue", value)}
                  />
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
                    Your furnace&apos;s current AFUE rating of{" "}
                    {heatingData.furnace.afue}% means it&apos;s operating below
                    optimal efficiency. Upgrading to a high-efficiency model
                    with {heatingData.furnace.recommendedAfue}% AFUE could
                    result in significant energy savings.
                  </p>
                  <SystemDetails
                    isAdmin={isAdmin}
                    type={heatingData.furnace.type}
                    condition={heatingData.furnace.condition}
                    onUpdateType={(value) => updateFurnaceData("type", value)}
                    onUpdateCondition={(value) =>
                      updateFurnaceData("condition", value)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

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
                <div
                  ref={uefRef}
                  className="relative bg-[#f0fdf4] dark:bg-green-900/20 rounded-lg p-6"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-5 rounded-lg"
                    style={{
                      mixBlendMode: "overlay",
                    }}
                  />
                  <h3 className="relative text-2xl font-semibold text-lime-500 dark:text-green-300 mb-6">
                    Current Performance
                  </h3>
                  <GaugeChart
                    value={heatingData.waterHeater.uef}
                    maxValue={100}
                    label="UEF"
                    animate={animateUEF}
                  />
                  <PerformanceCard
                    isAdmin={isAdmin}
                    value={heatingData.waterHeater.uef}
                    recommended={heatingData.waterHeater.recommendedUef}
                    label="UEF"
                    onUpdate={(value) => updateWaterHeaterData("uef", value)}
                  />
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
                    Your water heater&apos;s UEF of{" "}
                    {heatingData.waterHeater.uef}% indicates room for
                    improvement. Modern units with a UEF of{" "}
                    {heatingData.waterHeater.recommendedUef}% or higher can
                    provide better energy efficiency and lower operating costs.
                  </p>
                  <SystemDetails
                    isAdmin={isAdmin}
                    type={heatingData.waterHeater.type}
                    condition={heatingData.waterHeater.condition}
                    onUpdateType={(value) =>
                      updateWaterHeaterData("type", value)
                    }
                    onUpdateCondition={(value) =>
                      updateWaterHeaterData("condition", value)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
