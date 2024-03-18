import styles from "./index.module.scss";
import { Course } from "@/utils/model/courses";

interface LandingPageProps {
  course: Course;
}

const LandingPageCourse = ({ course }: LandingPageProps) => {
  return (
    <div className={styles.LandingPageCourse}>
      <div className={styles.LandingPageImage}>
        <img src="/Images/landing-page-course.png" alt="landing-page-course" />
      </div>
    </div>
  );
};

export default LandingPageCourse;
