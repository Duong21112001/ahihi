import React, {useState, useEffect, useRef} from "react";
import Question from "./Exam";
import Text from "@/components/Text";
import CountDown from "./CountDown";
import img from "../../public/Images/cotton-sheep.png";
import Image from "next/image";
import {Questions} from "@/utils/model/courses";
import {useRequest} from "@umijs/hooks";
import {getCourseQuestions} from "@/service/course";
import {Button} from "@/components/ui/button";
import Success from "../../public/Images/IMG1.png";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import {DialogDescription} from "@radix-ui/react-dialog";
import Layout from "@/components/Layout";
import {NextPageContext} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import arrow from "../../public/Images/right.png";
import Link from "next/link";
import {convert} from "html-to-text";

const ExamPage = () => {
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

    const [questions, setQuestions] = useState<Questions[]>([]);
    const [error, setError] = useState<string | null>(null);

    const questionRefs = useRef<Array<HTMLDivElement | null>>([]);
    const {convert} = require("html-to-text");
    const router = useRouter();
    const {id, exam_name, tests, level} = router.query;
    const parsedTests = tests ? JSON.parse(tests as string) : [];
    const currentExam = parsedTests[currentTestIndex];
    const testId = currentExam?.test_id;
    const name = currentExam?.test_name || "";
    const [isResting, setIsResting] = useState(false);
    const [restTime, setRestTime] = useState(5 * 60);
    const [countdownActive, setCountdownActive] = useState(false);
    const [countdownTime, setCountdownTime] = useState(0);

    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const answersRef = useRef<{ [key: number]: string }>({});

    const handleAnswer = (questionId: number, answer: string) => {
        // setAnswers((prevAnswers) => ({
        //     ...prevAnswers,
        //     [questionId]: answer,
        // }));
        if (answersRef.current[questionId] !== answer) {
            answersRef.current = {
                ...answersRef.current,
                [questionId]: answer,
            };
            setAnswers({ ...answersRef.current });
        }
    };

    useEffect(() => {
        const fetchQuestion = async () => {
            if (!id || !parsedTests[currentTestIndex]?.test_id || loading) return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://kosei-web.eupsolution.net/api/trial-tests/${testId}/questions?test_id=${parsedTests[currentTestIndex].test_id}`
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                if (Array.isArray(data)) {
                    const filteredQuestions = data.filter(q => q.test_id === testId);
                    setQuestions(filteredQuestions);
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
    }, [id, currentTestIndex]);

    useEffect(() => {
        if (questions) {
            const totalQuestions = questions.flatMap((exam) => exam.question).length;
            const answeredQuestions = Object.keys(answers).length;
            const answeredPercentage = (answeredQuestions / totalQuestions) * 100;
            if (answeredPercentage >= 70) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        }
    }, [answers, questions]);
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

    // const handleSubmit = () => {
    //   const currentTest = parsedTests[currentTestIndex];

    //   if (question && currentTest) {
    //     let correctCount = 0;
    //     let answeredCount = 0;
    //     let totalScore = 0;
    //     let tempAnswerResults: { [key: number]: boolean } = {};
    //     let tempCorrectAnswers: { [key: number]: string } = {};

    //     question
    //       .flatMap((exam) => exam.questions)
    //       .forEach((q) => {
    //         if (answers[q?.id] !== undefined) {
    //           answeredCount++;
    //           const correctAnswerMap = {
    //             "1": q.answer_a,
    //             "2": q.answer_b,
    //             "3": q.answer_c,
    //             "4": q.answer_d,
    //           };
    //           const correctAnswer =
    //             correctAnswerMap[
    //               q.correct_answer as keyof typeof correctAnswerMap
    //             ];
    //           tempCorrectAnswers[q.id] = correctAnswer;
    //           if (answers[q.id] === correctAnswer) {
    //             correctCount++;
    //             totalScore += q.point;
    //             tempAnswerResults[q.id] = true;
    //           } else {
    //             tempAnswerResults[q.id] = false;
    //           }
    //         }
    //       });
    //     const passScore = currentTest.pass_score || 0;

    //     setResult(
    //       `Số điểm đạt được: ${totalScore} / ${passScore} (Đúng: ${correctCount} / ${answeredCount})`
    //     );
    //     setAnswerResults(tempAnswerResults);
    //     setCorrectAnswers(tempCorrectAnswers);
    //     setDisable(true);
    //     setIsButtonDisabled(true);
    //     setIsPaused(true);
    //     setCountdownActive(true);
    //     if (currentTestIndex < parsedTests.length - 1) {
    //       setIsResting(true);
    //     } else {
    //       setIsResting(false);
    //       console.log("Đã hoàn thành tất cả các bài thi");
    //     }
    //   }
    // };
    // const scrollQuestion = (index: number) => {
    //   if (questionRefs.current[index]) {
    //     questionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    //   }
    // };
    // useEffect(() => {
    //   if (isResting) {
    //     if (restTime === 0) {
    //       if (currentTestIndex < parsedTests.length - 1) {
    //         setCurrentTestIndex(currentTestIndex + 1);
    //         setAnswers({});
    //         setDisable(false);
    //         setIsButtonDisabled(true);
    //         setIsPaused(false);
    //         setRestTime(5 * 60);
    //         setIsResting(false);
    //         setCountdownActive(false);
    //       } else {
    //         console.log("Đã hoàn thành tất cả các bài thi");
    //       }
    //     } else {
    //       const restTimer = setInterval(() => {
    //         setRestTime((prev) => prev - 1);
    //       }, 1000);

    //       return () => clearInterval(restTimer as unknown as number);
    //     }
    //   }
    // }, [isResting, restTime, currentTestIndex, parsedTests.length]);

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
        }
        // else {
        //   console.log("Đã hoàn thành tất cả các bài thi");
        // }
    };
    const handleSubmit = () => {
        const currentTest = parsedTests[currentTestIndex];
        if (!questions || !currentTest) return;

        let totalScore = 0;
        const tempAnswerResults: { [key: number]: boolean } = {};
        const tempCorrectAnswers: { [key: number]: string } = {};
        let answeredCount = 0;
        let correctCount = 0;

        questions
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

        setIsResting(currentTestIndex < parsedTests.length - 1);
    };

    let globalIndex = 1;

    const renderListQuestion = (q, depth = 0) => {
        const isAnswered = Boolean(answers[q.id]);
        const answerClass = isAnswered ? "bg-[#0F5FAF] text-white" : "bg-white";
        const depthClass = depth == 0 ? `ml-${depth * 4}` : ""; // Optional, for indentation

        if (q.questions?.length > 0) {
            return (<>
                    {q.questions.map((subQ) =>
                        renderListQuestion(subQ, depth + 1)
                    )}
                </>
            );
        }
        const currentIndex = globalIndex++;

        return (
            <div key={q.id}
                className={`p-2 border w-8 h-8 flex items-center justify-center rounded ${answerClass} ${depthClass}`}>
                <a href={`#${q.id}`}>{currentIndex}</a>
            </div>
        );
    };

    return (
        <div className="flex">
            <div className="flex-1 flex flex-col gap-6 w-[72%] px-10 py-5">
                <Link href="/exam">
                    <Image src={arrow} alt="" width={38} height={38}/>
                </Link>
                {questions?.map((question, examIndex) => {
                    return <div
                        key={question.id}
                        className="flex flex-col gap-5 pr-20"
                        ref={(el) => (questionRefs.current[examIndex] = el)}
                    >
                        <Text type="body-16-bold">
                            {question.name}:({question.point}) {convert(convert(question.question))}
                        </Text>
                        {!question.questions
                            ?
                            <Question
                                key={question.id}
                                questionId={question.id}
                                question={question.question}
                                options={[question.answer_a, question.answer_b, question.answer_c, question.answer_d]}
                                onAnswer={handleAnswer}
                                name={`${questionIndex++}`}
                                showDetail={showDetail}
                                disable={disable}
                                answerResults={answerResults}
                                correctAnswer={correctAnswers[question.id]}
                                point={question.point}
                                img={question?.image}
                            />
                            :
                            question.questions?.map((subQuestion) => {
                                if (!subQuestion.questions) {
                                    return <div>
                                        <Question
                                            key={subQuestion.id}
                                            questionId={subQuestion.id}
                                            question={subQuestion.question}
                                            options={[subQuestion.answer_a, subQuestion.answer_b, subQuestion.answer_c, subQuestion.answer_d]}
                                            onAnswer={handleAnswer}
                                            name={`${questionIndex++}`}
                                            showDetail={showDetail}
                                            disable={disable}
                                            answerResults={answerResults}
                                            correctAnswer={correctAnswers[question.id]}
                                            point={subQuestion.point}
                                            img={subQuestion?.image}
                                        />
                                    </div>

                                }
                                else {
                                    return <div
                                        key={subQuestion.id}
                                        className="flex flex-col gap-5 pr-20"
                                        ref={(el) => (questionRefs.current[examIndex] = el)}>
                                        {subQuestion.questions.length == 0
                                            ?
                                            <Question
                                                key={subQuestion.id}
                                                questionId={subQuestion.id}
                                                question={subQuestion.question}
                                                options={[subQuestion.answer_a, subQuestion.answer_b, subQuestion.answer_c, subQuestion.answer_d]}
                                                onAnswer={handleAnswer}
                                                name={`${questionIndex++}`}
                                                showDetail={showDetail}
                                                disable={disable}
                                                answerResults={answerResults}
                                                correctAnswer={correctAnswers[question.id]}
                                                point={subQuestion.point}
                                                img={subQuestion?.image}
                                            />
                                            :

                                            <>
                                                <Text type="body-16-bold">
                                                    {subQuestion.name}:({subQuestion.point}) {convert(convert(subQuestion.question))}
                                                </Text>
                                                {
                                                    subQuestion.questions?.map((subSubQuestion) => {
                                                        return <Question
                                                            key={subSubQuestion.id}
                                                            questionId={subSubQuestion.id}
                                                            question={subSubQuestion.question}
                                                            options={[subSubQuestion.answer_a, subSubQuestion.answer_b, subSubQuestion.answer_c, subSubQuestion.answer_d]}
                                                            onAnswer={handleAnswer}
                                                            name={`${questionIndex++}`}
                                                            showDetail={showDetail}
                                                            disable={disable}
                                                            answerResults={answerResults}
                                                            correctAnswer={correctAnswers[question.id]}
                                                            point={subSubQuestion.point}
                                                            img={subSubQuestion?.image}
                                                        />
                                                    })
                                                }

                                            </>

                                        }
                                    </div>
                                }
                            })
                        }
                    </div>
                })}
            </div>
            <div className="w-1/4 border-l bg-[#f5f5f5]">
                <div className="sticky" style={{position: "sticky"}}>
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
                            {/*list danh sach cau hoi*/}
                            {questions?.flatMap((exam) => exam.questions)
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
                            <Image src={Success} width={180} height={180} alt={""}/>
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
        </div>
    );
};

export default ExamPage;
ExamPage.getLayout = function getLayout(page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};
export const getServerSideProps = async ({locale}: NextPageContext) => ({
    props: {
        ...(await serverSideTranslations(locale || "vi", ["common"])),
    },
});
