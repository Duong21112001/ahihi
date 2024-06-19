import { useTranslation } from "next-i18next";
import styles from "./index.module.css";
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
    </div>
  );
};

export default CourseVideo;
