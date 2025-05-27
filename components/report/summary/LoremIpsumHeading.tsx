"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronUp, Fan, Plus } from "lucide-react";
import { ReportImageViewer } from "./imageViewer-solutions";
import { ReportImagePicker } from "./imagePicker-solutions";
import { SolutionsAndRecommendationsData } from "@/app/admin/[bookingNumber]/report/page";

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

interface noteSectionLoremIpsumHeadingProps {
  isAdmin?: boolean;
  houseImages?: HouseImage[];
  selectedImages?: HouseImage[];
  onUpdateImages?: (images: HouseImage[]) => void;
  solutionsAndRecommendations?: SolutionsAndRecommendationsData[];
}

const NotesSection = ({
  isAdmin,
  houseImages = [],
  selectedImages = [],
  onUpdateImages,
  solutionsAndRecommendations,
}: noteSectionLoremIpsumHeadingProps) => {
  const [notes, setNotes] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load notes from sessionStorage on component mount
  useEffect(() => {
    const savedNotes = sessionStorage.getItem("solutionsNotes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("solutionsNotes", notes);
  }, [notes]);

  // Handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [notes]);

  // Dummy state for demonstration (replace with your actual logic)
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

  return (
    <div className="w-full border-b mx-auto px-4 py-2 pb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="mr-4" style={{ color: "#67b502" }}>
            <Fan size={32} />
          </div>
          <h2 className="text-3xl font-bold" style={{ color: "#67b502" }}>
            Lorem Ipsum Heading
          </h2>
        </div>
        <button
          onClick={() => setIsExpanded((v) => !v)}
          className="text-[#67b502] transition-transform duration-300 border-2 border-[#67b502] rounded-full p-0.5"
          aria-label={isExpanded ? "Hide section" : "Show section"}
          style={{ color: "#67b502" }}
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
        <div className="w-full flex items-start justify-center gap-6 bg-[#ffffff] border border-1 border-gray-200 rounded-xl p-6">
          <div className="flex flex-col items-start justify-start space-y-6 w-1/2">
            <div
              className="mr-4 flex items-center justify-center gap-2"
              style={{ color: "#67b502" }}
            >
              <Fan size={24} />
              <h3
                className="text-2xl font-semibold"
                style={{ color: "#67b502" }}
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
                className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none min-h-[265px] max-h-[265px] resize-none overflow-y-auto bg-white text-[#67b502]"
                aria-label="Solutions notes"
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-row items-center justify-center gap-4">
            {imageSlots.map((image, index) => (
              <div key={index} className="rounded-xl w-full ">
                {image && image.id ? (
                  <ReportImageViewer
                    allowSelection={isAdmin}
                    buttonClassName="bg-[#67b502] hover:bg-[#67b502]/90"
                    selectedImage={image}
                    onOpenPicker={() => handleEditImage(index)}
                    onDescriptionChange={(description) =>
                      handleDescriptionChange(index, description as string)
                    }
                  />
                ) : (
                  <div className="rounded-md border-2 border-dashed border-gray-300 hover:border-[#67b502] transition-colors h-80 bg-white">
                    {isAdmin ? (
                      <button
                        onClick={() => handleAddImage(index)}
                        className="w-full h-full flex flex-col items-center justify-center text-[#67b502] hover:text-[#67b502] transition-colors"
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
                buttonClassName="bg-[#67b502] hover:bg-[#67b502]/90"
                images={houseImages}
                selectedImage={
                  solutionsAndRecommendations?.[0]?.images?.[0]?.id
                }
                isOpen={isImagePickerOpen}
                onOpenChange={setIsImagePickerOpen}
                onSelectImage={handleSelectImage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
