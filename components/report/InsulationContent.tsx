"use client";

import React from "react";

import { Benefits } from "@/components/report/Benefits";
import { InsulationOverview } from "@/components/report/InsulationOverview";
import { TechnicalAspects } from "@/components/report/TechnicalAspects";
import { SeasonalPerformance } from "@/components/report/SeasonalPerformance";
import { KneewallAssessment } from "@/components/report/KneewallAssessment";
import { ExteriorWallAssessment } from "@/components/report/ExteriorWallAssessment";
import { CrawlspaceAssessment } from "@/components/report/CrawlspaceAssessment";
import { RimJoistAssessment } from "@/components/report/RimJoistAssessment";
import { OverhangAssessment } from "@/components/report/OverhangAssessment";
import { InsulationZoneAssessment } from "@/components/report/InsulationZoneAssessment";
import { useParams } from "next/navigation";
import { toast } from "sonner";

// Define an interface for individual insulation items
interface InsulationDataItem {
  condition: string;
  material: string;
  name: string;
  rValue: number;
  image: string;
}

// Define an interface for the entire insulation data structure
interface InsulationData {
  data?: InsulationDataItem[];
  missingDataZones?: string[];
  missingZones?: string[];
  title?: string;
}

interface InsulationContentProps {
  data?: InsulationData;
  isAdmin?: boolean;
  onUpdateItem?: (updatedItem: InsulationDataItem) => void;
  driveImages?: string[];
  onSave?: () => void;
}

// Helper function to find the best matching item for a specific component type
const findBestMatchingItem = (
  data: InsulationDataItem[] | undefined,
  type: string,
): InsulationDataItem | null => {
  if (!data || data.length === 0) return null;

  console.log("findBestMatchingItem data:", data);
  console.log("findBestMatchingItem type:", type);

  // Convert type to lowercase for case-insensitive matching
  const typeLower = type.toLowerCase();

  // Define matching strategies based on type
  let matchingItems: InsulationDataItem[] = [];

  // Exact matching by type
  if (typeLower === "kneewall") {
    matchingItems = data.filter(
      (item) =>
        item.name.toLowerCase().includes("kneewall") ||
        item.name.toLowerCase().includes("knee wall"),
    );
  } else if (typeLower === "exterior wall") {
    matchingItems = data.filter(
      (item) =>
        item.name.toLowerCase().includes("exterior wall") ||
        (item.name.toLowerCase().includes("wall") &&
          !item.name.toLowerCase().includes("kneewall")),
    );
  } else if (typeLower === "crawlspace") {
    matchingItems = data.filter(
      (item) =>
        item.name.toLowerCase().includes("crawlspace") ||
        item.name.toLowerCase().includes("crawl space"),
    );
  } else if (typeLower === "rim joist") {
    matchingItems = data.filter(
      (item) =>
        item.name.toLowerCase().includes("rim joist") ||
        item.name.toLowerCase().includes("basement rj") ||
        (item.name.toLowerCase().includes("basement") &&
          item.name.toLowerCase().includes("rj")),
    );
  } else if (typeLower === "overhang") {
    matchingItems = data.filter(
      (item) =>
        item.name.toLowerCase().includes("overhang") ||
        item.name.toLowerCase().includes("over hang") ||
        item.name.toLowerCase().includes("oh"),
    );
  }

  console.log(
    "Matching items:",
    matchingItems,
    "its length:",
    matchingItems.length,
  );
  // If we found matches, pick the best one (prioritize non-zero R-values, better condition)
  if (matchingItems.length > 0) {
    // First priority: find items with non-zero R-value
    const nonZeroRValueItems = matchingItems.filter((item) => item.rValue > 0);
    if (nonZeroRValueItems.length > 0) {
      return nonZeroRValueItems[0]; // Return the first non-zero R-value item
    }

    // Second priority: find items with known conditions
    const knownConditionItems = matchingItems.filter(
      (item) =>
        item.condition?.toLowerCase() !== "unknown" &&
        item.material?.toLowerCase() !== "unknown",
    );
    if (knownConditionItems.length > 0) {
      return knownConditionItems[0]; // Return the first item with known condition
    }

    // If all else fails, return the first match
    return matchingItems[0];
  }
  console.log("No matching items found for type: so returning null", type);
  return null;
};

export function InsulationContent({
  data,
  isAdmin = false,
  onUpdateItem,
  driveImages,
  onSave,
}: InsulationContentProps) {
  console.log("InsulationContent data:", data);

  const params = useParams();

  const bookingNumber = params.bookingNumber;

  // Define the standard components we want to show
  const standardTypes = [
    "kneewall",
    "exterior wall",
    "crawlspace",
    "rim joist",
    "overhang",
  ];

  // Keep track of which data items have been displayed in the standard components
  const usedDataIndices = new Set<number>();

  // For each standard type, find the matching item and remember its index
  standardTypes.forEach((type) => {
    const matchingItem = findBestMatchingItem(data?.data, type);
    if (matchingItem && data?.data) {
      const index = data.data.findIndex(
        (item) =>
          item.name === matchingItem.name &&
          item.material === matchingItem.material &&
          item.condition === matchingItem.condition,
      );
      if (index !== -1) {
        usedDataIndices.add(index);
      }
    }
  });

  // Get remaining data items that haven't been displayed yet
  const remainingItems =
    data?.data?.filter((_, index) => !usedDataIndices.has(index)) || [];

  // Function to update an insulation item
  const handleUpdateInsulationItem = (updatedItem: InsulationDataItem) => {
    console.log("Updated item:", updatedItem);
    if (isAdmin && onUpdateItem) {
      onUpdateItem(updatedItem);
    }
  };

  const onSumit = async () => {
    const REPORT_DATA_KEY = "report_data";
    let updatedReportData;
    try {
      const data = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);
      console.log("Data from localStorage:", data);

      if (!data) {
        console.error("No insulation data found in localStorage");
        return;
      }
      // updatedReportData=data;
      updatedReportData = JSON.parse(data, null, 2);
      updatedReportData = {
        displayReport:false,
        reportData: updatedReportData,
        reportUrl: "",
      };

      console.log("Saved insulation data to localStorage");
    } catch (e) {
      console.error("Error getting insulation data to localStorage:", e);
    }

    try {
      console.log("Submitting data:", updatedReportData);
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

      const data = await response.json();
      toast.success("Data submitted successfully!");
      console.log("Data submitted successfully:", data);
      onSave();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {isAdmin && (<div className="flex justify-end items-center">
        <button
          onClick={onSumit}
          className=" px-4 py-2 rounded-full bg-green-500 text-white font-bold "
        >
          Save
        </button>
      </div>)}

      <InsulationOverview />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TechnicalAspects />
        <SeasonalPerformance />
      </div>

      <Benefits />

      {/* Standard components that have specialized UI */}
      {/* {!!findBestMatchingItem(data?.data, "kneewall") && ( */}
      <KneewallAssessment
        data={findBestMatchingItem(data?.data, "kneewall") ?? []}
        isAdmin={isAdmin}
        onUpdate={handleUpdateInsulationItem}
        driveImages={driveImages}
      />
      {/* )} */}
      {/* {!!findBestMatchingItem(data?.data, "exterior wall") && ( */}
      <ExteriorWallAssessment
        data={findBestMatchingItem(data?.data, "exterior wall")}
        isAdmin={isAdmin}
        onUpdate={handleUpdateInsulationItem}
        driveImages={driveImages}
      />
      {/* )} */}
      {/* {!!findBestMatchingItem(data?.data, "crawlspace") && ( */}
      <CrawlspaceAssessment
        data={findBestMatchingItem(data?.data, "crawlspace")}
        isAdmin={isAdmin}
        onUpdate={handleUpdateInsulationItem}
      />
      {/* )} */}
      {/* {!!findBestMatchingItem(data?.data, "rim joist") && ( */}
      <RimJoistAssessment
        data={findBestMatchingItem(data?.data, "rim joist")}
        isAdmin={isAdmin}
        onUpdate={handleUpdateInsulationItem}
        driveImages={driveImages}
      />
      {/* )} */}
      {/* {findBestMatchingItem(data?.data, "overhang") && ( */}
      <OverhangAssessment
        data={findBestMatchingItem(data?.data, "overhang")}
        isAdmin={isAdmin}
        onUpdate={handleUpdateInsulationItem}
        driveImages={driveImages}
      />
      {/* )} */}

      {/* Display remaining items using the generic component */}
      {remainingItems.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-teal-300 mt-10">
            Additional Insulation Zones
          </h2>
          {remainingItems.map((item, index) => (
            <InsulationZoneAssessment
              key={`${item.name}-${index}`}
              data={item}
              isAdmin={isAdmin}
              onUpdate={handleUpdateInsulationItem}
              driveImages={driveImages}
            />
          ))}
        </>
      )}
    </div>
  );
}
