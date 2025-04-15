"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { ThermometerIcon, InfoIcon, Edit2, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./ImageUpload";
import ImageCustomer from "./ImageCustomer";

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

interface OverhangData {
  material: string;
  condition: string;
  rValue: number;
  recommendedValue: number;
  maxValue: number;
  efficiency: number;
  image: string;
}

// New interface for the data coming from reportData
interface InsulationItemData {
  condition: string;
  material: string;
  name: string;
  rValue: number;
  image: string;
}

interface OverhangAssessmentProps {
  data?: InsulationItemData | null;
  isAdmin?: boolean;
  onUpdate?: (updatedItem: InsulationItemData) => void;
}

interface FieldItem {
  label: string;
  value: string;
  field: keyof OverhangData;
  type: "text" | "select" | "number";
  options?: string[];
}

const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  maxValue,
  label,
  animate,
}) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <svg viewBox="-10 0 220 120" className="w-full">
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

        {[0, 10, 20, 30, 40].map((markerValue, index) => (
          <g key={index} transform={`rotate(${-135 + index * 67.5}, 100, 110)`}>
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
              {markerValue > 0 ? `R${markerValue}` : ""}
            </text>
          </g>
        ))}

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

  useEffect(() => {
    setEditValue(value);
  }, [value]);

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

// const ImageUpload: React.FC<{
//   src: string;
//   onImageChange: (newImage: string) => void;
// }> = ({ src, onImageChange }) => {
//   const fileInputRef = React.useRef<HTMLInputElement>(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       onImageChange(imageUrl);
//       setIsEditing(false);
//     }
//   };

//   return (
//     <div className="relative">
//       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-teal-100 text-teal-500 px-4 py-1 rounded-full text-sm">
//         Current Status
//       </div>
//       <div className="relative">
//         <img
//           src={src || "/placeholder.svg"}
//           alt="Overhang insulation"
//           className="w-full h-64 object-cover rounded-lg mt-4"
//         />
//         {isEditing && (
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-4 rounded-lg">
//             <div className="bg-white p-4 rounded">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 accept="image/*"
//                 className="hidden"
//               />
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Choose New Image
//               </button>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="ml-2 px-4 py-2 rounded border hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//         {!isEditing && (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="absolute top-6 right-2 bg-white p-2 rounded-full shadow-lg"
//           >
//             <Edit2 className="w-4 h-4" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

export function OverhangAssessment({
  data,
  isAdmin = false,
  onUpdate,
  driveImages,
}: OverhangAssessmentProps) {
  const [animateChart, setAnimateChart] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Default data to use if no report data is provided
  const defaultOverhangData: OverhangData = {
    material: "None",
    condition: "N/A",
    rValue: 0,
    recommendedValue: 30,
    maxValue: 40,
    efficiency: 100,
    image: "https://i.postimg.cc/sgBfY3FS/Screenshot-2024-11-25-033139.png",
  };

  // Process the provided data into the format expected by our component
  const processOverhangData = (): OverhangData => {
    if (!data) return defaultOverhangData;

    // Create overhang data from report data
    return {
      material: data.material || "None",
      condition: data.condition || "N/A",
      rValue: data.rValue || 0,
      recommendedValue: 30, // Standard recommendation for overhang insulation
      maxValue: 40, // Standard max value for gauge
      efficiency: data.rValue ? Math.round((data.rValue / 30) * 100) : 0,
      image: data.image,
    };
  };

  const [overhangData, setOverhangData] = useState<OverhangData>(
    processOverhangData(),
  );

  useEffect(() => {
    // Update overhang data if report data changes
    setOverhangData(processOverhangData());
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateChart(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
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

  const updateOverhangData = (
    field: keyof OverhangData,
    value: string | number,
  ) => {
    setOverhangData((prev) => {
      const newData = { ...prev, [field]: value };

      let updatedField: Partial<InsulationItemData> = {};

      if (field === "rValue") {
        const numericValue =
          typeof value === "string"
            ? Number.parseInt(value.replace("R", ""))
            : value;

        if (!isNaN(numericValue)) {
          newData.rValue = numericValue;
          newData.efficiency = Math.round(
            (numericValue / newData.recommendedValue) * 100,
          );
          updatedField.rValue = numericValue;
        }
      } else if (field === "efficiency") {
        const numericValue =
          typeof value === "string" ? Number.parseInt(value) : value;

        if (!isNaN(numericValue)) {
          newData.efficiency = numericValue;
          const calculatedR = Math.round(
            (numericValue * newData.recommendedValue) / 100,
          );
          newData.rValue = calculatedR;
          updatedField.rValue = calculatedR;
        }
      } else if (field === "material" || field === "condition") {
        updatedField[field] = value as string;
      } else if (field === "image") {
        updatedField.image = value as string;
      }

      // Fire update if there's something to save
      if (onUpdate && Object.keys(updatedField).length > 0) {
        const updatedItem: InsulationItemData = {
          ...(data ?? {
            name: "Your Home's Overhang Insulation",
            rValue: 0,
            material: "None",
            condition: "N/A",
            image: "",
          }),
          ...updatedField,
        };
        onUpdate(updatedItem);
      }

      return newData;
    });
  };

  // Get appropriate feedback message based on R-value
  const getEfficiencyFeedback = () => {
    const percentage = Math.round(
      (overhangData.rValue / overhangData.recommendedValue) * 100,
    );

    if (percentage >= 100) {
      return "Your overhang insulation is meeting the recommended standards, providing optimal thermal protection for your home.";
    } else if (percentage >= 70) {
      return "Your overhang insulation is performing well but falls slightly below the recommended level. Consider upgrading for optimal thermal protection.";
    } else if (percentage >= 40) {
      return "Your overhang insulation is below recommended standards. Upgrading would significantly improve your home's energy efficiency.";
    } else {
      return "Your overhang insulation is substantially below recommended standards. Upgrading should be a priority for energy efficiency.";
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="dark:bg-teal-950/20">
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="text-2xl text-teal-600 dark:text-teal-300">
            Your Home&apos;s Overhang Insulation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {isAdmin ? (
                <ImageUpload
                  image={overhangData.image || "/placeholder.svg"}
                  onImageChange={(newImage) =>
                    updateOverhangData("image", newImage)
                  }
                  driveImages={driveImages}
                />
              ) : (
                <div className="relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-teal-100 text-teal-500 px-4 py-1 rounded-full text-sm">
                    Current Status
                  </div>
                  <ImageCustomer
                    image={overhangData.image || "/placeholder.svg"}
                    driveImages={driveImages}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {(
                  [
                    {
                      label: "Material",
                      value: overhangData.material,
                      field: "material" as const,
                      type: "text" as const,
                    },
                    {
                      label: "Condition",
                      value: overhangData.condition,
                      field: "condition" as const,
                      type: "select" as const,
                      options: ["N/A", "Poor", "Fair", "Good", "Excellent"],
                    },
                    {
                      label: "Current R-Value",
                      value: `R${overhangData.rValue}`,
                      field: "rValue" as const,
                      type: "text" as const,
                    },
                    {
                      label: "Recommended",
                      value: `R${overhangData.recommendedValue}`,
                      field: "recommendedValue" as const,
                      type: "text" as const,
                    },
                  ] satisfies FieldItem[]
                ).map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.label}
                      </div>
                      <div className="font-medium mt-1 text-gray-900 dark:text-gray-100">
                        {isAdmin ? (
                          <EditableField
                            value={item.value}
                            onSave={(value) => {
                              if (
                                item.field === "rValue" ||
                                item.field === "recommendedValue"
                              ) {
                                updateOverhangData(
                                  item.field,
                                  Number.parseInt(value.replace("R", "")),
                                );
                              } else {
                                updateOverhangData(item.field, value);
                              }
                            }}
                            type={item.type}
                            options={item.options}
                          />
                        ) : (
                          item.value
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-[#f0fdfa] dark:bg-teal-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ThermometerIcon className="h-5 w-5 text-teal-500" />
                    <h3 className="font-semibold text-teal-600 dark:text-gray-100">
                      Efficiency Rating
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Current Efficiency
                      </span>
                      <span className="text-gray-900 dark:text-gray-100">
                        {isAdmin ? (
                          <EditableField
                            value={`${Math.round(
                              (overhangData.rValue /
                                overhangData.recommendedValue) *
                                100,
                            )}`}
                            onSave={(value) => {
                              const efficiency = Number.parseInt(value);
                              if (!isNaN(efficiency)) {
                                updateOverhangData("efficiency", efficiency);
                              }
                            }}
                            type="number"
                            min={0}
                            max={100}
                          />
                        ) : (
                          `${Math.round(
                            (overhangData.rValue /
                              overhangData.recommendedValue) *
                              100,
                          )}%`
                        )}
                      </span>
                    </div>
                    <Progress
                      value={
                        (overhangData.rValue / overhangData.maxValue) * 100
                      }
                      className="h-2 bg-teal-100 dark:bg-teal-700"
                    />

                    <div className="flex items-start gap-2 mt-4 text-sm text-gray-600 dark:text-gray-300">
                      <InfoIcon className="h-4 w-4 mt-0.5 shrink-0" />
                      <p>{getEfficiencyFeedback()}</p>
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
                      value={overhangData.rValue}
                      maxValue={overhangData.maxValue}
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
