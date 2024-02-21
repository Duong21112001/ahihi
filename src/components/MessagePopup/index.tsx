import { useTranslation } from "next-i18next";
import React from "react";
import Button from "../Button";
import styles from "./index.module.scss";
interface MessagePopupI {
  message?: string;
  onClose?: () => void;
}
const MessagePopup = ({ message, onClose = () => {} }: MessagePopupI) => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.message}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 0.333496C7.79998 0.333496 0.333313 7.80016 0.333313 17.0002C0.333313 26.2002 7.79998 33.6668 17 33.6668C26.2 33.6668 33.6666 26.2002 33.6666 17.0002C33.6666 7.80016 26.2 0.333496 17 0.333496ZM13.6666 25.3335L5.33331 17.0002L7.68331 14.6502L13.6666 20.6168L26.3166 7.96683L28.6666 10.3335L13.6666 25.3335Z"
          fill="#1FB100"
        />
      </svg>

      <h1 color="">{t("thank_you")}</h1>
      <h2>{t("submited_success")}</h2>
      <Button
        onClick={() => {
          onClose();
        }}
      >
        {t("OK")}
      </Button>
    </div>
  );
};
export default MessagePopup;
