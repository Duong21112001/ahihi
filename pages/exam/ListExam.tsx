import React, { useState } from "react";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Button from "@/components/Button";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import { useRouter } from "next/router";
import { EXAM } from "./data";

const ListExam = ({ setSelectedContest }: { setSelectedContest: any }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;
  const filterExam =
    setSelectedContest !== "Tất cả"
      ? EXAM.filter((exam: { type: any }) => exam.type === setSelectedContest)
      : EXAM;

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };
  const router = useRouter();

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExams = filterExam.slice(startIndex, endIndex);

  return (
    <div className="container">
      <Text type="heading-h2">Danh sách Thi thử JLPT</Text>
      <div className={styles.test}>
        {React.Children.toArray(
          currentExams.map((item) => (
            <div className={styles.testItem}>
              <div className={styles.headerExam}>
                <Text type="body-16-bold" color="dark-500">
                  {item.title}
                </Text>
                <Text type="tag-10-medium" className={styles.free}>
                  Miễn phí
                </Text>
              </div>

              <div className={styles.human}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Image
                    key={index}
                    src="https://koseionline.vn/themes/template/images/user.png"
                    alt=""
                    width={50}
                    height={50}
                  />
                ))}
                <Text
                  type="body-14-medium"
                  color="blue-4"
                  className={styles.amountHuman}
                >
                  +9558
                </Text>
              </div>

              <div className={`${styles.item} gray-500 body-14-regular`}>
                <p>{item.contest} phần thi </p>
                <p>{item.question} câu hỏi</p>
              </div>
              <div className={styles.footerExam}>
                <p className={styles.type}>{item.type}</p>
                <Button
                  className={styles.btn}
                  onClick={() => {
                    router.push("/auditions");
                  }}
                >
                  Thi thử
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.paginationContainer}>
        <ReactPaginate
          pageCount={Math.ceil(filterExam.length / itemsPerPage)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          previousLabel={<span>{"<"}</span>}
          nextLabel={<span>{">"}</span>}
          breakLabel={<span>...</span>}
          containerClassName={styles.pagination}
          activeClassName={styles.activeP}
          pageClassName={styles.pageNum}
          previousClassName={styles.pageLink}
          nextClassName={styles.pageLink}
          breakClassName={styles.pageLink}
          breakLinkClassName={styles.pageLink}
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default ListExam;
