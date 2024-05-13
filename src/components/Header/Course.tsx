import React from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Text from "../Text";
import Button from "../Button";
import { CourseReponse } from "@/utils/model/courses";
import { useRequest } from "@umijs/hooks";
import { listCourse } from "@/pages_components/homePage/courseCarousel/service";

const Course = () => {
  const router = useRouter();
  const { t } = useTranslation("header");
  const { data = [] }: { data: CourseReponse[] } = useRequest(async () => {
    const result = await listCourse();
    return result;
  });
  console.log("data=========", data);

  return (
    <div className={styles.subNavbar}>
      {React.Children.toArray(
        data?.map((item) => (
          <Button
            className={styles.btn}
            onClick={() =>
              router.push({
                pathname: "/course-detail",
                query: { id: item?.cat_id },
              })
            }
          >
            <Text
              type="body-16-regular"
              // color={
              //   router.pathname === "/course" ? "primary-bule" : "neutral-1"
              // }
            >
              {/* {t("KHÓA HỌC N2")} */}
              {item.name}
            </Text>
          </Button>
        ))
      )}
    </div>
  );
};

export default Course;
