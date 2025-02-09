import { useTranslation } from "next-i18next";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Box from "@/components/Box";
import { useRequest } from "@umijs/hooks";
import { useRouter } from "next/router";
import { listCourse } from "@/pages_components/homePage/courseCarousel/service";
import { Course } from "@/utils/model/courses";
import { getCourseStuding } from "@/service/course";

const MyCourseCarousel = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { loading, data } = useRequest(
    async () => {
      const result = await listCourse();
      return result;
    },
    {
      onError: () => {},
    }
  );

  const { loading: loadingLearning, data: dataLearning } = useRequest(
    async () => {
      const result = await getCourseStuding();
      console.log("result====", result);

      return result;
    },
    {
      onError: () => {},
    }
  );
  const CourseComponent = (props: { course: Course }) => {
    const { course } = props;
    return (
      <div className={styles.coursePadding}>
        <div className={styles.courseWrap}>
          <img
            src={course?.image ? course?.image : "/Images/course.png"}
            className={styles.images}
            alt="course"
          />
          <div className={styles.courseContent}>
            <Text
              type="title-24-bold"
              color="neutral-1"
              className={styles.courseTitle}
            >
              {course.name}
            </Text>
            {/* <div className={styles.progress}>
              <div className={styles.progressActive} style={{ width: "30%" }} />
            </div> */}
            <Box flex agileItem="agile-center" justContent="content-beetween">
              {/* <Text type="body-16-regular" color="neutral-3">
                Hoàn thành: 25%
              </Text> */}
              <Text
                type="body-16-medium"
                color="main-color-primary"
                cursorPoiter
                onClick={() =>
                  router.push({
                    pathname: "/learn-page",
                    query: { id: course?.cat_id, name: course?.name },
                  })
                }
              >
                Vào học ngay
              </Text>
            </Box>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.courseCarouselWrap}>
      <div className={styles.courseCarouselContainer}>
        {!loading &&
          data &&
          dataLearning?.map((item: Course) => {
            return (
              <div key={`course-${item?.id}`} className={styles.courseCarousel}>
                <CourseComponent course={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyCourseCarousel;
