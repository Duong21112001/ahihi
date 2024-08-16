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
          "flex flex-col items-center justify-center gap-10 relative",
          styles.bg
        )}
      >
        <Image src={img} alt="" className="absolute top-0 left-0" />
        <div style={{ margin: "0 auto", display: "flex" }}>
          <Text type="title-32-bold">THI THỬ JLPT</Text>
        </div>
        <div className="flex gap-10 items-center">
          <div className="bg-white px-8 py-6 rounded-[40px] flex flex-col items-center gap-1 shadow-md">
            <Text type="title-20-regular" color="main-color-primary">
              Học viên đang thi
            </Text>
            <Text type="title-32-bold" color="main-color-primary">
              1000
            </Text>
          </div>
          <div className="bg-[#003B9F] px-8 py-6 rounded-[40px] flex flex-col items-center gap-1">
            <Text type="title-32-bold" color="neutral-10">
              10.000 +
            </Text>
            <Text type="title-20-regular" color="neutral-10">
              Thí sinh đã tham gia thi
            </Text>
          </div>
          <div className="bg-[#003B9F] px-8 py-6 rounded-[40px] flex flex-col items-center gap-1">
            <Text type="title-32-bold" color="neutral-10">
              90 ~ 95%
            </Text>
            <Text type="title-20-regular" color="neutral-10">
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
