import { useTranslation } from "next-i18next";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Box from "@/components/Box";
import Button from "@/components/Button";
import classNames from "classnames";
import { useRouter } from "next/router";
import { Course } from "@/utils/model/courses";
import { getCookie } from "cookies-next";

interface CourseCarouselProps {
  dataCarousel: Course[];
  loading: boolean;
}

const CourseCarouselComponent = (props: CourseCarouselProps) => {
  const router = useRouter();
  const { dataCarousel, loading } = props;
  const token = getCookie("kosei-token");

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 769 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1300, min: 480 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
    },
  };
  const CourseComponent = (props: { course: Course }) => {
    const { course } = props;

    return (
      <div className={styles.coursePadding}>
        <img
          src={course?.image ? course?.image : "/Images/course.png"}
          className={styles.images}
          alt="course"
        />
        <div className={styles.courseContent}>
          <Text
            type="title-24-bold"
            color="neutral-1"
            className={styles.courseContentTitle}
          >
            {course.name}
          </Text>
          {/* <Box flex agileItem="agile-center" className={styles.rate}>
            <Box flex right={10} className={styles.rateIcon}>
              {[...Array(4)].map((value, key) => {
                return (
                  <Image
                    src="/svg/rating.svg"
                    alt="rating"
                    layout="fixed"
                    width={20}
                    height={20}
                    style={{ marginRight: 2 }}
                    key={`rating-${key}`}
                  />
                );
              })}
              {[...Array(1)].map((value, key) => {
                return (
                  <Image
                    src="/svg/rating.svg"
                    alt="rating"
                    layout="fixed"
                    width={20}
                    height={20}
                    style={{ marginRight: 2 }}
                    key={`un-rating-${key}`}
                  />
                );
              })}
            </Box>
            <Text type="body-16-regular" color="dark-500">
              4.8 (120 đánh giá)
            </Text>
          </Box> */}
          <Box
            flex
            agileItem="agile-center"
            justContent="content-beetween"
            className={styles.infoCourse}
          >
            <Box
              flex
              agileItem="agile-center"
              className={styles.infoCourseTime}
            >
              <Image
                src="/svg/clock-circle.svg"
                alt="clock-circle"
                layout="fixed"
                width={29}
                height={29}
                style={{ marginRight: 10 }}
              />
              <Text type="body-14-medium" color="neutral-1">
                {course?.expired_at} tháng
              </Text>
            </Box>
          </Box>
          <Box
            flex
            agileItem="agile-center"
            justContent="content-beetween"
            className={styles.buttons}
          >
            <Button
              type="btn-blue-secondary"
              onClick={() =>
                router.push({
                  pathname: "/course-detail",
                  query: { id: course?.cat_id },
                })
              }
            >
              Xem chi tiết
            </Button>
            <Button
              type="btn-blue"
              onClick={() =>
                router.push(
                  token
                    ? {
                        pathname: "/payment",
                        query: { id: course?.cat_id },
                      }
                    : {
                        pathname: "/login",
                      }
                )
              }
            >
              Mua ngay
            </Button>
          </Box>
        </div>
      </div>
    );
  };
  return (
    <Carousel
      autoPlay
      autoPlaySpeed={3000}
      responsive={responsive}
      showDots={true}
      infinite={true}
      transitionDuration={500}
      containerClass={classNames(
        "container-class-course",
        styles.containerClassCourse
      )}
      centerMode={false}
      renderArrowsWhenDisabled={true}
    >
      {!loading &&
        dataCarousel?.map((course: Course, index: number) => {
          return (
            <div
              key={`lecturer-${course?.cat_id}-${index}`}
              className={styles.courseContainer}
            >
              <CourseComponent course={course} />
            </div>
          );
        })}
    </Carousel>
  );
};

export default CourseCarouselComponent;
