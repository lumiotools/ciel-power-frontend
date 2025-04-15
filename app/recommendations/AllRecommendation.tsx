"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

const AllRecommendation = () => {
  const [data, setData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const getRecommendatoinData = localStorage.getItem("recommendation");
    if (getRecommendatoinData) {
      const parsedData = JSON.parse(getRecommendatoinData);
      console.log("parsedData", parsedData);
      setData(parsedData);
    }
  }, []);

  return (
    <div className="flex-1 overflow-auto p-8 bg-white relative">
      <h1 className="text-2xl font-bold">Recommended for You</h1>
      <div className="my-3">
        <a href="/dashboard">
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
        </a>
      </div>
      <p className="text-gray-600 mb-8">
        Explore these videos to learn more about energy efficiency, home
        improvements, and maximizing your comfort.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item, idx) => {
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
    </div>
  );
};

export default AllRecommendation;
