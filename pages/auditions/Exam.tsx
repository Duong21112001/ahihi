import React from "react";
import Text from "@/components/Text";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CourseContent } from "@/utils/model/courses";
import { useRequest } from "@umijs/hooks";
import { getCourseQuestions } from "@/service/course";
import { LIST_EXAM } from "./data";

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

const Exam = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  // const courseId = 1;
  // const { data = [] }: { data: CourseContent[] } = useRequest(async () => {
  //   const result = await getCourseQuestions(courseId);
  //   console.log("data=====", data);

  //   return result;
  // });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {React.Children.toArray(
          LIST_EXAM.map((item) => (
            <FormField
              name={""}
              render={({ field }) => (
                <FormItem>
                  <div className="bg-black px-5 py-[16px] rounded-md">
                    <Text type="body-14-medium" color="neutral-10">
                      {item.title}
                    </Text>
                  </div>
                  <FormControl className="">
                    {/* <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {item.content.map((contentItem, contentIndex) => (
                        <FormItem key={contentIndex}>
                          <FormControl>
                            <div>
                              <Text>{contentItem.label}</Text>
                              <div>
                                <div className="flex items-center">
                                  <RadioGroupItem value="a" />
                                  <Text>{contentItem.answerA}</Text>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroupItem value="b" />
                                  <Text>{contentItem.answerB}</Text>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroupItem value="c" />
                                  <Text>{contentItem.answerC}</Text>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroupItem value="d" />
                                  <Text>{contentItem.answerD}</Text>
                                </div>
                              </div>
                            </div>
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup> */}
                  </FormControl>
                </FormItem>
              )}
            />
          ))
        )}
      </form>
    </Form>
  );
};

export default Exam;
