import Image from "next/image";
import { useState } from "react";
import Text from "../Text";
import styles from "./index.module.css";

interface CollapseProps {
  title: string;
  children: any;
  numberTime?: number;
  isImage?: boolean;
}

const Collapse: React.FC<CollapseProps> = ({
  title,
  children,
  numberTime,
  isImage,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <div className={styles.collapseItem} onClick={onClick}>
        <div className={styles.collapseItemLeft}>
          {isImage && (
            <Image
              src="/svg/file-sharing.svg"
              alt="file-sharing"
              width={32}
              height={32}
              layout="fixed"
              style={{ marginRight: 16 }}
            />
          )}

          <div className={styles.arrow_open}>
            <Text type="title-18-semibold" color="neutral-1">
              {title}
            </Text>
            <Text type="tag-12-medium" color="neutral-4">
              {numberTime} phần học
            </Text>
          </div>
        </div>

        <div className={!open ? styles.arrow : styles.arrow_open}>
          <Image
            src="/svg/icon-down.svg"
            alt="arrow-down"
            width={12}
            height={12}
            layout="fixed"
          />
        </div>
      </div>
      {open && <>{children}</>}
    </div>
  );
};

export default Collapse;
