import Layout from "@/components/Layout";
import { Details, HistoryDetail, Question } from "@/utils/model/user"; // Đảm bảo 'Question' được import từ model phù hợp
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Text from "@/components/Text";
import { cn } from "@/utils";

const DetailHistory = () => {
  const route = useRouter();
  const { id } = route.query;
  const [historyDetail, setHistoryDetail] = useState<HistoryDetail | null>(
    null
  );
  const { convert } = require("html-to-text");

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

  // Hàm để chuyển đổi correct_answer thành số (1, 2, 3, 4)
  const getCorrectAnswerIndex = (correctAnswer: string): string => {
    const letterToIndexMap: { [key: string]: string } = {
      A: "1",
      B: " 2",
      C: "3",
      D: "4",
    };

    if (!isNaN(Number(correctAnswer))) {
      return correctAnswer;
    }

    return letterToIndexMap[correctAnswer] || "0";
  };

  // Hàm so sánh và trả về lớp CSS dựa trên đáp án đúng và đáp án người dùng chọn
  const getBorderClass = (
    answer: string,
    correctAnswer: string,
    selectedAnswer: string
  ) => {
    const correctAnswerIndex = getCorrectAnswerIndex(correctAnswer);
    if (answer === correctAnswerIndex) {
      return "border-[#0a8328] bg-[#E7EFF7]";
    } else if (answer === selectedAnswer) {
      return "border-[#FF0000] bg-[#FFE5E5]";
    } else {
      return "border-gray-300";
    }
  };
  const getBorderClassItem = (
    answer: string,
    correctAnswer: string,
    selectedAnswer: string
  ) => {
    const correctAnswerIndex = getCorrectAnswerIndex(correctAnswer);

    if (answer === correctAnswerIndex) {
      return " bg-[#B7CFE7]";
    } else if (answer === selectedAnswer) {
      return "bg-[#B7CFE7]";
    } else {
      return "";
    }
  };
  // Hàm xác định màu của input radio
  const getRadioClass = (
    answer: string,
    correctAnswer: string,
    selectedAnswer: string
  ) => {
    const correctAnswerIndex = getCorrectAnswerIndex(correctAnswer);

    if (selectedAnswer) {
      return answer === correctAnswerIndex ? "green-500" : "red-500";
    }
    return "";
  };

  return (
    <div className="container max-lg:min-w-0  ">
      <div className="border-2 rounded-xl m-20 p-10 flex flex-col gap-4">
        {historyDetail?.details.map((item: Details) => {
          const question = item.question as Question; // Khẳng định kiểu cho item.question
          return (
            <div key={item.id} className="flex flex-col gap-2">
              <Text type="body-16-bold">
                {convert(convert(question.question))}
              </Text>
              <div className="grid grid-cols-2 gap-4">
                {["1", "2", "3", "4"].map((option, index) => {
                  const answerKey = `answer_${String.fromCharCode(
                    97 + index
                  )}` as keyof Question;
                  const optionIndex = String(index + 1);
                  // Khẳng định kiểu cho thuộc tính động
                  return (
                    <div
                      key={option}
                      className={`flex items-center gap-3 border rounded-full pr-4  ${getBorderClass(
                        optionIndex,
                        question.correct_answer,
                        item.answer
                      )}`}
                    >
                      <div
                        className={cn(
                          "border py-3 px-4 rounded-tl-full rounded-bl-full",
                          getBorderClassItem(
                            optionIndex,
                            question.correct_answer,
                            item.answer
                          )
                        )}
                      >
                        <input
                          type="radio"
                          disabled
                          checked={item.answer === optionIndex}
                          className={`w-5 h-5 ${getRadioClass(
                            option,
                            question.correct_answer,
                            item.answer
                          )}`}
                        />
                      </div>

                      <Text>{convert(convert(question[answerKey]))}</Text>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
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
