import { useTranslation } from "next-i18next";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import Box from "@/components/Box";
import Button from "@/components/Button";

const CourseCarousel = () => {
  const { t } = useTranslation("common");
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const Course = () => {
    return (
      <div className={styles.courseWrap}>
        <img src="/images/course.png" className={styles.images} alt="course" />
        <div className={styles.courseContent}>
          <Text type="title-24-bold" color="main-color-primary" bottom={18}>
            KHÓA HỌC TIẾNG NHẬT QUYẾT CHIẾN N2
          </Text>
          <Box flex agileItem="agile-center" bottom={24}>
            <Box flex right={10}>
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
            bottom={50}
          >
            <Box flex agileItem="agile-center">
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
            <Box flex agileItem="agile-center">
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
          <Button type="btn-blue">Mua ngay </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.courseCarouselWrap}>
      <Carousel
        responsive={responsive}
        showDots={false}
        containerClass="container-class-course"
      >
        <Course />
        <Course />
        <Course />
        <Course />
      </Carousel>
    </div>
  );
};

export default CourseCarousel;
