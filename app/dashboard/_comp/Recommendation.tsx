import VideoModal from "@/components/component/video-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface RecommendationItem {
  title: string;
  thumbnail: string;
  description: string;
  url?: string;
}

const Recommendation = ({ data }: { data: RecommendationItem[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<RecommendationItem | null>(
    null
  );

  return (
    <>
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <Link
            href="/recommendations"
            className="text-[#8bc34a] flex items-center"
          >
            View More Recommendations{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right ml-1"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.slice(0, 4)?.map((item, idx) => {
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
                    width="300"
                    height="200"
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
      </div>

      {isModalOpen && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoUrl={selectedVideo?.url}
        />
      )}
    </>
  );
};

export default Recommendation;
