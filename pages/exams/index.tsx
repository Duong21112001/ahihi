import React, { useState, useEffect, useRef } from "react";
import Question from "./Exam";
import Text from "@/components/Text";
import CountDown from "./CountDown";
import img from "../../public/Images/cotton-sheep.png";
import Image from "next/image";
import {
  Questions,
  SubSubQuestions,
  Test,
  TrialTests,
} from "@/utils/model/courses";
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
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRecoilState } from "recoil";
import { userProfile } from "@/context/User";

const ExamPage = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [namesAndLevels, setNamesAndLevels] = useState<
    { name: string; level: string; id: number }[]
  >([]);
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
  const { id, exam } = router.query;
  const parsedExam = exam ? JSON.parse(exam as string) : [];
  console.log("parsedExam=========", parsedExam);

  const parsedTests = id ? JSON.parse(id as string) : [];
  console.log("parsedTests=========", parsedTests);

  // const currentExam = parsedTests[currentTestIndex];
  // console.log("currentExam===========", currentExam);

  // const testId = currentExam?.test_id;
  const testId = id;
  // console.log("testId=====", testId);
  // const name = currentExam?.test_name || "";
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(5 * 60);
  const [countdownActive, setCountdownActive] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);
  const token = getCookie("kosei-token");
  const [user, setUser] = useRecoilState(userProfile);
  const [trialTestId, setTrialTestId] = useState(null);
  const [type, setType] = useState("");
  const [trialTest, setTrialTest] = useState<TrialTests[]>([]);
  const [timeEnd, setTimeEnd] = useState<string | null>(null);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  useEffect(() => {
    const fetchTrial = async () => {
      try {
        const response = await fetch(
          "https://kosei-web.eupsolution.net/api/trial-tests"
        );
        const data = await response.json();
        console.log("trail=====", data);

        if (Array.isArray(data) && data.length > 0) {
          const firstObject = data[0];

          if (firstObject && Array.isArray(firstObject.test)) {
            const testData = firstObject.test;

            // Lấy ra name và level của mỗi object trong mảng test
            const nameAndLevel = testData.map((item: Test) => ({
              id: item.id,
              name: item.name,
              level: item.level_id,
            }));
            setNamesAndLevels(nameAndLevel);

            console.log("nameAndLevel=====", nameAndLevel);
          } else {
            console.log("test field is not an array or is missing");
          }
        } else {
          console.log("Data is not an array or is empty");
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed");
      }
    };

    fetchTrial();
  }, []);
  useEffect(() => {
    console.log("testId:", testId);
    console.log("namesAndLevels:", namesAndLevels);
  }, [testId, namesAndLevels]);

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!testId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://kosei-web.eupsolution.net/api/trial-tests/${testId}/questions`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("dataExam===", data);

        if (Array.isArray(data)) {
          const trialTestId = data[0].trial_test_id;
          const cType = data[0].ctype;
          setTrialTestId(trialTestId);
          setType(cType);

          // console.log("trialTestId===========", trialTestId);
          // const filteredQuestions = data.filter((q) => q.test_id === testId);
          // console.log("filteredQuestions========", filteredQuestions);

          setQuestion(data);
        } else {
          setError("No questions found");
        }
      } catch (err) {
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [testId]);

  useEffect(() => {
    if (question) {
      const totalQuestions = question.flatMap((exam) => exam.questions).length;
      console.log("totalQuestions", totalQuestions);

      const answeredQuestions = Object.keys(answers).length;
      const answeredPercentage = (answeredQuestions / totalQuestions) * 100;
      if (answeredPercentage >= 10) {
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

  const handleSubmit = async () => {
    // const currentTest = testId;
    if (!question || !testId) return;

    let totalScore = 0;
    const tempAnswerResults: { [key: number]: boolean } = {};
    const tempCorrectAnswers: { [key: number]: string } = {};
    let answeredCount = 0;
    let correctCount = 0;
    let vocab_score = 0;
    let reading_score = 0;
    let listening_score = 0;
    let totalPassScore = 0;
    const questionsArray: {
      question_id: number;
      answer: number;
      is_correct: boolean;
      score: number;
      type: string;
    }[] = [];

    question.forEach((exam) => {
      totalPassScore = exam.point || 0;

      exam.questions.forEach((q) => {
        if (q.questions && q.questions.length > 0) {
          q.questions.forEach((subQ) => {
            const userAnswer = answers[subQ.id];
            console.log("userAnswer===========", userAnswer);

            if (userAnswer !== undefined) {
              answeredCount++;
              let selectedAnswerId: string | undefined;
              if (userAnswer === subQ.answer_a) {
                selectedAnswerId = "1";
              } else if (userAnswer === subQ.answer_b) {
                selectedAnswerId = "2";
              } else if (userAnswer === subQ.answer_c) {
                selectedAnswerId = "3";
              } else if (userAnswer === subQ.answer_d) {
                selectedAnswerId = "4";
              }
              const correctAnswerMap = {
                "1": subQ.answer_a,
                "2": subQ.answer_b,
                "3": subQ.answer_c,
                "4": subQ.answer_d,
                A: subQ.answer_a,
                B: subQ.answer_b,
                C: subQ.answer_c,
                D: subQ.answer_d,
              };
              const correctAnswer =
                correctAnswerMap[
                  subQ.correct_answer as keyof typeof correctAnswerMap
                ];
              tempCorrectAnswers[subQ.id] = correctAnswer;

              const isCorrect = userAnswer === correctAnswer;
              if (isCorrect) {
                correctCount++;
                totalScore += subQ.point;
                tempAnswerResults[subQ.id] = true;
              } else {
                tempAnswerResults[subQ.id] = false;
              }
              let convertedAnswer: number = parseFloat(selectedAnswerId!);
              questionsArray.push({
                question_id: subQ.id,
                answer: convertedAnswer,
                is_correct: isCorrect,
                score: q.point,
                type: q.ctype,
              });
            }
          });
        } else {
          const userAnswer = answers[q.id];
          if (userAnswer !== undefined) {
            answeredCount++;
            let selectedAnswerId: string | undefined;
            if (userAnswer === q.answer_a) {
              selectedAnswerId = "1";
            } else if (userAnswer === q.answer_b) {
              selectedAnswerId = "2";
            } else if (userAnswer === q.answer_c) {
              selectedAnswerId = "3";
            } else if (userAnswer === q.answer_d) {
              selectedAnswerId = "4";
            }
            const correctAnswerMap = {
              "1": q.answer_a,
              "2": q.answer_b,
              "3": q.answer_c,
              "4": q.answer_d,
              A: q.answer_a,
              B: q.answer_b,
              C: q.answer_c,
              D: q.answer_d,
            };
            const correctAnswer =
              correctAnswerMap[
                q.correct_answer as keyof typeof correctAnswerMap
              ];
            tempCorrectAnswers[q.id] = correctAnswer;

            const isCorrect = userAnswer === correctAnswer;
            console.log("userAnswerSubQ===========", userAnswer);

            if (isCorrect) {
              correctCount++;
              totalScore += q.point;
              if (q.ctype === "js-vocab") vocab_score += q.point;
              if (q.ctype === "js-grammar") reading_score += q.point;
              if (q.ctype === "js-listening") listening_score += q.point;
              tempAnswerResults[q.id] = true;
            } else {
              tempAnswerResults[q.id] = false;
            }
            let convertedAnswer: number = parseFloat(selectedAnswerId!);

            questionsArray.push({
              question_id: q.id,
              answer: convertedAnswer,
              is_correct: isCorrect,
              score: q.point,
              type: q.ctype,
            });
            console.log("questionArrayy", questionsArray);
          }
        }
      });
    });

    const body = {
      user_id: user?.user_id,
      trial_test_id: trialTestId,
      test_id: testId,
      questions: questionsArray,
    };
    console.log("body", body);

    try {
      const response = await axios.post(
        "https://kosei-web.eupsolution.net/api/user-tests",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API response:", response.data);
    } catch (error) {
      console.error("Error calling API:", error);
    }

    const passScore = totalPassScore;
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
  let globalIndex = 1;

  const renderListQuestion = (q: any, depth = 0) => {
    const isAnswered = Boolean(answers[q.id]);
    const answerClass = isAnswered ? "bg-[#0F5FAF] text-white" : "bg-white";
    const depthClass = depth == 0 ? `ml-${depth * 4}` : ""; // Optional, for indentation

    if (q.questions?.length > 0) {
      return (
        <>
          {q.questions.map((subQ: any) => renderListQuestion(subQ, depth + 1))}
        </>
      );
    }
    const currentIndex = globalIndex++;
    return (
      <div
        key={q.id}
        className={`p-2 border w-8 h-8 flex items-center justify-center rounded ${answerClass} ${depthClass}`}
      >
        <a href={`#${q.id}`}>{currentIndex}</a>
      </div>
    );
  };
  const validTimeEnd = parsedExam.length > 0 ? parsedExam[0].time * 60 : 0;
  const examName = parsedExam.length > 0 ? parsedExam[0].name : "Exam";
  const matchingItem = namesAndLevels.find((item) => item.id === parsedTests);
  console.log("matchingItem", matchingItem);

  return (
    <div className="flex max-lg:flex-col-reverse">
      <div className="flex-1 flex flex-col gap-6 w-[72%] px-10 py-5 max-lg:w-full">
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
            {exam.questions?.map((q, index) => {
              // console.log("exam.questions:", exam.questions);
              // console.log("Sub questions (if any):", q.questions);
              if (q.questions && q.questions.length > 0) {
                return (
                  <div key={q.id}>
                    <Text type="body-16-bold">
                      {convert(convert(q.question))}
                    </Text>
                    <div className="mt-5">
                      {q.questions.map((subQ, subIndex) => (
                        <Question
                          key={subQ.id}
                          questionId={subQ.id}
                          question={subQ.question}
                          options={[
                            subQ.answer_a,
                            subQ.answer_b,
                            subQ.answer_c,
                            subQ.answer_d,
                          ]}
                          onAnswer={handleAnswer}
                          name={`${questionIndex++}`}
                          showDetail={showDetail}
                          disable={disable}
                          answerResults={answerResults}
                          correctAnswer={correctAnswers[subQ.id]}
                          point={subQ.point}
                          img={subQ?.image}
                          attachment={subQ?.attachment}
                        />
                      ))}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={q.id}>
                    <Text type="body-16-bold">
                      {convert(convert(q.question))} ({q.point})
                    </Text>
                    <Question
                      questionId={q.id}
                      question={""}
                      options={[q.answer_a, q.answer_b, q.answer_c, q.answer_d]}
                      onAnswer={handleAnswer}
                      name={`${questionIndex++}`}
                      showDetail={showDetail}
                      disable={disable}
                      answerResults={answerResults}
                      correctAnswer={correctAnswers[q.id]}
                      // point={q.point}
                      img={q?.image}
                      attachment={q?.attachment}
                    />
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
      <div className="w-1/4 border-l bg-[#f5f5f5] max-lg:w-full">
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
              <Text type="body-16-bold">{matchingItem?.name}</Text>
              <Text
                type="body-14-bold"
                className="bg-[#0F5FAF] text-white px-2 py-[2px] rounded-xl"
              >
                N{matchingItem?.level}
              </Text>
            </div>

            <Text
              type="body-16-regular"
              className="border-2 w-fit px-3 py-1 border-[#0F5FAF] rounded-md"
            >
              {examName}
            </Text>
          </div>
        </div>
        <CountDown
          isPaused={isPaused}
          timeR={validTimeEnd}
          name="Thời gian còn lại"
        />
        <div className="p-4 ">
          <div className="mt-5 my-2.5 text-center">
            <Text type="body-16-semibold">Câu hỏi đã làm</Text>
          </div>
          <div className="grid grid-cols-8 gap-2 pr-10 cursor-pointer max-lg:grid-cols-5 w-fit mx-auto">
            {question
              ?.flatMap((exam) => exam.questions)
              .map((q) => renderListQuestion(q))}
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
