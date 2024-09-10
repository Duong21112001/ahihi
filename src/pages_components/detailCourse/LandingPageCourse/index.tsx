import styles from "./index.module.css";
import { Course } from "@/utils/model/courses";

interface LandingPageProps {
  course: Course;
}

const LandingPageCourse = ({ course }: LandingPageProps) => {
  return (
    <div className={styles.LandingPageCourse}>
      <div className={styles.LandingPageImage}>
        <img src={course.image} alt="landing-page-course" />
      </div>
    </div>
  );
};

export default LandingPageCourse;
