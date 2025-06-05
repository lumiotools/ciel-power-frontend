"use client";

import type React from "react";
import { useEffect, useRef, useState, useContext, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  Fan,
  PlusCircle,
  Shield,
  Thermometer,
  Trash2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import type { SummaryOfConcernsData } from "@/app/admin/[bookingNumber]/report/page";
import ReportEditableInput from "../common/editableInput";
import ReportEditableTextArea from "../common/editableTextarea";
import { usePathname, useParams } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { ReportImagePicker } from "../common/imagePicker";
import { ReportImageViewer } from "../common/imageViewer";
import { AUTH_CONTEXT } from "@/providers/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Use the same HouseImage interface as the AirConditioningAssessment
interface HouseImage {
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

// Add interface for assessment data
interface AssessmentData {
  title: string;
  subtitle: string;
  notes: string;
}

interface ReportSummarySectionSummaryOfConcernsProps {
  isAdmin?: boolean;
  summaryOfConcerns?: SummaryOfConcernsData[];
  onUpdateValue?: (summaryOfConcerns: SummaryOfConcernsData[]) => void;
  houseImages?: HouseImage[];
  selectedImages?: HouseImage[];
  onUpdateImages?: (images: HouseImage[]) => void;
  // Add assessment data props
  assessmentData?: AssessmentData;
  onUpdateAssessment?: (assessment: AssessmentData) => void;
}

const ReportSummarySectionSummaryOfConcerns = ({
  isAdmin = false,
  summaryOfConcerns = [],
  onUpdateValue,
  houseImages: propHouseImages,
  selectedImages = [],
  onUpdateImages,
  assessmentData,
  onUpdateAssessment,
}: ReportSummarySectionSummaryOfConcernsProps) => {
  const { userDetails } = useContext(AUTH_CONTEXT);
  const { bookingNumber: adminBookingNumber } = useParams();
  const pathname = usePathname();

  // Determine booking number based on user type
  const bookingNumber = isAdmin
    ? adminBookingNumber
    : userDetails?.bookingNumber;

  // State for fetched house images (only if not provided via props)
  const [fetchedHouseImages, setFetchedHouseImages] = useState<HouseImage[]>(
    []
  );
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Use prop images if provided, otherwise use fetched images
  const houseImages = propHouseImages || fetchedHouseImages;

  // Fetch house images from API (only if not provided via props)
  const fetchHouseImages = useCallback(async () => {
    if (!bookingNumber || propHouseImages) return;

    setIsLoadingImages(true);
    setImageError(null);

    try {
      const apiPath = isAdmin
        ? `/api/admin/bookings/${bookingNumber}/pictures`
        : `/api/user/bookings/${bookingNumber}/pictures`;

      const response = await fetch(apiPath);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch house images");
      }

      const data = await response.json();

      if (data.success) {
        setFetchedHouseImages(data.data.pictures || []);
        toast.success("Images loaded successfully");
      } else {
        throw new Error(data.message || "Failed to fetch house images");
      }
    } catch (error) {
      console.error("Error fetching house images:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while fetching house images";
      setImageError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoadingImages(false);
    }
  }, [bookingNumber, isAdmin, propHouseImages]);

  // Fetch images when component mounts or booking number changes
  useEffect(() => {
    if (bookingNumber && !propHouseImages) {
      fetchHouseImages();
    }
  }, [fetchHouseImages]);

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

  const addConcern = () => {
    if (onUpdateValue) {
      const emptyConcern: SummaryOfConcernsData = {
        name: "",
        concern: "",
        flag: false,
        images: [],
        description: { title: "", content: "", footer: "" },
      };
      onUpdateValue([...summaryOfConcerns, emptyConcern]);
      toast.success("New concern added");
    }
  };

  const deleteConcern = (index: number) => {
    if (onUpdateValue) {
      const updatedConcerns = summaryOfConcerns.filter((_, i) => i !== index);
      onUpdateValue(updatedConcerns);
      toast.success("Concern deleted");
    }
  };

  const updateConcern = (
    index: number,
    updates: Partial<SummaryOfConcernsData>
  ) => {
    if (onUpdateValue) {
      const updatedConcerns = summaryOfConcerns.map((concern, i) =>
        i === index ? { ...concern, ...updates } : concern
      );
      onUpdateValue(updatedConcerns);
    }
  };

  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (pathname.includes("/dashboard/report")) {
      setIsUser(true);
    }
  }, [pathname]);

  const [isExpanded, setIsExpanded] = useState(true);
  const [isExpanded1, setIsExpanded1] = useState(true);
  const [isExpanded2, setIsExpanded2] = useState(true);

  const toggleExpanded1 = () => {
    setIsExpanded1(!isExpanded1);
  };

  const toggleExpanded2 = () => {
    setIsExpanded2(!isExpanded2);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Image handling - exactly like AirConditioningAssessment
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(
    null
  );

  const handleSelectImage = (id: string) => {
    const selectedImage = houseImages.find((img) => img.id === id);
    if (selectedImage && onUpdateImages) {
      if (editingImageIndex !== null) {
        // Replace existing image
        const updatedImages = [...selectedImages];
        updatedImages[editingImageIndex] = selectedImage;
        onUpdateImages(updatedImages);
        toast.success("Image updated");
      } else {
        // Add new image
        onUpdateImages([...selectedImages, selectedImage]);
        toast.success("Image added");
      }
    }
    setIsImagePickerOpen(false);
    setEditingImageIndex(null);
  };

  const handleAddImage = (index: number) => {
    if (isLoadingImages) {
      toast.error("Please wait for images to load");
      return;
    }
    if (imageError) {
      toast.error("Unable to load images. Please try refreshing.");
      return;
    }
    if (houseImages.length === 0) {
      toast.error("No images available to select");
      return;
    }
    setEditingImageIndex(index);
    setIsImagePickerOpen(true);
  };

  const handleEditImage = (index: number) => {
    if (isLoadingImages) {
      toast.error("Please wait for images to load");
      return;
    }
    if (imageError) {
      toast.error("Unable to load images. Please try refreshing.");
      return;
    }
    setEditingImageIndex(index);
    setIsImagePickerOpen(true);
  };

  // Retry fetching images
  const retryFetchImages = () => {
    setImageError(null);
    fetchHouseImages();
  };

  // Ensure we always show exactly 2 slots
  const imageSlots = Array.from(
    { length: 2 },
    (_, index) => selectedImages[index] || null
  );

  // Use assessment data from props or fallback to defaults
  const currentAssessment = assessmentData || {
    title: "Assessment Details",
    subtitle: "",
    notes: "",
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update assessment data function
  const updateAssessmentData = (updates: Partial<AssessmentData>) => {
    if (onUpdateAssessment) {
      onUpdateAssessment({
        ...currentAssessment,
        ...updates,
      });
    }
  };

  // Handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateAssessmentData({ notes: e.target.value });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currentAssessment.notes]);

  const visibleConcerns = summaryOfConcerns.filter(
    ({ flag }) => isAdmin || flag
  );

  // Split concerns into two groups of 10 each
  const concernsGroup1 = visibleConcerns.slice(0, 10);
  const concernsGroup2 = visibleConcerns.slice(10, 20);

  const renderConcernGroup = (
    concerns: typeof visibleConcerns,
    groupNumber: number
  ) => {
    if (concerns.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-xl border-2 border-gray-200 bg-gradient-to-r from-green-50 to-blue-50"
        >
          <div className="flex items-start gap-3">
            <Shield className="text-green-600 flex-shrink-0" size={24} />
            <div className="flex-1">
              <h3 className="font-medium text-green-800 text-lg">
                {groupNumber === 1
                  ? "No Primary Concerns Detected"
                  : "No Additional Concerns Detected"}
              </h3>
              <p className="text-gray-700 text-sm mt-1">
                {groupNumber === 1
                  ? "No significant health, safety, or combustion issues were found during the assessment. Your home appears to be in good condition."
                  : "No additional concerns were identified in this category."}
              </p>

              {isAdmin && groupNumber === 1 && (
                <Button
                  onClick={addConcern}
                  variant="outline"
                  className="mt-4 border-[#FF6700] text-[#FF6700] hover:bg-[#FF6700] hover:text-white"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Concern
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <div>
        {/* Add New Concern button when there are already concerns and it's group 1 */}
        {isAdmin && groupNumber === 1 && (
          <div className="flex justify-start pb-4">
            <Button
              onClick={addConcern}
              className="bg-[#FF6700] hover:bg-[#FF6700]/90 text-white"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Concern
            </Button>
          </div>
        )}

        {concerns.map((concern, index) => {
          const ConcernIcon = getIconForConcern(concern.name);
          const actualIndex = summaryOfConcerns.findIndex((c) => c === concern);

          return (
            <motion.div
              key={`concern-${actualIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="p-4 rounded-xl mb-4 border-2 border-gray-200 bg-white"
            >
              <div className="flex items-center mb-2">
                <ConcernIcon className="h-8 w-8 mr-2 text-[#ff6700]" />
                <div className="font-semibold text-xl text-[#FF6700] flex-1">
                  {isAdmin ? (
                    <ReportEditableInput
                      value={concern.name}
                      onChange={(value) =>
                        updateConcern(actualIndex, {
                          name: value as string,
                        })
                      }
                      placeholder="Enter concern name..."
                    />
                  ) : (
                    concern.name || "Unnamed Concern"
                  )}
                </div>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteConcern(actualIndex)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={14} className="mr-1" />
                  </Button>
                )}
              </div>

              <div className="text-gray-700 text-sm mb-3">
                {isAdmin ? (
                  <ReportEditableTextArea
                    value={concern.concern}
                    onChange={(value) =>
                      updateConcern(actualIndex, {
                        concern: value as string,
                      })
                    }
                    placeholder="Describe the concern..."
                  />
                ) : (
                  concern.concern || "No description provided"
                )}
              </div>

              {isAdmin && (
                <div className="flex items-center">
                  <label className="flex items-center text-xs text-gray-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!concern.flag}
                      onChange={(e) =>
                        updateConcern(actualIndex, {
                          flag: e.target.checked,
                        })
                      }
                      className="mr-2 rounded border-gray-300 text-[#FF6700] focus:ring-[#FF6700]"
                    />
                    Display to User
                  </label>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      {/* Header Section */}
      <section
        className="min-h-screen bg-[#eaeaea] flex-col items-center justify-center mb-24"
        id="summary-of-concerns"
      >
        <Card className="max-h-fit w-full mx-auto mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-3xl font-bold text-[#ff6700]">
              <Thermometer size={32} className="mr-4" />
              Understanding Concerns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 text-lg">
                You can find the summary of possible concerns as reported by
                your auditor in this section.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Section */}
        <Card className="max-h-fit w-full mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-3xl font-bold text-[#ff6700]">
                <Fan size={32} className="mr-4" />
                {isAdmin ? (
                  <ReportEditableInput
                    value={currentAssessment.title}
                    onChange={(value) => {
                      updateAssessmentData({ title: value as string });
                    }}
                    placeholder="Enter assessment title..."
                    className="!text-3xl !font-bold !text-[#ff6700]"
                  />
                ) : (
                  currentAssessment.title
                )}
              </CardTitle>
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this assessment section?"
                        )
                      ) {
                        // Clear the assessment data
                        updateAssessmentData({
                          title: "Assessment Details",
                          subtitle: "",
                          notes: "",
                        });
                        // Clear the images
                        if (onUpdateImages) {
                          onUpdateImages([]);
                        }
                        toast.success("Assessment section deleted");
                      }
                    }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleExpanded}
                  className="text-[#ff6700] border-2 border-[#ff6700] rounded-full p-2"
                  aria-label={isExpanded ? "Hide section" : "Show section"}
                >
                  <ChevronUp
                    className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "" : "transform rotate-180"}`}
                  />
                </Button>
              </div>
            </div>
            {isAdmin ? (
              <ReportEditableInput
                value={currentAssessment.subtitle}
                onChange={(value) => {
                  updateAssessmentData({ subtitle: value as string });
                }}
                placeholder="Enter subtitle..."
                className="!text-lg !text-gray-600 !mt-2"
              />
            ) : (
              currentAssessment.subtitle && (
                <p className="text-lg text-gray-600 mt-2">
                  {currentAssessment.subtitle}
                </p>
              )
            )}
          </CardHeader>

          <CardContent>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="w-full flex items-start justify-center gap-6 border-2 border-gray-200 rounded-lg p-6">
                <div className="flex flex-col items-start justify-start space-y-6 w-1/2">
                  <div className="flex items-center gap-2 text-[#ff6700]">
                    <Fan size={24} />
                    <h3 className="text-2xl font-semibold">Assessment Notes</h3>
                  </div>
                  <div className="w-full">
                    <textarea
                      disabled={isUser}
                      ref={textareaRef}
                      value={currentAssessment.notes}
                      onChange={handleNotesChange}
                      placeholder="Add description here"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6700] focus:border-transparent min-h-[265px] max-h-[265px] resize-none overflow-y-auto disabled:bg-gray-50 disabled:cursor-not-allowed"
                      aria-label="Assessment notes"
                    />
                  </div>
                </div>

                {/* Right Image Areas with enhanced error handling */}
                <div className="w-1/2 flex flex-col gap-4">
                  <div className="flex items-center justify-end">
                    <div className="flex items-center gap-2">
                      {isLoadingImages && (
                        <div className="flex items-center gap-2 text-sm text-[#ff6700]">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading...
                        </div>
                      )}
                      {imageError && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={retryFetchImages}
                          className="text-xs"
                          disabled={isLoadingImages}
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Error Display */}
                  {imageError && (
                    <Card className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <div className="text-sm">
                            <p className="text-red-800 font-medium mb-1">
                              Unable to load images
                            </p>
                            <p className="text-red-600">{imageError}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {imageSlots.map((image, index) => (
                      <div key={index} className="h-64">
                        <ReportImageViewer
                          allowSelection={
                            isAdmin && !isLoadingImages && !imageError
                          }
                          buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
                          selectedImage={image || undefined}
                          onOpenPicker={() =>
                            image
                              ? handleEditImage(index)
                              : handleAddImage(index)
                          }
                          onDescriptionChange={(description) => {
                            if (onUpdateImages && image) {
                              const updatedImages = [...selectedImages];
                              updatedImages[index] = {
                                ...image,
                                description: description as string,
                              };
                              onUpdateImages(updatedImages);
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Summary of Concerns Section 1 (First 10 concerns) */}
      <section id="summary-of-concerns-1">
        <Card className="bg-white max-h-fit p-8 rounded-xl shadow-sm mb-6 overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold flex items-center gap-2 text-[#FF6700]">
                <AlertTriangle className="h-8 w-8" />
                Summary of Concerns - Primary Issues
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleExpanded1}
                className="text-[#ff6700] border-2 border-[#ff6700] rounded-full p-2"
                aria-label={isExpanded1 ? "Hide section" : "Show section"}
              >
                <ChevronUp
                  className={`w-6 h-6 transition-transform duration-300 ${isExpanded1 ? "" : "transform rotate-180"}`}
                />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded1 ? "max-h-[8000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid gap-4">
                {renderConcernGroup(concernsGroup1, 1)}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Summary of Concerns Section 2 (Next 10 concerns) */}
      {concernsGroup2.length > 0 && (
        <section id="summary-of-concerns-2">
          <Card className="bg-white max-h-fit p-8 rounded-xl shadow-sm mb-6 overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl font-bold flex items-center gap-2 text-[#FF6700]">
                  <AlertTriangle className="h-8 w-8" />
                  Summary of Concerns - Additional Issues
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleExpanded2}
                  className="text-[#ff6700] border-2 border-[#ff6700] rounded-full p-2"
                  aria-label={isExpanded2 ? "Hide section" : "Show section"}
                >
                  <ChevronUp
                    className={`w-6 h-6 transition-transform duration-300 ${isExpanded2 ? "" : "transform rotate-180"}`}
                  />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded2
                    ? "max-h-[8000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="grid gap-4">
                  {renderConcernGroup(concernsGroup2, 2)}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Image Picker Dialog - only show if images are loaded and no error */}
      {isAdmin && !isLoadingImages && !imageError && (
        <ReportImagePicker
          buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
          images={houseImages}
          selectedImage={
            editingImageIndex !== null
              ? selectedImages[editingImageIndex]?.id
              : undefined
          }
          isOpen={isImagePickerOpen}
          onOpenChange={setIsImagePickerOpen}
          onSelectImage={handleSelectImage}
        />
      )}
    </motion.div>
  );
};

export default ReportSummarySectionSummaryOfConcerns;
