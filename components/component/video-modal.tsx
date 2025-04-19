"use client";
import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Extract video ID from YouTube URL
  const getVideoId = (url?: string) => {
    if (!url) return null;

    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("youtube.com")) {
        return urlObj.searchParams.get("v");
      } else if (urlObj.hostname.includes("youtu.be")) {
        return urlObj.pathname.substring(1);
      }
    } catch (error) {
      console.error("Invalid URL:", error);
    }
    return null;
  };

  const videoId = getVideoId(videoUrl);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl max-h-[90vh] bg-black rounded-lg overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-1 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <div className="w-full h-full">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Video not available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
