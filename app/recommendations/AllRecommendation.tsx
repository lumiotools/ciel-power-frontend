"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import { BOOKING_CONTEXT } from "@/providers/booking";
import VideoModal from "@/components/component/video-modal";
import DisplayAllVideos from "@/components/component/display-all-videos";

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

  const handleVideoSelect = (video: RecommendedVideo) => {
    setIsModalOpen(true);
    setSelectedVideo(video);
  };

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

      <DisplayAllVideos
        videos={recommendedVideos || []}
        onVideoSelect={handleVideoSelect}
      />

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
