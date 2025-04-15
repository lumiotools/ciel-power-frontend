"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import VideoPlayer from "./component/video-player";

interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

interface CategoryVideos {
  category: string;
  videos: YouTubeVideo[];
}

interface KnowledgeBaseData {
  categorized_videos: CategoryVideos[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: KnowledgeBaseData;
}

const KnowledgeBase = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<KnowledgeBaseData | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user/knowledge-base");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(
            result.message || "Failed to fetch knowledge base data"
          );
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching knowledge base data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setShowVideoPlayer(true);
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false);
    setSelectedVideo(null);
  };

  return (
    <div className="flex-1 overflow-auto p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Knowledge Base</h1>

      {showVideoPlayer && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full relative">
            <button
              onClick={closeVideoPlayer}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            >
              <X size={24} />
            </button>
            <div className="p-4">
              <h2 className="text-xl font-bold text-[#8bc34a] mb-2">
                {selectedVideo.title}
              </h2>
              {selectedVideo.description && (
                <p className="text-gray-600 mb-4">
                  {selectedVideo.description}
                </p>
              )}
              <VideoPlayer content={selectedVideo} />
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8bc34a]"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!loading && !error && data && (
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-6">Services by Categories</h2>

          {data.categorized_videos.map((categoryData, categoryIndex) => (
            <div className="mb-10" key={categoryIndex}>
              <h3 className="text-xl font-medium text-gray-700 mb-4">
                {categoryData.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryData.videos.map((video, videoIndex) => (
                  <div
                    key={videoIndex}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="relative h-40 overflow-hidden group">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-[#8bc34a] bg-opacity-90 flex items-center justify-center">
                          <Play size={30} className="text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-[#8bc34a] font-medium">
                          {video.title}
                        </h3>
                        <ChevronRight className="text-[#8bc34a]" />
                      </div>
                      {video.description && (
                        <p className="text-sm text-gray-600">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
