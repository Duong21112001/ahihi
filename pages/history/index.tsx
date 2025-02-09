import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import Text from "@/components/Text";
import clock from "../../public/svg/clock-circle.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/router";
import { userProfile } from "@/context/User";
import { useRecoilState } from "recoil";
import { format } from "date-fns";

interface HistoryItem {
  id: number;
  user_id: number;
  trial_test_id: number;
  test_id: number;
  vocab_score: number;
  reading_score: number;
  listening_score: number;
  total_score: number;
  created_at: string;
  updated_at: string;
  status: 0 | 1;
  test: Test;
  grammar_score: number;
}
interface Test {
  id: number;
  tt_id: number;
  level_id: number;
  name: string;
  slug: string;
  image: string | null;
  pass_score: number;
  des: string | null;
  lang: string;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}
const History = () => {
  const [user, setUser] = useRecoilState(userProfile);
  const [dataTest, setDataTest] = useState<
    {
      name: string;
      pass_score: number;
      id: number;
    }[]
  >([]);
  const user_id = user?.user_id;
  const [historyData, setHistoryData] = useState<HistoryItem[] | null>(null);
  const [total, setTotal] = useState<number[]>([]);
  // const [allTestIds, setAllTestIds] = useState<number[]>([]);
  const router = useRouter();

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `https://kosei-web.eupsolution.net/api/user-tests/${user_id}`
      );
      console.log("History=====", response.data);
      const updatedData = response.data.map((item: HistoryItem) => ({
        ...item,
        total_score:
          item.grammar_score +
          item.vocab_score +
          item.reading_score +
          item.listening_score,
      }));
      setHistoryData(response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const allTestIds = response.data.map((item) => item.test_id);
        console.log("all==========", allTestIds);
        const testData = response.data
          .map((item) => {
            if (item.test_id === item.test.id) {
              return {
                id: item.test.id,
                name: item.test.name,
                pass_score: item.test.pass_score,
              };
            }
            return null; // Trả về null nếu không khớp
          })
          .filter(Boolean);

        console.log("Extracted Test Data:", testData);

        // setDataTest(testData);
      } else {
        console.log("Response data is not an array or is empty.");
      }
    } catch (err) {
      console.log("Error fetch history", err);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, [user_id]);

  const matchingItem = historyData
    ?.map((item) => (item.test_id === item.test.id ? item.test : null))
    .filter(Boolean)[0];
  console.log("matchingHistory=", matchingItem);
  const handleClick = (id: number) => {
    router.push(`/detail-trial-test/${id}`);
  };
  return (
    <div className="container max-xl:min-w-0">
      <Text type="title-32-bold" className="text-center mb-5">
        Lịch sử thi thử
      </Text>
      <div className="grid grid-cols-3 gap-[30px] max-xl:grid-cols-2 max-md:grid-cols-1 max-xl:px-10">
        {historyData ? (
          historyData.map((item, index) => (
            <div className="p-5 bg-[#f6f6f6] rounded-xl w-full" key={index}>
              <div className="flex gap-2 items-center justify-between">
                <Text type="title-18-semibold">
                  {item.test_id === item.test.id ? item.test.name : ""}
                </Text>
                <Text
                  type="body-16-semibold"
                  className={
                    item.status === 1
                      ? "text-green-500 bg-green-100 px-4 py-1 rounded-md"
                      : "text-red-500 bg-red-100 px-4 py-1 rounded-md"
                  }
                >
                  {item.status === 1 ? "Đạt" : "Không đạt"}
                </Text>
              </div>

              <div className="flex gap-1 items-center mt-2">
                <Image src={clock} alt="" />
                <Text color="neutral-5">
                  {format(new Date(item.updated_at), "dd/MM/yyyy HH:mm")}
                </Text>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <Text type="body-16-semibold">Tổng điểm:</Text>
                  <div className="flex-grow mx-2 border-t border-dotted border-gray-400"></div>

                  <Text type="body-16-semibold" className="text-[#dd2328]">
                    {item.grammar_score +
                      item.listening_score +
                      item.reading_score +
                      item.vocab_score}
                    /{item.total_score}
                  </Text>
                </div>
                <div className="flex justify-between items-end">
                  <Text>Ngữ pháp + Từ vựng</Text>
                  <div className="flex-grow mx-2 border-t border-dotted border-gray-400"></div>

                  <Text type="body-16-semibold" className="text-[#dd2328]">
                    {item.vocab_score + item.vocab_score}
                  </Text>
                </div>
                {/* <div className="flex justify-between items-end">
                  <Text>Grammar</Text>
                  <div className="flex-grow mx-2 border-t border-dotted border-gray-400"></div>

                  <Text type="body-16-semibold" className="text-[#dd2328]">
                    {item.grammar_score}
                  </Text>
                </div> */}
                <div className="flex justify-between items-end">
                  <Text>Đọc hiểu</Text>
                  <div className="flex-grow mx-2 border-t border-dotted border-gray-400"></div>

                  <Text type="body-16-semibold" className="text-[#dd2328]">
                    {item.reading_score}
                  </Text>
                </div>
                <div className="flex justify-between items-end">
                  <Text>Nghe hiểu</Text>
                  <div className="flex-grow mx-2 border-t border-dotted border-gray-400"></div>

                  <Text type="body-16-semibold" className="text-[#dd2328]">
                    {item.listening_score}
                  </Text>
                </div>
              </div>
              <Button
                variant="default"
                className="mt-5 w-full"
                // onClick={() => handleClick(item.id)}
                onClick={() => {
                  if (!user?.user_id) {
                    router.push("/login");
                  } else {
                    handleClick(item.id);
                  }
                }}
              >
                Xem chi tiết
              </Button>
            </div>
          ))
        ) : (
          <Text>Loading ...</Text>
        )}
      </div>
    </div>
  );
};

export default History;
History.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
