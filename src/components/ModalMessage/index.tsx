import React, { forwardRef, useImperativeHandle, useState } from "react";
import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import Text from "../Text";
import classNames from "classnames";
import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/router";
import styles from "./index.module.css";

interface ModalProps {
  title?: String | React.ReactElement | undefined;
  content?: string | React.ReactNode | undefined;
  className?: string;
  style?: Object;
  closeIcon?: React.ReactNode;
  onClose?: () => void;
  width?: number;
  closable?: boolean;
  comeBack?: string;
  titleBack?: string;
  img?: string;
  routerBack?: string;
}
export interface PopUpRef {
  open?: () => void;
}
const ModalMessage = React.forwardRef<PopUpRef, ModalProps>((props, ref) => {
  const {
    className,
    title,
    content,
    width = 400,
    onClose,
    titleBack,
    img,
    routerBack,
  } = props;
  const [visible, setVisible] = useState(false);
  const open = () => {
    setVisible(true);
  };
  useImperativeHandle(ref, () => ({ open }));
  const router = useRouter();
  const onCloseModal = () => {
    setVisible(false);
    onClose && onClose();
  };

  return (
    <Dialog
      visible={visible}
      width={width}
      wrapClassName={classNames(styles.modalMess, className)}
      animation=""
      onClose={onCloseModal}
      keyboard={false}
      destroyOnClose={true}
    >
      {img && (
        <Image
          src={img}
          alt={img}
          layout="fixed"
          width={200}
          height={142}
          style={{ marginBottom: 24, textAlign: "center", margin: "0 auto" }}
        />
      )}

      {title && (
        <Text type="heading-h4" color="neutral-4" bottom={10}>
          {title}
        </Text>
      )}

      {content && (
        <Text type="body-16-regular" color="neutral-5" bottom={30}>
          {content}
        </Text>
      )}
      {titleBack && routerBack && (
        <Button type="btn-blue" className={styles.button}>
          <Text
            type="body-16-semibold"
            color="neutral-10"
            onClick={() => router.push(routerBack)}
          >
            {titleBack}
          </Text>
        </Button>
      )}
    </Dialog>
  );
});
ModalMessage.displayName = "ModalMessage";
export default ModalMessage;
