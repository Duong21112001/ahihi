import Text from "@/components/Text";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextPageWithLayout } from "./_app";
import LandingPageHome from "@/pages_components/landingPageHome";
import CourseCarousel from "@/pages_components/courseCarousel";
import BannerRegister from "@/pages_components/BannerRegister";
import Lecturers from "@/pages_components/Lecturers";
import Community from "@/pages_components/Community";
import Achievements from "@/pages_components/Achievements";
import StudentComments from "@/pages_components/StudentComments";
import FooterRegister from "@/pages_components/FooterRegister";
import PlaceholderBox from "@/components/placeholderBox";
import ListVideo from "@/pages_components/ListVideo";
import styles from "./page.module.scss";
import DownloadApp from "@/pages_components/DownloadApp";
import ChooseKosei from "@/pages_components/ChooseKosei";

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
