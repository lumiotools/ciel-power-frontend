"use client";

import React, { useState, useEffect, useRef } from "react";
import { AlertTriangle, Fan, Leaf, Home, ArrowUp, Thermometer, DollarSign, Shield, Activity, Pencil, Check, X, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { usePathname } from "next/navigation";
import { ProjectCosts } from "@/components/report/ProjectCosts";
import { FederalTaxCredits } from "@/components/report/TaxCredits";
import { EnvironmentalImpact } from "@/components/report/EnvironmentalImpact";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { set } from "date-fns";
import { toast } from "sonner";

// Define interfaces for data types
interface ConcernItem {
  name: string;
  concern: string;
  flag: boolean;
  [key: string]: any;
}

// Updated Recommendation interface with only title and benefits
interface Recommendation {
  title: string;
  benefits: string;
  [key: string]: any;
}

// Replace the existing FinancialData interface with this:
interface FinancialItem {
  title: string;
  amount: string;
}

// New Financial Data interface that matches ProjectCosts
interface FinancialData {
  title: string;
  data: FinancialItem[];
  monthlyPayment: string;
  financingPeriodYears: number;
}

interface ReportSummaryProps {
  data?: {
    summaryOfConcerns?: {
      data: Array<{
        name: string;
        data: ConcernItem[];
      }>;
    };
    // Updated solutionsAndRecommendations structure
    solutionsAndRecommendations?: {
      title: string;
      data: Recommendation[];
    };
    financialSummary?: FinancialData;
    federalTaxCredits?: {
      title: string;
      data: Array<{
        title: string;
        amount: string;
        note?: string;
      }>;
    };
    environmentalImpact?: {
      title: string;
      currentFootprint: { value: string; unit: string };
      projectedSavings: { value: string; unit: string };
      projectedFootprint: { value: string; unit: string };
      totalReduction: { value: string; unit: string };
    };
    [key: string]: any;
  };
  isAdmin?: boolean;
  onUpdateConcerns?: (concerns: any) => void;
  onUpdateRecommendations?: (recommendations: any) => void;
  onUpdateFinancials?: (financials: any) => void;
  onUpdateTaxCredits?: (taxCredits: any) => void;
  onUpdateEnvironmentalImpact?: (environmentalData: any) => void;
}

interface InPlaceEditProps {
  initialValue?: string;
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

  const handleSave = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onUpdate(value);
    }
  };

  const handleCancel = () => {
    setValue(initialValue || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!multiline && e.key === "Enter") {
      handleSave();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-2 text-gray-700 bg-white bg-opacity-20 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
          />
        )}
        <button
          onClick={handleSave}
          className="p-1 hover:bg-green-100 rounded text-green-600 transition-colors"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={handleCancel}
          className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
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

export function ReportSummary({ data, isAdmin = false, onUpdateConcerns, onUpdateRecommendations, onUpdateFinancials, onUpdateTaxCredits, onUpdateEnvironmentalImpact }: ReportSummaryProps) {
  // States
  const [concerns, setConcerns] = useState<ConcernItem[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);


  // Process concerns data
  useEffect(() => {
    if (!data?.summaryOfConcerns?.data) return;


    try {
      const healthSafety = data.summaryOfConcerns.data.find(
        section => section.name === "Basic Health and Safety"
      )?.data || [];

      const combustion = data.summaryOfConcerns.data.find(
        section => section.name === "Combustion Testing"
      )?.data || [];

      // Filter for flagged items with concerns
      const flaggedHealthSafety = healthSafety.filter(item =>
        item && item.flag && item.concern
      );

      const flaggedCombustion = combustion.filter(item =>
        item && item.flag && item.concern && item.concern !== "Testing required"
      );


      setConcerns([...flaggedHealthSafety, ...flaggedCombustion]);
    } catch (error) {
      console.error("Error processing concerns data:", error);
      setConcerns([]);
    }
  }, [data?.summaryOfConcerns]);


  // Process recommendations data - Updated for new format
  useEffect(() => {
    if (!data?.solutionsAndRecommendations?.data) return;

    try {
      // Use the new data structure with title and benefits only
      const recs = data.solutionsAndRecommendations.data.map(rec => ({
        ...rec
      }));
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

  const updateConcern = (index: number, field: keyof ConcernItem, value: string | boolean) => {
    setConcerns(prev => {
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
        const healthSafety = newConcerns.filter(item =>
          !item.name.toLowerCase().includes('combustion') &&
          !item.name.toLowerCase().includes('gas')
        );

        const combustion = newConcerns.filter(item =>
          item.name.toLowerCase().includes('combustion') ||
          item.name.toLowerCase().includes('gas')
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
        {
          name: "New Concern",
          concern: "Description of the new concern",
          flag: true
        },
        ...prev
      ];

      // If onUpdateConcerns callback is provided, call it with the updated data
      if (onUpdateConcerns) {
        // Separate concerns into health safety and combustion
        const healthSafety = newConcerns.filter(item =>
          !item.name.toLowerCase().includes('combustion') &&
          !item.name.toLowerCase().includes('gas')
        );

        const combustion = newConcerns.filter(item =>
          item.name.toLowerCase().includes('combustion') ||
          item.name.toLowerCase().includes('gas')
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
        const healthSafety = newConcerns.filter(item =>
          !item.name.toLowerCase().includes('combustion') &&
          !item.name.toLowerCase().includes('gas')
        );

        const combustion = newConcerns.filter(item =>
          item.name.toLowerCase().includes('combustion') ||
          item.name.toLowerCase().includes('gas')
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

  // Updated to only handle title and benefits
  const updateRecommendation = (index: number, field: keyof Recommendation, value: string | number) => {
    setRecommendations(prev => {
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

  // Updated to add a new recommendation with only title and benefits
  const addRecommendation = () => {
    setRecommendations((prev) => {
      const newRecommendations = [
        {
          title: "New Recommendation",
          benefits: "Benefits of this recommendation"
        },
        ...prev
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

  const updateFinancials = (financials: FinancialData): void => {
    // Update the financials in reportData
    if (onUpdateFinancials) {
      onUpdateFinancials(financials);
    }
  };

  const updateTaxCredits = (taxCreditsData: any) => {
    // If onUpdateTaxCredits callback is provided, call it with the updated data
    if (onUpdateTaxCredits) {
      onUpdateTaxCredits(taxCreditsData);
    }
  };

  const updateEnvironmentalImpact = (environmentalData: any) => {
    // If onUpdateEnvironmentalImpact callback is provided, call it with the updated data
    if (onUpdateEnvironmentalImpact) {
      onUpdateEnvironmentalImpact(environmentalData);
    }
  };

  // const router = useRouter();
  const pathname = usePathname();
  const match = pathname.match(/\/admin\/(\d+)\/report/);
  const bookingNumber = match?.[1];

  // const { bookingNumber } = router.query;

  const onSubmit = async () => {
    const REPORT_DATA_KEY = "report_data";
    let updatedReportData;

    try {
      const data = localStorage.getItem(`${REPORT_DATA_KEY}_${bookingNumber}`);
      // console.log("Data from localStorage:", data);

      if (!data) {
        console.error("No data found in localStorage for the given booking number.");
        toast.error("No data found in localStorage for the given booking number.");
        return;
      }

      updatedReportData = JSON.parse(data);
      updatedReportData = {
        reportData: updatedReportData,
        displayReport: true,
        reportUrl: ""
      };

      console.log("Saved summary data to local storage", updatedReportData)
    } catch (e) {
      console.error("Error parsing data from localStorage:", e);
      toast.error("Error parsing data from localStorage.");
      return;
    }

    try {
      console.log("Saving report data:", updatedReportData);
      const response = await fetch(`/api/admin/bookings/${bookingNumber}/report/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedReportData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to save report data.");
        return;
      }

      const data = await response.json();
      toast.success("Data submitted successfully!");
      console.log("Report data saved successfully:", data);
    } catch (e) {
      console.error("Error saving report data:", e);
      toast.error("Failed to save report data.");
    }
  }


  return (
    <div className="space-y-8">
      {isAdmin && (
        <div className="top-4 flex justify-end">
          <button
            onClick={onSubmit}
            className=" px-4 py-2 rounded-full bg-green-500 text-white font-bold "
          >
            Save
          </button>
        </div>
      )}
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

      {/* Solutions & Recommended Upgrades Section - UPDATED FOR NEW FORMAT */}
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
                const RecommendationIcon = getIconForRecommendation(recommendation.title);
                
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
                              Benefits:
                            </p>
                            <InPlaceEdit
                              initialValue={recommendation.benefits}
                              isAdmin={isAdmin}
                              onUpdate={(value) =>
                                updateRecommendation(index, "benefits", value)
                              }
                              multiline={true}
                              placeholder="Enter benefits"
                            />
                          </div>
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

      <ProjectCosts
        data={{
          financialSummary: data?.financialSummary
        }}
        isAdmin={isAdmin}
        bookingNumber={bookingNumber || ""}
        onUpdateFinancials={updateFinancials}
      />

      {/* Federal Tax Credits Section */}
      <FederalTaxCredits
        data={data?.federalTaxCredits}
        isAdmin={isAdmin}
        bookingNumber={bookingNumber}
        reportData={data}
        onUpdate={updateTaxCredits}
      />

      {/* Environmental Impact Section */}
      <EnvironmentalImpact
        data={data?.environmentalImpact}
        isAdmin={isAdmin}
        bookingNumber={bookingNumber}
        reportData={data}
        onUpdate={updateEnvironmentalImpact}
      />
    </div >
  );
}
