"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { ChevronUp, Wind } from "lucide-react";

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
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <textarea
            ref={textareaRef}
            value={notes}
            onChange={handleNotesChange}
            placeholder="Write your consultation notes here..."
            className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none min-h-[100px] resize-none"
            aria-label="Consultation notes"
          />
        </div>
      </div>
    </div>
  );
}
