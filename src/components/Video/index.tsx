import classNames from "classnames";
import React from "react";
import ReactPlayer from "react-player";
import styles from "./index.module.scss";

interface VideoProps {
  url: string;
  width: string;
  height?: string;
  className?: string;
}

const Video: React.FC<VideoProps> = ({ url, width, className, height }) => {
  const classes = classNames("player-video", className);
  const PlayIcon = () => {
    return (
      <div className={styles.videoImage}>
        <img src="images/video-image.png" alt="video" />
        <div className={styles.play}>
          <div className={styles.border}>
            <div className={styles.icon}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="player-wrapper">
      <ReactPlayer
        className={classes}
        url={url}
        width={width}
        height={height}
        controls={true}
        muted={true}
        light={<PlayIcon />}
      />
    </div>
  );
};

export default Video;
