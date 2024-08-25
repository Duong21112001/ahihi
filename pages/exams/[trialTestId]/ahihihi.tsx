import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useRouter } from "next/router";
import { Questions } from "@/utils/model/courses";

const ExamPage = () => {
  const [listQuestion, setListQuestion] = useState<Questions[]>([]);

  const [error, setError] = useState<string | null>(null);

  const route = useRouter();
  const { trialTestId } = route.query;
  console.log("idTest=======", trialTestId);
  useEffect(() => {
    if (trialTestId) {
      const fetchDocumentDetail = async () => {
        try {
          const response = await fetch(
            `https://kosei-web.eupsolution.net/api/trial-tests/${trialTestId}/questions`
          );
          const data = await response.json();
          console.log("document====", data);

          setListQuestion(data);
        } catch (err) {
          setError("Failed to fetch document details");
        }
      };
      fetchDocumentDetail();
    }
  }, [trialTestId]);
  return (
    <div className="flex max-xl:flex-col-reverse">
      <div className="flex-1 flex flex-col gap-6 w-[72%] px-10 py-5 max-xl:w-full max-xl:px-8 ">
        {listQuestion?.map((item, index) => (
          <div key={item.id}>{item.name}ahihihi</div>
        ))}
      </div>
      <Navbar />
    </div>
  );
};

export default ExamPage;
ExamPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
