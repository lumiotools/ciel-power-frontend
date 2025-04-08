"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Pencil, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Define the interfaces for our data
interface FootprintData {
  value: string;
  unit: string;
}

interface EnvironmentalData {
  title: string;
  currentFootprint: FootprintData;
  projectedSavings: FootprintData;
  projectedFootprint: FootprintData;
  totalReduction: FootprintData;
}

// This component will be part of ReportSummary which is in ReportPage
interface EnvironmentalImpactProps {
  data?: EnvironmentalData;
  isAdmin?: boolean;
  onUpdate?: (data: EnvironmentalData) => void;
  bookingNumber?: string;
  reportData?: any; // Access to the overall report data if needed
}

// In-place edit component
interface InPlaceEditProps {
  initialValue?: string;
  isAdmin: boolean;
  onUpdate: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

const InPlaceEdit: React.FC<InPlaceEditProps> = ({
  initialValue,
  isAdmin,
  onUpdate,
  multiline = false,
  placeholder = "Enter text"
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || "");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(initialValue || "");
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

  const handleSave = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onUpdate(value);
    }
  };

  const handleCancel = () => {
    setValue(initialValue || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!multiline && e.key === "Enter") {
      handleSave();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-green-500"
          />
        )}
        <button
          onClick={handleSave}
          className="p-1 hover:bg-green-100 rounded text-green-600 transition-colors"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={handleCancel}
          className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`${isAdmin ? 'cursor-pointer hover:bg-gray-50 rounded p-1 group' : ''} ${!value ? 'text-gray-400 italic' : ''}`}
      onClick={handleClick}
    >
      {value || (!isAdmin ? "No content" : placeholder)}
      {isAdmin && (
        <Pencil className="ml-2 h-4 w-4 inline-block text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
};

// Value with unit component that displays them inline
interface ValueWithUnitProps {
  data: FootprintData;
  isAdmin: boolean;
  onUpdate: (value: string) => void;
  placeholder?: string;
}

const ValueWithUnit: React.FC<ValueWithUnitProps> = ({
  data,
  isAdmin,
  onUpdate,
  placeholder = "Enter value"
}) => {
  return (
    <div className="flex items-center">
      <div className="mr-1">
        <InPlaceEdit
          initialValue={data.value || "-"}
          isAdmin={isAdmin}
          onUpdate={onUpdate}
          placeholder={placeholder}
        />
      </div>
      <span>{data.unit}</span>
    </div>
  );
};

export function EnvironmentalImpact({ data, isAdmin = false, onUpdate, bookingNumber, reportData }: EnvironmentalImpactProps) {
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData>({
    title: "Environmental Impact",
    currentFootprint: { value: "", unit: "lbs of CO2" },
    projectedSavings: { value: "", unit: "%" },
    projectedFootprint: { value: "", unit: "lbs of CO2" },
    totalReduction: { value: "", unit: "lbs of CO2" }
  });

  const REPORT_DATA_KEY = "report_data";

  // Load data from props or create default
  useEffect(() => {
    if (data) {
      setEnvironmentalData(data);
    } else if (bookingNumber) {
      // Try to load from localStorage if no data was passed
      const savedData = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          if (parsedData.environmentalImpact) {
            setEnvironmentalData(parsedData.environmentalImpact);
          }
        } catch (e) {
          console.error("Error parsing environmental data from localStorage:", e);
        }
      }
    }
  }, [data, bookingNumber]);

  const handleUpdate = (field: keyof EnvironmentalData, subField: 'value' | 'unit', value: string) => {
    if (!isAdmin) return;

    // Create a deep copy of the current data
    const updatedData = JSON.parse(JSON.stringify(environmentalData)) as EnvironmentalData;
    
    // Update the specific field and subfield
    if (field !== 'title') {
      updatedData[field][subField] = value;
    } else if (field === 'title') {
      updatedData.title = value;
    }

    setEnvironmentalData(updatedData);

    // Save to localStorage if bookingNumber is available
    if (bookingNumber) {
      try {
        const savedData = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          const updatedReportData = {
            ...parsedData,
            environmentalImpact: updatedData
          };
          
          localStorage.setItem(
            `${REPORT_DATA_KEY}_${bookingNumber}`,
            JSON.stringify(updatedReportData)
          );
          console.log("Saved environmental data to localStorage");
        }
      } catch (e) {
        console.error("Error saving environmental data to localStorage:", e);
      }
    }

    // Call the onUpdate prop if provided
    if (onUpdate) {
      onUpdate(updatedData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Card className="border-green-100">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-green-600 dark:text-green-200 flex items-center gap-2">
              <Leaf className="h-6 w-6" />
              Environmental Impact
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4 bg-green-50/50">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Estimated Carbon Footprint & Projected Reduction
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <span className="font-medium">Household Carbon Footprint</span>
                  <p className="text-xs text-gray-500">*based on the Utility Bills provided (annually)</p>
                </div>
                <div className="text-gray-700 font-semibold">
                  <ValueWithUnit 
                    data={environmentalData.currentFootprint}
                    isAdmin={isAdmin}
                    onUpdate={(value) => handleUpdate("currentFootprint", "value", value)}
                    placeholder="Enter value"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Projected Total Energy Savings</span>
                <div className="text-green-600 font-semibold">
                  <ValueWithUnit 
                    data={environmentalData.projectedSavings}
                    isAdmin={isAdmin}
                    onUpdate={(value) => handleUpdate("projectedSavings", "value", value)}
                    placeholder="Enter value"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <span className="font-medium">Projected Carbon Footprint</span>
                  <p className="text-xs text-gray-500">*after installing proposed upgrades</p>
                </div>
                <div className="text-gray-700 font-semibold">
                  <ValueWithUnit 
                    data={environmentalData.projectedFootprint}
                    isAdmin={isAdmin}
                    onUpdate={(value) => handleUpdate("projectedFootprint", "value", value)}
                    placeholder="Enter value"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Projected CO2 Reduction</h4>
                  <p className="text-xs text-gray-500">*Over a 10 year period</p>
                </div>
                <div className="text-green-600 text-xl font-bold">
                  <ValueWithUnit 
                    data={environmentalData.totalReduction}
                    isAdmin={isAdmin}
                    onUpdate={(value) => handleUpdate("totalReduction", "value", value)}
                    placeholder="Enter value"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}