"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  type: "text" | "select" | "number";
  options?: string[];
  min?: number;
  max?: number;
}

interface CrawlspaceData {
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
}

interface CrawlspaceAssessmentProps {
  data?: InsulationItemData | null;
  isAdmin?: boolean;
  onUpdate?: (updatedItem: InsulationItemData) => void;
}

interface FieldItem {
  label: string;
  value: string;
  field: keyof CrawlspaceData;
  type: "text" | "select" | "number";
  options?: string[];
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

const ImageUpload: React.FC<{
  src: string;
  onImageChange: (newImage: string) => void;
}> = ({ src, onImageChange }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageChange(imageUrl);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative aspect-video rounded-lg overflow-hidden"
    >
      <img
        src={src || "/placeholder.svg"}
        alt="Crawlspace wall"
        className="object-cover w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-semibold mb-1">Current Condition</h3>
        <p className="text-sm">Uninsulated crawlspace walls</p>
      </div>
      {isEditing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export function CrawlspaceAssessment({
  data,
  isAdmin = false,
  onUpdate,
}: CrawlspaceAssessmentProps) {
  // Default data to use if no report data is provided
  const defaultCrawlspaceData: CrawlspaceData = {
    material: "None",
    condition: "N/A",
    rValue: 0,
    recommendedValue: 10,
    maxValue: 15,
    efficiency: 0,
    image: "https://i.postimg.cc/SQ7Hv3LP/Screenshot-2024-11-25-033547.png",
  };

  // Process the provided data into the format expected by our component
  const processCrawlspaceData = (): CrawlspaceData => {
    if (!data) return defaultCrawlspaceData;

    return {
      material: data.material || "None",
      condition: data.condition || "N/A",
      rValue: data.rValue || 0,
      recommendedValue: 10, // Standard recommendation for crawlspace
      maxValue: 15, // Standard max value for scale
      efficiency: data.rValue ? Math.round((data.rValue / 10) * 100) : 0,
      image: "https://i.postimg.cc/SQ7Hv3LP/Screenshot-2024-11-25-033547.png",
    };
  };

  const [crawlspaceData, setCrawlspaceData] = useState<CrawlspaceData>(
    processCrawlspaceData(),
  );

  useEffect(() => {
    // Update crawlspace data if report data changes
    setCrawlspaceData(processCrawlspaceData());
  }, [data]);

  const updateCrawlspaceData = (
    field: keyof CrawlspaceData,
    value: string | number,
  ) => {
    setCrawlspaceData((prev) => {
      const newData = { ...prev, [field]: value };

      // Update rValue and efficiency together
      if (field === "rValue") {
        const numericValue =
          typeof value === "string"
            ? Number.parseInt(value.replace("R", ""))
            : value;
        if (!isNaN(numericValue)) {
          newData.rValue = numericValue;
          newData.efficiency = (numericValue / prev.recommendedValue) * 100;

          // Notify parent component of the change
          if (onUpdate && data) {
            onUpdate({
              ...data,
              rValue: numericValue,
            });
          }
        }
      } else if (field === "efficiency") {
        const numericValue =
          typeof value === "string" ? Number.parseInt(value) : value;
        if (!isNaN(numericValue)) {
          newData.efficiency = numericValue;
          newData.rValue = (numericValue * prev.recommendedValue) / 100;

          // Notify parent component of the change
          if (onUpdate && data) {
            onUpdate({
              ...data,
              rValue: Math.round((numericValue * prev.recommendedValue) / 100),
            });
          }
        }
      } else if (field === "material") {
        // Notify parent component of the change
        if (onUpdate && data) {
          onUpdate({
            ...data,
            material: value as string,
          });
        }
      } else if (field === "condition") {
        // Notify parent component of the change
        if (onUpdate && data) {
          onUpdate({
            ...data,
            condition: value as string,
          });
        }
      }

      return newData;
    });
  };

  // Determine description text based on crawlspace data
  const getDescriptionText = () => {
    if (crawlspaceData.rValue < 3) {
      return "Uninsulated crawlspace walls";
    } else if (crawlspaceData.rValue < crawlspaceData.recommendedValue) {
      return "Partially insulated crawlspace walls";
    } else {
      return "Well-insulated crawlspace walls";
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader className="bg-teal-50 dark:bg-teal-900/20">
          <CardTitle className="text-2xl text-teal-600 dark:text-teal-300">
            Your Home&apos;s Crawlspace Wall Insulation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {(
                  [
                    {
                      label: "Material",
                      value: crawlspaceData.material,
                      field: "material" as const,
                      type: "text" as const,
                    },
                    {
                      label: "Condition",
                      value: crawlspaceData.condition,
                      field: "condition" as const,
                      type: "select" as const,
                      options: ["N/A", "Poor", "Fair", "Good", "Excellent"],
                    },
                    {
                      label: "Current R-Value",
                      value: `R${crawlspaceData.rValue}`,
                      field: "rValue" as const,
                      type: "text" as const,
                    },
                    {
                      label: "Recommended",
                      value: `R${crawlspaceData.recommendedValue}`,
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
                                updateCrawlspaceData(
                                  item.field,
                                  Number.parseInt(value.replace("R", "")),
                                );
                              } else {
                                updateCrawlspaceData(item.field, value);
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

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Current Efficiency
                    </span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {isAdmin ? (
                        <EditableField
                          value={`${Math.round((crawlspaceData.rValue / crawlspaceData.recommendedValue) * 100)}`}
                          onSave={(value) => {
                            const efficiency = Number.parseInt(value);
                            if (!isNaN(efficiency)) {
                              updateCrawlspaceData("efficiency", efficiency);
                            }
                          }}
                          type="number"
                          min={0}
                          max={100}
                        />
                      ) : (
                        `${Math.round((crawlspaceData.rValue / crawlspaceData.recommendedValue) * 100)}%`
                      )}
                    </span>
                  </div>
                  <Progress
                    value={
                      (crawlspaceData.rValue / crawlspaceData.maxValue) * 100
                    }
                    className="h-2 bg-teal-100 dark:bg-teal-700"
                  />
                </CardContent>
              </Card>

              <Card className="bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-teal-600 dark:text-teal-300">
                    BPI Recommendation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    BPI recommends Crawlspace Walls be insulated to R
                    {crawlspaceData.recommendedValue} for optimal energy
                    efficiency and moisture control.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {isAdmin ? (
                <ImageUpload
                  src={crawlspaceData.image || "/placeholder.svg"}
                  onImageChange={(newImage) =>
                    updateCrawlspaceData("image", newImage)
                  }
                />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <img
                    src={crawlspaceData.image || "/placeholder.svg"}
                    alt="Crawlspace wall"
                    className="object-cover w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold mb-1">Current Condition</h3>
                    <p className="text-sm">{getDescriptionText()}</p>
                  </div>
                </motion.div>
              )}

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Impact Analysis
                  </h3>
                  {crawlspaceData.rValue < crawlspaceData.recommendedValue ? (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {crawlspaceData.rValue < 3
                          ? "Uninsulated"
                          : "Inadequately insulated"}{" "}
                        crawlspace walls can lead to:
                      </p>
                      <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Increased energy costs</li>
                        <li>• Cold floors above the crawlspace</li>
                        <li>• Potential moisture issues</li>
                        <li>• Reduced comfort in rooms above</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Your well-insulated crawlspace provides these benefits:
                      </p>
                      <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Lower energy costs</li>
                        <li>• Warmer floors above the crawlspace</li>
                        <li>• Better moisture control</li>
                        <li>• Improved comfort throughout your home</li>
                      </ul>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
