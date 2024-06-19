import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Exam from "./Exam";

const Auditions = () => {
  const [isShowExam, setIsShowExam] = useState(false);

  return (
    <div className={`${styles.content} container`}>
      <div
        className={` ${
          isShowExam ? styles.showExam : styles.contentAuditions
        } ${styles.exam}`}
      >
        <div className={styles.textContent}>
          <Text type="body-16-bold">Thi thử JLPT</Text>
          <Text type="body-14-medium">Tổng thời lượng 45 phút</Text>
          <Text type="body-16-bold">Thi thử trình độ N4</Text>
          <Text type="body-14-medium">
            <i>Kỹ năng: Moji Goi</i>
          </Text>
        </div>
        <Text type="heading-h2">30:00</Text>
        <div className={styles.start}>
          <Button
            type="btn-ghost"
            className={styles.btn}
            onClick={() => setIsShowExam(true)}
          >
            {isShowExam ? "Nộp bài" : "Bắt đầu"}
          </Button>
          <Text type="tag-10-medium" color="neutral-8">
            Mở loa ngoài hoặc đeo tai nghe để nghe câu hỏi
          </Text>
        </div>
      </div>
      {isShowExam && <Exam />}
    </div>
  );
};

export default Auditions;
Auditions.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
