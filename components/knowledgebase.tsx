"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import VideoModal from "./component/video-modal";
import DisplayAllVideos from "./component/display-all-videos";

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

const VIDEOS_PER_PAGE = 25;
const MAX_DESCRIPTION_WORDS = 25;

const truncateDescription = (description: string, maxWords: number): string => {
  if (!description) return "";
  const words = description.split(" ");
  if (words.length <= maxWords) return description;
  return words.slice(0, maxWords).join(" ") + "...";
};

const KnowledgeBase = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<KnowledgeBaseData | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const handleViewMore = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  const handleBackToAllCategories = () => {
    setSelectedCategory(null);
    window.scrollTo(0, 0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const selectedCategoryData =
    selectedCategory && data
      ? data.categorized_videos.find((cat) => cat.category === selectedCategory)
      : null;

  const totalPages = selectedCategoryData
    ? Math.ceil(selectedCategoryData.videos.length / VIDEOS_PER_PAGE)
    : 0;

  const paginatedVideos = selectedCategoryData
    ? selectedCategoryData.videos.slice(
        (currentPage - 1) * VIDEOS_PER_PAGE,
        currentPage * VIDEOS_PER_PAGE
      )
    : [];

  return (
    <div className="flex-1 overflow-auto p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">Knowledge Base</h1>

      {/* Video Modal */}
      {showVideoPlayer && selectedVideo && (
        <VideoModal
          isOpen={showVideoPlayer}
          onClose={closeVideoPlayer}
          videoUrl={selectedVideo.url}
        />
      )}

      {loading && (
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-6">Services by Categories</h2>

          {/* First category with blue loading skeletons */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-blue-100 rounded animate-pulse w-48"></div>
              <div className="h-6 bg-blue-100 rounded animate-pulse w-24"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-40 bg-blue-100 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-5 bg-blue-100 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-blue-50 rounded animate-pulse w-3/4 mb-1"></div>
                    <div className="h-4 bg-blue-50 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second category with green loading skeletons */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-green-100 rounded animate-pulse w-40"></div>
              <div className="h-6 bg-green-100 rounded animate-pulse w-24"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-40 bg-green-100 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-5 bg-green-100 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-green-50 rounded animate-pulse w-3/4 mb-1"></div>
                    <div className="h-4 bg-green-50 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
          {selectedCategory && selectedCategoryData ? (
            <>
              <div className="flex items-center mb-6">
                <button
                  onClick={handleBackToAllCategories}
                  className="flex items-center text-[#8bc34a] hover:underline mr-4"
                >
                  <ChevronLeft size={20} />
                  <span>Back to All Categories</span>
                </button>
              </div>
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6">
                  {selectedCategoryData.category}
                </h2>
                <p className="text-gray-600 mb-4">
                  Showing {(currentPage - 1) * VIDEOS_PER_PAGE + 1} -{" "}
                  {Math.min(
                    currentPage * VIDEOS_PER_PAGE,
                    selectedCategoryData.videos.length
                  )}{" "}
                  of {selectedCategoryData.videos.length} videos
                </p>

                <DisplayAllVideos
                  videos={paginatedVideos}
                  onVideoSelect={handleVideoClick}
                />

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-8 gap-2">
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-[#8bc34a] hover:bg-[#8bc34a] hover:bg-opacity-10"
                      }`}
                      aria-label="First page"
                    >
                      <ChevronFirst size={20} />
                    </button>

                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-[#8bc34a] hover:bg-[#8bc34a] hover:bg-opacity-10"
                      }`}
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((page) => {
                          // Show current page, first and last pages, and pages around current page
                          return (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          );
                        })
                        .map((page, index, array) => (
                          <React.Fragment key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="px-3 py-1 text-gray-500">
                                ...
                              </span>
                            )}
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-1 rounded-md ${
                                currentPage === page
                                  ? "bg-[#8bc34a] text-white"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-[#8bc34a] hover:bg-[#8bc34a] hover:bg-opacity-10"
                      }`}
                      aria-label="Next page"
                    >
                      <ChevronRight size={20} />
                    </button>

                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-[#8bc34a] hover:bg-[#8bc34a] hover:bg-opacity-10"
                      }`}
                      aria-label="Last page"
                    >
                      <ChevronLast size={20} />
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Services by Categories
              </h2>

              {data.categorized_videos.map((categoryData, categoryIndex) => (
                <div className="mb-10" key={categoryIndex}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-gray-700">
                      {categoryData.category}
                    </h3>
                    {categoryData.videos.length > 4 && (
                      <button
                        onClick={() => handleViewMore(categoryData.category)}
                        className="flex items-center text-[#8bc34a] hover:underline"
                      >
                        <span>View All</span>
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </div>

                  {/* Show only first 4 videos in category overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categoryData.videos
                      .slice(0, 4)
                      .map((video, videoIndex) => (
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
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-[#8bc34a] font-medium line-clamp-3">
                                {video.title}
                              </h3>
                              <ChevronRight className="text-[#8bc34a]" />
                            </div>
                            {video.description && (
                              <p className="text-sm text-gray-600 line-clamp-4">
                                {video.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
