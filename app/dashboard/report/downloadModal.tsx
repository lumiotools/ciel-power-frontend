import React from "react";

// Define the ReportSection type
export type ReportSection =
  | "overview"
  | "airLeakage"
  | "insulation"
  | "heating"
  | "cooling"
  | "concerns"
  | "solutions";

// Define the props interface
interface DownloadModalProps {
  showDownloadModal: boolean;
  setShowDownloadModal: (show: boolean) => void;
  selectedSections: ReportSection[];
  setSelectedSections: (sections: ReportSection[]) => void;
  handleDownloadReport: (data: { selectedSections: ReportSection[] }) => void;
}

// PDF Icon component
const PdfIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={`text-lime-500 ${className}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
      fill="currentColor"
    />
    <path d="M14 2V8H20L14 2Z" fill="currentColor" fillOpacity="0.5" />
  </svg>
);

// Checkmark Icon component
const CheckmarkIcon: React.FC = () => (
  <svg
    className="text-lime-500"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" />
    <path
      d="M9 12L11 14L15 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadModal: React.FC<DownloadModalProps> = ({
  showDownloadModal,
  setShowDownloadModal,
  selectedSections,
  setSelectedSections,
  handleDownloadReport,
}) => {
  // Define sections configuration
  const sections: Array<{ id: ReportSection; name: string }> = [
    { id: "overview", name: "Overview" },
    { id: "airLeakage", name: "Air Leakage" },
    { id: "insulation", name: "Insulation" },
    { id: "heating", name: "Heating" },
    { id: "cooling", name: "Cooling" },
    { id: "concerns", name: "Concerns" },
    { id: "solutions", name: "Solutions" },
  ];

  // All available section IDs
  const allSectionIds: ReportSection[] = sections.map((section) => section.id);

  // Function to toggle all sections
  const toggleAllSections = (checked: boolean): void => {
    if (checked) {
      setSelectedSections([...allSectionIds]);
    } else {
      setSelectedSections([]);
    }
  };

  // Function to toggle a specific section
  const toggleSection = (section: ReportSection): void => {
    if (selectedSections.includes(section)) {
      setSelectedSections(selectedSections.filter((s) => s !== section));
    } else {
      setSelectedSections([...selectedSections, section]);
    }
  };

  // Check if all sections are selected
  const allSelected = allSectionIds.every((section) =>
    selectedSections.includes(section)
  );

  if (!showDownloadModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setShowDownloadModal(false)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="flex items-center mb-8">
          <PdfIcon className="mr-3" />
          <h2 className="text-2xl font-bold">Download as PDF</h2>
        </div>

        <p className="text-gray-600 mb-6 text-lg">
          Select the sections you want to include in your downloaded report.
        </p>

        {/* Section list */}
        <div className="space-y-4 mb-8">
          <div
            className="flex items-center py-2 border-b border-gray-200 cursor-pointer"
            onClick={() => toggleAllSections(!allSelected)}
          >
            <div className="flex-shrink-0 mr-3">
              {allSelected ? (
                <CheckmarkIcon />
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
              )}
            </div>
            <span className="text-lg font-medium">Select All</span>
          </div>

          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center py-2 border-b border-gray-200 cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex-shrink-0 mr-3">
                {selectedSections.includes(section.id) ? (
                  <CheckmarkIcon />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                )}
              </div>
              <span className="text-lg">{section.name}</span>
            </div>
          ))}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-between">
          <button
            className="px-6 py-3 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
            onClick={() => setShowDownloadModal(false)}
          >
            Cancel
          </button>

          <button
            className="px-6 py-3 bg-lime-500 rounded-md text-white font-medium hover:bg-lime-600 flex items-center"
            onClick={() => {
              handleDownloadReport({ selectedSections });
              setShowDownloadModal(false);
            }}
          >
            <PdfIcon className="mr-2 text-white" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
