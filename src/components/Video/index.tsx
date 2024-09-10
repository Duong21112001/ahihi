import { cn } from "@/utils";
import React from "react";
import ReactPlayer from "react-player";

interface VideoProps {
  url: string;
  width?: string;
  height?: string;
  className?: string;
}

const Video: React.FC<VideoProps> = ({ url, width, className, height }) => {
  return (
    <div className="w-[100%]">
      <ReactPlayer
        className={className}
        width={width}
        height={height}
        url={url}
        config={{
          youtube: {
            playerVars: {
              autoplay: 0,
            },
          },
        }}
      />
    </div>
  );
};

export default Video;
