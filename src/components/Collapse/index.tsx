import Image from "next/image";
import { useState } from "react";
import Text from "../Text";
import styles from "./index.module.scss";

interface CollapseProps {
  title: string;
  content: string;
  image?: JSX.Element;
}

const Collapse: React.FC<CollapseProps> = ({ title, content, image }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <div className={styles.collapseItem} onClick={onClick}>
        <Text type="body-semi">{title}</Text>
        <div className={!open ? styles.arrow : styles.arrow_open}>
          <Image
            src="/svg/arrow-down.svg"
            alt="arrow-down"
            width={12}
            height={12}
            layout="fixed"
          />
        </div>
      </div>
      {open && (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className={"body-1-regular"}
          ></div>
          {image}
        </>
      )}

      <div className={styles.seperator} />
    </div>
  );
};

export default Collapse;
