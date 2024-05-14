import React, { useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import { useRequest } from "@umijs/hooks";
import { listCourse } from "@/pages_components/homePage/courseCarousel/service";
import Button from "../Button";
import { useRouter } from "next/router";
import { CourseReponse } from "@/utils/model/courses";

const Search = ({
  isSearchActive,
  setIsSearchActive,
  width,
}: {
  isSearchActive: boolean;
  setIsSearchActive: (isActive: boolean) => void;
  width?: string;
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { data }: { data: CourseReponse[] } = useRequest(async () => {
    const result = await listCourse();

    return result;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleCloseClick = () => {
    setIsSearchActive(false);
    setSearchTerm("");
  };
  let filterCourses: CourseReponse[] = [];
  if (searchTerm) {
    filterCourses = data.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div style={{ width }}>
      {!isSearchActive && (
        <Image
          src="/svg/search.svg"
          alt="search"
          layout="fixed"
          width={24}
          height={24}
          style={{ marginRight: 24 }}
          className={styles.searchIcon}
          onClick={handleSearchClick}
        />
      )}
      {isSearchActive && (
        <div className={styles.searchActive}>
          <div className={styles.searchIem}>
            <Image
              src="/svg/search-header.svg"
              alt="close"
              width={24}
              height={24}
              className={styles.iconSearch}
            />
            <input
              placeholder="Nhập nội dung tìm kiếm"
              value={searchTerm}
              onChange={handleChange}
            />
            {searchTerm && (
              <ul className={styles.boxSearch}>
                {filterCourses.map((course) => (
                  <Button
                    key={course.cat_id}
                    className={styles.btn}
                    onClick={() =>
                      router.push({
                        pathname: "/course-detail",
                        query: { id: course?.cat_id },
                      })
                    }
                  >
                    <li className={styles.text}>{course.name}</li>
                  </Button>
                ))}
              </ul>
            )}
          </div>
          <Image
            src="/svg/remove.svg"
            alt="close"
            width={20}
            height={20}
            onClick={handleCloseClick}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
