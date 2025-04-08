"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  AlertTriangle,
  Fan,
  Leaf,
  Home,
  ArrowUp,
  Thermometer,
  DollarSign,
  Shield,
  Activity,
  Pencil,
  Check,
  X,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define interfaces for data types
interface ConcernItem {
  name: string;
  concern: string;
  flag: boolean;
  [key: string]: any;
}

interface Recommendation {
  title: string;
  location: string;
  insulation_details: string;
  specific_steps: string;
  benefit: string;
  progress?: number;
  [key: string]: any;
}

interface ReportSummaryProps {
  data?: {
    summaryOfConcerns?: {
      data: Array<{
        name: string;
        data: ConcernItem[];
      }>;
    };
    solutionsAndRecommendations?: {
      recommendations: Recommendation[];
    };
    [key: string]: any;
  };
  isAdmin?: boolean;
  onUpdateConcerns?: (concerns: any) => void;
  onUpdateRecommendations?: (recommendations: any[]) => void;
}

interface InPlaceEditProps {
  initialValue: string;
  isAdmin: boolean;
  onUpdate: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

interface InPlaceEditNumberProps {
  initialValue: number;
  isAdmin: boolean;
  onUpdate: (value: number) => void;
  min?: number;
  max?: number;
}

// In-place editing component for text
const InPlaceEdit: React.FC<InPlaceEditProps> = ({
  initialValue,
  isAdmin,
  onUpdate,
  multiline = false,
  placeholder = "Enter text",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || "");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isAdmin) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onUpdate(value);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!multiline && e.key === "Enter") {
      setIsEditing(false);
      if (value !== initialValue) {
        onUpdate(value);
      }
    }
  };

  if (isEditing) {
    return multiline ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
        rows={4}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
      />
    );
  }

  return (
    <div
      className={`${isAdmin ? "cursor-pointer hover:bg-gray-50 rounded p-1 group" : ""} ${!value ? "text-gray-400 italic" : ""}`}
      onClick={handleClick}
    >
      {value || (!isAdmin ? "No content" : placeholder)}
      {isAdmin && (
        <Pencil className="ml-2 h-4 w-4 inline-block text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
};

// In-place editing component for numbers
const InPlaceEditNumber: React.FC<InPlaceEditNumberProps> = ({
  initialValue,
  isAdmin,
  onUpdate,
  min = 0,
  max = 100,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (isAdmin) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onUpdate(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      if (value !== initialValue) {
        onUpdate(value);
      }
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => setValue(Number(e.target.value))}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-20 p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-green-500"
      />
    );
  }

  return (
    <div
      className={`font-medium ${isAdmin ? "cursor-pointer hover:bg-gray-50 rounded p-1 group" : ""}`}
      onClick={handleClick}
    >
      {value}%
      {isAdmin && (
        <Pencil className="ml-2 h-4 w-4 inline-block text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  );
};

export function ReportSummary({
  data,
  isAdmin = false,
  onUpdateConcerns,
  onUpdateRecommendations,
}: ReportSummaryProps) {
  // States
  const [concerns, setConcerns] = useState<ConcernItem[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // Process concerns data
  useEffect(() => {
    if (!data?.summaryOfConcerns?.data) return;

    try {
      const healthSafety =
        data.summaryOfConcerns.data.find(
          (section) => section.name === "Basic Health and Safety",
        )?.data || [];

      const combustion =
        data.summaryOfConcerns.data.find(
          (section) => section.name === "Combustion Testing",
        )?.data || [];

      // Filter for flagged items with concerns
      const flaggedHealthSafety = healthSafety.filter(
        (item) => item && item.flag && item.concern,
      );

      const flaggedCombustion = combustion.filter(
        (item) =>
          item &&
          item.flag &&
          item.concern &&
          item.concern !== "Testing required",
      );

      setConcerns([...flaggedHealthSafety, ...flaggedCombustion]);
    } catch (error) {
      console.error("Error processing concerns data:", error);
      setConcerns([]);
    }
  }, [data?.summaryOfConcerns]);

  // Process recommendations data
  useEffect(() => {
    if (!data?.solutionsAndRecommendations?.recommendations) return;

    try {
      const recs = data.solutionsAndRecommendations.recommendations.map(
        (rec) => ({
          ...rec,
          progress: rec.progress || 50, // Default progress if not specified
        }),
      );
      setRecommendations(recs);
    } catch (error) {
      console.error("Error processing recommendations data:", error);
      setRecommendations([]);
    }
  }, [data?.solutionsAndRecommendations]);

  // Concern functions
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

  const updateConcern = (
    index: number,
    field: keyof ConcernItem,
    value: string | boolean,
  ) => {
    setConcerns((prev) => {
      const newConcerns = [...prev];
      if (newConcerns[index]) {
        newConcerns[index] = {
          ...newConcerns[index],
          [field]: value,
        };
      }

      // If onUpdateConcerns callback is provided, call it with the updated data
      if (onUpdateConcerns) {
        // Separate concerns into health safety and combustion
        const healthSafety = newConcerns.filter(
          (item) =>
            !item.name.toLowerCase().includes("combustion") &&
            !item.name.toLowerCase().includes("gas"),
        );

        const combustion = newConcerns.filter(
          (item) =>
            item.name.toLowerCase().includes("combustion") ||
            item.name.toLowerCase().includes("gas"),
        );

        onUpdateConcerns({
          healthSafety,
          combustion,
        });
      }

      return newConcerns;
    });
  };

  const addConcern = () => {
    setConcerns((prev) => {
      const newConcerns = [
        ...prev,
        {
          name: "New Concern",
          concern: "Description of the new concern",
          flag: true,
        },
      ];

      // If onUpdateConcerns callback is provided, call it with the updated data
      if (onUpdateConcerns) {
        // Separate concerns into health safety and combustion
        const healthSafety = newConcerns.filter(
          (item) =>
            !item.name.toLowerCase().includes("combustion") &&
            !item.name.toLowerCase().includes("gas"),
        );

        const combustion = newConcerns.filter(
          (item) =>
            item.name.toLowerCase().includes("combustion") ||
            item.name.toLowerCase().includes("gas"),
        );

        onUpdateConcerns({
          healthSafety,
          combustion,
        });
      }

      return newConcerns;
    });
  };

  const deleteConcern = (index: number) => {
    setConcerns((prev) => {
      const newConcerns = prev.filter((_, i) => i !== index);

      // If onUpdateConcerns callback is provided, call it with the updated data
      if (onUpdateConcerns) {
        // Separate concerns into health safety and combustion
        const healthSafety = newConcerns.filter(
          (item) =>
            !item.name.toLowerCase().includes("combustion") &&
            !item.name.toLowerCase().includes("gas"),
        );

        const combustion = newConcerns.filter(
          (item) =>
            item.name.toLowerCase().includes("combustion") ||
            item.name.toLowerCase().includes("gas"),
        );

        onUpdateConcerns({
          healthSafety,
          combustion,
        });
      }

      return newConcerns;
    });
  };

  // Recommendation functions
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

  const updateRecommendation = (
    index: number,
    field: keyof Recommendation,
    value: string | number,
  ) => {
    setRecommendations((prev) => {
      const newRecommendations = [...prev];
      if (newRecommendations[index]) {
        newRecommendations[index] = {
          ...newRecommendations[index],
          [field]: value,
        };
      }

      // If onUpdateRecommendations callback is provided, call it with the updated data
      if (onUpdateRecommendations) {
        onUpdateRecommendations(newRecommendations);
      }

      return newRecommendations;
    });
  };

  const addRecommendation = () => {
    setRecommendations((prev) => {
      const newRecommendations = [
        ...prev,
        {
          title: "New Recommendation",
          location: "Location description",
          insulation_details: "Insulation details",
          specific_steps: "Implementation steps",
          benefit: "Benefits description",
          progress: 0,
        },
      ];

      // If onUpdateRecommendations callback is provided, call it with the updated data
      if (onUpdateRecommendations) {
        onUpdateRecommendations(newRecommendations);
      }

      return newRecommendations;
    });
  };

  const deleteRecommendation = (index: number) => {
    setRecommendations((prev) => {
      const newRecommendations = prev.filter((_, i) => i !== index);

      // If onUpdateRecommendations callback is provided, call it with the updated data
      if (onUpdateRecommendations) {
        onUpdateRecommendations(newRecommendations);
      }

      return newRecommendations;
    });
  };

  return (
    <div className="space-y-8">
      {/* Summary of Concerns Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-orange-100">
          <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-orange-600 dark:text-orange-200 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                Summary of Concerns
              </CardTitle>

              {isAdmin && (
                <button
                  onClick={addConcern}
                  className="px-3 py-1 bg-orange-100 text-orange-600 rounded hover:bg-orange-200 text-sm font-medium transition-colors"
                  type="button"
                >
                  + Add Concern
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4 bg-orange-50/50">
            {concerns.length > 0 ? (
              concerns.map((concern, index) => {
                const ConcernIcon = getIconForConcern(concern.name);
                return (
                  <motion.div
                    key={`concern-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-white rounded-lg p-4 mb-3 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-100 p-2 rounded-md">
                        <ConcernIcon className="text-orange-500" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-orange-500 mb-2">
                          <InPlaceEdit
                            initialValue={concern.name}
                            isAdmin={isAdmin}
                            onUpdate={(value) =>
                              updateConcern(index, "name", value)
                            }
                            placeholder="Enter concern title"
                          />
                        </div>
                        <div className="text-gray-700 text-sm mt-2 mb-3">
                          <InPlaceEdit
                            initialValue={concern.concern}
                            isAdmin={isAdmin}
                            onUpdate={(value) =>
                              updateConcern(index, "concern", value)
                            }
                            multiline={true}
                            placeholder="Enter concern description"
                          />
                        </div>
                        {isAdmin && (
                          <div className="mt-3 flex items-center justify-between">
                            <label className="flex items-center text-xs text-gray-500 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!concern.flag}
                                onChange={(e) =>
                                  updateConcern(index, "flag", e.target.checked)
                                }
                                className="mr-2"
                              />
                              Flagged for attention
                            </label>
                            <button
                              onClick={() => deleteConcern(index)}
                              className="text-red-500 hover:text-red-700 px-2 py-1 text-xs rounded hover:bg-red-50 flex items-center gap-1 transition-colors"
                              type="button"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        )}
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
                className="bg-white rounded-lg p-4 mb-3 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-md">
                    <Shield className="text-green-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-green-500">
                      No Concerns Detected
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">
                      No significant health, safety, or combustion issues were
                      found during the assessment.
                    </p>
                    {isAdmin && (
                      <button
                        onClick={addConcern}
                        className="mt-4 px-4 py-2 bg-orange-100 text-orange-600 rounded hover:bg-orange-200 text-sm font-medium transition-colors"
                        type="button"
                      >
                        + Add New Concern
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Solutions & Recommended Upgrades Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-green-100">
          <CardHeader className="bg-green-50 dark:bg-green-900/20">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-green-600 dark:text-green-200 flex items-center gap-2">
                <Leaf className="h-6 w-6" />
                Solutions & Recommended Upgrades
              </CardTitle>

              {isAdmin && (
                <button
                  onClick={addRecommendation}
                  className="px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 text-sm font-medium transition-colors"
                  type="button"
                >
                  + Add Recommendation
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4 bg-green-50/50">
            {recommendations.length > 0 ? (
              recommendations.map((recommendation, index) => {
                const RecommendationIcon = getIconForRecommendation(
                  recommendation.title,
                );
                const progress =
                  recommendation.progress !== undefined
                    ? recommendation.progress
                    : 50;

                return (
                  <motion.div
                    key={`recommendation-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
                    className="bg-white rounded-lg p-4 mb-3 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-md">
                        <RecommendationIcon
                          className="text-green-600"
                          size={20}
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-green-600 mb-1">
                            <InPlaceEdit
                              initialValue={recommendation.title}
                              isAdmin={isAdmin}
                              onUpdate={(value) =>
                                updateRecommendation(index, "title", value)
                              }
                              placeholder="Enter recommendation title"
                            />
                          </h3>
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

                        <div className="space-y-3 my-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Location:
                            </p>
                            <InPlaceEdit
                              initialValue={recommendation.location}
                              isAdmin={isAdmin}
                              onUpdate={(value) =>
                                updateRecommendation(index, "location", value)
                              }
                              placeholder="Enter location"
                            />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Details:
                            </p>
                            <InPlaceEdit
                              initialValue={recommendation.insulation_details}
                              isAdmin={isAdmin}
                              onUpdate={(value) =>
                                updateRecommendation(
                                  index,
                                  "insulation_details",
                                  value,
                                )
                              }
                              multiline={true}
                              placeholder="Enter details"
                            />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Steps:</p>
                            <InPlaceEdit
                              initialValue={recommendation.specific_steps}
                              isAdmin={isAdmin}
                              onUpdate={(value) =>
                                updateRecommendation(
                                  index,
                                  "specific_steps",
                                  value,
                                )
                              }
                              multiline={true}
                              placeholder="Enter implementation steps"
                            />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Benefits:
                            </p>
                            <InPlaceEdit
                              initialValue={recommendation.benefit}
                              isAdmin={isAdmin}
                              onUpdate={(value) =>
                                updateRecommendation(index, "benefit", value)
                              }
                              placeholder="Enter benefits"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm text-gray-600">
                            Implementation Progress
                          </span>
                          {isAdmin ? (
                            <InPlaceEditNumber
                              initialValue={progress}
                              isAdmin={isAdmin}
                              onUpdate={(value) =>
                                updateRecommendation(index, "progress", value)
                              }
                              min={0}
                              max={100}
                            />
                          ) : (
                            <span className="text-sm font-medium text-green-600">
                              {progress}%
                            </span>
                          )}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                            style={{ width: `${progress}%` }}
                          ></div>
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
                className="bg-white rounded-lg p-4 mb-3 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-md">
                    <Leaf className="text-green-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-green-600">
                      No Recommendations
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">
                      No recommendations or solutions have been added yet.
                    </p>
                    {isAdmin && (
                      <button
                        onClick={addRecommendation}
                        className="mt-4 px-4 py-2 bg-green-100 text-green-600 rounded hover:bg-green-200 text-sm font-medium transition-colors"
                        type="button"
                      >
                        + Add Recommendation
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Costs Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <Card className="border-green-100">
          <CardHeader className="bg-green-50 dark:bg-green-900/20">
            <CardTitle className="text-2xl text-green-600 dark:text-green-200 flex items-center gap-2">
              <DollarSign className="h-6 w-6" />
              Project Costs & Incentives
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 bg-green-50/50">
            {/* Total Project Costs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="bg-white rounded-lg p-4 mb-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-md">
                    <DollarSign className="text-green-600" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-700">
                    Total Project Costs
                  </h3>
                </div>
                <span className="font-medium text-gray-900">$21,748.00</span>
              </div>
            </motion.div>

            {/* Audit Refund */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="bg-white rounded-lg p-4 mb-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-md">
                    <DollarSign className="text-green-600" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-700">Audit Refund</h3>
                </div>
                <span className="font-medium text-gray-900">$99.00</span>
              </div>
            </motion.div>

            {/* NJ HPwES Cash Back Incentive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="bg-white rounded-lg p-4 mb-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-md">
                    <DollarSign className="text-green-600" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-700">
                    NJ HPwES Cash Back Incentive
                  </h3>
                </div>
                <span className="font-medium text-green-600">$5,000.00</span>
              </div>
            </motion.div>

            {/* Remaining Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="bg-white rounded-lg p-4 mb-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-md">
                    <DollarSign className="text-green-600" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-700">
                    Remaining Balance
                  </h3>
                </div>
                <span className="font-medium text-gray-900">$16,649.00</span>
              </div>
            </motion.div>

            {/* Amount Eligible for NJ HPwES Financing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="bg-white rounded-lg p-4 mb-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-md">
                    <DollarSign className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">
                      Amount Eligible for NJ HPwES Financing
                    </h3>
                    <p className="text-xs text-gray-500">
                      *if qualified by financing company (0% Interest Rate)
                    </p>
                  </div>
                </div>
                <span className="font-medium text-gray-900">$15,000.00</span>
              </div>
            </motion.div>

            {/* Remaining Out of Pocket Expenses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="bg-white rounded-lg p-4 mb-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-md">
                    <DollarSign className="text-green-600" size={20} />
                  </div>
                  <h3 className="font-medium text-gray-700">
                    Remaining Out of Pocket Expenses
                  </h3>
                </div>
                <span className="font-medium text-green-600">$1,649.00</span>
              </div>
            </motion.div>

            {/* Monthly Payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="bg-green-100 rounded-lg p-4 text-center shadow-sm"
            >
              <h3 className="text-gray-700 font-medium mb-2">
                Total Monthly Payment
              </h3>
              <p className="text-green-600 text-2xl font-bold">$125.00/month</p>
              <p className="text-xs text-gray-500">*Over a 10 year period</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
