import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LandingPageCourse from "@/pages_components/detailCourse/LandingPageCourse";
import styles from "./index.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import ContentCourse from "@/pages_components/detailCourse/contentCourse";
import CourseCarouselComponent from "@/pages_components/component/carouselCourseComponent";
import Text from "@/components/Text";
import DownloadAppFooter from "@/pages_components/homePage/DownloadAppFooter";
import { useSearchParams } from "next/navigation";
import { getCourseId } from "@/service/course";
import { Course } from "@/utils/model/courses";
import { listCourse } from "@/pages_components/homePage/courseCarousel/service";
import BuyCourses from "@/components/BuyCourses";

const CourseDetail = () => {
  const params = useSearchParams();
  const id = params.get("id");

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [loadingListCourse, setLoadingListCourse] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (id) {
        try {
          setLoading(true);
          const result = await getCourseId(id);
          setCourse(result);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourseData();
  }, [id]);

  useEffect(() => {
    const fetchRelatedCourses = async () => {
      try {
        setLoadingListCourse(true);
        const result = await listCourse();
        setRelatedCourses(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingListCourse(false);
      }
    };

    fetchRelatedCourses();
  }, []);
  const breadcrumb = [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: course?.name || "",
      link: "/",
    },
  ];

  return (
    <div className={styles.courseDetailWrap}>
      <div className={styles.breadcrumb}>
        <Breadcrumb breadcrumbs={breadcrumb} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        course && <LandingPageCourse course={course} />
      )}
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <img
            src="/Images/mascot.png"
            alt="mascot"
            className={styles.mascot}
            width={288}
          />

          <img
            src="/Images/hand-right.png"
            alt="hand-right"
            className={styles.handRight}
            width={80}
          />
          {course && (
            <div className={styles.buyCourses}>
              <BuyCourses course={course} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.contentCourseWrap}>
        <div className={styles.contentCourseContainer}>
          <div className={styles.contentCourse}>
            {course && <ContentCourse course={course} />}
          </div>
        </div>
        <div className={styles.courseCarousel}>
          <Text type="title-40-bold" color="neutral-1" bottom={48}>
            Khóa học liên quan
          </Text>
          {loadingListCourse ? (
            <p>Loading...</p>
          ) : (
            <CourseCarouselComponent
              dataCarousel={relatedCourses}
              loading={loadingListCourse}
            />
          )}
        </div>
      </div>
      <DownloadAppFooter />
    </div>
  );
};
export default CourseDetail;

CourseDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
