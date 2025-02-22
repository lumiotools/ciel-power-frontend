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

interface RimJoistData {
  material: string;
  condition: string;
  rValue: number;
  recommendedValue: number;
  maxValue: number;
  efficiency: number;
  image: string;
}

interface FieldItem {
  label: string;
  value: string;
  field: keyof RimJoistData;
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
      <img src={src} alt="Rim joist area" className="object-cover w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-semibold mb-1">Current Condition</h3>
        <p className="text-sm">Uninsulated rim joist area</p>
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

export function RimJoistAssessment() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [rimJoistData, setRimJoistData] = useState<RimJoistData>({
    material: "None",
    condition: "N/A",
    rValue: 0,
    recommendedValue: 13,
    maxValue: 20,
    efficiency: 0,
    image: "https://i.postimg.cc/jSVNngms/Screenshot-2024-11-25-033709.png",
  });

  useEffect(() => {
    const isAdminUrl = window.location.href.includes("admin");
    setIsAdmin(isAdminUrl);
  }, []);

  const updateRimJoistData = (
    field: keyof RimJoistData,
    value: string | number
  ) => {
    setRimJoistData((prev) => {
      const newData = { ...prev, [field]: value };

      // Update rValue and efficiency together
      if (field === "rValue") {
        const numericValue =
          typeof value === "string" ? parseInt(value.replace("R", "")) : value;
        if (!isNaN(numericValue)) {
          newData.rValue = numericValue;
          newData.efficiency = (numericValue / prev.recommendedValue) * 100;
        }
      } else if (field === "efficiency") {
        const numericValue =
          typeof value === "string" ? parseInt(value) : value;
        if (!isNaN(numericValue)) {
          newData.efficiency = numericValue;
          newData.rValue = (numericValue * prev.recommendedValue) / 100;
        }
      }

      return newData;
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader className="bg-green-50 dark:bg-green-900/50">
          <CardTitle className="text-2xl text-lime-500 dark:text-green-200">
            Your Home&apos;s Rim Joist Insulation
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
                      value: rimJoistData.material,
                      field: "material" as const,
                      type: "text" as const,
                    },
                    {
                      label: "Condition",
                      value: rimJoistData.condition,
                      field: "condition" as const,
                      type: "select" as const,
                      options: ["N/A", "Poor", "Fair", "Good", "Excellent"],
                    },
                    {
                      label: "Current R-Value",
                      value: `R${rimJoistData.rValue}`,
                      field: "rValue" as const,
                      type: "text" as const,
                    },
                    {
                      label: "Recommended",
                      value: `R${rimJoistData.recommendedValue}`,
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
                                updateRimJoistData(
                                  item.field,
                                  parseInt(value.replace("R", ""))
                                );
                              } else {
                                updateRimJoistData(item.field, value);
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
                          value={`${Math.round(
                            (rimJoistData.rValue /
                              rimJoistData.recommendedValue) *
                              100
                          )}`}
                          onSave={(value) => {
                            const efficiency = parseInt(value);
                            if (!isNaN(efficiency)) {
                              updateRimJoistData("efficiency", efficiency);
                            }
                          }}
                          type="number"
                          min={0}
                          max={100}
                        />
                      ) : (
                        `${Math.round(
                          (rimJoistData.rValue /
                            rimJoistData.recommendedValue) *
                            100
                        )}%`
                      )}
                    </span>
                  </div>
                  <Progress
                    value={(rimJoistData.rValue / rimJoistData.maxValue) * 100}
                    className="h-2 bg-green-200 dark:bg-green-700"
                  />
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-lime-500 dark:text-green-200">
                    BPI Recommendation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    BPI recommends Rim Joists be insulated to R
                    {rimJoistData.recommendedValue} for optimal energy
                    efficiency and to prevent air infiltration.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {isAdmin ? (
                <ImageUpload
                  src={rimJoistData.image}
                  onImageChange={(newImage) =>
                    updateRimJoistData("image", newImage)
                  }
                />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <img
                    src={rimJoistData.image}
                    alt="Rim joist area"
                    className="object-cover w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold mb-1">Current Condition</h3>
                    <p className="text-sm">Uninsulated rim joist area</p>
                  </div>
                </motion.div>
              )}

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    Technical Details
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      The rim joist is a critical area for insulation as
                      it&apos;s often a significant source of heat loss and air
                      infiltration. Proper insulation here can:
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
