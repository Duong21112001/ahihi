import React, { useState } from "react";
import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import classNames from "classnames";

import styles from "./index.module.scss";
import Image from "next/image";
import ReactPlayer from "react-player";

interface ModalVideoProps {
  url: string;
  type?: "play-image" | "play-button";
}

const VideoModal: React.FC<ModalVideoProps> = ({
  url,
  type = "play-image",
}) => {
  const [visible, setVisible] = useState(false);
  const open = () => {
    setVisible(true);
  };

  const onCloseModal = () => {
    setVisible(false);
  };

  return (
    <>
      <Dialog
        visible={visible}
        wrapClassName={classNames(styles.modalMess)}
        animation=""
        onClose={onCloseModal}
        keyboard={false}
        destroyOnClose={true}
        closeIcon={
          <div className={styles.iconClose}>
            <Image
              src="/svg/close.svg"
              alt="heart"
              layout="fixed"
              width={14}
              height={16}
            />
          </div>
        }
      >
        <ReactPlayer width="1000" height="600" src={url} />
      </Dialog>
      {type === "play-image" && (
        <div className={styles.videoImage}>
          <img src="/Images/video-image.png" alt="video" />
          <div className={styles.play} onClick={open}>
            <div className={styles.border}>
              <div className={styles.icon} />
            </div>
          </div>
        </div>
      )}
      {type === "play-button" && (
        <div className={styles.playButton} onClick={open}>
          <Image
            src="/svg/play.svg"
            alt="heart"
            layout="fixed"
            width={14}
            height={16}
          />
        </div>
      )}
    </>
  );
};
VideoModal.displayName = "VideoModal";
export default VideoModal;
