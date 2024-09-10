import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.css";
import Text from "@/components/Text";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "@/components/Button";

interface CollapseProps {
  title: string;
  learned?: number;
  numberIndex: number;
  onClickCallBack?: (numberIndex: number) => void;
  isDocument?: boolean;
}

const CollapseVideo: React.FC<CollapseProps> = ({
  title,
  learned,
  numberIndex,
  onClickCallBack,
  isDocument,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <div className={styles.collapseItemLeft}>
        <div className={styles.border} />
        <div
          onClick={() => onClickCallBack && onClickCallBack(numberIndex)}
          className="flex items-center gap-1 cursor-pointer"
        >
          <img
            src={isDocument ? "/Images/document.png" : "/svg/stop.svg"}
            alt={isDocument ? "document" : "stop"}
            width={14}
            height={16}
            // layout="fixed"
            style={{ marginRight: 10, cursor: "pointer" }}
            onClick={() => onClickCallBack && onClickCallBack(numberIndex)}
          />
          <Text type="tag-12-semibold" color="neutral-1">
            {title}
          </Text>
        </div>
      </div>

      {/* <div className={styles.collapseItemRight}>
        <CircularProgressbarWithChildren
          value={50}
          maxValue={100}
          circleRatio={1}
          minValue={0}
          strokeWidth={10}
        >
          <Text type="tag-10-semibold" color="neutral-5">
            {learned}
          </Text>
        </CircularProgressbarWithChildren>
      </div> */}
    </div>
  );
};

export default CollapseVideo;
