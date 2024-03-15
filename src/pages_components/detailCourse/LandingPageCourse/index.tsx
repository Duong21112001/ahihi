import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import BuyCourses from "@/components/BuyCourses";
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

      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <img
            src="/Images/mascot.png"
            alt="mascot"
            className={styles.mascot}
            width={288}
          />
          <img
            src="/Images/hand-left.png"
            alt="hand-left"
            className={styles.handLeft}
            width={70}
          />
          <img
            src="/Images/hand-right.png"
            alt="hand-right"
            className={styles.handRight}
            width={80}
          />
          <div className={styles.buyCourses}>
            <BuyCourses course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageCourse;
