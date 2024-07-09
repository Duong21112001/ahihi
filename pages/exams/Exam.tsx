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

interface QuestionProps {
  question: string;
  options: string[];
  questionId: number;
  onAnswer: (questionId: number, selectedOption: string) => void;
  name: string;
  showDetail: boolean;
  disable: boolean;
}

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  questionId,
  onAnswer,
  name,
  showDetail,
  disable,
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

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="space-y-3 ">
              <FormLabel>
                <Text type="body-16-medium">
                  {name}.{convert(convert(question))}
                </Text>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-x-20 gap-y-5"
                  disabled={disable}
                >
                  {options?.map((option, index) => (
                    <FormItem
                      key={index}
                      className={cn(
                        "outline outline-1 outline-[#c9d2d8] rounded-[40px] flex items-center w-full",
                        selectedAnswer === option
                          ? "outline-[#0F5FAF] bg-[#E7EFF7]"
                          : ""
                      )}
                    >
                      <FormControl>
                        <div
                          className={cn(
                            "bg-[#f5f5f5] p-4 rounded-tl-[40px] rounded-bl-[40px] mr-2.5",
                            selectedAnswer === option ? "!bg-[#B7CFE7]" : ""
                          )}
                        >
                          <RadioGroupItem
                            disabled={disable}
                            value={option}
                            className={cn(
                              "w-5 h-5 border-[#c9d2d8]",
                              selectedAnswer === option
                                ? "bg-[#0F5FAF] text-white border-6 w"
                                : ""
                            )}
                          />
                        </div>
                      </FormControl>
                      <FormLabel className="!mt-0 px-2">
                        <Text type="body-16-medium">
                          {index + 1}. {convert(convert(option))}
                        </Text>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
              <Text type="body-16-medium" color="main-color-primary ">
                {showDetail && "Xem chi tiết đáp án hihi"}
              </Text>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default Question;
