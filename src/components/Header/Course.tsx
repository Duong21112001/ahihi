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
          <svg
            width="12"
            height="6"
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.414376 0.531506C0.673133 0.20806 1.1451 0.155619 1.46855 0.414376L6.00003 4.03956L10.5315 0.414376C10.855 0.155619 11.3269 0.20806 11.5857 0.531506C11.8444 0.854953 11.792 1.32692 11.4685 1.58568L6.46855 5.58568C6.19464 5.80481 5.80542 5.80481 5.53151 5.58568L0.531506 1.58568C0.20806 1.32692 0.155619 0.854953 0.414376 0.531506Z"
              fill="#090A0B"
            />
          </svg>
        </Button>
      )}
    </div>
  );
};

export default Course;
