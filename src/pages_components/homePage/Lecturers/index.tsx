import Text from "@/components/Text";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Carousel, { StateCallBack } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRequest } from "@umijs/hooks";
import { listTeacher } from "./service";
import PlaceholderBox from "@/components/placeholderBox";
import { IlistTeacher } from "@/utils/model/teacher";
import Button from "@/components/Button";
import classNames from "classnames";
import { convert } from "html-to-text";
import Slider from "react-slick";

const Lecturers = () => {
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
              className={styles.imgAvatar}
              src={teacher?.image}
              alt="avatar-lecturers.png"
              layout="fixed"
              width={150}
              height={150}
              style={{
                marginBottom: 8,
                borderRadius: "100%",
                objectFit: "cover",
              }}
            />
          )}

          <Text
            type="heading-h4"
            color="neutral-1"
            className={styles.name}
            bottom={4}
          >
            {teacher?.name}
          </Text>

          <div
            dangerouslySetInnerHTML={{ __html: convert(teacher?.content) }}
            className={styles.content}
          ></div>

          <div className="button-lecturer">
            <Button className={styles.button} type="btn-blue">
              <Text type="body-14-semibold" color="neutral-10">
                Xem chi tiết
              </Text>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const ref: any = useRef(null);

  const next = () => {
    ref?.current?.slickNext();
  };

  const previous = () => {
    ref?.current?.slickPrev();
  };

  const settings = {
    className: "section-outstanding__slider",
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    rows: 1,
    autoplay: true,
    variableWidth: true,
    dots: true,

    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 3,

          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.lecturersPadding}>
      <div className={styles.lecturersWrap}>
        <div className={styles.lecturersImage}>
          <Image
            src="/svg/_homePage/teacher-flower-1.svg"
            alt="bg-lecturer"
            className={styles.teacherFlower1}
            width={25}
            height={20}
          />
          <Image
            src="/svg/_homePage/teacher-flower-2.svg"
            alt="bg-lecturer"
            className={styles.teacherFlower2}
            width={17}
            height={13}
          />
          <Image
            src="/svg/_homePage/teacher-flower-3.svg"
            alt="bg-lecturer"
            className={styles.teacherFlower3}
            width={53}
            height={54}
          />
          <Image
            src="/svg/_homePage/teacher-flower-4.svg"
            alt="bg-lecturer"
            className={styles.teacherFlower4}
            width={22}
            height={21}
          />
          <Image
            src="/svg/_homePage/teacher-flower-5.svg"
            alt="bg-lecturer"
            className={styles.teacherFlower5}
            width={18}
            height={13}
          />
          <Image
            src="/svg/_homePage/teacher-flower-6.svg"
            alt="bg-lecturer"
            className={styles.teacherFlower6}
            width={54}
            height={54}
          />
          <Image
            src="/svg/_homePage/teacher-flower-7.svg"
            alt="bg-lecturer"
            className={styles.teacherFlower7}
            width={85}
            height={82}
          />
          <Image
            src="/svg/_homePage/teacher-flower-8.svg"
            alt="bg-lecturer"
            className={styles.teacherFlower8}
            width={19}
            height={28}
          />
        </div>

        <div className={styles.lecturersContainer}>
          <Text
            type="heading-h2"
            color="shade-primary-5"
            center
            bottom={10}
            className={styles.lecturersTitle}
          >
            Đội ngũ giảng viên tại Kosei
          </Text>
          <Text type="body-16-regular" color="neutral-3" center bottom={8}>
            Đội ngũ giảng viên nhiều năm kinh nghiệm và được kiểm chứng bởi hơn
            80.000+ học viên
          </Text>
          <div>
            {!loading && data && data?.length > 0 && (
              <Slider
                ref={ref}
                {...settings}
                className="slider-lecturer"
                initialSlide={2}
                nextArrow={
                  <div onClick={next} className={styles.lecturersArrowsRight}>
                    <Image
                      src="/svg/caret-right-active.svg"
                      alt="arrow-right"
                      layout="fixed"
                      width={20}
                      height={20}
                    />
                  </div>
                }
                prevArrow={
                  <div
                    onClick={previous}
                    style={{ marginRight: 12 }}
                    className={styles.lecturersArrowsLeft}
                  >
                    <Image
                      src="/svg/caret-left-active.svg"
                      alt="arrow-left"
                      layout="fixed"
                      width={20}
                      height={20}
                    />
                  </div>
                }
              >
                {(loading ? [...Array(3)] : data)?.map(
                  (teacher: IlistTeacher, index: number) => {
                    return (
                      <div
                        key={`lecturer-${teacher?.id}`}
                        className={`${index}`}
                      >
                        <Lecturer active={false} teacher={teacher} />
                      </div>
                    );
                  }
                )}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecturers;
