import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Fan,
  PlusCircle,
  Shield,
  Thermometer,
  Trash2,
} from "lucide-react";
import { SummaryOfConcernsData } from "@/app/admin/[bookingNumber]/report/page";
import ReportEditableInput from "../common/editableInput";
import ReportEditableTextArea from "../common/editableTextarea";

interface ReportSummarySectionSummaryOfConcernsProps {
  isAdmin?: boolean;
  summaryOfConcerns?: SummaryOfConcernsData[];
  onUpdateValue?: (summaryOfConcerns: SummaryOfConcernsData[]) => void;
}

const ReportSummarySectionSummaryOfConcerns = ({
  isAdmin,
  summaryOfConcerns,
  onUpdateValue,
}: ReportSummarySectionSummaryOfConcernsProps) => {
  const getIconForConcern = (name?: string) => {
    if (!name) return AlertTriangle;

    const nameLower = name.toLowerCase();
    if (
      nameLower.includes("vent") ||
      nameLower.includes("fan") ||
      nameLower.includes("dryer")
    ) {
      return Fan;
    } else if (nameLower.includes("combustion") || nameLower.includes("gas")) {
      return Activity;
    } else if (nameLower.includes("water") || nameLower.includes("heating")) {
      return Thermometer;
    } else {
      return AlertTriangle;
    }
  };

  const cardStyle =
    "bg-white rounded-lg shadow-sm border border-gray-100 mb-6 overflow-hidden";

  const addConcern = () => {
    if (onUpdateValue && summaryOfConcerns) {
      const emptyConcern: SummaryOfConcernsData = {
        name: "",
        concern: "",
        flag: false,
      };
      onUpdateValue([...summaryOfConcerns, emptyConcern]);
    }
  };

  const deleteConcern = (index: number) => {
    if (onUpdateValue && summaryOfConcerns) {
      const updatedConcerns = summaryOfConcerns.filter((_, i) => i !== index);
      onUpdateValue(updatedConcerns);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="summary-of-concerns"
    >
      <div className={cardStyle}>
        <div className="py-3 px-5" style={{ backgroundColor: "#FF67001A" }}>
          <h2
            className="flex items-center gap-2 font-medium"
            style={{ color: "#FF6700" }}
          >
            <AlertTriangle className="h-5 w-5" style={{ color: "#FF6700" }} />
            Summary of Concerns
          </h2>
        </div>

        <div className="p-6">
          <div className="grid gap-4">
            {(summaryOfConcerns?.length ?? 0 > 0) ? (
              <div>
                {/* Add New Concern button when there are already concerns */}
                {isAdmin && (
                  <div className="flex justify-end pb-4">
                    <button
                      onClick={addConcern}
                      className="px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-1"
                      style={{
                        backgroundColor: "#FF67001A",
                        color: "#FF6700",
                      }}
                      type="button"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add New Concern
                    </button>
                  </div>
                )}

                {summaryOfConcerns
                  ?.filter(({ flag }) => isAdmin || flag)
                  .map((concern, index) => {
                    const ConcernIcon = getIconForConcern(concern.name);
                    return (
                      <motion.div
                        key={`concern-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="p-4 rounded-lg mb-4"
                        style={{ backgroundColor: "#FF67000A" }}
                      >
                        <div className="flex items-center mb-2">
                          <ConcernIcon className="h-5 w-5 mr-2 text-orange-500" />
                          <div
                            className="font-medium"
                            style={{ color: "#FF6700" }}
                          >
                            {isAdmin ? (
                              <ReportEditableInput
                                value={concern.name}
                                onChange={(value) => {
                                  onUpdateValue &&
                                    onUpdateValue([
                                      ...summaryOfConcerns.slice(0, index),
                                      { ...concern, name: value as string },
                                      ...summaryOfConcerns.slice(index + 1),
                                    ]);
                                }}
                              />
                            ) : (
                              concern.name
                            )}
                          </div>
                          {isAdmin && (
                            <button
                              onClick={() => deleteConcern(index)}
                              className="ml-auto text-red-500 hover:text-red-700 px-2 py-1 text-xs rounded hover:bg-red-50 flex items-center gap-1 transition-colors"
                              type="button"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="text-gray-700 text-sm">
                          {isAdmin ? (
                            <ReportEditableTextArea
                              value={concern.concern}
                              onChange={(value) => {
                                onUpdateValue &&
                                  onUpdateValue([
                                    ...summaryOfConcerns.slice(0, index),
                                    { ...concern, concern: value as string },
                                    ...summaryOfConcerns.slice(index + 1),
                                  ]);
                              }}
                            />
                          ) : (
                            concern.concern
                          )}
                        </div>

                        {isAdmin && (
                          <div className="mt-3 flex items-center">
                            <label className="flex items-center text-xs text-gray-500 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!concern.flag}
                                onChange={(e) =>
                                  onUpdateValue &&
                                  onUpdateValue([
                                    ...summaryOfConcerns.slice(0, index),
                                    {
                                      ...concern,
                                      flag: e.target.checked,
                                    },
                                    ...summaryOfConcerns.slice(index + 1),
                                  ])
                                }
                                className="mr-2"
                              />
                              Flagged for attention
                            </label>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 rounded-lg"
                style={{ backgroundColor: "#FF67001A" }}
              >
                <div className="flex items-start gap-3">
                  <Shield className="text-orange-500" size={20} />
                  <div className="flex-1">
                    <h3 className="font-medium text-orange-500">
                      No Concerns Detected
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">
                      No significant health, safety, or combustion issues were
                      found during the assessment.
                    </p>

                    {isAdmin && (
                      <button
                        onClick={addConcern}
                        className="mt-4 px-4 py-2 rounded text-sm font-medium transition-colors"
                        style={{
                          backgroundColor: "#FF67001A",
                          color: "#FF6700",
                        }}
                        type="button"
                      >
                        + Add New Concern
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportSummarySectionSummaryOfConcerns;
