import React, { useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "../_app";
import styles from "./index.module.scss";
import Breadcrumb from "@/components/Breadcrumb";
import Text from "@/components/Text";
import classNames from "classnames";
import MyCourseCarousel from "@/pages_components/myCourse/course";
import { useRecoilState } from "recoil";
import { userProfile } from "@/context/User";

interface VideoInfo {
  video: string;
  parentId: number;
}

const MyCoursePage: NextPageWithLayout = () => {
  const [tabActive, setTabActive] = useState("1");
  const [user, setUser] = useRecoilState(userProfile);

  const breadcrumb = [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: "Khóa học của tôi",
      link: "/my-course",
    },
  ];
  const tabs = [
    {
      label: "Khoá học của tôi",
      value: "1",
    },
    {
      label: "Tổng quan",
      value: "2",
    },
    {
      label: "Tài liệu học tập",
      value: "3",
    },
  ];

  const renderTab = () => {
    switch (tabActive) {
      case "1":
        return <MyCourseCarousel />;
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.myCoursePage}>
      <div className={styles.breadcrumb}>
        <Breadcrumb breadcrumbs={breadcrumb} />
      </div>
      <div className={styles.tabsWrap}>
        <div className={styles.tabsContainer}>
          <Text type="heading-h3" color="neutral-10" bottom={24}>
            Xin chào, {user?.fullname}!
          </Text>
          <div className={styles.tabs}>
            {tabs?.map((tab) => {
              return (
                <Text
                  key={`tab-${tab.label}`}
                  type={
                    tabActive === tab.value
                      ? "title-20-bold"
                      : "title-20-regular"
                  }
                  color={tabActive === tab.value ? "neutral-10" : "neutral-5"}
                  className={classNames(
                    styles.tab,
                    tabActive === tab.value ? styles.tabActive : ""
                  )}
                  onClick={() => setTabActive(tab.value)}
                >
                  {tab.label}
                </Text>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.container}>{renderTab()}</div>
    </div>
  );
};
export default MyCoursePage;

MyCoursePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
