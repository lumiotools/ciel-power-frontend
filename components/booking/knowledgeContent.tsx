import React, { useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Globe, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";


interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface KnowledgeContentProps {
  youtubeSuggestions: YouTubeVideo[]; // You pass the array of YouTubeVideo objects
}
const KnowledgeContent: React.FC<KnowledgeContentProps> = ({ youtubeSuggestions }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);


  const handlePlayClick = (videoId: string) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(youtubeUrl, "_blank");
  };
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust this value to control scroll distance
      const newScrollPosition =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader className="space-y-3">
        <div className="justify-between flex items-center">
          <h3 className="flex items-center text-lg font-medium text-gray-900">
            <Globe className="w-5 h-5 text-gray-400 mr-3" />
            Suggested Videos
          </h3>
          {youtubeSuggestions.length > 0 && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full">
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </Button>
            </div>
          )}
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="relative">
        {
          youtubeSuggestions.length === 0 ? (
            <div className="flex justify-center items-center text-gray-500 text-sm">
              No related videos found.
            </div>
          ) : (
            <div
              className="overflow-hidden"
              ref={scrollContainerRef}
            >
              <div className="flex gap-5 min-w-full pb-1 ">
                {youtubeSuggestions.map((content) => (
                  <div key={content.videoId} className="flex-none w-72">
                    <div className="group relative">
                      {/* Thumbnail Container */}
                      <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden ">
                        <img
                          src={content.thumbnail}
                          alt={content.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Play Button Overlay */}
                        <div
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
                          onClick={() => handlePlayClick(content.videoId)} // Open YouTube video
                        >
                          <div className="bg-white rounded-full p-3">
                            <Play className="w-6 h-6 text-red-600" />
                          </div>
                        </div>
                      </div>

                      {/* Content Text */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 line-clamp-1">
                          {content.title}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {content.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }

      </CardContent>
    </Card>
  );
};

export default KnowledgeContent;
