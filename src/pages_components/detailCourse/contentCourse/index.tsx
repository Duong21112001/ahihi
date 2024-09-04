import { memo } from "react";
import { useTranslation } from "next-i18next";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";
import Button from "@/components/Button";
import { useState } from "react";
import AboutCourse from "./About";
import TeacherCourse from "./Teacher";
import ReviewCourse from "./Review";
import CourseVideo from "./Course";
import { Course } from "@/utils/model/courses";
import Rating from "@/components/rating";

interface Courseprops {
  course: Course;
}
const ContentCourse = ({ course }: Courseprops) => {
  const { t } = useTranslation("common");
  const [tabActive, setTabActive] = useState("1");
  const infos = [
    {
      label: "Giảng viên",
      value: course?.teacher_name,
    },
    {
      label: "Cập nhật gần nhất",
      value: "03/2024",
    },
    {
      label: "Học viên đã đăng ký",
      value: "5.7K",
    },
  ];
  const tabs = [
    {
      label: "Giới thiệu",
      value: "1",
    },
    {
      label: "Nội dung khoá học",
      value: "2",
    },
    {
      label: "Nhận xét của học viên",
      value: "3",
    },
  ];
  const renderTab = () => {
    switch (tabActive) {
      case "1":
        return <AboutCourse data={course} />;
      case "2":
        return <CourseVideo data={course} />;

      case "3":
        return <ReviewCourse />;
      default:
        return <></>;
    }
  };
  return (
    <div className={styles.contentCourse}>
      <Text
        className={styles.title}
        type="title-40-bold"
        bottom={12}
        color="neutral-1"
      >
        {course?.name}
      </Text>

      <Text type="body-16-regular" color="neutral-4" bottom={12}>
        {course?.description}
      </Text>
      {/* <div className={styles.infoCourseWrap}>
        <div className={styles.infoCourse}>
          {infos.map((info) => {
            return (
              <div key={info.label} className={styles.infoItem}>
                <Text type="body-14-regular" color="neutral-1" bottom={8}>
                  {info.label}
                </Text>
                <Text type="body-16-semibold" color="neutral-1">
                  {info.value}
                </Text>
              </div>
            );
          })}
        </div>
        <Box flex agileItem="agile-center">
          <Button type="btn-blue-secondary" className={styles.share}>
            <Image
              src="/svg/share-icon.svg"
              alt="heart"
              layout="fixed"
              width={20}
              height={20}
              style={{ marginRight: 4 }}
            />
            <Text type="body-16-semibold" color="main-color-primary">
              Chia sẻ
            </Text>
          </Button>
        </Box>
      </div> */}
      <div className={styles.tabsWrap}>
        <div className={styles.tabs}>
          {tabs.map((tab) => {
            return (
              <Text
                type={
                  tabActive === tab.value ? "title-20-bold" : "title-20-regular"
                }
                color={
                  tabActive === tab.value ? "main-color-primary" : "neutral-1"
                }
                key={tab.label}
                className={
                  tabActive === tab.value ? styles.tabActive : styles.tab
                }
                onClick={() => setTabActive(tab.value)}
              >
                {tab.label}
              </Text>
            );
          })}
        </div>
        <div className={styles.renderTab}>{renderTab()}</div>
      </div>
    </div>
  );
};

export default memo(ContentCourse);
