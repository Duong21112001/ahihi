import classNames from "classnames";
import Image from "next/image";
import * as React from "react";
import styles from "./index.module.css";
interface ImageContentProps {
  image: { src: string; alt: string };
  children: React.ReactNode;
  type?: "content-first" | "image-first" | string;
  className?: string;
  caption?: string;
}

const ImageContent: React.FunctionComponent<ImageContentProps> = ({
  image,
  children,
  type = "content-first",
  className,
  caption,
}) => {
  return (
    <section className={classNames(styles.section, className)}>
      <div
        className={classNames(styles.container, {
          "image-first": type === "image-first",
        })}
      >
        <aside>{children}</aside>
        <aside>
          <figure>
            <div>
              <Image alt={image.alt} layout="fill" src={image.src} priority />
            </div>
          </figure>
          <p>{caption}</p>
        </aside>
      </div>
    </section>
  );
};

export default ImageContent;
