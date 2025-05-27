import { ReportData } from "@/app/admin/[bookingNumber]/report/page";
import React from "react";
import ReportSummarySectionSummaryOfConcerns from "./summaryOfConcerns";
import ReportSummarySectionSolutionsAndRecommendations from "./solutionsAndRecommendations";
import ReportSummarySectionFutureUpgrades from "./futureUpgrades";
import ReportSummarySectionEnvironmentalImpact from "./environmentalImpact";
import ReportSummarySectionFinancialSummary from "./financialSummary";
import ReportSummarySectionFederalTaxCredits from "./federalTaxCredits";

interface ReportSummaryConcernSectionProps {
  isAdmin?: boolean;
  reportData: ReportData;
  onUpdateValue?: (reportData: ReportData) => void;
}
const ReportSummaryConcernSection = ({
  isAdmin,
  reportData,
  onUpdateValue,
}: ReportSummaryConcernSectionProps) => {
  return (
    <div className="space-y-8">
      {/* {isAdmin && (
        <div className="flex justify-end items-center mb-4">
          <button
            // onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
          >
            Save
          </button>
        </div>
      )} */}

      <ReportSummarySectionSummaryOfConcerns
        isAdmin={isAdmin}
        summaryOfConcerns={reportData?.summaryOfConcerns}
        onUpdateValue={(updatedSummaryOfConcerns) => {
          if (onUpdateValue) {
            onUpdateValue({
              ...reportData,
              summaryOfConcerns: updatedSummaryOfConcerns,
            });
          }
        }}
      />
    </div>
  );
};

export default ReportSummaryConcernSection;
