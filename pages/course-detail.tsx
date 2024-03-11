import React, { useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LandingPageCourse from "@/pages_components/detailCourse/LandingPageCourse";

const CourseDetail = () => {
  return (
    <div>
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
