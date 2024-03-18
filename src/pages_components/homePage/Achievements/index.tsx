import Text from "@/components/Text";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Image from "next/image";
import CarouselComponent from "@/components/carousel";
import Carousel from "react-multi-carousel";
import classNames from "classnames";

const Achievements = () => {
  const { t } = useTranslation("common");
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 769 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 480 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
    },
  };
  const OneAchievements = () => {
    return (
      <div className={styles.oneAchievementsPadding}>
        <div className={styles.oneAchievements}>
          <div className={styles.img}>
            <img src="/Images/achievements.png" alt="achievements" />
            <div className={styles.zoomOut}>
              <Image
                src="/svg/zoom-out.svg"
                alt="zoom-out"
                layout="fixed"
                width={13}
                height={13}
              />
            </div>
          </div>
          <div className={styles.info}>
            <div>
              <Text type="tag-12-medium" color="neutral-10">
                Học viên:
              </Text>
              <Text type="body-16-semibold" color="neutral-10">
                Nguyễn Văn A
              </Text>
            </div>
            <div className={styles.point}>
              <Text type="body-14-medium" color="neutral-10">
                điểm số:
              </Text>
              <Text type="title-20-bold" color="neutral-10">
                119/180
              </Text>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.achievementsPadding}>
      <div className={styles.achievementsWrap}>
        <div className={styles.achievementsContainer}>
          <Text
            type="heading-h2"
            color="neutral-1"
            center
            className={styles.title}
          >
            Thành tích học viên
          </Text>
          <Text
            type="body-16-regular"
            color="neutral-3"
            center
            className={styles.textContent}
          >
            Lorem ipsum dolor sit amet
          </Text>
          <div>
            <Carousel
              responsive={responsive}
              showDots={false}
              containerClass={classNames(
                "container-class-course",
                styles.carousel
              )}
              centerMode={false}
              renderArrowsWhenDisabled={true}
              arrows={true}
            >
              <OneAchievements />
              <OneAchievements />
              <OneAchievements />
              <OneAchievements />
              <OneAchievements />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
