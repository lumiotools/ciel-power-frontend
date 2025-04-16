"use client";
import Image from "next/image";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { BOOKING_CONTEXT } from "@/providers/booking";
import VideoModal from "@/components/component/video-modal";

interface RecommendedVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

const AllRecommendation = () => {
  const { recommendedVideos } = useContext(BOOKING_CONTEXT);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<RecommendedVideo | null>(
    null
  );

  return (
    <div className="flex-1 overflow-auto p-8 bg-white relative">
      <h1 className="text-2xl font-bold">Recommended for You</h1>
      <div className="my-3">
        <Link href="/dashboard">
          <button className="flex items-center text-[#8bc34a] hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            <span className="ml-1">Back to Dashboard</span>
          </button>
        </Link>
      </div>
      <p className="text-gray-600 mb-8">
        Explore these videos to learn more about energy efficiency, home
        improvements, and maximizing your comfort.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedVideos?.map((item, idx) => {
          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
                setSelectedVideo(item);
              }}
            >
              <div className="relative h-48 overflow-hidden group">
                <Image
                  alt={item?.title}
                  loading="lazy"
                  width="400"
                  height="225"
                  decoding="async"
                  data-nimg="1"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={item.thumbnail}
                  style={{ color: "transparent" }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#8bc34a] bg-opacity-90 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-play text-white ml-1"
                    >
                      <polygon points="6 3 20 12 6 21 6 3"></polygon>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  4:32
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[#8bc34a] font-medium text-lg mb-1">
                  {item?.title}
                </h3>
                <p className="text-sm text-gray-600">{item?.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoUrl={selectedVideo?.url}
        />
      )}
    </div>
  );
};

export default AllRecommendation;
