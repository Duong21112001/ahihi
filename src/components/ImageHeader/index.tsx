import classNames from "classnames";
import Image from "next/image";
import styles from "./index.module.scss";

const ImageHeader = ({
  url,
  className,
  title,
}: {
  url: string;
  className?: string;
  title?: string;
}) => {
  return (
    <div className={classNames(styles.container, className)}>
      <h1>{title}</h1>
      <div className="image">
        <Image src={url} layout="fill" alt={url}  priority/>
      </div>
    </div>
  );
};

export default ImageHeader;
