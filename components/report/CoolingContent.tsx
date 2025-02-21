"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Snowflake,
  AlertCircle,
  Info,
  Zap,
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

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  type: "text" | "select" | "number";
  options?: string[];
  min?: number;
  max?: number;
}

interface ACData {
  type: string;
  condition: string;
  currentSEER: number;
  recommendedSEER: number;
  image: string;
}

const GaugeChart = ({
  value,
  maxValue,
  label,
}: {
  value: number;
  maxValue: number;
  label: string;
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
          animate={{ strokeDasharray: `${percentage * 3.14}, 314` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <text
          x="100"
          y="95"
          textAnchor="middle"
          className="text-4xl font-bold"
          fill="currentColor"
        >
          {value}
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
      className="relative h-48 overflow-hidden rounded-lg"
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={src}
        alt="Air Conditioning Unit"
        className="object-cover w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
        <p className="text-white text-sm">
          Example of a central air conditioning unit
        </p>
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

export function CoolingContent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [acData, setAcData] = useState<ACData>({
    type: "Central",
    condition: "Fair",
    currentSEER: 10,
    recommendedSEER: 16,
    image: "https://picsum.photos/seed/ac-unit/800/400",
  });

  useEffect(() => {
    const isAdminUrl = window.location.href.includes("admin");
    setIsAdmin(isAdminUrl);
  }, []);

  const updateAcData = (field: keyof ACData, value: string | number) => {
    setAcData((prev) => ({
      ...prev,
      [field]: value,
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
              <Snowflake className="h-6 w-6" />
              Air Conditioning Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              During your Home Energy Assessment, our technician closely
              examined your cooling equipment to determine the efficiency level
              of the system.
            </p>
            <div className="flex items-start space-x-4 text-gray-600 dark:text-gray-300">
              <Info className="h-5 w-5 mt-1 flex-shrink-0 text-lime-500" />
              <p className="text-sm leading-relaxed">
                SEER (Seasonal Energy Efficiency Ratio) - A ratio of the cooling
                output during a typical cooling season with the total electric
                energy input during the same period.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...fadeInUp}>
        <Card className="overflow-hidden">
          <CardHeader className="bg-green-50 dark:bg-green-900/50">
            <CardTitle className="text-2xl text-lime-500 dark:text-green-200 flex items-center gap-2">
              <Snowflake className="h-6 w-6" />
              Your Home&apos;s Air Conditioner SEER
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="relative bg-[#f0fdf4] dark:bg-green-900/20 rounded-lg p-6">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-10 rounded-lg"
                    style={{
                      mixBlendMode: "overlay",
                      filter: "blur(8px)",
                    }}
                  />
                  <h3 className="relative text-2xl font-semibold text-lime-500 dark:text-green-300 mb-6">
                    Current Performance
                  </h3>
                  <GaugeChart
                    value={acData.currentSEER}
                    maxValue={20}
                    label="SEER"
                  />
                  <div className="mt-8 grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        Current SEER
                      </p>
                      {isAdmin ? (
                        <EditableField
                          value={`${acData.currentSEER}`}
                          onSave={(value) =>
                            updateAcData("currentSEER", parseInt(value))
                          }
                          type="number"
                          min={0}
                          max={20}
                        />
                      ) : (
                        <p className="text-3xl font-bold text-[#16a34a] dark:text-green-400">
                          {acData.currentSEER}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-base text-gray-600 dark:text-gray-400">
                        BPI Recommends
                      </p>
                      <p className="text-3xl font-bold text-[#ea580c] dark:text-orange-400">
                        {acData.recommendedSEER}
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
                      System Details
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Your air conditioner&apos;s current SEER rating of{" "}
                    {acData.currentSEER} means it&apos;s operating below optimal
                    efficiency. Upgrading to a high-efficiency model with{" "}
                    {acData.recommendedSEER} SEER could result in significant
                    energy savings.
                  </p>
                  <div className="grid grid-cols-2 gap-4 bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Type
                      </p>
                      {isAdmin ? (
                        <EditableField
                          value={acData.type}
                          onSave={(value) => updateAcData("type", value)}
                          type="text"
                        />
                      ) : (
                        <p className="font-medium">{acData.type}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Condition
                      </p>
                      {isAdmin ? (
                        <EditableField
                          value={acData.condition}
                          onSave={(value) => updateAcData("condition", value)}
                          type="select"
                          options={["Poor", "Fair", "Good", "Excellent"]}
                        />
                      ) : (
                        <p className="font-medium">{acData.condition}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-amber-600 mt-4">
                    <Zap className="h-5 w-5" />
                    <span className="text-sm">
                      *Estimated based on Age & Type
                    </span>
                  </div>
                </div>
                {isAdmin ? (
                  <ImageUpload
                    src={acData.image}
                    onImageChange={(newImage) =>
                      updateAcData("image", newImage)
                    }
                  />
                ) : (
                  <motion.div
                    className="relative h-48 overflow-hidden rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={acData.image}
                      alt="Air Conditioning Unit"
                      className="object-cover w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <p className="text-white text-sm">
                        Example of a central air conditioning unit
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
