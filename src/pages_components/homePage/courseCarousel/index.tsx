import { useTranslation } from "next-i18next";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import Box from "@/components/Box";
import Button from "@/components/Button";
import { useRequest } from "@umijs/hooks";
import { listCourse } from "./service";
import PlaceholderBox from "@/components/placeholderBox";
import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/router";

const CourseCarousel = () => {
  const { t } = useTranslation("common");
  const [tabActive, setTabActive] = useState(0);
  const router = useRouter();

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
  const { loading, data } = useRequest(
    async () => {
      const result = await listCourse();
      return result;
    },
    {
      onError: () => {},
    }
  );
  const Course = () => {
    return (
      <div className={styles.coursePadding}>
        <div className={styles.courseWrap}>
          <img
            src="/images/course.png"
            className={styles.images}
            alt="course"
          />
          <div className={styles.courseContent}>
            <Text
              type="title-24-bold"
              color="neutral-1"
              className={styles.courseTitle}
            >
              KHÓA HỌC TIẾNG NHẬT QUYẾT CHIẾN N2
            </Text>
            <Box flex agileItem="agile-center" className={styles.rate}>
              <Box flex right={10} className={styles.rateIcon}>
                {[...Array(4)].map(() => {
                  return (
                    <Image
                      src="/svg/rating.svg"
                      alt="rating"
                      layout="fixed"
                      width={20}
                      height={20}
                      style={{ marginRight: 2 }}
                    />
                  );
                })}
                {[...Array(1)].map(() => {
                  return (
                    <Image
                      src="/svg/rating.svg"
                      alt="rating"
                      layout="fixed"
                      width={20}
                      height={20}
                      style={{ marginRight: 2 }}
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
                onClick={() => router.push("/course_detail")}
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

  const tabs = [
    {
      label: "Khoá học OFFLINE",
      value: 0,
    },
    {
      label: "Khoá học ONLINE SKYPE",
      value: 1,
    },
    {
      label: "Khoá học ONLINE WEBSITE",
      value: 2,
    },
  ];

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
          <div className={styles.tabs}>
            {tabs.map((tab) => {
              return (
                <Button
                  key={tab.value}
                  className={styles.buttonTab}
                  onClick={() => setTabActive(tab.value)}
                  type={tab.value === tabActive ? "btn-blue" : "btn-disable"}
                >
                  {tab.label}
                </Button>
              );
            })}
          </div>

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
            <PlaceholderBox loading={loading}>
              <Course />
            </PlaceholderBox>
            <PlaceholderBox loading={loading}>
              <Course />
            </PlaceholderBox>
            <PlaceholderBox loading={loading}>
              <Course />
            </PlaceholderBox>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CourseCarousel;
