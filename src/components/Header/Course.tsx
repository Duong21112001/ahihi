import React, { useState } from "react";
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
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("header");
  const { data = [] }: { data: CourseReponse[] } = useRequest(async () => {
    const result = await listCourse();
    return result;
  });
  const displayCourse = showAll ? data : data.slice(0, 4);
  return (
    <div className={styles.subNavbar}>
      {React.Children.toArray(
        displayCourse?.map((item) => (
          <Button
            className={styles.btn}
            onClick={() =>
              router.push({
                pathname: "/course-detail",
                query: { id: item?.cat_id },
              })
            }
          >
            <Text type="body-16-regular">{item.name}</Text>
          </Button>
        ))
      )}
      {!showAll && data.length > 5 && (
        <Button
          type="btn-ghost"
          className={styles.btnCourse}
          onClick={() => setShowAll(true)}
        >
          Read More
        </Button>
      )}
    </div>
  );
};

export default Course;
