import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./index.module.css";
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
  isSearchActive?: boolean;
  setIsSearchActive?: (isActive: boolean) => void;
  width?: string;
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const { data }: { data: CourseReponse[] } = useRequest(async () => {
    const result = await listCourse();

    return result;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const handleSearchClick = () => {
    if (setIsSearchActive) {
      setIsSearchActive(true);
    }
  };

  const handleCloseClick = () => {
    if (setIsSearchActive) {
      setIsSearchActive(false);
    }
    setSearchTerm("");
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let filterCourses: CourseReponse[] = [];
  if (searchTerm) {
    filterCourses = data.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div style={{ width }}>
      {!isSearchActive && !isMobile && (
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
      {(isSearchActive || isMobile) && (
        <div className={styles.searchActive}>
          <label htmlFor="searchInput" className={styles.searchIem}>
            <Image
              src="/svg/search-header.svg"
              alt="close"
              width={24}
              height={24}
              className={styles.iconSearch}
            />
            <input
              id="searchInput"
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
          </label>
          <Image
            src="/svg/remove.svg"
            alt="close"
            width={20}
            height={20}
            onClick={handleCloseClick}
            className={styles.close}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
