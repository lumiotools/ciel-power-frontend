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

// Define an interface for individual insulation items
interface InsulationDataItem {
  condition: string;
  material: string;
  name: string;
  rValue: number;
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
}

// Helper function to find the best matching item for a specific component type
const findBestMatchingItem = (data: InsulationDataItem[] | undefined, type: string): InsulationDataItem | undefined => {
  if (!data || data.length === 0) return undefined;
  
  // Convert type to lowercase for case-insensitive matching
  const typeLower = type.toLowerCase();
  
  // Define matching strategies based on type
  let matchingItems: InsulationDataItem[] = [];
  
  // Exact matching by type
  if (typeLower === 'kneewall') {
    matchingItems = data.filter(item => 
      item.name.toLowerCase().includes('kneewall') || 
      item.name.toLowerCase().includes('knee wall')
    );
  } else if (typeLower === 'exterior wall') {
    matchingItems = data.filter(item => 
      item.name.toLowerCase().includes('exterior wall') || 
      (item.name.toLowerCase().includes('wall') && !item.name.toLowerCase().includes('kneewall'))
    );
  } else if (typeLower === 'crawlspace') {
    matchingItems = data.filter(item => 
      item.name.toLowerCase().includes('crawlspace') || 
      item.name.toLowerCase().includes('crawl space')
    );
  } else if (typeLower === 'rim joist') {
    matchingItems = data.filter(item => 
      item.name.toLowerCase().includes('rim joist') || 
      item.name.toLowerCase().includes('basement rj') ||
      (item.name.toLowerCase().includes('basement') && item.name.toLowerCase().includes('rj'))
    );
  } else if (typeLower === 'overhang') {
    matchingItems = data.filter(item => 
      item.name.toLowerCase().includes('overhang') || 
      item.name.toLowerCase().includes('over hang') ||
      item.name.toLowerCase().includes('oh')
    );
  }
  
  // If we found matches, pick the best one (prioritize non-zero R-values, better condition)
  if (matchingItems.length > 0) {
    // First priority: find items with non-zero R-value
    const nonZeroRValueItems = matchingItems.filter(item => item.rValue > 0);
    if (nonZeroRValueItems.length > 0) {
      return nonZeroRValueItems[0]; // Return the first non-zero R-value item
    }
    
    // Second priority: find items with known conditions
    const knownConditionItems = matchingItems.filter(item => 
      item.condition.toLowerCase() !== 'unknown' && 
      item.material.toLowerCase() !== 'unknown'
    );
    if (knownConditionItems.length > 0) {
      return knownConditionItems[0]; // Return the first item with known condition
    }
    
    // If all else fails, return the first match
    return matchingItems[0];
  }
  
  return undefined;
};

export function InsulationContent({ data, isAdmin = false, onUpdateItem,driveImages }: InsulationContentProps) {
  // Define the standard components we want to show
  const standardTypes = ['kneewall', 'exterior wall', 'crawlspace', 'rim joist', 'overhang'];
  
  // Keep track of which data items have been displayed in the standard components
  const usedDataIndices = new Set<number>();
  
  // For each standard type, find the matching item and remember its index
  standardTypes.forEach(type => {
    const matchingItem = findBestMatchingItem(data?.data, type);
    if (matchingItem && data?.data) {
      const index = data.data.findIndex(item => 
        item.name === matchingItem.name && 
        item.material === matchingItem.material && 
        item.condition === matchingItem.condition
      );
      if (index !== -1) {
        usedDataIndices.add(index);
      }
    }
  });
  
  // Get remaining data items that haven't been displayed yet
  const remainingItems = data?.data?.filter((_, index) => !usedDataIndices.has(index)) || [];

  // Function to update an insulation item
  const handleUpdateInsulationItem = (updatedItem: InsulationDataItem) => {
    if (isAdmin && onUpdateItem) {
      onUpdateItem(updatedItem);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <InsulationOverview />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TechnicalAspects />
        <SeasonalPerformance />
      </div>

      <Benefits />
      
      {/* Standard components that have specialized UI */}
      <KneewallAssessment 
        data={findBestMatchingItem(data?.data, 'kneewall')} 
        isAdmin={isAdmin}
        onUpdate={handleUpdateInsulationItem}
        driveImages={driveImages}
      /> 
      <ExteriorWallAssessment 
        data={findBestMatchingItem(data?.data, 'exterior wall')} 
        isAdmin={isAdmin}
        onUpdate={handleUpdateInsulationItem}
      />
      <CrawlspaceAssessment 
        data={findBestMatchingItem(data?.data, 'crawlspace')} 
        isAdmin={isAdmin}
        onUpdate={handleUpdateInsulationItem}
      />
      <RimJoistAssessment 
        data={findBestMatchingItem(data?.data, 'rim joist')} 
        isAdmin={isAdmin}
        onUpdate={handleUpdateInsulationItem}
      />
      <OverhangAssessment 
        data={findBestMatchingItem(data?.data, 'overhang')} 
        isAdmin={isAdmin}
        onUpdate={handleUpdateInsulationItem}
      />
      
      {/* Display remaining items using the generic component */}
      {remainingItems.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-teal-700 dark:text-teal-300 mt-10">Additional Insulation Zones</h2>
          {remainingItems.map((item, index) => (
            <InsulationZoneAssessment 
              key={`${item.name}-${index}`} 
              data={item} 
              isAdmin={isAdmin}
              onUpdate={handleUpdateInsulationItem}
            />
          ))}
        </>
      )}
    </div>
  );
}