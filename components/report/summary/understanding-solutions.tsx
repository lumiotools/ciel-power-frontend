"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { ChevronUp, Wind, Thermometer } from "lucide-react";

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
            <Thermometer className="text-[#67b502] w-8 h-8 mr-2" />
            <h2 className="text-[#67b502] text-2xl font-bold">Understanding Solutions</h2>
          </div>
        </div>



        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
            }`}
        >
          <div className="bg-[#ffffff] rounded-xl border border-gray-200 p-8 shadow-sm">
            <p className="text-gray-800 leading-relaxed text-base">
              You can find solutions and recommended upgrades for your home here, as reccommended by your Ciel Power Home Energy Audit here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
