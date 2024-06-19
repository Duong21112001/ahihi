import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.css";
import Text from "@/components/Text";
import classNames from "classnames";
import { Lectures } from "@/utils/model/courses";

interface CollapseProps {
  title: string;
  children: any;
  percent?: number;
  onClickCallBack?: (lectures: Lectures[]) => void;
  lectures: Lectures[];
}

const CollapseLearning: React.FC<CollapseProps> = ({
  title,
  children,
  percent,
  onClickCallBack,
  lectures,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    setOpen(!open);
    if (!open) {
      onClickCallBack && onClickCallBack(lectures);
    }
  };

  return (
    <div className={classNames(styles.container, !open ? styles.margin : "")}>
      <div className={styles.collapseItem} onClick={onClick}>
        <div className={styles.collapseItemLeft}>
          <Image
            src="/svg/file-video.svg"
            alt="arrow-down"
            width={32}
            height={32}
            layout="fixed"
            style={{ marginRight: 16 }}
          />
          <Text type="body-16-semibold" color="neutral-1">
            {title}
          </Text>
        </div>

        <div className={styles.collapseItemRight}>
          <Text type="title-20-bold" color="neutral-10">
            {`${percent}%`}
          </Text>
        </div>
      </div>
      {open && <>{children}</>}
    </div>
  );
};

export default CollapseLearning;
