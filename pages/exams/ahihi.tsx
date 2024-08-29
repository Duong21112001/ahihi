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
  const [loading, setLoading] = useState(false);
  const [answerResults, setAnswerResults] = useState<{
    [key: number]: boolean;
  }>({});
  const [correctAnswers, setCorrectAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [currentTestIndex, setCurrentTestIndex] = useState(0);

  const [question, setQuestion] = useState<Questions[]>([]);
  const [error, setError] = useState<string | null>(null);

  const questionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { convert } = require("html-to-text");
  const router = useRouter();
  const { id, exam_name, tests, level } = router.query;
  const parsedTests = tests ? JSON.parse(tests as string) : [];
  const currentExam = parsedTests[currentTestIndex];
  const testId = currentExam?.test_id;
  const name = currentExam?.test_name || "";
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(5 * 60);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);

  useEffect(() => {
    if (exam_name && level) {
      console.log("Exam Name:", exam_name);
      console.log("Exam Name:", level);
    }
  }, [exam_name, level]);
  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      if (id && parsedTests[currentTestIndex]?.test_id && !loading) {
        setLoading(true);

        try {
          const response = await fetch(
            `https://kosei-web.eupsolution.net/api/trial-tests/${id}/questions?test_id=${parsedTests[currentTestIndex].test_id}`
          );
          const data = await response.json();
          if (Array.isArray(data)) {
            const filteredQuestions = data.filter(
              // (q) => q.test_id === parsedTests[currentTestIndex]?.test_id
              (q) => q.test_id === testId
            );
            setQuestion(filteredQuestions);
          } else {
            setError("Data empty");
          }
        } catch (err) {
          setError("Failed");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuestion();
  }, [id, currentTestIndex]);

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
  useEffect(() => {
    if (countdownActive && countdownTime > 0) {
      const timer = setInterval(() => {
        setCountdownTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer as unknown as number);
    } else if (countdownTime === 0) {
      setCountdownActive(false);
      setCountdownTime(5 * 60);
      setIsResting(true);
    }
  }, [countdownActive, countdownTime]);

  let questionIndex = 1;

  const handleSkipRest = () => {
    if (currentTestIndex < parsedTests.length - 1) {
      setCurrentTestIndex(currentTestIndex + 1);
      setAnswers({});
      setDisable(false);
      setIsButtonDisabled(true);
      setIsPaused(false);
      setCountdownActive(false);
      setRestTime(5 * 60);
      setIsResting(false);
    } else {
      console.log("Đã hoàn thành tất cả các bài thi");
    }
  };
  const handleSubmit = () => {
    const currentTest = parsedTests[currentTestIndex];
    if (!question || !currentTest) return;

    let totalScore = 0;
    const tempAnswerResults: { [key: number]: boolean } = {};
    const tempCorrectAnswers: { [key: number]: string } = {};
    let answeredCount = 0;
    let correctCount = 0;

    question
      .flatMap((exam) => exam.questions)
      .forEach((q) => {
        const userAnswer = answers[q.id];
        if (userAnswer !== undefined) {
          answeredCount++;
          const correctAnswerMap = {
            "1": q.answer_a,
            "2": q.answer_b,
            "3": q.answer_c,
            "4": q.answer_d,
          };
          const correctAnswer =
            correctAnswerMap[q.correct_answer as keyof typeof correctAnswerMap];
          tempCorrectAnswers[q.id] = correctAnswer;

          if (userAnswer === correctAnswer) {
            correctCount++;
            totalScore += q.point;
            tempAnswerResults[q.id] = true;
          } else {
            tempAnswerResults[q.id] = false;
          }
        }
      });

    const passScore = currentTest.pass_score || 0;
    const resultMessage = `Số điểm đạt được: ${totalScore} / ${passScore} (Đúng: ${correctCount} / ${answeredCount})`;
    setResult(resultMessage);
    setAnswerResults(tempAnswerResults);
    setCorrectAnswers(tempCorrectAnswers);
    setDisable(true);
    setIsButtonDisabled(true);
    setIsPaused(true);
    setCountdownActive(true);
    const storedResults = JSON.parse(
      localStorage.getItem("examResults") || "[]"
    );
    const newResult = {
      testName: name,
      score: totalScore,
      passScore,
      correctAnswers: correctCount,
      answeredQuestions: answeredCount,
    };

    storedResults.push(newResult);
    localStorage.setItem("examResults", JSON.stringify(storedResults));

    if (currentTestIndex < parsedTests.length - 1) {
      setIsResting(true);
    } else {
      setIsResting(false);
      console.log("Đã hoàn thành tất cả các bài thi");
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
              {exam.name}:({exam.point}) {convert(convert(exam.question))}
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
                point={q.point}
                img={q?.image}
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
            <div className="flex items-center gap-2">
              <Text type="body-16-bold">{exam_name}</Text>
              <Text
                type="body-14-bold"
                className="bg-[#0F5FAF] text-white px-2 py-[2px] rounded-xl"
              >
                {level}
              </Text>
            </div>

            <Text
              type="body-16-regular"
              className="border-2 w-fit px-3 py-1 border-[#0F5FAF] rounded-md"
            >
              {name}
            </Text>
          </div>
        </div>
        <CountDown
          isPaused={isPaused}
          timeR={60 * 60}
          name="Thời gian còn lại"
        />
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
                  // onClick={() => scrollQuestion(index)}
                >
                  {index + 1}
                </div>
              ))}
          </div>
          {isResting && currentTestIndex < parsedTests.length - 1 && (
            <>
              {countdownActive && (
                <div className="mt-6">
                  <CountDown
                    timeR={countdownTime}
                    isPaused={false}
                    name="Thời gian nghỉ giải lao"
                  />
                  <Button
                    className="w-full bg-red-500 text-white mt-4"
                    onClick={handleSkipRest}
                  >
                    Bỏ qua giờ nghỉ
                  </Button>
                </div>
              )}
            </>
          )}
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
