import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Button from "@/components/Button";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import { useRouter } from "next/router";
import vector from "../../public/svg/Vector.svg";
import { cn } from "@/utils";
import cloud from "../../public/Images/Group 1597882862.png";
import { ExamProps, Test, TrialTests } from "@/utils/model/courses";
import { useRecoilState } from "recoil";
import { userProfile } from "@/context/User";
const ListExam = ({ setSelectedContest }: { setSelectedContest: any }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [trialTest, setTrialTest] = useState<TrialTests[]>([]);
  // const [level, setLevel] = useState<Level[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
  const router = useRouter();
  const [user, setUser] = useRecoilState(userProfile);

  useEffect(() => {
    if (!user?.user_id) {
      router.push("/login");
    }
  }, [router]);
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
          console.log("trialTest=====", trialTest);
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
  // const filterExam =
  //   setSelectedContest !== "Tất cả"
  //     ? trialTest.filter(
  //         (exam: { level: string }) => exam.level === setSelectedContest
  //       )
  //     : trialTest;

  // const handlePageClick = (event: any) => {
  //   setCurrentPage(event.selected);
  // };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentExams = filterExam.slice(startIndex, endIndex);
  const allTests = trialTest.flatMap((item) => item.test);
  const currentTests = allTests.slice(startIndex, endIndex);
  return (
    <div className="relative">
      <Image src={cloud} alt="" className="absolute top-[25%] left-0" />
      <Image src={cloud} alt="" className="absolute top-0 right-0 rotate-180" />

      <div className="container !pt-10 max-lg:py-0 max-lg:min-w-0">
        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 relative ">
          {currentTests.map((item: Test) => (
            <div
              className={cn(
                "w-[366px] relative flex flex-col items-center justify-between shadow-md h-auto",
                styles.testItem
              )}
              key={item.id}
            >
              <Text
                type="tag-12-bold"
                className="text-[#2D32A4]  bg-[#ECF9FF] rounded-lg py-2 px-3 absolute top-0 left-0"
              >
                Miễn phí
              </Text>
              <div className="w-[96px] h-[96px] rounded-full bg-[#E7EFF7] flex items-center justify-center">
                <div className="w-[79px] h-[79px] rounded-full bg-gradient-to-b-custom flex items-center justify-center text-[32px] text-white">
                  N{item.level_id}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {item.exam.map((it: ExamProps) => (
                  <div
                    key={it.id}
                    className={cn(
                      "border border-[#0F5FAF] bg-[#EDF2F7] rounded-full px-4 py-2 flex items-center justify-center gap-2 cursor-pointer",
                      {
                        ["bg-blue-100"]: selectedSkillId === it.id,
                      }
                    )}
                    onClick={() => setSelectedSkillId(it.id)}
                  >
                    <Text className="text-[#2D3748]" type="body-14-semibold">
                      {it.name}
                    </Text>

                    <div className="flex items-center gap-1">
                      <Image src={vector} alt="" />
                      <Text type="tag-10-medium" className="text-[#4A5568]">
                        {it.time_end}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className={cn("w-full uppercase", styles.btn)}
                onClick={() => {
                  const query = {
                    id: item.id.toString(),
                    exam: JSON.stringify(
                      item.exam.map((test: ExamProps) => ({
                        time: test.time_end,
                        name: test.name,
                        id: test.id,
                      }))
                    ),
                  };

                  router.push({
                    pathname: "/exams",
                    query: query,
                  });
                }}
              >
                Thi thử
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListExam;
