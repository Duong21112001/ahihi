import Text from "@/components/Text";
import { cn } from "@/utils";
import Image from "next/image";
import React from "react";
import img from "../../public/Images/test-failed 1.png";
import CountDown from "./CountDown";
import { LIST_EXAM } from "./data";

const MenuListExam = ({
  className,
  answeredQuestions,
}: {
  className?: string;
  answeredQuestions: Set<string>;
}) => {
  const totalQuestions = LIST_EXAM.reduce(
    (acc, exam) => acc + exam.questions.length,
    0
  );

  return (
    <div className={(cn(""), className)}>
      <div className="flex p-5 gap-4 border-b">
        <Image src={img} alt="" width={45} height={45} />
        <div className="flex flex-col gap-2">
          <Text type="body-16-bold">
            JLPT - N1 - Thi thử JLPT N1 mùa 7 - đợt 1
          </Text>
          <Text>文字語彙ー文法ー読解</Text>
        </div>
      </div>
      <div className="text-center p-2.5 mb-5">
        <Text className="mt-2.5 mb-2.5">Thời gian còn lại</Text>
        <CountDown isPaused={false} />
      </div>
      <div className="p-[15px]">
        <Text type="body-16-bold">Câu hỏi đã làm</Text>
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: totalQuestions }).map((_, index) => {
            const questionNumber = index + 1;
            const isAnswered = answeredQuestions.has(questionNumber.toString());
            return (
              <div
                key={index}
                className={`w-8 h-8 flex items-center justify-center border rounded`}
              >
                {questionNumber}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuListExam;
// import { cn } from "@/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { LIST_EXAM } from "./data";
// import Text from "@/components/Text";
// import { useState, useEffect } from "react";

// const FormSchema = z.object({
//   type: z.enum(["a", "b", "c", "d"], {
//     required_error: "You need to select a notification type.",
//   }),
// });

// const Exam = ({
//   className,
//   onAnswer,
// }: {
//   className?: string;
//   onAnswer: (questionId: string) => void;
// }) => {
//   const [selectedAnswers, setSelectedAnswers] = useState<
//     Record<string, string>
//   >({});

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   });

//   // useEffect(() => {
//   //   const savedAnswers = localStorage.getItem("answeredQuestions");
//   //   if (savedAnswers) {
//   //     setSelectedAnswers(JSON.parse(savedAnswers));
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   localStorage.setItem("answeredQuestions", JSON.stringify(selectedAnswers));
//   // }, [selectedAnswers]);

//   const handleAnswerChange = (questionId: string, answer: string) => {
//     setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
//     onAnswer(questionId);
//   };

//   return (
//     <Form {...form}>
//       <form className={(cn(""), className)}>
//         {LIST_EXAM.map((exam) => (
//           <FormField
//             key={exam.id}
//             control={form.control}
//             name="type"
//             render={({ field }) => (
//               <FormItem className="flex flex-col gap-4 mt-4">
//                 <Text type="heading-h4">{exam.type}</Text>
//                 {exam.questions.map((question) => (
//                   <FormControl key={question.id}>
//                     <div className="flex flex-col gap-4">
//                       <Text>{question.questions}</Text>
//                       <RadioGroup
//                         onValueChange={(value: "a" | "b" | "c" | "d") => {
//                           field.onChange(value);
//                           handleAnswerChange(question.id, value);
//                         }}
//                         defaultValue={field.value}
//                         className="flex items-center space-x-2"
//                       >
//                         <div className="grid grid-cols-2 gap-4 w-full">
//                           {["a", "b", "c", "d"].map((option) => (
//                             <FormItem
//                               key={option}
//                               className={`outline outline-1 outline-[#c9d2d8] rounded-[40px] flex items-center w-[70%] ${
//                                 selectedAnswers[question.id] === option
//                                   ? "outline-[#0F5FAF] bg-[#E7EFF7]"
//                                   : ""
//                               }`}
//                             >
//                               <FormControl>
//                                 <div
//                                   className={`bg-[#f5f5f5] p-2.5 rounded-tl-[20px] rounded-bl-[20px] mr-2.5 ${
//                                     selectedAnswers[question.id] === option
//                                       ? "!bg-[#B7CFE7]"
//                                       : ""
//                                   }`}
//                                 >
//                                   <RadioGroupItem
//                                     value={option}
//                                     className={`border-2 border-[#c9d2d8] ${
//                                       selectedAnswers[question.id] === option
//                                         ? "bg-[#0F5FAF] text-white border-6"
//                                         : ""
//                                     }`}
//                                   />
//                                 </div>
//                               </FormControl>
//                               <FormLabel className="!mt-0">
//                                 {question[option as keyof typeof question]}
//                               </FormLabel>
//                             </FormItem>
//                           ))}
//                         </div>
//                       </RadioGroup>
//                     </div>
//                   </FormControl>
//                 ))}
//               </FormItem>
//             )}
//           />
//         ))}
//         <Button type="submit">Nộp bài</Button>
//       </form>
//     </Form>
//   );
// };

// export default Exam;
