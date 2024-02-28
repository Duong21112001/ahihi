import Text from "@/components/Text";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import React, { useState } from "react";
import CarouselComponent from "@/components/carousel";
import Video from "@/components/Video";
import RegisterForm from "@/pages_components/RegisterForm";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextPageWithLayout } from "./_app";
import StudentComments from "@/pages_components/StudentComments";
import LandingPageHome from "@/pages_components/landingPageHome";
import CourseCarousel from "@/pages_components/courseCarousel";
import Box from "@/components/Box";

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <LandingPageHome />
      <CourseCarousel />
      <StudentComments />
    </>
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
