"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Wind,
  Home,
  ArrowUp,
  ArrowDown,
  Info,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface AirLeakageData {
  parameter: string;
  title: string;
  value: string;
}

interface AirLeakageContentProps {
  data?: AirLeakageData;
  isAdmin?: boolean;
  onUpdateValue?: (newValue: string) => void;
  onSave?: () => void;
}

export function AirLeakageContent({
  data,
  isAdmin = false,
  onUpdateValue,
  onSave,
}: AirLeakageContentProps) {
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

  console.log("AirLeakageContent data:", data);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const [value, setValue] = useState<number>(parseFloat(data?.value || "0.00"));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(parseFloat(data?.value || "0.00"));
  }, [data?.value]);

  const handleSave = () => {
    if (onUpdateValue && isAdmin) {
      onUpdateValue(value.toFixed(2)); // Save the updated value
    }
    setIsEditing(false); // Exit editing mode
  };

  const handleCancel = () => {
    setValue(parseFloat(data?.value || "0.00")); // Reset to the initial value
    setIsEditing(false); // Exit editing mode
  };

  const params = useParams();

  const bookingNumber = params.bookingNumber;

  const onSumit = async () => {
    const REPORT_DATA_KEY = "report_data";
    let updatedReportData;
    try {
      const data = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);

      if (!data) {
        console.error("No insulation data found in localStorage");
        return;
      }
      // updatedReportData=data;
      updatedReportData = JSON.parse(data, null, 2);
      updatedReportData = {
        reportData: updatedReportData,
        reportUrl: "",
      };
    } catch (e) {
      console.error("Error getting insulation data to localStorage:", e);
    }

    try {
      const response = await fetch(
        `/api/admin/bookings/${bookingNumber}/report/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedReportData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to fetch report details");
        return;
      }

      await response.json();
      toast.success("Data submitted successfully!");
      onSave();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="space-y-8">
      {isAdmin && (
        <div className="flex justify-end items-center">
          <button
            onClick={onSumit}
            className=" px-4 py-2 rounded-full bg-green-500 text-white font-bold "
          >
            Save
          </button>
        </div>
      )}
      {/* Introduction Section */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle className="text-2xl text-blue-700 dark:text-blue-200">
              {data?.title || "BPI Approach to Air Sealing"}
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
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
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
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle className="text-2xl text-blue-700 dark:text-blue-200">
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
                    <Progress
                      value={35}
                      className="h-2 bg-blue-100 dark:bg-blue-700"
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
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
                  <Wind className="h-24 w-24 text-blue-400 opacity-50" />
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Air Changes Per Hour Section */}
      <motion.div {...fadeInUp}>
        <Card>
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle className="text-2xl text-blue-700 dark:text-blue-200">
              Your Home&apos;s Air Changes Per Hour (ACH)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Your Results
                  </p>
                  <div className="flex items-center space-x-4">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => setValue(parseFloat(e.target.value))}
                          className="border rounded px-2 py-1 w-20"
                          min={0}
                          max={100}
                          autoFocus
                        />
                        <button
                          onClick={handleSave}
                          className="p-1 bg-green-100 hover:bg-green-200 rounded text-green-600"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-1 bg-red-100 hover:bg-red-200 rounded text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-4xl font-bold text-blue-700">
                          {value.toFixed(2)}
                        </p>
                        {isAdmin && (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                    <div className="text-sm text-gray-600">ACH</div>
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
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <ArrowUp className="absolute top-0 left-1/2 transform -translate-x-1/2 h-8 w-8 text-red-500" />

                      <ArrowDown className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-8 w-8 text-blue-500" />

                      <Home className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 text-gray-400" />
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
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle className="text-2xl text-blue-700 dark:text-blue-200">
              Common Air Leak Points
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {airLeakagePoints.map((point, index) => (
                <motion.div
                  key={point.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {point.id}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {point.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

interface InPlaceEditProps {
  initialValue: string;
  isAdmin: boolean;
  onUpdate: (value: string) => void;
}

function InPlaceEdit({ initialValue, isAdmin, onUpdate }: InPlaceEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isAdmin) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onUpdate(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      if (value !== initialValue) {
        onUpdate(value);
      }
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="text-4xl font-bold text-blue-700 bg-transparent border-b border-blue-700 outline-none"
      />
    );
  }

  return (
    <div
      className="text-4xl font-bold text-blue-700 flex items-center cursor-pointer"
      onClick={handleClick}
    >
      {value}
      {isAdmin && <Pencil className="ml-2 h-5 w-5 text-gray-400" />}
    </div>
  );
}
