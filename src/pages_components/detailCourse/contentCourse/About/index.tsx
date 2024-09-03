import styles from "./index.module.css";
import { Course } from "@/utils/model/courses";

interface AboutCourseProps {
  data: Course;
}

const AboutCourse = ({ data }: AboutCourseProps) => {
  return (
    <div className={styles.AboutCourse}>
      <div
        dangerouslySetInnerHTML={{ __html: data?.cou_summary }}
        className="leading-6"
      ></div>
    </div>
  );
};

export default AboutCourse;
