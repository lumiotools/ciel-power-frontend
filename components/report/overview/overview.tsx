"use client";
import { ReportOverviewSectionHouseSystem } from "./houseSystem";
import ReportOverviewSectionAboutUs from "./about";
import ReportOverviewSectionGoals from "./goals";
import ReportOverviewSectionProgram from "./program";

const ReportOverviewSection = () => {
  return (
    <div className="container mx-auto">
      <ReportOverviewSectionAboutUs />
      <ReportOverviewSectionGoals />
      <ReportOverviewSectionProgram />
      <ReportOverviewSectionHouseSystem />
    </div>
  );
};

export default ReportOverviewSection;
