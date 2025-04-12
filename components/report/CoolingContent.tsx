// Simplified CoolingContent that works with the isolated card
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Sun } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { driveImages } from "@/utils/image-utils";
import CoolingSystemCard from "./CoolingSystemCard"; // Import our isolated card

interface HeatingCoolingItem {
  condition: string;
  name: string;
  parameter: string;
  type: string;
  value: number | string;
  year?: number;
  image?: string;
}

interface CoolingData {
  data: HeatingCoolingItem[];
  title: string;
}

interface CoolingContentProps {
  data?: CoolingData;
  isAdmin?: boolean;
  onUpdateItem?: (updatedItem: HeatingCoolingItem) => void;
  driveImages?: driveImages[];
  onSave?: () => void;
}

export function CoolingContent({
  data,
  isAdmin = false,
  onUpdateItem,
  driveImages,
  onSave,
}: CoolingContentProps) {
  const params = useParams();
  const bookingNumber = params.bookingNumber;

  // Get the cooling items to display
  const getCoolingItems = () => {
    // Use the provided data if available
    if (data?.data?.length > 0) {
      return data.data.filter(
        (item) =>
          item.name.toLowerCase().includes("a/c") ||
          item.name.toLowerCase().includes("air condition") ||
          item.name.toLowerCase().includes("cooling") ||
          item.name.toLowerCase().includes("heat pump"),
      );
    }
    
    // Otherwise, use default cooling items
    return [
      {
        condition: "N/A",
        name: "Central Air Conditioning",
        parameter: "SEER",
        type: "None",
        value: 0,
        year: new Date().getFullYear(),
      }
    ];
  };
  
  // Get items to display
  const coolingItems = getCoolingItems();

  // Handle updating cooling items - directly pass to parent
  const handleUpdateItem = (updatedItem: HeatingCoolingItem) => {
    if (isAdmin && onUpdateItem) {
      console.log("Updating cooling item in CoolingContent:", updatedItem);
      onUpdateItem(updatedItem);
    }
  };

  // Handle save button click
  const handleSave = async () => {
    const REPORT_DATA_KEY = "report_data";
    let updatedReportData;
    try {
      const data = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);
      console.log("Data from localStorage:", data);

      if (!data) {
        console.error("No data found in localStorage");
        toast.error("No data found to save");
        return;
      }

      updatedReportData = JSON.parse(data);
      updatedReportData = {
        reportData: updatedReportData,
        reportUrl: "",
      };

      console.log("Data being saved:", updatedReportData);
    } catch (e) {
      console.error("Error getting data from localStorage:", e);
      toast.error("Error preparing data for submission");
      return;
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
        toast.error(errorData.detail || "Failed to update report");
        return;
      }

      toast.success("Cooling systems data saved successfully!");
      if (onSave) onSave();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("An error occurred while saving the data");
    }
  };

  return (
    <div className="space-y-8">
      {isAdmin && (
        <div className="flex justify-end items-center">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
          >
            Save
          </button>
        </div>
      )}
      
      <Card className="border-amber-100">
        <CardHeader className="bg-amber-50 dark:bg-amber-900/20">
          <CardTitle className="text-2xl text-amber-600 dark:text-amber-200 flex items-center gap-2">
            <Sun className="h-6 w-6" />
            Air Conditioning Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 bg-amber-50/50">
          <p className="text-gray-700 dark:text-gray-300">
            During your Home Energy Assessment, our technician closely
            examined your cooling equipment to determine the efficiency level
            of the system.
          </p>
          <div className="flex items-start space-x-4 text-gray-600 dark:text-gray-300">
            <Info className="h-5 w-5 mt-1 flex-shrink-0 text-amber-600" />
            <p className="text-sm leading-relaxed">
              SEER (Seasonal Energy Efficiency Ratio) - A ratio of the cooling
              output during a typical cooling season with the total electric
              energy input during the same period.
            </p>
          </div>
        </CardContent>
      </Card>

      {coolingItems.map((item, index) => (
        <CoolingSystemCard
          key={`${item.name}-${index}`}
          item={item}
          index={index}
          isAdmin={isAdmin}
          onUpdateItem={handleUpdateItem}
          driveImages={driveImages}
        />
      ))}
    </div>
  );
}