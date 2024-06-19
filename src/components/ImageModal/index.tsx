import React, { forwardRef, useImperativeHandle, useState } from "react";
import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import classNames from "classnames";

import styles from "./index.module.css";
import Image from "next/image";

interface ModalVideoProps {
  url: string;
}

const ImageModal: React.FC<ModalVideoProps> = ({ url }) => {
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
        wrapClassName={classNames(styles.modalImage)}
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
        <div className={styles.modalContent}>
          <img src={url} alt="img-modal" />
        </div>
      </Dialog>
      <Image
        src="/svg/zoom-out.svg"
        alt="zoom-out"
        layout="fixed"
        width={13}
        height={13}
        onClick={open}
      />
    </>
  );
};
ImageModal.displayName = "ImageModal";
export default ImageModal;
