import Layout from "@/components/Layout";
import Text from "@/components/Text";
import { Details, HistoryDetail, Question } from "@/utils/model/user";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DetailHistory = () => {
  const { convert } = require("html-to-text");
  const route = useRouter();
  const { id } = route.query;
  const [historyDetail, setHistoryDetail] = useState<HistoryDetail | null>(
    null
  );

  useEffect(() => {
    if (id) {
      const fetchHistoryDetail = async () => {
        try {
          const response = await fetch(
            `https://kosei-web.eupsolution.net/api/user-tests/${id}/details`
          );
          const data = await response.json();
          console.log("dataHistory========", data);

          setHistoryDetail(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchHistoryDetail();
    }
  }, [id]);
  return (
    <div className="container max-lg:min-w-0">
      <div className="border-2 rounded-xl m-20 p-10 flex flex-col gap-4">
        {historyDetail?.details.map((item: Details) => (
          <div key={item.id} className="flex flex-col gap-2">
            <Text type="body-16-bold">
              {convert(convert(item.question.question))}
            </Text>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 border rounded-full py-3 px-4">
                <input type="radio" disabled className="w-4 h-4" />
                <Text>{convert(convert(item.question.answer_a))}</Text>
              </div>
              <div className="flex items-center gap-3 border rounded-full py-3 px-4">
                <input type="radio" disabled className="w-4 h-4" />
                <Text>{convert(convert(item.question.answer_b))}</Text>
              </div>
              <div className="flex items-center gap-3 border rounded-full py-3 px-4">
                <input type="radio" disabled className="w-4 h-4" />
                <Text>{convert(convert(item.question.answer_c))}</Text>
              </div>
              <div className="flex items-center gap-3 border rounded-full py-3 px-4">
                <input type="radio" disabled className="w-4 h-4" />
                <Text>{convert(convert(item.question.answer_d))}</Text>
              </div>
            </div>
          </div>
        ))}
        {/* {historyDetail?.id} */}
      </div>
    </div>
  );
};

export default DetailHistory;
DetailHistory.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
