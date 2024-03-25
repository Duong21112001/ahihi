import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";
import VideoModal from "@/components/VideoModal";
import { compile, convert } from "html-to-text";
import { Course } from "@/utils/model/courses";

interface AboutCourseProps {
  data: Course;
}

const CourseVideo = ({ data }: AboutCourseProps) => {
  const { t } = useTranslation("common");
  const options = {
    wordwrap: 130,
  };
  const compiledConvert = compile(options);

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

        <VideoModal
          type="play-button"
          url="https://youtube.com/embed/CSwvnpY_dnc"
        />
      </div>
    );
  };

  return (
    <div className={styles.course}>
      <div
        className={styles.courseVideo}
        dangerouslySetInnerHTML={{ __html: data?.detail }}
      ></div>
      {/* <div className={styles.courseItem}>
        <Text type="title-20-bold" color="neutral-1" bottom={24}>
          Giới thiệu khoá học
        </Text>
      </div>
      <div className={styles.courseItem}>
        <Text type="title-20-bold" color="neutral-1" bottom={24}>
          Bài học thử
        </Text>
        <div className={styles.courseVideo}>
          <OneCourse />
        </div>
      </div> */}
    </div>
  );
};

export default CourseVideo;
