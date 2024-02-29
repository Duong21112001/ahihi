import Text from "@/components/Text";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import CarouselComponent from "@/components/carousel";
import Video from "@/components/Video";

const ListVideo = () => {
  const { t } = useTranslation("common");
  const OneVideo = () => {
    return (
      <div className={styles.oneVideo}>
        <div className={styles.shadow}>
          <Video
            url="https://www.youtube.com/watch?v=ZGBNOd9t5QE"
            width="100%"
            className={styles.videoComment}
            height={"324px"}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.ListVideoWrap}>
      <div className={styles.ListVideoContainer}>
        <Text type="heading-h2" color="neutral-1" bottom={10} center>
          Học Kosei thi là đỗ JLPT
        </Text>
        <Text type="body-16-regular" color="neutral-3" bottom={64} center>
          Gần 999+ Video học miễn phí được đăng lên Kosei Youtube channel
        </Text>
        <div>
          <CarouselComponent numberItemShow={3} itemNumber={4}>
            <OneVideo />
            <OneVideo />
            <OneVideo />
            <OneVideo />
          </CarouselComponent>
        </div>
      </div>
    </div>
  );
};

export default ListVideo;
