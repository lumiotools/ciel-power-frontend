import React, { useEffect, useRef, useState } from "react";
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
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { ReportImagePicker } from "../common/imagePicker";
import { ReportImageViewer } from "../common/imageViewer";
import type { HouseImage } from "./concerns";

interface ReportSummarySectionSummaryOfConcernsProps {
  isAdmin?: boolean;
  summaryOfConcerns?: SummaryOfConcernsData[];
  onUpdateValue?: (summaryOfConcerns: SummaryOfConcernsData[]) => void;
  houseImages?: HouseImage[];
  selectedImages?: HouseImage[];
  onUpdateImages?: (images: HouseImage[]) => void;
}

const ReportSummarySectionSummaryOfConcerns = ({
  isAdmin,
  summaryOfConcerns,
  onUpdateValue,
  houseImages = [],
  selectedImages = [],
  onUpdateImages,
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

  const cardStyle = "bg-white rounded-xl shadow-sm mb-6 overflow-hidden";

  const addConcern = () => {
    if (onUpdateValue && summaryOfConcerns) {
      const emptyConcern: SummaryOfConcernsData = {
        name: "",
        concern: "",
        flag: false,
        images: [],
        description: { title: "", content: "", footer: "" },
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

  const [isUser, setIsUser] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("/dashboard/report")) {
      setIsUser(true);
    }
  }, [pathname]);

  const [isExpanded, setIsExpanded] = useState(true);
  const [isExpanded1, setIsExpanded1] = useState(true);

  const toggleExpanded1 = () => {
    setIsExpanded1(!isExpanded1);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

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
      } else {
        // Add new image
        onUpdateImages([...selectedImages, selectedImage]);
      }
    }
    setIsImagePickerOpen(false);
    setEditingImageIndex(null);
  };

  const handleAddImage = (index: number) => {
    setEditingImageIndex(index);
    setIsImagePickerOpen(true);
  };

  const handleEditImage = (index: number) => {
    setEditingImageIndex(index);
    setIsImagePickerOpen(true);
  };

  const handleDescriptionChange = (index: number, description: string) => {
    if (onUpdateImages) {
      const updatedImages = [...selectedImages];
      // Ensure we have enough slots
      while (updatedImages.length <= index) {
        updatedImages.push({} as HouseImage);
      }
      updatedImages[index] = {
        ...updatedImages[index],
        description,
      };
      onUpdateImages(updatedImages);
    }
  };

  // Ensure we always show exactly 2 slots
  const imageSlots = Array.from(
    { length: 2 },
    (_, index) => selectedImages[index] || null
  );
  const [notes, setNotes] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load notes from sessionStorage on component mount
  useEffect(() => {
    const savedNotes = sessionStorage.getItem("concernsNotes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("concernsNotes", notes);
  }, [notes]);

  // Handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [notes]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="summary-of-concerns"
    >
      <div className="w-full mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <div className="mr-4" style={{ color: "#ff6700" }}>
            <Thermometer size={32} />
          </div>
          <h2 className="text-3xl font-bold" style={{ color: "#ff6700" }}>
            Understanding Concerns
          </h2>
        </div>

        <div className="border-2 border-gray-200 rounded-xl p-6">
          <p className="text-gray-700 text-lg">
            You can find the summary of possible concerns as reported by your
            auditor in this section.
          </p>
        </div>
      </div>
      <hr
        className={`border-gray-200 ${isUser ? "w-full" : "w-[97vw]"} border my-4`}
      />
      <div className="w-full mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="mr-4" style={{ color: "#ff6700" }}>
              <Fan size={32} />
            </div>
            <h2 className="text-3xl font-bold" style={{ color: "#ff6700" }}>
              Lorem Ipsum Heading
            </h2>
          </div>

          <button
            onClick={toggleExpanded}
            className="text-[#ff6700] transition-transform duration-300 border-2 border-[#ff6700] rounded-full p-0.5"
            aria-label={isExpanded ? "Hide section" : "Show section"}
          >
            <ChevronUp
              className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "" : "transform rotate-180"}`}
            />
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full flex items-start justify-center gap-6 border-2 border-gray-200 rounded-lg p-6">
            <div className="flex flex-col items-start justify-start space-y-6 w-1/2">
              <div
                className="mr-4 flex items-center justify-center gap-2"
                style={{ color: "#ff6700" }}
              >
                <Fan size={24} />
                <h3
                  className="text-2xl font-semibold"
                  style={{ color: "#ff6700" }}
                >
                  Lorem Ipsum Sub heading
                </h3>
              </div>
              <div className="w-full">
                <textarea
                  ref={textareaRef}
                  value={notes}
                  onChange={handleNotesChange}
                  placeholder="Write your notes here..."
                  className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none min-h-[265px] max-h-[265px] resize-none overflow-y-auto"
                  aria-label="Consultation notes"
                />
              </div>
            </div>
            <div className="w-1/2 flex flex-row items-center justify-center gap-4">
              {imageSlots.map((image, index) => (
                <div key={index} className="rounded-xl w-full ">
                  {image && image.id ? (
                    <ReportImageViewer
                      allowSelection={isAdmin}
                      buttonClassName="bg-[#d47c02] hover:bg-[#d47c02]/90"
                      selectedImage={image}
                      onOpenPicker={() => handleEditImage(index)}
                      onDescriptionChange={(description) =>
                        handleDescriptionChange(index, description as string)
                      }
                    />
                  ) : (
                    <div className="rounded-md border-2 border-dashed border-gray-300 hover:border-[#ff6700] transition-colors h-80">
                      {isAdmin ? (
                        <button
                          onClick={() => handleAddImage(index)}
                          className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-[#ff6700] transition-colors"
                        >
                          <Plus className="size-12 mb-2" />
                          <span className="text-sm font-medium">
                            Add image {index + 1}
                          </span>
                        </button>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                          <span className="text-sm">No image available</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {/* Image Picker Dialog */}
              {isAdmin && (
                <ReportImagePicker
                  buttonClassName="bg-[#ff6700] hover:bg-[#ff6700]/90"
                  images={houseImages}
                  selectedImage={summaryOfConcerns?.[0].images?.[0]?.id}
                  isOpen={isImagePickerOpen}
                  onOpenChange={setIsImagePickerOpen}
                  onSelectImage={(id) => {
                    if (onUpdateValue && summaryOfConcerns) {
                      const updatedConcerns = [...summaryOfConcerns];
                      if (updatedConcerns[0]) {
                        updatedConcerns[0] = {
                          ...updatedConcerns[0],
                          images: updatedConcerns[0].images && updatedConcerns[0].images[0]
                            ? [
                                {
                                  ...updatedConcerns[0].images[0],
                                  id: id as string,
                                },
                              ]
                            : [
                                {
                                  id: id as string,
                                },
                              ],
                        };
                        onUpdateValue(updatedConcerns);
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <hr
        className={`border-gray-200 ${isUser ? "w-full" : "w-[97vw]"} border my-4`}
      />
      <div className={cardStyle}>
        <div className="py-3 px-5 flex items-center justify-between">
          <h2
            className="text-3xl font-bold flex items-center gap-2"
            style={{ color: "#FF6700" }}
          >
            <AlertTriangle
              className="h-8 w-8 mr-2"
              style={{ color: "#FF6700" }}
            />
            Summary of Concerns
          </h2>
          <button
            onClick={toggleExpanded1}
            className="relative left-[0.35rem] text-[#ff6700] transition-transform duration-300 border-2 border-[#ff6700] rounded-full p-0.5"
            aria-label={isExpanded1 ? "Hide section" : "Show section"}
          >
            <ChevronUp
              className={`w-6 h-6 transition-transform duration-300 ${isExpanded1 ? "" : "transform rotate-180"}`}
            />
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded1 ? "max-h-[8000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6">
            <div className="grid gap-4">
              {(summaryOfConcerns?.length ?? 0 > 0) ? (
                <div>
                  {/* Add New Concern button when there are already concerns */}
                  {isAdmin && (
                    <div className="flex justify-start pb-4">
                      <button
                        onClick={addConcern}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1"
                        style={{
                          backgroundColor: "#FF6700",
                          color: "#ffffff",
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
                          className="p-4 rounded-xl mb-4 border-2 border-gray-200"
                        >
                          <div className="flex items-center mb-2">
                            <ConcernIcon className="h-8 w-8 mr-2 text-[#ff6700]" />
                            <div
                              className="font-semibold text-xl"
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
                                Display to User
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
                  className="p-4 rounded-xl border-2 border-gray-200"
                  style={{ backgroundColor: "#FF6700" }}
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
      </div>
    </motion.div>
  );
};

export default ReportSummarySectionSummaryOfConcerns;
