"use client";

import type {
  ReportData,
  SolutionsAndRecommendationsData,
} from "@/app/admin/[bookingNumber]/report/page";
import ReportSummarySectionSolutionsAndRecommendations from "./solutionsAndRecommendations";
import ReportSummarySectionEnvironmentalImpact from "./environmentalImpact";
import ReportSummarySectionFinancialSummary from "./financialSummary";
import ReportSummarySectionFederalTaxCredits from "./federalTaxCredits";
import UnderstandingSolutions from "./understandingSolutions";
import { motion } from "framer-motion";
// import NotesSection from "./LoremIpsumHeading";
import type { HouseImage } from "../concerns/concerns";

interface ReportSummarySolutionSectionProps {
  isAdmin?: boolean;
  reportData: ReportData;
  onUpdateValue?: (reportData: ReportData) => void;
  houseImages: HouseImage[];
  onUpdateImages?: (images: HouseImage[]) => void;
  solutionsAndRecommendations?: SolutionsAndRecommendationsData[];
}

const ReportSummarySolutionSection = ({
  isAdmin,
  reportData,
  onUpdateValue,
  houseImages,
  solutionsAndRecommendations,
}: ReportSummarySolutionSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="summary-of-solutions"
      className="container bg-[#eaeaea] space-y-8"
    >
      <div className="pt-24">
        <section
          id="understanding-solutions"
          className="bg-[#eaeaea] flex items-center justify-center"
        >
          <UnderstandingSolutions />
        </section>
      </div>
      {/* <div className="pt-24">
        <section
          id="notes-section"
          className="bg-[#eaeaea] flex items-center justify-center"
        >
          <NotesSection
            isAdmin={isAdmin}
            houseImages={houseImages}
            selectedImages={reportData?.solutionImages || []}
            onUpdateImages={(images) => {
              if (onUpdateValue) {
                onUpdateValue({
                  ...reportData,
                  solutionImages: images,
                });
              }
            }}
            notesData={reportData?.solutionNotesData}
            onUpdateNotes={(notes) => {
              if (onUpdateValue) {
                onUpdateValue({
                  ...reportData,
                  solutionNotesData: notes,
                });
              }
            }}
            solutionsAndRecommendations={solutionsAndRecommendations}
          />
        </section>
      </div> */}
      <div className="pt-24">
        <section
          id="solutions-and-recommendations"
          className="bg-[#eaeaea] flex items-center justify-center"
        >
          <ReportSummarySectionSolutionsAndRecommendations
            isAdmin={isAdmin}
            solutionsAndRecommendations={
              reportData?.solutionsAndRecommendations
            }
            onUpdateValue={(solutionsAndRecommendations) => {
              if (onUpdateValue) {
                onUpdateValue({
                  ...reportData,
                  solutionsAndRecommendations: solutionsAndRecommendations,
                });
              }
            }}
          />
        </section>
      </div>

      <div className="pt-24">
        <section
          id="financial-summary"
          className="bg-[#eaeaea] flex items-center justify-center"
        >
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
        </section>
      </div>
      <div className="pt-24">
        <section
          id="federal-tax-credits"
          className="bg-[#eaeaea] flex items-center justify-center"
        >
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
        </section>
      </div>

      <div className="pt-24">
        <section
          id="environmental-impact"
          className="bg-[#eaeaea] flex items-center justify-center"
        >
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
        </section>
      </div>
    </motion.div>
  );
};

export default ReportSummarySolutionSection;
