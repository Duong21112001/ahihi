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
import CourseCarouselComponent from "@/pages_components/component/carouselCourseComponent";

const CourseCarousel = () => {
  const { t } = useTranslation("common");
  const [tabActive, setTabActive] = useState(0);
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

          <CourseCarouselComponent dataCarousel={data} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CourseCarousel;
