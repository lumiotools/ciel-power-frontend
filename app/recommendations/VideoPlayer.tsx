import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

interface KnowledgeContentProps {
  content: YouTubeVideo; // You pass the array of YouTubeVideo objects
}
const VideoPlayer: React.FC<KnowledgeContentProps> = ({ content }) => {
  return (
    <Card className="md:col-span-2 w-full max-h-[80vh]">
      <CardContent className="relative">
        {!content ? (
          <div className="flex justify-center items-center text-gray-500 text-sm">
            No related videos found.
          </div>
        ) : (
          <div className="relative w-full h-64 md:h-96">
            <iframe
              width="100%"
              height="90%"
              src={`https://www.youtube.com/embed/${content.videoId}`}
              title={content.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
