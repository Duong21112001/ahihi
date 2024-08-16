import Breadcrumb from "@/components/Breadcrumb";
import Layout from "@/components/Layout";
import { CategoriesProp, Course } from "@/utils/model/courses";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { ReactElement, useState } from "react";
import styles from "./index.module.css";

const DocumentPage = ({ children }: { children: ReactElement }) => {
  const [course, setCourse] = useState<CategoriesProp | null>(null);

  const breadcrumb = [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: course?.name || "",
      link: "/",
    },
  ];
  return (
    <div className={styles.bg}>
      <Breadcrumb breadcrumbs={breadcrumb} />
      {children}
    </div>
  );
};

export default DocumentPage;
DocumentPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
