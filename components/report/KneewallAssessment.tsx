"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Check, X } from "lucide-react";
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

interface KneewallData {
  title: string;
  material: string;
  condition: string;
  rValue: string;
  recommendation: string;
  currentValue: number;
  maxValue: number;
  image: string;
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
          className="text-2xl font-bold mb-3"
          fill="currentColor"
        >
          R{value}
        </text>
        <text
          x="100"
          y="105"
          textAnchor="middle"
          className="text-sm"
          fill="currentColor"
        >
          current
        </text>
      </svg>
    </div>
  );
};

const EditableField = ({
  value,
  onSave,
  type = "text",
  options = [],
}: {
  value: string;
  onSave: (value: string) => void;
  type?: "text" | "select";
  options?: string[];
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
      {type === "select" ? (
        <Select
          value={editValue}
          onValueChange={(value) => setEditValue(value)}
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
      ) : (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="border rounded px-2 py-1 w-32"
        />
      )}
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
  );
};

const ImageUpload = ({
  image,
  onImageChange,
}: {
  image: string;
  onImageChange: (newImage: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically upload the file to your server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      onImageChange(imageUrl);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative">
      <img
        src={image}
        alt="Insulation inspection"
        className="w-full h-64 object-cover rounded-lg mt-4"
      />
      {isEditing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg mt-4">
          <div className="bg-white p-4 rounded">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Choose New Image
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="ml-2 px-4 py-2 rounded border hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-6 right-2 bg-white p-2 rounded-full shadow-lg"
      >
        <Edit2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export function KneewallAssessment() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [kneewallData, setKneewallData] = useState<KneewallData[]>([
    {
      title: "Your Home's Kneewall Flat Insulation",
      material: '3-4" Cellulose',
      condition: "Good",
      rValue: "R13",
      recommendation: "R60",
      currentValue: 13,
      maxValue: 60,
      image: "https://i.postimg.cc/vHVnqZhb/Screenshot-2024-11-25-030211.png",
    },
    {
      title: "Your Kneewall Insulation",
      material: '2-3" Fiberglass',
      condition: "Fair",
      rValue: "R6",
      recommendation: "R13",
      currentValue: 6,
      maxValue: 13,
      image: "https://i.postimg.cc/dQbxhDSy/Screenshot-2024-11-25-025748.png",
    },
  ]);

  const [animateCharts, setAnimateCharts] = useState(
    kneewallData.map(() => false)
  );

  const chartRefs = useRef(
    kneewallData.map(() => React.createRef<HTMLDivElement>())
  );

  useEffect(() => {
    // Check if 'admin' exists in the URL
    const isAdminUrl = window.location.href.includes("admin");
    setIsAdmin(isAdminUrl);

    const observers = chartRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setAnimateCharts((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const updateKneewallData = (
    index: number,
    field: keyof KneewallData,
    value: string
  ) => {
    setKneewallData((prev) => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [field]: value };

      // Update currentValue if rValue changes
      if (field === "rValue") {
        const numericValue = parseInt(value.replace("R", ""));
        if (!isNaN(numericValue)) {
          newData[index].currentValue = numericValue;
        }
      }

      return newData;
    });
  };

  return (
    <div className="space-y-8">
      {kneewallData.map((data, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Card>
            <CardHeader className="bg-green-50 dark:bg-green-900/50">
              <CardTitle className="text-2xl text-lime-500 dark:text-green-200">
                {data.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-100 text-lime-500 px-4 py-1 rounded-full text-sm">
                      Current Status
                    </div>
                    {isAdmin ? (
                      <ImageUpload
                        image={data.image}
                        onImageChange={(newImage) =>
                          updateKneewallData(index, "image", newImage)
                        }
                      />
                    ) : (
                      <img
                        src={data.image}
                        alt="Insulation inspection"
                        className="w-full h-64 object-cover rounded-lg mt-4"
                      />
                    )}
                  </div>
                  <Card>
                    <CardContent className="p-4">
                      <dl className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm text-gray-500 dark:text-gray-400">
                            Material
                          </dt>
                          <dd className="font-medium text-gray-900 dark:text-gray-100">
                            {isAdmin ? (
                              <EditableField
                                value={data.material}
                                onSave={(value) =>
                                  updateKneewallData(index, "material", value)
                                }
                              />
                            ) : (
                              data.material
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500 dark:text-gray-400">
                            Condition
                          </dt>
                          <dd className="font-medium text-gray-900 dark:text-gray-100">
                            {isAdmin ? (
                              <EditableField
                                value={data.condition}
                                onSave={(value) =>
                                  updateKneewallData(index, "condition", value)
                                }
                                type="select"
                                options={["Poor", "Fair", "Good", "Excellent"]}
                              />
                            ) : (
                              data.condition
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500 dark:text-gray-400">
                            Current R-Value
                          </dt>
                          <dd className="font-medium text-gray-900 dark:text-gray-100">
                            {isAdmin ? (
                              <EditableField
                                value={data.rValue}
                                onSave={(value) =>
                                  updateKneewallData(index, "rValue", value)
                                }
                              />
                            ) : (
                              data.rValue
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500 dark:text-gray-400">
                            Recommended
                          </dt>
                          <dd className="font-medium text-gray-900 dark:text-gray-100">
                            {data.recommendation}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-6">
                  <div
                    ref={chartRefs.current[index]}
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
                      value={data.currentValue}
                      maxValue={data.maxValue}
                      label={`kneewall-${index}`}
                      animate={animateCharts[index]}
                    />
                    <div className="mt-8 grid grid-cols-2 gap-8">
                      <div>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                          Current R-Value
                        </p>
                        <p className="text-3xl font-bold text-[#16a34a] dark:text-green-400">
                          {data.rValue}
                        </p>
                      </div>
                      <div>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                          BPI Recommends
                        </p>
                        <p className="text-3xl font-bold text-[#ea580c] dark:text-orange-400">
                          {data.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Card className="bg-amber-50 dark:bg-amber-900/50 border-amber-200 dark:border-amber-700">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">
                        BPI Recommendation
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        BPI recommends{" "}
                        {data.title.includes("Flat")
                          ? "Kneewall Flats"
                          : "Kneewalls"}{" "}
                        be insulated to {data.recommendation} for optimal energy
                        efficiency. Your current insulation is at {data.rValue},
                        which is{" "}
                        {Math.round((data.currentValue / data.maxValue) * 100)}%
                        of the recommended value.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
