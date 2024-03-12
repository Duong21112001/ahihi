import React, { useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LandingPageCourse from "@/pages_components/detailCourse/LandingPageCourse";
import styles from "./index.module.scss";
import Breadcrumb from "@/components/Breadcrumb";

const CourseDetail = () => {
  const breadcrumb = [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: "Danh sách khoá học",
      link: "/",
    },
    {
      label: "Khoá tiếng nhật N4 - Online",
      link: "/course_detail",
    },
  ];
  return (
    <div>
      <div className={styles.breadcrumb}>
        <Breadcrumb breadcrumbs={breadcrumb} />
      </div>
      <LandingPageCourse />
      <div style={{ width: "100%", height: 500 }}></div>
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
