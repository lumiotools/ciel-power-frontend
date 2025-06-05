"use client";

import Image from "next/image";
import type React from "react";

interface RecommendedVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

interface DisplayAllVideosProps {
  videos: RecommendedVideo[];
  onVideoSelect: (video: RecommendedVideo) => void;
}

const DisplayAllVideos: React.FC<DisplayAllVideosProps> = ({
  videos,
  onVideoSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos?.map((item, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
          onClick={() => onVideoSelect(item)}
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
              src={item.thumbnail || "/placeholder.svg"}
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
            <h3 className="text-[#8bc34a] font-medium text-lg mb-1 line-clamp-3">
              {item?.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-4">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAllVideos;
