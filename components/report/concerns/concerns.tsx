"use client";

import type { ReportData } from "@/app/admin/[bookingNumber]/report/page";
import ReportSummarySectionSummaryOfConcerns from "./summaryOfConcerns";

export interface HouseImage {
  mimeType: string;
  thumbnailLink: string;
  size: string;
  id: string;
  name: string;
  description: string;
  createdTime: string;
  modifiedTime: string;
  link: string;
}

interface ReportSummaryConcernSectionProps {
  isAdmin?: boolean;
  reportData: ReportData;
  onUpdateValue?: (reportData: ReportData) => void;
  houseImages?: HouseImage[];
}

const ReportSummaryConcernSection = ({
  isAdmin,
  reportData,
  onUpdateValue,
  houseImages,
}: ReportSummaryConcernSectionProps) => {
  return (
    <div className="space-y-8 container bg-[#eaeaea]">
      <ReportSummarySectionSummaryOfConcerns
        isAdmin={isAdmin}
        summaryOfConcerns={reportData?.summaryOfConcerns}
        houseImages={houseImages}
        selectedImages={reportData?.assessmentData?.images || []}
        assessmentData={reportData?.assessmentData}
        onUpdateValue={(updatedSummaryOfConcerns) => {
          if (onUpdateValue) {
            onUpdateValue({
              ...reportData,
              summaryOfConcerns: updatedSummaryOfConcerns,
            });
          }
        }}
        onUpdateImages={(images) => {
          if (onUpdateValue && reportData.assessmentData) {
            onUpdateValue({
              ...reportData,
              assessmentData: {
                ...reportData.assessmentData,
                images: images, // <-- UPDATE THE NESTED images ARRAY
              },
            });
          }
        }}
        onUpdateAssessment={(assessment) => {
          if (onUpdateValue) {
            onUpdateValue({
              ...reportData,
              assessmentData: assessment,
            });
          }
        }}
      />
    </div>
  );
};

export default ReportSummaryConcernSection;
