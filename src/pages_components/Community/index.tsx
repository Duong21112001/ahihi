import Text from "@/components/Text";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

const Community = () => {
  const { t } = useTranslation("common");
  const New = () => {
    return (
      <div className={styles.new}>
        <div className={styles.img}></div>
        <div className={styles.tag}>
          <div className={styles.tagRing}>
            <Image
              src="/svg/fb.svg"
              alt="fb"
              layout="fixed"
              width={48}
              height={48}
            />
          </div>
          <div className={styles.tagText}>
            <Text type="title-18-semibold" color="dark-500">
              Facebook
            </Text>
          </div>
        </div>
        <Text
          type="title-18-semibold"
          color="neutral-1"
          className={styles.textNew}
        >
          Fanpage Tiếng Nhật Kosei là nơi chia sẻ kiến thức, các sự kiện của
          Kosei được cập nhật mỗi ngày.
        </Text>
      </div>
    );
  };

  return (
    <div className={styles.communityWrap}>
      <div className={styles.communityContainer}>
        <div className={styles.title}>
          <Text type="heading-h2" color="neutral-1" center>
            Cồng đồng tiếng nhật cùng Kosei
          </Text>
          <img src="/images/cotton-sheep.png" />
        </div>

        <Text
          type="body-16-regular"
          color="neutral-3"
          center
          className={styles.textContent}
        >
          Gần 999+ Video học miễn phí được đăng lên Kosei Youtube channel
        </Text>
        <div className={styles.communityContent}>
          <New />
          <New />
          <New />
        </div>
      </div>
    </div>
  );
};

export default Community;
