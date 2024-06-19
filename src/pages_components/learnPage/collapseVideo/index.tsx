import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.css";
import Text from "@/components/Text";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CollapseProps {
  title: string;
  learned?: number;
  numberIndex: number;
  onClickCallBack?: (numberIndex: number) => void;
}

const CollapseVideo: React.FC<CollapseProps> = ({
  title,
  learned,
  numberIndex,
  onClickCallBack,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <div className={styles.collapseItemLeft}>
        <div className={styles.border} />
        <Image
          src="/svg/stop.svg"
          alt="stop"
          width={14}
          height={16}
          layout="fixed"
          style={{ marginRight: 10, cursor: "pointer" }}
          onClick={() => onClickCallBack && onClickCallBack(numberIndex)}
        />
        <Text type="tag-12-semibold" color="neutral-1">
          {title}
        </Text>
      </div>

      <div className={styles.collapseItemRight}>
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
      </div>
    </div>
  );
};

export default CollapseVideo;
