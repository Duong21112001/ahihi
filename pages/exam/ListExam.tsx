import React, { useState } from "react";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Button from "@/components/Button";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import { useRouter } from "next/router";

const EXAM = [
  {
    id: 1,
    title: "Thi thử JLPT 01",
    time: 120,
    contest: 7,
    question: 200,
    type: "N1",
  },
  {
    id: 2,
    title: "Thi thử JLPT 02",
    time: 120,
    contest: 7,
    question: 200,
    type: "N1",
  },
  {
    id: 3,
    title: "Thi thử JLPT 03",
    time: 120,
    contest: 7,
    question: 200,
    type: "N1",
  },
  {
    id: 4,
    title: "Thi thử JLPT 04",
    time: 120,
    contest: 7,
    question: 200,
    type: "N1",
  },
  {
    id: 5,
    title: "Thi thử JLPT 05",
    time: 120,
    contest: 7,
    question: 200,
    type: "N1",
  },
  {
    id: 6,
    title: "Thi thử JLPT 01",
    time: 120,
    contest: 7,
    question: 200,
    type: "N2",
  },
  {
    id: 7,
    title: "Thi thử JLPT 02",
    time: 120,
    contest: 7,
    question: 200,
    type: "N2",
  },
  {
    id: 8,
    title: "Thi thử JLPT 03",
    time: 120,
    contest: 7,
    question: 200,
    type: "N2",
  },
  {
    id: 9,
    title: "Thi thử JLPT 04",
    time: 120,
    contest: 7,
    question: 200,
    type: "N2",
  },
  {
    id: 10,
    title: "Thi thử JLPT 05",
    time: 120,
    contest: 7,
    question: 200,
    type: "N2",
  },
  {
    id: 11,
    title: "Thi thử JLPT 01",
    time: 120,
    contest: 7,
    question: 200,
    type: "N3",
  },
  {
    id: 12,
    title: "Thi thử JLPT 02",
    time: 120,
    contest: 7,
    question: 200,
    type: "N3",
  },
  {
    id: 13,
    title: "Thi thử JLPT 03",
    time: 120,
    contest: 7,
    question: 200,
    type: "N3",
  },
  {
    id: 14,
    title: "Thi thử JLPT 04",
    time: 120,
    contest: 7,
    question: 200,
    type: "N3",
  },
  {
    id: 15,
    title: "Thi thử JLPT 05",
    time: 120,
    contest: 7,
    question: 200,
    type: "N3",
  },
  {
    id: 16,
    title: "Thi thử JLPT 06",
    time: 120,
    contest: 7,
    question: 200,
    type: "N2",
  },
  {
    id: 17,
    title: "Thi thử JLPT 01",
    time: 120,
    contest: 7,
    question: 200,
    type: "N4",
  },
  {
    id: 18,
    title: "Thi thử JLPT 02",
    time: 120,
    contest: 7,
    question: 200,
    type: "N4",
  },
  {
    id: 19,
    title: "Thi thử JLPT 03",
    time: 120,
    contest: 7,
    question: 200,
    type: "N4",
  },
  {
    id: 20,
    title: "Thi thử JLPT 04",
    time: 120,
    contest: 7,
    question: 200,
    type: "N4",
  },
  {
    id: 21,
    title: "Thi thử JLPT 05",
    time: 120,
    contest: 7,
    question: 200,
    type: "N4",
  },
  {
    id: 22,
    title: "Thi thử JLPT 01",
    time: 120,
    contest: 7,
    question: 200,
    type: "N5",
  },
  {
    id: 23,
    title: "Thi thử JLPT 02",
    time: 120,
    contest: 7,
    question: 200,
    type: "N5",
  },
  {
    id: 24,
    title: "Thi thử JLPT 03",
    time: 120,
    contest: 7,
    question: 200,
    type: "N5",
  },
  {
    id: 25,
    title: "Thi thử JLPT 04",
    time: 120,
    contest: 7,
    question: 200,
    type: "N5",
  },
  {
    id: 26,
    title: "Thi thử JLPT 05",
    time: 120,
    contest: 7,
    question: 200,
    type: "N5",
  },
  {
    id: 27,
    title: "Thi thử JLPT 06",
    time: 120,
    contest: 7,
    question: 200,
    type: "N5",
  },
];
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
    <div className="container !pt-10">
      <Text type="heading-h2">Danh sách Thi thử JLPT</Text>
      <div className="grid grid-cols-4 max-md:grid-cols-1 gap-5">
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
                    router.push("/exams");
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
