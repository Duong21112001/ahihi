import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Button from "@/components/Button";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import { useRouter } from "next/router";
import { TrialTests } from "@/utils/model/courses";

const ListExam = ({ setSelectedContest }: { setSelectedContest: any }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [trialTest, setTrialTest] = useState<TrialTests[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTrial = async () => {
      try {
        const response = await fetch(
          "https://kosei-web.eupsolution.net/api/trial-tests"
        );
        const data = await response.json();
        console.log("trail=====", data);
        if (Array.isArray(data)) {
          setTrialTest(data);
        } else {
          setError("Data is not an array");
        }
      } catch (err) {
        setError("Failed");
      }
    };
    fetchTrial();
  }, []);
  const itemsPerPage = 15;
  const filterExam =
    setSelectedContest !== "Tất cả"
      ? trialTest.filter(
          (exam: { slug: string }) => exam.slug === setSelectedContest
        )
      : trialTest;

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
        {currentExams.map((item) => (
          <div className={styles.testItem} key={item.id}>
            <div className={styles.headerExam}>
              <Text type="body-16-bold" color="dark-500">
                {item.name}
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

            {/* <div className={`${styles.item} gray-500 body-14-regular`}>
              <p>{item.contest} phần thi </p>
              <p>{item.question} câu hỏi</p>
            </div> */}
            <div className={styles.footerExam}>
              <p className={styles.type}>{item.slug}</p>
              <Button
                className={styles.btn}
                onClick={() => {
                  router.push(`/exams?id=${item.id}`);
                }}
              >
                Thi thử
              </Button>
            </div>
          </div>
        ))}
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
