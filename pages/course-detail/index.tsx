import React, { useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LandingPageCourse from "@/pages_components/detailCourse/LandingPageCourse";
import styles from "./index.module.scss";
import Breadcrumb from "@/components/Breadcrumb";
import ContentCourse from "@/pages_components/detailCourse/contentCourse";
import CourseCarousel from "@/pages_components/homePage/courseCarousel";
import CourseCarouselComponent from "@/pages_components/component/carouselCourseComponent";
import Text from "@/components/Text";
import DownloadAppFooter from "@/pages_components/homePage/DownloadAppFooter";
import { useParams, useSearchParams } from "next/navigation";
import { useRequest } from "@umijs/hooks";
import { getCourseId } from "@/service/course";
import { Course } from "@/utils/model/courses";
import { listCourse } from "@/pages_components/homePage/courseCarousel/service";
import BuyCourses from "@/components/BuyCourses";
import Image from "next/image";

const CourseDetail = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const { loading, data }: { loading: boolean; data: Course } = useRequest(
    async () => {
      if (id) {
        const result = await getCourseId(id);
        return result;
      }
    },
    {
      onError: () => {},
    }
  );
  const { loading: loadingListCourse, data: dataListCourse } = useRequest(
    async () => {
      const result = await listCourse();
      return result;
    },
    {
      onError: () => {},
    }
  );

  const breadcrumb = [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: data?.name,
      link: "/",
    },
  ];

  return (
    <div className={styles.courseDetailWrap}>
      <div className={styles.breadcrumb}>
        <Breadcrumb breadcrumbs={breadcrumb} />
      </div>
      <LandingPageCourse course={data} />
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <img
            src="/Images/mascot.png"
            alt="mascot"
            className={styles.mascot}
            width={288}
          />
          <img
            src="/Images/hand-left.png"
            alt="hand-left"
            className={styles.handLeft}
            width={70}
          />
          <img
            src="/Images/hand-right.png"
            alt="hand-right"
            className={styles.handRight}
            width={80}
          />
          <div className={styles.buyCourses}>
            <BuyCourses course={data} />
          </div>
        </div>
      </div>
      <div className={styles.contentCourseWrap}>
        <div className={styles.contentCourseContainer}>
          <div className={styles.contentCourse}>
            <ContentCourse course={data} />
          </div>
          {/* <img
            src="/Images/mascot-detail.png"
            alt="mascot-detail"
            className={styles.imagesDetail}
          /> */}
        </div>
        <div className={styles.courseCarousel}>
          <Text type="title-40-bold" color="neutral-1" bottom={48}>
            Khoá học liên quan
          </Text>
          {dataListCourse && (
            <CourseCarouselComponent
              dataCarousel={dataListCourse}
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
