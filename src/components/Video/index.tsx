import React from "react";
import ReactPlayer from "react-player";

interface VideoProps {
  url: string;
  width: string;
  height?: string;
  className?: string;
}

const Video: React.FC<VideoProps> = ({ url, width, className, height }) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        width={width}
        height={height}
        url={url}
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
            },
          },
        }}
      />
    </div>
  );
};

export default Video;
