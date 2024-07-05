import React, { useState, useEffect, useRef } from "react";
import Question from "./Exam";
import Text from "@/components/Text";
import CountDown from "./CountDown";
import img from "../../public/Images/test-failed 1.png";
import Image from "next/image";
import { Questions } from "@/utils/model/courses";
import { useRequest } from "@umijs/hooks";
import { getCourseQuestions } from "@/service/course";
import { Button } from "@/components/ui/button";
import Success from "../../public/Images/IMG1.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ExamPage = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [disable, setDisable] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { convert } = require("html-to-text");

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const { data }: { data: Questions[] } = useRequest(async () => {
    const result = await getCourseQuestions(1);
    return result;
  });

  useEffect(() => {
    if (data) {
      const totalQuestions = data.flatMap((exam) => exam.question).length;
      const answeredQuestions = Object.keys(answers).length;
      const answeredPercentage = (answeredQuestions / totalQuestions) * 100;
      if (answeredPercentage >= 80) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
  }, [answers, data]);

  let questionIndex = 1;

  const handleSubmit = () => {
    if (data) {
      let correctCount = 0;
      let answeredCount = 0;
      data
        .flatMap((exam) => exam.questions)
        .forEach((q) => {
          if (answers[q?.id] !== undefined) {
            answeredCount++;
            if ((answers[q.id] = q.correct_answer)) {
              correctCount++;
            }
          }
        });
      setResult(`Số câu trả lời đúng: ${correctCount} / ${answeredCount}`);
      setDisable(true);
      setIsButtonDisabled(true);
      setIsPaused(true);
    }
  };
  const scrollQuestion = (index: number) => {
    if (questionRefs.current[index]) {
      questionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col gap-6 w-[72%] px-10 py-5">
        {data?.map((exam, examIndex) => (
          <div
            key={exam.id}
            className="flex flex-col gap-5 pr-20"
            ref={(el) => (questionRefs.current[examIndex] = el)}
          >
            <Text type="body-16-bold">
              {exam.name}: {convert(convert(exam.question))}
            </Text>
            {exam.questions?.map((q) => (
              <Question
                key={q.id}
                questionId={q.id}
                question={q.question}
                options={[q.answer_a, q.answer_b, q.answer_c, q.answer_d]}
                onAnswer={handleAnswer}
                name={`${questionIndex++}`}
                showDetail={showDetail}
                disable={disable}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="w-1/4 border-l bg-[#f5f5f5] ">
        <div className="flex p-5 gap-4 border-b">
          <Image
            src={img}
            alt=""
            width={45}
            height={45}
            className="min-w-[45px] max-w-[45px]"
          />
          <div className="flex flex-col gap-2">
            <Text type="body-16-bold">
              JLPT - N1 - Thi thử JLPT N1 mùa 7 - đợt 1
            </Text>
            <Text>文字語彙ー文法ー読解</Text>
          </div>
        </div>
        <CountDown isPaused={isPaused} />
        <div className="p-4 ">
          <div className="mt-5 my-2.5">
            <Text type="body-16-semibold">Câu hỏi đã làm</Text>
          </div>
          <div className="grid grid-cols-10 gap-2 pr-10 cursor-pointer">
            {data
              ?.flatMap((exam) => exam.questions)
              .map((q, index) => (
                <div
                  key={q?.id}
                  className={`p-2 border w-8 h-8 flex items-center justify-center rounded ${
                    answers[q?.id] ? "bg-[#0F5FAF] text-white" : "bg-white"
                  }`}
                  onClick={() => scrollQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            {!disable && (
              <Button
                disabled={isButtonDisabled}
                className="bottom-0"
                onClick={handleSubmit}
              >
                Nộp bài
              </Button>
            )}
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center justify-center gap-0">
            <Text type="title-20-bold" color="main-color-primary">
              Chúc mừng bạn đã hoàn thành bài thi
            </Text>
            <Image src={Success} width={180} height={180} alt={""} />
            <DialogDescription>
              {result && <div className="text-green-600">{result}</div>}
            </DialogDescription>
            <DialogClose>
              <Button
                className="mt-5"
                onClick={() => setShowDetail(!showDetail)}
              >
                Xem chi tiết
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
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
