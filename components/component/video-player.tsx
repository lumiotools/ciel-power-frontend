import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

interface KnowledgeContentProps {
  content: YouTubeVideo;
}

const VideoPlayer: React.FC<KnowledgeContentProps> = ({ content }) => {
  return (
    <Card className="md:col-span-2 w-[100%] max-h-[80vh]">
      <CardContent className="relative">
        {!content ? (
          <div className="flex justify-center items-center text-gray-500 text-sm">
            No related videos found.
          </div>
        ) : (
          <div className="relative w-[100%] h-[80vh]">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${content.videoId}`}
              title={content.title}
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
