"use client";

import React from "react";

import { Benefits } from "@/components/report/Benefits";
import { InsulationOverview } from "@/components/report/InsulationOverview";
import {TechnicalAspects} from "@/components/report/TechnicalAspects";
import {SeasonalPerformance} from "@/components/report/SeasonalPerformance";
import { KneewallAssessment } from "@/components/report/KneewallAssessment";
import { ExteriorWallAssessment } from "@/components/report/ExteriorWallAssessment";
import { CrawlspaceAssessment } from "@/components/report/CrawlspaceAssessment";
import { RimJoistAssessment } from "@/components/report/RimJoistAssessment";
import { OverhangAssessment } from "@/components/report/OverhangAssessment";
// import { InsulationChatbot } from "@/components/InsulationChatbot";

export function InsulationContent() {
  return (
    <div className="space-y-8 pb-20">
      {/* <h1 className="text-3xl font-semibold">Insulation</h1> */}
      <InsulationOverview />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TechnicalAspects />
        <SeasonalPerformance />
      </div>

      <Benefits />
      <KneewallAssessment /> 
      <ExteriorWallAssessment />
      <CrawlspaceAssessment />
      <RimJoistAssessment />
      <OverhangAssessment />
      {/*<InsulationChatbot activeMenu="insulation" /> */} 
    </div>
  );
}