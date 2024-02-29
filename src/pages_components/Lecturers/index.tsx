import Text from "@/components/Text";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { useState } from "react";
import { useRequest } from "@umijs/hooks";
import { listTeacher } from "./service";
import PlaceholderBox from "@/components/placeholderBox";
import { IlistTeacher } from "@/utils/model/teacher";

const Lecturers = () => {
  const { t } = useTranslation("common");
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loading, data } = useRequest(
    async () => {
      const result = await listTeacher();
      return result;
    },
    {
      onError: () => {},
    }
  );

  const Lecturer = ({
    teacher,
    active,
  }: {
    teacher: IlistTeacher;
    active: boolean;
  }) => {
    return (
      <div className={styles.oneLecturers}>
        <div className={styles.lecturers}>
          {teacher?.image && (
            <Image
              src={teacher?.image}
              alt="avatar-lecturers.png"
              layout="fixed"
              width={150}
              height={150}
              style={{
                marginBottom: 8,
                borderRadius: "100%",
                width: 150,
                objectFit: "cover",
              }}
            />
            // <img
            //   src={teacher?.image}
            //   alt="avatar-lecturers.png"
            //   style={{
            //     marginBottom: 8,
            //     borderRadius: "100%",
            //     width: 150,
            //     objectFit: "cover",
            //   }}
            // />
          )}

          <Text type="title-24-semibold" color="primary-base" bottom={13}>
            {teacher?.name}
          </Text>

          <Text
            type="body-16-regular"
            color="primary-light"
            bottom={active ? 30 : 14}
            maxWidth={188}
            marginAuto
            height={40}
            overFlowHidden
          >
            {teacher?.content}
          </Text>

          {active ? (
            <div className={styles.buttonActive}>
              <Text type="body-16-bold" color="neutral-10" right={8}>
                Chi tiết
              </Text>
              <Image
                src="/svg/shape-right-white.svg"
                alt="shape-right"
                layout="fixed"
                width={20}
                height={20}
              />
            </div>
          ) : (
            <div className={styles.button}>
              <Image
                src="/svg/shape-right.svg"
                alt="shape-right"
                layout="fixed"
                width={20}
                height={20}
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const {
      carouselState: { currentSlide, slidesToShow, totalItems, transform },
    } = rest;

    return (
      <div className={styles.lecturersArrows}>
        <div
          onClick={() => previous()}
          style={{ marginRight: 12 }}
          className={styles.lecturersArrowsLeft}
        >
          <Image
            src="/svg/arrow-left.svg"
            alt="arrow-left"
            layout="fixed"
            width={40}
            height={40}
          />
        </div>
        <div onClick={() => next()} className={styles.lecturersArrowsRight}>
          <Image
            src="/svg/arrow-right.svg"
            alt="arrow-right"
            layout="fixed"
            width={40}
            height={40}
          />
        </div>
      </div>
    );
  };
  const beforeChange = (nextSlide: any, state: any) => {
    console.log("nextSlide", nextSlide);
    setCurrentSlide(nextSlide);
  };

  return (
    <div className={styles.lecturersPadding}>
      <div className={styles.lecturersWrap}>
        <img
          src="/images/cloud-left.png"
          alt="cloud-left"
          className={styles.cloudImage}
        />
        <div className={styles.lecturersContainer}>
          <Text type="heading-h2" color="shade-primary-5" center bottom={10}>
            Đội ngũ giảng viên tại Kosei
          </Text>
          <Text type="body-16-regular" color="neutral-3" center bottom={64}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet
            tempus felis vitae sit est quisque.
          </Text>
          <div>
            <Carousel
              responsive={responsive}
              showDots={false}
              containerClass="container-class-lecturers"
              // centerMode={false}
              // renderArrowsWhenDisabled={true}
              customButtonGroup={<ButtonGroup />}
              arrows={false}
              // infinite={true}
              beforeChange={beforeChange}
              rewind={true}
            >
              {(loading ? [...Array(3)] : data)?.map(
                (teacher: IlistTeacher, index: number) => {
                  console.log("index", index);
                  return (
                    <div
                      className={
                        currentSlide + 1 === index
                          ? styles.active
                          : styles.unActive
                      }
                    >
                      <PlaceholderBox loading={loading}>
                        <Lecturer
                          active={currentSlide + 1 === index ? true : false}
                          teacher={teacher}
                        />
                      </PlaceholderBox>
                    </div>
                  );
                }
              )}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecturers;
