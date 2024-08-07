import React, { useState, useEffect, useRef } from "react";
import Question from "./Exam";
import Text from "@/components/Text";
import CountDown from "./CountDown";
import img from "../../public/Images/cotton-sheep.png";
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
import { useRouter } from "next/router";
import arrow from "../../public/Images/right.png";
import Link from "next/link";

const ExamPage = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [disable, setDisable] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [answerResults, setAnswerResults] = useState<{
    [key: number]: boolean;
  }>({});
  const [correctAnswers, setCorrectAnswers] = useState<{
    [key: number]: string;
  }>({});

  const [question, setQuestion] = useState<Questions[]>([]);
  const [error, setError] = useState<string | null>(null);

  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { convert } = require("html-to-text");
  const router = useRouter();
  const { id } = router.query;
  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // const { data }: { data: Questions[] } = useRequest(async () => {
  //   const result = await getCourseQuestions(1);
  //   return result;
  // });
  useEffect(() => {
    const fetchQuestion = async () => {
      if (id) {
        try {
          const response = await fetch(
            `https://kosei-web.eupsolution.net/api/trial-tests/${id}/questions`
          );
          const data = await response.json();
          if (Array.isArray(data)) {
            setQuestion(data);
          } else {
            setError("Data empry");
          }
        } catch (err) {
          setError("Failed");
        }
      }
    };
    fetchQuestion();
  }, [id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const sliceData = data?.slice(0, 7) || [];

  useEffect(() => {
    if (question) {
      const totalQuestions = question.flatMap((exam) => exam.question).length;
      const answeredQuestions = Object.keys(answers).length;
      const answeredPercentage = (answeredQuestions / totalQuestions) * 100;
      if (answeredPercentage >= 50) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
  }, [answers, question]);

  let questionIndex = 1;

  const handleSubmit = () => {
    if (question) {
      let correctCount = 0;
      let answeredCount = 0;
      let tempAnswerResults: { [key: number]: boolean } = {};
      let tempCorrectAnswers: { [key: number]: string } = {};

      question
        .flatMap((exam) => exam.questions)
        .forEach((q) => {
          if (answers[q?.id] !== undefined) {
            answeredCount++;
            const correctAnswerMap = {
              "1": q.answer_a,
              "2": q.answer_b,
              "3": q.answer_c,
              "4": q.answer_d,
            };
            const correctAnswer =
              correctAnswerMap[
                q.correct_answer as keyof typeof correctAnswerMap
              ];
            tempCorrectAnswers[q.id] = correctAnswer;
            if (answers[q.id] === correctAnswer) {
              correctCount++;
              tempAnswerResults[q.id] = true;
            } else {
              tempAnswerResults[q.id] = false;
            }
          }
        });
      setResult(`Số câu trả lời đúng: ${correctCount} / ${answeredCount}`);
      setAnswerResults(tempAnswerResults);
      setCorrectAnswers(tempCorrectAnswers);
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
        <Link href="/exam">
          <Image src={arrow} alt="" width={38} height={38} />
        </Link>
        {question?.map((exam, examIndex) => (
          <div
            key={exam.id}
            className="flex flex-col gap-5 pr-20"
            ref={(el) => (questionRefs.current[examIndex] = el)}
          >
            <Text type="body-16-bold">
              {exam.name}: {convert(convert(exam.question))}
            </Text>
            {exam.questions?.map((q, index) => (
              <Question
                key={q.id}
                questionId={q.id}
                question={q.question}
                options={[q.answer_a, q.answer_b, q.answer_c, q.answer_d]}
                onAnswer={handleAnswer}
                name={`${questionIndex++}`}
                showDetail={showDetail}
                disable={disable}
                answerResults={answerResults}
                correctAnswer={correctAnswers[q.id]}
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
            <Text
              type="body-16-regular"
              className="border-2 w-fit px-3 py-1 border-[#0F5FAF] rounded-md"
            >
              Ngữ pháp
            </Text>
          </div>
        </div>
        <CountDown isPaused={isPaused} />
        <div className="p-4 ">
          <div className="mt-5 my-2.5">
            <Text type="body-16-semibold">Câu hỏi đã làm</Text>
          </div>
          <div className="grid grid-cols-8 gap-2 pr-10 cursor-pointer">
            {question
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
                className="bottom-0 ml-4"
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
