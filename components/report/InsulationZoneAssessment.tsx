"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThermometerIcon, InfoIcon, Edit2, Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./ImageUpload";
import ImageCustomer from "./ImageCustomer";

interface InsulationZoneProps {
  data: {
    condition: string;
    material: string;
    name: string;
    rValue: number;
    image: string;
  };
  isAdmin?: boolean;
  onUpdate?: (updatedItem: {
    condition: string;
    material: string;
    name: string;
    rValue: number;
  }) => void;
}

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  type: "text" | "select" | "number";
  options?: string[];
  min?: number;
  max?: number;
}

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
//   src: string
//   onImageChange: (newImage: string) => void
// }> = ({ src, onImageChange }) => {
//   const fileInputRef = React.useRef<HTMLInputElement>(null)
//   const [isEditing, setIsEditing] = useState(false)

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const imageUrl = URL.createObjectURL(file)
//       onImageChange(imageUrl)
//       setIsEditing(false)
//     }
//   }

//   return (
//     <div className="relative">
//       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-teal-100 text-teal-500 px-4 py-1 rounded-full text-sm">
//         Current Status
//       </div>
//       <div className="relative">
//         <img
//           src={src || "/placeholder.svg"}
//           alt="Zone insulation"
//           className="w-full h-64 object-cover rounded-lg mt-4"
//         />
//         {isEditing && (
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-4 rounded-lg">
//             <div className="bg-white p-4 rounded">
//               <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Choose New Image
//               </button>
//               <button onClick={() => setIsEditing(false)} className="ml-2 px-4 py-2 rounded border hover:bg-gray-100">
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
//   )
// }

export function InsulationZoneAssessment({
  data,
  isAdmin = false,
  onUpdate,
  driveImages,
}: InsulationZoneProps) {
  // Get recommended R-value based on zone name
  function getRecommendedValue(zoneName: string): number {
    const name = zoneName.toLowerCase();

    if (name.includes("attic") || name.includes("ceiling")) {
      return 49; // High R-value for attics/ceilings
    } else if (name.includes("wall") && !name.includes("knee")) {
      return 13; // Standard for walls
    } else if (name.includes("basement") || name.includes("crawl")) {
      return 10; // Standard for basements
    } else if (name.includes("knee") || name.includes("kw")) {
      return 13; // Standard for kneewalls
    } else if (name.includes("garage")) {
      return 13; // Standard for garage areas
    } else {
      return 13; // Default value if no specific match
    }
  }

  // Get zone type description
  function getZoneTypeDescription(zoneName: string): string {
    const name = zoneName.toLowerCase();

    if (name.includes("attic")) {
      return "Attic Insulation";
    } else if (name.includes("wall") && !name.includes("knee")) {
      return "Wall Insulation";
    } else if (name.includes("basement")) {
      return "Basement Insulation";
    } else if (name.includes("crawl")) {
      return "Crawlspace Insulation";
    } else if (name.includes("knee") || name.includes("kw")) {
      return "Kneewall Insulation";
    } else if (name.includes("garage")) {
      return "Garage Insulation";
    } else if (name.includes("ceiling")) {
      return "Ceiling Insulation";
    } else {
      return "Zone Insulation";
    }
  }

  // Get image based on zone type
  function getZoneImage(zoneName: string): string {
    const name = zoneName.toLowerCase();

    if (name.includes("attic")) {
      return "https://i.postimg.cc/vHVnqZhb/Screenshot-2024-11-25-030211.png";
    } else if (name.includes("wall") && !name.includes("knee")) {
      return "https://i.postimg.cc/tJYRBb1L/Screenshot-2024-11-25-033358.png";
    } else if (
      name.includes("basement") ||
      name.includes("rim") ||
      name.includes("rj")
    ) {
      return "https://i.postimg.cc/jSVNngms/Screenshot-2024-11-25-033709.png";
    } else if (name.includes("crawl")) {
      return "https://i.postimg.cc/SQ7Hv3LP/Screenshot-2024-11-25-033547.png";
    } else if (name.includes("knee") || name.includes("kw")) {
      return "https://i.postimg.cc/dQbxhDSy/Screenshot-2024-11-25-025748.png";
    } else if (name.includes("garage")) {
      return "https://i.postimg.cc/XYcVfdpZ/garage-insulation.jpg";
    } else if (name.includes("ceiling")) {
      return "https://i.postimg.cc/vHVnqZhb/Screenshot-2024-11-25-030211.png";
    } else {
      return "https://i.postimg.cc/sgBfY3FS/Screenshot-2024-11-25-033139.png"; // Generic insulation image
    }
  }

  const [animateChart, setAnimateChart] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const [zoneData, setZoneData] = useState({
    material: data.material || "Unspecified",
    condition: data.condition || "Unknown",
    rValue: data.rValue || 0,
    recommendedValue: getRecommendedValue(data.name),
    name: data.name,
    image: getZoneImage(data.name),
  });

  // Update zone data if report data changes
  useEffect(() => {
    setZoneData({
      material: data.material || "Unspecified",
      condition: data.condition || "Unknown",
      rValue: data.rValue || 0,
      recommendedValue: getRecommendedValue(data.name),
      name: data.name,
      image: data.image,
    });
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

  // Update zone data and notify parent if onUpdate is provided
  const updateZoneData = (
    field: keyof typeof zoneData,
    value: string | number,
  ) => {
    setZoneData((prev) => {
      const newData = { ...prev, [field]: value };

      if (field === "rValue") {
        const numericValue =
          typeof value === "string"
            ? Number.parseInt(value.replace("R", ""))
            : value;
        if (!isNaN(numericValue)) {
          newData.rValue = numericValue;

          // Notify parent of update
          if (onUpdate) {
            onUpdate({
              ...data,
              rValue: numericValue,
            });
          }
        }
      } else if (
        (field === "material" || field === "condition" || field === "image") &&
        onUpdate
      ) {
        // For material and condition updates, notify parent
        onUpdate({
          ...data,
          [field]: value as string,
        });
      }

      return newData;
    });
  };

  // Get recommended action based on current R-value vs recommended
  function getRecommendedAction(): string {
    const efficiencyPercentage = Math.round(
      (zoneData.rValue / zoneData.recommendedValue) * 100,
    );

    if (zoneData.rValue === 0) {
      return `This area requires insulation. We recommend adding insulation to achieve an R-value of R${zoneData.recommendedValue}.`;
    } else if (efficiencyPercentage < 50) {
      return `This area is significantly under-insulated. Consider upgrading to improve energy efficiency.`;
    } else if (efficiencyPercentage < 100) {
      return `This area could benefit from additional insulation to reach the recommended R${zoneData.recommendedValue}.`;
    } else {
      return `This area meets or exceeds the recommended insulation levels.`;
    }
  }

  interface GaugeChartProps {
    value: number;
    maxValue: number;
    label: string;
    animate: boolean;
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

          {[
            0,
            Math.round(maxValue / 4),
            Math.round(maxValue / 2),
            Math.round((maxValue * 3) / 4),
            maxValue,
          ].map((markerValue, index) => (
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

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="dark:bg-teal-950/20">
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="text-xl text-teal-600 dark:text-teal-300">
            {getZoneTypeDescription(zoneData.name)}: {zoneData.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {isAdmin ? (
                <ImageUpload
                  image={zoneData.image || "/placeholder.svg"}
                  onImageChange={(newImage) =>
                    updateZoneData("image", newImage)
                  }
                  driveImages={driveImages}
                />
              ) : (
                <div className="relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-teal-100 text-teal-500 px-4 py-1 rounded-full text-sm">
                    Current Status
                  </div>
                  <ImageCustomer
                    image={zoneData.image || "/placeholder.svg"}
                    driveImages={driveImages}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Material
                    </div>
                    <div className="font-medium mt-1 text-gray-900 dark:text-gray-100">
                      {isAdmin ? (
                        <EditableField
                          value={zoneData.material}
                          onSave={(value) => updateZoneData("material", value)}
                          type="text"
                        />
                      ) : (
                        zoneData.material
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Condition
                    </div>
                    <div className="font-medium mt-1 text-gray-900 dark:text-gray-100">
                      {isAdmin ? (
                        <EditableField
                          value={zoneData.condition}
                          onSave={(value) => updateZoneData("condition", value)}
                          type="select"
                          options={[
                            "Unknown",
                            "Poor",
                            "Fair",
                            "Good",
                            "Excellent",
                          ]}
                        />
                      ) : (
                        zoneData.condition
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Current R-Value
                    </div>
                    <div className="font-medium mt-1 text-gray-900 dark:text-gray-100">
                      {isAdmin ? (
                        <EditableField
                          value={`R${zoneData.rValue}`}
                          onSave={(value) =>
                            updateZoneData(
                              "rValue",
                              Number.parseInt(value.replace("R", "")) || 0,
                            )
                          }
                          type="text"
                        />
                      ) : (
                        `R${zoneData.rValue}`
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Recommended
                    </div>
                    <div className="font-medium mt-1 text-gray-900 dark:text-gray-100">
                      {isAdmin ? (
                        <EditableField
                          value={`R${zoneData.recommendedValue}`}
                          onSave={(value) =>
                            updateZoneData(
                              "recommendedValue",
                              Number.parseInt(value.replace("R", "")) || 13,
                            )
                          }
                          type="text"
                        />
                      ) : (
                        `R${zoneData.recommendedValue}`
                      )}
                    </div>
                  </CardContent>
                </Card>
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
                            value={`${Math.min(
                              Math.round(
                                (zoneData.rValue / zoneData.recommendedValue) *
                                  100,
                              ),
                              100,
                            )}`}
                            onSave={(value) => {
                              const efficiency = Number.parseInt(value);
                              if (!isNaN(efficiency)) {
                                const newRValue = Math.round(
                                  (efficiency * zoneData.recommendedValue) /
                                    100,
                                );
                                updateZoneData("rValue", newRValue);
                              }
                            }}
                            type="number"
                            min={0}
                            max={100}
                          />
                        ) : (
                          `${Math.min(
                            Math.round(
                              (zoneData.rValue / zoneData.recommendedValue) *
                                100,
                            ),
                            100,
                          )}%`
                        )}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(
                        (zoneData.rValue / zoneData.recommendedValue) * 100,
                        100,
                      )}
                      className="h-2 bg-teal-100 dark:bg-teal-700"
                    />

                    <div className="flex items-start gap-2 mt-4 text-sm text-gray-600 dark:text-gray-300">
                      <InfoIcon className="h-4 w-4 mt-0.5 shrink-0" />
                      <p>{getRecommendedAction()}</p>
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
                      value={zoneData.rValue}
                      maxValue={Math.max(zoneData.recommendedValue * 1.3, 40)}
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
