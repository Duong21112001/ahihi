import React, { useState } from "react";
import styles from "./index.module.scss";
import { EXAM } from "./data";
import Text from "@/components/Text";
import Button from "@/components/Button";
import ReactPaginate from "react-paginate";

const ListExam = ({ setSelectedContest }: { setSelectedContest: any }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;
  const filterExam =
    setSelectedContest !== "Tất cả"
      ? EXAM.filter((exam) => exam.type === setSelectedContest)
      : EXAM;

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExams = filterExam.slice(startIndex, endIndex);

  return (
    <div className="container">
      <div className={`${styles.test} `}>
        {React.Children.toArray(
          currentExams.map((item) => (
            <div className={styles.testItem}>
              <Text type="body-16-bold" color="dark-500">
                {item.title}
              </Text>
              <div>
                <Text type="body-14-regular" color="gray-500">
                  {item.time} phút
                </Text>
                <div className={`${styles.item} gray-500 body-14-regular`}>
                  <p>{item.contest} phần thi </p>|{" "}
                  <p>{item.question} câu hỏi</p>
                </div>
              </div>

              <p className={`${styles.type} body-14-medium`}>#{item.type}</p>
              <Button className={styles.btn}>Chi tiết</Button>
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
