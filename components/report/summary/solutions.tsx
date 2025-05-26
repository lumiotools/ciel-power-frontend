import { ReportData } from "@/app/admin/[bookingNumber]/report/page";
import React from "react";
import ReportSummarySectionSummaryOfConcerns from "./summaryOfConcerns";
import ReportSummarySectionSolutionsAndRecommendations from "./solutionsAndRecommendations";
// import ReportSummarySectionFutureUpgrades from "./futureUpgrades";
import ReportSummarySectionEnvironmentalImpact from "./environmentalImpact";
import ReportSummarySectionFinancialSummary from "./financialSummary";
import ReportSummarySectionFederalTaxCredits from "./federalTaxCredits";
import UnderstandingSolutions from "./understanding-solutions";
import LoremIpsumHeading from "./LoremIpsumHeading";


interface ReportSummarySolutionSectionProps {
  isAdmin?: boolean;
  reportData: ReportData;
  onUpdateValue?: (reportData: ReportData) => void;
}
const ReportSummarySolutionSection = ({
  isAdmin,
  reportData,
  onUpdateValue,
}: ReportSummarySolutionSectionProps) => {
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

      {/* <ReportSummarySectionSummaryOfConcerns
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
      /> */}

      {/* <NotesSection
        isAdmin={isAdmin}
        notes={reportData?.notes}
        onUpdateValue={(notes) => {
          if (onUpdateValue) {
            onUpdateValue({
              ...reportData,
              notes: notes,
            });
          }
        }}
      /> */}
      <UnderstandingSolutions />
      <LoremIpsumHeading />

      <ReportSummarySectionSolutionsAndRecommendations
        isAdmin={isAdmin}
        solutionsAndRecommendations={reportData?.solutionsAndRecommendations}
        onUpdateValue={(solutionsAndRecommendations) => {
          if (onUpdateValue) {
            onUpdateValue({
              ...reportData,
              solutionsAndRecommendations: solutionsAndRecommendations,
            });
          }
        }}
      />

      {/* <ReportSummarySectionFutureUpgrades /> */}

      <ReportSummarySectionEnvironmentalImpact
        isAdmin={isAdmin}
        environmentalImpact={reportData?.environmentalImpact}
        onUpdateValue={(environmentalImpact) => {
          if (onUpdateValue) {
            onUpdateValue({
              ...reportData,
              environmentalImpact: environmentalImpact,
            });
          }
        }}
      />

      <ReportSummarySectionFinancialSummary
        isAdmin={isAdmin}
        financialSummary={reportData?.financialSummary}
        onUpdateValue={(financialSummary) => {
          if (onUpdateValue) {
            onUpdateValue({
              ...reportData,
              financialSummary: financialSummary,
            });
          }
        }}
      />

      <ReportSummarySectionFederalTaxCredits
        isAdmin={isAdmin}
        federalTaxCredits={reportData?.federalTaxCredits}
        onUpdateValue={(federalTaxCredits) => {
          if (onUpdateValue) {
            onUpdateValue({
              ...reportData,
              federalTaxCredits: federalTaxCredits,
            });
          }
        }}
      />

      

      {/* Project Costs Section - Without styled wrapper */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        id="project-costs"
      >
        <ProjectCosts
          data={{
            financialSummary: data?.financialSummary,
          }}
          isAdmin={isAdmin}
          bookingNumber={bookingNumber || ""}
          onUpdateFinancials={updateFinancials}
        />
      </motion.div> */}

      {/* Federal Tax Credits Section - Without styled wrapper */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        id="tax-credits"
      >
        <FederalTaxCredits
          data={data?.federalTaxCredits}
          isAdmin={isAdmin}
          bookingNumber={bookingNumber}
          reportData={data}
          onUpdate={updateTaxCredits}
        />
      </motion.div> */}
    </div>
  );
};

export default ReportSummarySolutionSection;
