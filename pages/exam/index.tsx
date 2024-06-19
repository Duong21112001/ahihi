import React, { useState } from "react";
import Layout from "@/components/Layout";
import styles from "./index.module.css";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import ListExam from "./ListExam";
const CONTEST = [
  {
    name: "Tất cả",
  },
  {
    name: "N1",
  },
  {
    name: "N2",
  },
  {
    name: "N3",
  },
  {
    name: "N4",
  },
  {
    name: "N5",
  },
];
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
        style={{
          background: "#F9F9F9",
          padding: "40px 0 0 0",
        }}
      >
        <div
          className="container"
          style={{ margin: "0 auto", display: "flex" }}
        >
          {React.Children.toArray(
            CONTEST.map((item) => (
              <Button
                type="btn-ghost"
                onClick={() => setSelectedContest(item.name)}
                className={`${styles.btnType} ${
                  selectedContest === item.name ? styles.active : ""
                }`}
              >
                {item.name}
              </Button>
            ))
          )}
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
