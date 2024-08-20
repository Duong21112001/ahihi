import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import Text from "@/components/Text";
import clock from "../../public/svg/clock-circle.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HistoryItem {
  testName: string;
  score: number;
  passScore: number;
}
const History = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[] | null>(null);
  useEffect(() => {
    const storedResults = JSON.parse(
      localStorage.getItem("examResults") || "[]"
    );
    console.log("data=======", storedResults);
    setHistoryData(storedResults);
  }, []);

  return (
    <div className="container">
      <Text type="title-32-bold" className="text-center mb-5">
        Lịch sử thi thử
      </Text>
      <div className="grid grid-cols-3 gap-[30px]">
        {historyData ? (
          historyData.map((item, index) => (
            <div className="p-5 bg-[#f6f6f6] rounded-xl w-full" key={index}>
              <Text type="title-18-semibold">Thi thử JLPT N4</Text>
              <div className="flex gap-1 items-center mt-2">
                <Image src={clock} alt="" />
                <Text color="neutral-5"> 06/15/24 10:38:58 AM</Text>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <Text type="body-16-semibold">Tổng điểm:</Text>
                  <div className="flex-grow mx-2 border-t border-dotted border-gray-400"></div>

                  <Text type="body-16-semibold" className="text-[#dd2328]">
                    {item.score}/{item.passScore}
                  </Text>
                </div>
                <div className="flex justify-between items-end">
                  <Text>{item.testName}</Text>
                  <div className="flex-grow mx-2 border-t border-dotted border-gray-400"></div>

                  <Text type="body-16-semibold" className="text-[#dd2328]">
                    {item.score}/{item.passScore}
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
