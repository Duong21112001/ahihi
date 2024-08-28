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
}
const History = () => {
  const [user, setUser] = useRecoilState(userProfile);

  // const router = useRouter();
  // const { testId } = router.query;
  const user_id = user?.user_id;
  const [historyData, setHistoryData] = useState<HistoryItem[] | null>(null);
  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `https://kosei-web.eupsolution.net/api/user-tests/${user_id}`
      );
      setHistoryData(response.data);
    } catch (err) {
      console.log("Error fetch history", err);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, [user_id]);
  return (
    <div className="container">
      <Text type="title-32-bold" className="text-center mb-5">
        Lịch sử thi thử
      </Text>
      <div className="grid grid-cols-3 gap-[30px]">
        {historyData ? (
          historyData.map((item, index) => (
            <div className="p-5 bg-[#f6f6f6] rounded-xl w-full" key={index}>
              <Text type="title-18-semibold">{item.total_score}</Text>
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
                    {item.total_score}
                  </Text>
                </div>
                <div className="flex justify-between items-end">
                  <Text>Vocab</Text>
                  <div className="flex-grow mx-2 border-t border-dotted border-gray-400"></div>

                  <Text type="body-16-semibold" className="text-[#dd2328]">
                    {item.vocab_score}
                  </Text>
                </div>
                <div className="flex justify-between items-end">
                  <Text>Reading</Text>
                  <div className="flex-grow mx-2 border-t border-dotted border-gray-400"></div>

                  <Text type="body-16-semibold" className="text-[#dd2328]">
                    {item.reading_score}
                  </Text>
                </div>
                <div className="flex justify-between items-end">
                  <Text>Listening</Text>
                  <div className="flex-grow mx-2 border-t border-dotted border-gray-400"></div>

                  <Text type="body-16-semibold" className="text-[#dd2328]">
                    {item.listening_score}
                  </Text>
                </div>
              </div>
              <Button variant="default" className="mt-5 w-full">
                Xem chi tiết
              </Button>
            </div>
          ))
        ) : (
          <Text>Not data</Text>
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
