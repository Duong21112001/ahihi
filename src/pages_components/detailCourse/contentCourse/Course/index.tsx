import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";

const CourseVideo = () => {
  const { t } = useTranslation("common");

  const OneCourse = () => {
    return (
      <div className={styles.oneCourse}>
        <div className={styles.title}>
          <div className={styles.ring}>
            <div className={styles.border} />
          </div>
          <Text type="body-16-regular" color="neutral-1">
            1.Giới thiệu
          </Text>
        </div>

        <div className={styles.play}>
          <Image
            src="/svg/play.svg"
            alt="heart"
            layout="fixed"
            width={14}
            height={16}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.course}>
      <div className={styles.courseItem}>
        <Text type="title-20-bold" color="neutral-1" bottom={24}>
          Giới thiệu khoá học
        </Text>
        <div className={styles.courseVideo}>
          <OneCourse />
        </div>
      </div>
      <div className={styles.courseItem}>
        <Text type="title-20-bold" color="neutral-1" bottom={24}>
          Bài học thử
        </Text>
        <div className={styles.courseVideo}>
          <OneCourse />
        </div>
      </div>
    </div>
  );
};

export default CourseVideo;
