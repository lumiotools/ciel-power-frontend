import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Fan,
  Home,
  Leaf,
  PlusCircle,
  Thermometer,
  Trash2,
  Lightbulb,
  Wind,
  Ruler,
  Wrench,
  ClipboardList,
  ChevronUp,
} from "lucide-react";
import { SolutionsAndRecommendationsData } from "@/app/admin/[bookingNumber]/report/page";
import ReportEditableInput from "../common/editableInput";
import ReportEditableTextArea from "../common/editableTextarea";

// Interface for component props
interface ReportSummarySectionSolutionsAndRecommendationsProps {
  isAdmin?: boolean;
  solutionsAndRecommendations?: SolutionsAndRecommendationsData[];
  onUpdateValue?: (
    solutionsAndRecommendations: SolutionsAndRecommendationsData[]
  ) => void;
}

const ReportSummarySectionSolutionsAndRecommendations = ({
  isAdmin,
  solutionsAndRecommendations,
  onUpdateValue,
}: ReportSummarySectionSolutionsAndRecommendationsProps) => {
  // Add state for toggle functionality
  const [isOpen, setIsOpen] = useState(true);

  // Add toggle function
  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to determine which icon to show based on recommendation title
  const getIconForRecommendation = (title?: string) => {
    if (!title) return ClipboardList;

    const titleLower = title.toLowerCase();
    if (titleLower.includes("air") || titleLower.includes("seal")) {
      return Wind; // Air-Sealing icon
    } else if (
      titleLower.includes("attic") &&
      titleLower.includes("insulation")
    ) {
      return Home; // Attic Insulation icon
    } else if (titleLower.includes("hatch")) {
      return Ruler; // Attic Hatch icon
    } else if (titleLower.includes("rim") || titleLower.includes("joint")) {
      return Wrench; // Rim joint Insulation icon
    } else if (titleLower.includes("crawl")) {
      return ClipboardList; // Crawlspace Encapsulation icon
    } else {
      return Leaf; // Default icon
    }
  };

  // Styles for the card component
  const cardStyle =
    "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden";

  // Handler for adding a new empty recommendation
  const addRecommendation = () => {
    if (onUpdateValue && solutionsAndRecommendations) {
      const emptyRecommendation: SolutionsAndRecommendationsData = {
        title: "",
        benefits: "",
        images: [],
      };
      onUpdateValue([...solutionsAndRecommendations, emptyRecommendation]);
    }
  };

  // Handler for deleting a recommendation by index
  const deleteRecommendation = (index: number) => {
    if (onUpdateValue && solutionsAndRecommendations) {
      const updatedRecommendations = solutionsAndRecommendations.filter(
        (_, i) => i !== index
      );
      onUpdateValue(updatedRecommendations);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      id="solutions-and-recommendations"
      className="w-full border-b border-gray-200 mb-4 -mt-4 pb-2"
    >
      <div className="w-full mx-auto px-4 py-4">
        {/* Header Section with Toggle Button */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Lightbulb className="text-[#67b502] w-8 h-8 mr-2" />
            <h2 className="text-[#67b502] text-2xl font-bold">
              Solutions & Recommended Upgrades
            </h2>
          </div>
          <button
            onClick={toggleSection}
            className="text-[#67b502] transition-transform duration-300 border-2 border-[#67b502] rounded-full p-0.5"
            aria-label={isOpen ? "Hide section" : "Show section"}
          >
            <ChevronUp
              className={`w-6 h-6 transition-transform duration-300 ${
                isOpen ? "" : "transform rotate-180"
              }`}
            />
          </button>
        </div>

        {/* Collapsible Content Section */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-[2000px] opacity-100 mt-4"
              : "max-h-0 opacity-0 mt-0"
          }`}
        >
          {/* Main Content Section */}
          <div className="mt-4">
            <div className="space-y-4">
              {/* Conditional Rendering: Show recommendations list or empty state */}
              {(solutionsAndRecommendations?.length ?? 0 > 0) ? (
                // Map through and render each recommendation
                solutionsAndRecommendations?.map((recommendation, index) => {
                  const RecommendationIcon = getIconForRecommendation(
                    recommendation.title
                  );

                  return (
                    <motion.div
                      key={`recommendation-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
                      className="bg-[#ffffff] rounded-xl border border-gray-200 p-8 shadow-sm"
                    >
                      {/* Header Row - Icon and Title */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                          <RecommendationIcon
                            className="h-7 w-7"
                            style={{ color: "#67B502" }}
                          />
                          <div
                            className="font-bold text-xl"
                            style={{ color: "#67B502" }}
                          >
                            {/* Editable Title */}
                            {isAdmin ? (
                              <ReportEditableInput
                                value={recommendation.title}
                                onChange={(value) =>
                                  onUpdateValue &&
                                  onUpdateValue([
                                    ...solutionsAndRecommendations.slice(
                                      0,
                                      index
                                    ),
                                    {
                                      ...recommendation,
                                      title: value as string,
                                    },
                                    ...solutionsAndRecommendations.slice(
                                      index + 1
                                    ),
                                  ])
                                }
                              />
                            ) : (
                              recommendation.title
                            )}
                          </div>
                        </div>
                        {/* Delete Button */}
                        {isAdmin && (
                          <button
                            onClick={() => deleteRecommendation(index)}
                            className="text-red-500 hover:text-red-700 px-2 py-1 text-xs rounded hover:bg-red-50 flex items-center gap-1 transition-colors"
                            type="button"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        )}
                      </div>

                      {/* Content Section - Full Width */}
                      <div className="text-gray-700 text-sm w-full">
                        {isAdmin ? (
                          <ReportEditableTextArea
                            value={recommendation.benefits}
                            onChange={(value) =>
                              onUpdateValue &&
                              onUpdateValue([
                                ...solutionsAndRecommendations.slice(0, index),
                                {
                                  ...recommendation,
                                  benefits: value as string,
                                },
                                ...solutionsAndRecommendations.slice(index + 1),
                              ])
                            }
                          />
                        ) : (
                          recommendation.benefits
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                // Empty State with No Recommendations Message
                <div className="bg-[#ffffff] rounded-xl border border-gray-200 p-8 shadow-sm">
                  <p className="text-gray-800 leading-relaxed text-base">
                    No recommendations or solutions have been added yet. This
                    section will display your home's recommended upgrades and
                    improvements once they are added.
                  </p>
                  {isAdmin && (
                    <button
                      onClick={addRecommendation}
                      className="mt-4 bg-[#ffffff] rounded-xl border border-gray-200 p-3 shadow-sm hover:bg-[#67B5020A] transition-all duration-300 flex items-center gap-2 text-[#67b502] font-medium"
                      type="button"
                    >
                      <PlusCircle className="h-5 w-5" />
                      Add Recommendation{" "}
                      {/* this is th efirst add button in side wala*/}
                    </button>
                  )}
                </div>
              )}

              {/* Footer: Add New Recommendation Button (Only shown when items exist) */}
              {isAdmin &&
                solutionsAndRecommendations &&
                solutionsAndRecommendations?.length > 0 && (
                  // <div className="flex justify-start p-4">
                  <div className="flex justify-start pl-8">
                    <button
                      onClick={addRecommendation}
                      className="bg-[#ffffff] rounded-xl border border-gray-200 p-4 shadow-sm hover:bg-[#67B5020A] transition-all duration-300 flex items-center gap-2 text-[#67b502] font-medium"
                      type="button"
                    >
                      <PlusCircle className="h-5 w-5" />
                      Add New Recommendation
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportSummarySectionSolutionsAndRecommendations;
