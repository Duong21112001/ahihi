import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useRequest } from "@umijs/hooks";
import { listCourse } from "./service";
import { useState } from "react";
import CourseCarouselComponent from "@/pages_components/component/carouselCourseComponent";

const CourseCarousel = () => {
  const [tabActive, setTabActive] = useState(0);
  const { loading, data } = useRequest(
    async () => {
      const result = await listCourse();
      return result;
    },
    {
      onError: () => {},
    }
  );

  return (
    <div className={styles.courseCarouselPadding}>
      <div className={styles.courseCarouselWrap}>
        <div className={styles.courseCarouselContainer}>
          <Text
            type="title-40-bold"
            color="neutral-1"
            center
            maxWidth={518}
            marginAuto
            className={styles.title}
          >
            KHOÁ HỌC TIẾNG NHẬT ONLINE APP VÀ WEBSITE
          </Text>

          {!loading && data && data?.length > 0 && (
            <CourseCarouselComponent dataCarousel={data} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCarousel;
