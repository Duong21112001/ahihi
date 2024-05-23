import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Overview from "./Overview";
import Amount from "./Amount";
import styles from "./index.module.scss";

const AboutUs = () => {
  return (
    <div className={`${styles.contentAbout} container`}>
      <Overview />
      <Amount />
    </div>
  );
};

export default AboutUs;
AboutUs.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
