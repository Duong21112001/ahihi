import React, { useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextPageWithLayout } from "./_app";
import LandingPageHome from "@/pages_components/homePage/landingPageHome";
import CourseCarousel from "@/pages_components/homePage/courseCarousel";
import BannerRegister from "@/pages_components/homePage/BannerRegister";
import Lecturers from "@/pages_components/homePage/Lecturers";
import Community from "@/pages_components/homePage/Community";
import Achievements from "@/pages_components/homePage/Achievements";
import StudentComments from "@/pages_components/homePage/StudentComments";
import styles from "./page.module.scss";
import DownloadApp from "@/pages_components/homePage/DownloadApp";
import ChooseKosei from "@/pages_components/homePage/ChooseKosei";
import DownloadAppFooter from "@/pages_components/homePage/DownloadAppFooter";

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.homePageContainer}>
      <LandingPageHome />
      <CourseCarousel />
      <ChooseKosei />
      <BannerRegister />
      <DownloadApp />
      <Lecturers />
      <Achievements />
      <StudentComments />
      <Community />
      <DownloadAppFooter />
    </div>
  );
};
export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
