import VideoPlayer from "@/app/recommendations/VideoPlayer";
import Image from "next/image";
import React, { useState } from "react";

interface RecommendationItem {
  title: string;
  thumbnail: string;
  description: string;
}

const Recommendation = ({ data }: { data: RecommendationItem[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<RecommendationItem>(null);

  return (
    <>
      <div className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recommended for You</h2>
          <a
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
          </a>
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
                <div className="h-32 overflow-hidden">
                  <Image
                    alt={item.title}
                    loading="lazy"
                    width="300"
                    height="200"
                    decoding="async"
                    data-nimg="1"
                    className="w-full h-full object-cover"
                    src={item.thumbnail}
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[#8bc34a] font-medium">{item.title}</h3>
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
                      className="lucide lucide-chevron-right text-[#8bc34a]"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-blend-saturation bg-opacity-50 flex items-center justify-center z-50">
          <div className=" h-[80vh] w-[50vw] overflow-y-auto bg-white rounded-xl p-3 space-y-3">
            <div className=" flex justify-between items-center">
              <p className=" text-xl font-bold">Youtube Video</p>
              <button
                onClick={() => setIsModalOpen(false)}
                className=" bg-red-600 rounded-xl text-white shadow-lg py-2 px-3"
              >
                Close
              </button>
            </div>

            {selectedVideo && <VideoPlayer content={selectedVideo} />}
          </div>

          {/* <IoMdClose
                    size={24}
                    className=" absolute top-3 right-3"
                    onClick={() => setIsModalOpen(false)}
                  /> */}
        </div>
      )}
    </>
  );
};

export default Recommendation;
