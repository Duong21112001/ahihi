import Text from "@/components/Text";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Image from "next/image";
import CarouselComponent from "@/components/carousel";

const Achievements = () => {
  const { t } = useTranslation("common");
  const OneAchievements = () => {
    return (
      <div className={styles.oneAchievementsPadding}>
        <div className={styles.oneAchievements}>
          <div className={styles.img}>
            <img src="/images/achievements.png" />
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
          <Text type="heading-h2" color="neutral-1" bottom={10} center>
            Thành tích học viên
          </Text>
          <Text type="body-16-regular" color="neutral-3" bottom={64} center>
            Lorem ipsum dolor sit amet
          </Text>
          <div>
            <CarouselComponent numberItemShow={4} itemNumber={5}>
              <OneAchievements />
              <OneAchievements />
              <OneAchievements />
              <OneAchievements />
              <OneAchievements />
            </CarouselComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
