import { useTranslation } from "next-i18next";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import Box from "@/components/Box";
import Button from "@/components/Button";
import { useRequest } from "@umijs/hooks";
import PlaceholderBox from "@/components/placeholderBox";
import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/router";
import { Course } from "@/utils/model/courses";

interface CourseCarouselProps {
  dataCarousel: Course[];
  loading: boolean;
}

const CourseCarouselComponent = (props: CourseCarouselProps) => {
  const { t } = useTranslation("common");
  0;
  const router = useRouter();
  const { dataCarousel, loading } = props;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 769 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 480 },
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
            <Box flex agileItem="agile-center" className={styles.rate}>
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
            </Box>
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
                  40 - 55 buổi
                </Text>
              </Box>
              <Box
                flex
                agileItem="agile-center"
                className={styles.infoCourseTime}
              >
                <Image
                  src="/svg/calendar.svg"
                  alt="calendar"
                  layout="fixed"
                  width={29}
                  height={29}
                  style={{ marginRight: 10 }}
                />
                <Text type="body-14-medium" color="neutral-1">
                  20-06-2023
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
              <Button type="btn-blue">Mua ngay </Button>
            </Box>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Carousel
      responsive={responsive}
      showDots={false}
      containerClass={classNames(
        "container-class-course",
        styles.containerClassCourse
      )}
      centerMode={false}
      renderArrowsWhenDisabled={true}
    >
      {/* {(loading ? [...Array(3)] : dataCarousel)?.map(
        (course: Course, index: number) => {
          return (
            <div key={`lecturer-${course?.id}-${index}`} className={`${index}`}>
              <PlaceholderBox loading={loading}>
                {!loading && <CourseComponent course={course} />}
              </PlaceholderBox>
            </div>
          );
        }
      )} */}
      {!loading &&
        dataCarousel?.map((course: Course, index: number) => {
          return (
            <div key={`lecturer-${course?.cat_id}-${index}`}>
              <CourseComponent course={course} />
            </div>
          );
        })}
    </Carousel>
  );
};

export default CourseCarouselComponent;
