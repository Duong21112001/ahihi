"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/utils";
import Text from "@/components/Text";

const FormSchema = z.object({
  answer: z.string(),
});
const { convert } = require("html-to-text");

interface QuestionProps {
  question: string;
  attachment: string;
  options: string[];
  questionId: number;
  onAnswer: (questionId: number, selectedOption: string) => void;
  name?: string;
  showDetail: boolean;
  disable: boolean;
  answerResults?: { [key: number]: boolean };
  correctAnswer?: string;
  point?: number;
  img: string;
}

const Question: React.FC<QuestionProps> = ({
  attachment,
  question,
  options,
  questionId,
  onAnswer,
  name,
  showDetail,
  disable,
  answerResults,
  correctAnswer,
  point,
  img,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      answer: "",
    },
  });

  const { watch } = form;
  const selectedAnswer = watch("answer");
  useEffect(() => {
    if (selectedAnswer) {
      onAnswer(questionId, selectedAnswer);
    }
  }, [selectedAnswer, questionId, onAnswer]);
  const { convert } = require("html-to-text");

  const getFormItemClass = (option: string) => {
    if (disable && answerResults) {
      if (answerResults[questionId] === false && selectedAnswer === option) {
        return "outline-[#FF0000] bg-[#FFE5E5]";
      }
      if (correctAnswer === option) {
        return "outline-[#0a8328] bg-[#E7EFF7]";
      }
    }
    return selectedAnswer === option ? "outline-[#0F5FAF] bg-[#E7EFF7]" : "";
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("hihi");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="space-y-3 ">
              <FormLabel className="flex items-center gap-1 mt-5">
                <Text
                  type="body-16-medium"
                  className="bg-[#d5e5f7] rounded-md px-2 py-[2px] "
                >
                  {name}.
                </Text>
                <Text type="body-16-medium">
                  {convert(convert(question))} ({point} 点)
                </Text>
                <img src={img} alt="" />
              </FormLabel>
              <div className="my-4">
                {/* <Text className="text-lg font-semibold">Audio Player</Text> */}
                {attachment ? (
                  <audio controls className="mt-2 w-full">
                    <source src={attachment} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  ""
                )}
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-x-20 gap-y-5 max-lg:grid-cols-1 "
                  disabled={disable}
                >
                  {options?.map((option, index) => (
                    <label
                      key={index}
                      htmlFor={`option-${questionId}-${index}`}
                      className="cursor-pointer w-full"
                    >
                      <FormItem
                        className={cn(
                          "outline outline-1 outline-[#c9d2d8] rounded-full flex  w-full cursor-pointer",
                          getFormItemClass(option)
                        )}
                      >
                        <FormControl>
                          <div
                            className={cn(
                              "bg-[#f5f5f5] p-4 rounded-tl-full rounded-bl-full min-h-full flex !items-center justify-center",
                              selectedAnswer === option ? "!bg-[#B7CFE7]" : ""
                            )}
                          >
                            <RadioGroupItem
                              disabled={disable}
                              value={option}
                              className={cn(
                                "w-5 h-5 border-[#c9d2d8]",
                                selectedAnswer === option
                                  ? "bg-[#0F5FAF] text-white border-6"
                                  : ""
                              )}
                              id={`option-${questionId}-${index}`}
                            />
                          </div>
                        </FormControl>
                        <FormLabel
                          className="!mt-0 py-2 px-3 flex items-center cursor-pointer"
                          htmlFor={`option-${questionId}-${index}`}
                        >
                          <Text type="body-16-medium">
                            {index + 1}. {convert(convert(option))}
                          </Text>
                        </FormLabel>
                      </FormItem>
                    </label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
              {showDetail && (
                <Text type="body-16-medium" color="main-color-primary">
                  {convert(convert(correctAnswer))}
                </Text>
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default Question;
