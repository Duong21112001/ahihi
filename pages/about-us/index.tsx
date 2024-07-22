import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import Banner from "./Banner";
import Introduce from "./Introduce";
import Service from "./Service";
import Different from "./Different";
import Image from "next/image";
import img from "../../public/Images/Group 1597882875.png";
import DownloadAppFooter from "@/pages_components/homePage/DownloadAppFooter";

const AboutUs = () => {
  return (
    <div className="text-center">
      <Banner />
      <Introduce />
      <Service />
      <Different />
      <Image src={img} alt="" className="max-md:hidden" />
      <DownloadAppFooter />
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
