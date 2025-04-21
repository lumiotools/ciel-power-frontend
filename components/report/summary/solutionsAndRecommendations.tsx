import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Calculator,
  Fan,
  Home,
  Leaf,
  PlusCircle,
  Thermometer,
  Trash2,
} from "lucide-react";
import { SolutionsAndRecommendationsData } from "@/app/admin/[bookingNumber]/report/page";
import ReportEditableInput from "../common/editableInput";
import ReportEditableTextArea from "../common/editableTextarea";

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
  const getIconForRecommendation = (title?: string) => {
    if (!title) return Home;

    const titleLower = title.toLowerCase();
    if (titleLower.includes("air") || titleLower.includes("seal")) {
      return Fan;
    } else if (
      titleLower.includes("attic") ||
      titleLower.includes("insulation")
    ) {
      return Home;
    } else if (titleLower.includes("hatch")) {
      return ArrowUp;
    } else if (titleLower.includes("rim") || titleLower.includes("joist")) {
      return Thermometer;
    } else if (titleLower.includes("crawl") || titleLower.includes("space")) {
      return Home;
    } else {
      return Leaf;
    }
  };

  const cardStyle =
    "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden";

  const addRecommendation = () => {
    if (onUpdateValue && solutionsAndRecommendations) {
      const emptyRecommendation: SolutionsAndRecommendationsData = {
        title: "",
        benefits: "",
      };
      onUpdateValue([...solutionsAndRecommendations, emptyRecommendation]);
    }
  };

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
    >
      <div className={cardStyle}>
        <div className="py-3 px-5" style={{ backgroundColor: "#67B5021A" }}>
          <h2
            className="flex items-center gap-2 font-medium"
            style={{ color: "#67B502" }}
          >
            <Calculator className="h-5 w-5" style={{ color: "#67B502" }} />
            Solutions & Recommended Upgrades
          </h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {(solutionsAndRecommendations?.length ?? 0 > 0) ? (
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
                    className="p-5 rounded-lg"
                    style={{ backgroundColor: "#67B5020A" }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12"
                        style={{ backgroundColor: "#67B5021A" }}
                      >
                        <RecommendationIcon
                          className="h-5 w-5"
                          style={{ color: "#67B502" }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div
                            className="font-medium mb-1"
                            style={{ color: "#67B502" }}
                          >
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
                        <div className="text-gray-700 text-sm my-2">
                          {isAdmin ? (
                            <ReportEditableTextArea
                              value={recommendation.benefits}
                              onChange={(value) =>
                                onUpdateValue &&
                                onUpdateValue([
                                  ...solutionsAndRecommendations.slice(
                                    0,
                                    index
                                  ),
                                  {
                                    ...recommendation,
                                    benefits: value as string,
                                  },
                                  ...solutionsAndRecommendations.slice(
                                    index + 1
                                  ),
                                ])
                              }
                            />
                          ) : (
                            recommendation.benefits
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg"
                style={{ backgroundColor: "#67B5020A" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="rounded-full flex items-center justify-center aspect-square w-10 md:w-12"
                    style={{ backgroundColor: "#67B5021A" }}
                  >
                    <Leaf className="h-5 w-5" style={{ color: "#67B502" }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium" style={{ color: "#67B502" }}>
                      No Recommendations
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">
                      No recommendations or solutions have been added yet.
                    </p>

                    {isAdmin && (
                      <button
                        onClick={addRecommendation}
                        className="mt-4 px-4 py-2 rounded text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: "#67B5021A",
                          color: "#67B502",
                        }}
                        type="button"
                      >
                        + Add Recommendation
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Add New Recommendation button */}
            {isAdmin &&
              solutionsAndRecommendations &&
              solutionsAndRecommendations?.length > 0 && (
                <div className="flex justify-end p-4">
                  <button
                    onClick={addRecommendation}
                    className="px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1"
                    style={{ backgroundColor: "#67B5021A", color: "#67B502" }}
                    type="button"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add New Recommendation
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportSummarySectionSolutionsAndRecommendations;
