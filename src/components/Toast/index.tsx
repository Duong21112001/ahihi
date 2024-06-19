import { useTranslation } from "next-i18next";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Image from "next/image";
import Text from "../Text";
import Box from "../Box";
import classNames from "classnames";
import styles from "./index.module.css";
interface toastProps {
  type: "success" | "error" | "warning" | "noti";
  content?: string;
}

const ToastComponent = (props: toastProps) => {
  const { type, content } = props;
  const { t } = useTranslation("common");
  let title = "";
  let src = "";

  switch (type) {
    case "success":
      title = "Success";
      src = "/svg/check-circle.svg";
      break;
    case "error":
      title = "Error";
      src = "/svg/remove-circle-red.svg";
      break;
    case "warning":
      title = "Warning";
      src = "/svg/warning.svg";
      break;
    default:
      title = "Noti";
      src = "/svg/warning.svg";
  }
  const className = classNames("toast-wrap", {
    ["toast-success"]: type === "success",
    ["toast-error"]: type === "error",
    ["toast-warning"]: type === "warning",
  });

  return (
    <div className={className}>
      <Box flex agileItem="agile-center">
        <Image
          src={src}
          alt="icon"
          layout="fixed"
          width={26}
          height={26}
          style={{ marginRight: 16 }}
        />
        <div className={styles.content}>
          <Text type="body-14-semibold" color="neutral-2" bottom={4}>
            {title}
          </Text>
          {content && (
            <Text type="tag-12-medium" color="neutral-5" maxWidth={220}>
              {content}
            </Text>
          )}
        </div>
      </Box>
    </div>
  );
};

export default ToastComponent;
