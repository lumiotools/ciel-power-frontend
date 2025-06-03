"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronUp, Fan, Plus } from 'lucide-react';
import { ReportImageViewer } from "./imageViewer-solutions";
import { ReportImagePicker } from "./imagePicker-solutions";
import { SolutionsAndRecommendationsData } from "@/app/admin/[bookingNumber]/report/page";
import { usePathname } from "next/navigation";

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

  const [isUser, setIsUser] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("/dashboard/report")) {
      setIsUser(true);
    }
  }, [pathname]);

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
    <div className="bg-white max-h-fit p-8 w-full border-b border-gray-200">
      <div className="w-full mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2" style={{ color: "#67b502" }}>
              <Fan size={32} />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "#67b502" }}>
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
              className={`w-6 h-6 transition-transform duration-300 ${
                isExpanded ? "" : "transform rotate-180"
              }`}
            />
          </button>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="w-full flex items-start justify-center gap-6 bg-[#ffffff] border border-1 border-gray-200 rounded-xl p-6 mt-6">
            <div className="flex flex-col items-start justify-start space-y-6 w-1/2">
              <div
                className="mr-4 flex items-center justify-center gap-2"
                style={{ color: "#67b502" }}
              >
                <Fan size={24} />
                <h3
                  className="text-1xl font-semibold"
                  style={{ color: "#67b502" }}
                >
                  Lorem Ipsum Sub heading
                </h3>
              </div>
              <div className="w-full">
                <textarea
                  disabled={isUser}
                  ref={textareaRef}
                  value={notes}
                  onChange={handleNotesChange}
                  className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none min-h-[265px] max-h-[265px] resize-none overflow-y-auto bg-white"
                  aria-label="Solutions notes"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {imageSlots.map((image, index) => (
                  <div key={index} className="h-64">
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
                      <ReportImageViewer
                        allowSelection={isAdmin}
                        buttonClassName="bg-[#67b502] hover:bg-[#67b502]/90"
                        selectedImage={undefined}
                        onOpenPicker={() => handleAddImage(index)}
                        onDescriptionChange={() => {}}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Image Picker Dialog */}
      {isAdmin && (
        <ReportImagePicker
          buttonClassName="bg-[#67b502] hover:bg-[#67b502]/90"
          images={houseImages}
          selectedImage={editingImageIndex !== null ? selectedImages[editingImageIndex]?.id : undefined}
          isOpen={isImagePickerOpen}
          onOpenChange={setIsImagePickerOpen}
          onSelectImage={handleSelectImage}
        />
      )}
    </div>
  );
};

export default NotesSection;