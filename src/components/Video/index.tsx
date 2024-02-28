import classNames from "classnames";
import React from "react";
import ReactPlayer from "react-player";

interface VideoProps {
  url: string;
  width: string;
  height?: string;
  className?: string;
}

const Video: React.FC<VideoProps> = ({ url, width, className, height }) => {
  const classes = classNames("player-wrapper", className);
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className={classes}
        url={url}
        width={width}
        height={height}
        controls={true}
        muted={true}
      />
    </div>
  );
};

export default Video;
