import React, { useState } from "react";
import Layout from "@/components/Layout";
import styles from "./index.module.css";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Breadcrumb from "@/components/Breadcrumb";
import ListExam from "./ListExam";
import { cn } from "@/utils";
import Text from "@/components/Text";
import Image from "next/image";
import img from "../../public/Images/cloud-sun-right.png";

const breadcrumb = [
  {
    label: "Trang chủ",
    link: "/",
  },
  {
    label: "Thư viện đề thi",
    link: "/my-course",
  },
];
const Exam = () => {
  const [selectedContest, setSelectedContest] = useState("Tất cả");
  return (
    <>
      <div className={styles.breadcrumb}>
        <Breadcrumb breadcrumbs={breadcrumb} />
      </div>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-10 relative max-lg:gap-5",
          styles.bg
        )}
      >
        <Image src={img} alt="" className="absolute top-0 left-0" />
        <div style={{ margin: "0 auto", display: "flex" }}>
          <Text type="title-32-bold" className="relative z-50">
            THI THỬ JLPT
          </Text>
        </div>
        <div className="flex gap-10 items-center max-lg:gap-3 max-lg:flex-col">
          <div className="bg-white px-8 py-6 rounded-[40px] flex flex-col items-center gap-1 shadow-md max-lg:px-4 max-lg:py-2 max-lg:rounded-3xl max-lg:gap-0">
            <Text
              type="title-20-regular"
              color="main-color-primary"
              className="max-lg:text-base"
            >
              Học viên đang thi
            </Text>
            <Text
              type="title-32-bold"
              color="main-color-primary"
              className="max-lg:text-xl"
            >
              1000
            </Text>
          </div>
          <div className="bg-[#003B9F] px-8 py-6 rounded-[40px] flex flex-col items-center gap-1 max-lg:px-4 max-lg:py-2 max-lg:rounded-3xl max-lg:gap-0">
            <Text
              type="title-32-bold"
              color="neutral-10"
              className="max-lg:text-xl"
            >
              10.000 +
            </Text>
            <Text
              type="title-20-regular"
              color="neutral-10"
              className="max-lg:text-base"
            >
              Thí sinh đã tham gia thi
            </Text>
          </div>
          <div className="bg-[#003B9F] px-8 py-6 rounded-[40px] flex flex-col items-center gap-1 max-lg:px-4 max-lg:py-2 max-lg:rounded-3xl max-lg:gap-0">
            <Text
              type="title-32-bold"
              color="neutral-10"
              className="max-lg:text-xl"
            >
              90 ~ 95%
            </Text>
            <Text
              type="title-20-regular"
              color="neutral-10"
              className="max-lg:text-base"
            >
              Tỷ lệ sát đề thi
            </Text>
          </div>
        </div>
      </div>
      <ListExam setSelectedContest={selectedContest} />
    </>
  );
};

export default Exam;
Exam.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
