"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";
import { ImageViewerSummary } from "./imageViewerSummary";

export default function NotesSection() {
  const [notes, setNotes] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load notes from sessionStorage on component mount
  useEffect(() => {
    const savedNotes = sessionStorage.getItem("consultationNotes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("consultationNotes", notes);
  }, [notes]);

  // Handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  // Toggle notes visibility
  const toggleNotes = () => {
    setIsOpen(!isOpen);
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [notes]);

  // Dummy state for demonstration (replace with your actual logic)
  const [selectedImage, setSelectedImage] = useState<any>(undefined);

  return (
    <div className="w-full border-b border-gray-200 mb-4 -mt-4">
      <div className="w-full mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/notes-icon.svg" className="text-[#67b502] w-8 h-8 mr-2" />
            <h2 className="text-[#67b502] text-2xl font-bold">Lorem Ipsum Heading</h2>
          </div>
          <button
            onClick={toggleNotes}
            className="text-[#67b502] transition-transform duration-300 border-2 border-[#67b502] rounded-full p-0.5"
            aria-label={isOpen ? "Hide notes" : "Show notes"}
          >
            <ChevronUp
              className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "" : "transform rotate-180"}`}
            />
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
            }`}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Textarea left */}
            <div className="flex-[2] bg-[#ffffff] border border rounded-xl p-4 flex flex-col justify-between">
              <textarea
                ref={textareaRef}
                value={notes}
                onChange={handleNotesChange}
                placeholder="Write your consultation notes here..."
                className="w-full bg-transparent text-[#308883] p-2 border-none focus:outline-none min-h-[150px] resize-none"
                aria-label="Consultation notes"
              />
            </div>
              
            {/* Image right */}
            <div className="flex-1 flex items-center justify-center bg-[#ffffff] rounded-xl p-0 min-h-[180px]">
              <ImageViewerSummary
                allowSelection={false}
                buttonClassName="bg-[#308883] hover:bg-[#308883]/90"
                selectedImage={selectedImage}
                onOpenPicker={() => { }}
                onDescriptionChange={() => { }}
              />
            </div>
            <div className="flex-1 flex items-center justify-center bg-[#ffffff] rounded-xl p-0 min-h-[180px]">
              <ImageViewerSummary
                allowSelection={false}
                buttonClassName="bg-[#308883] hover:bg-[#308883]/90"
                selectedImage={selectedImage}
                onOpenPicker={() => { }}
                onDescriptionChange={() => { }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
