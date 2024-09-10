import styles from "./index.module.css";
import Text from "@/components/Text";
import classNames from "classnames";
import { Questions } from "@/utils/model/courses";
import Form, { Field } from "rc-field-form";
import Button from "@/components/Button";
import OneQuestion from "./oneQuestion";
import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Success from "../../../../public/Images/IMG1.png";
import Image from "next/image";
interface StudingProps {
  ListQuestion?: Questions[];
}

const Studing: React.FC<StudingProps> = ({ ListQuestion }) => {
  const [form] = Form.useForm();
  const { convert } = require("html-to-text");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const onFinish = (values: any) => {
    let correct = 0;
    ListQuestion?.forEach((question) => {
      question?.questions?.forEach((itemQuestion) => {
        if (answers[itemQuestion.id] === itemQuestion.correct_answer) {
          correct += 1;
        }
      });
    });
    setCorrectCount(correct);
  };
  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };
  const isSubmitEnabled = Object.keys(answers).length > 0;

  return (
    <div className={classNames(styles.studing)}>
      <Form form={form} onFinish={onFinish}>
        <div className={styles.form}>
          {ListQuestion?.map((question) => {
            return (
              <div
                className={styles.studingItem}
                key={`question-${question?.id}`}
              >
                <div className={styles.title}>
                  <Text type="title-20-bold" color="neutral-10">
                    {convert(convert(question?.question))}
                  </Text>
                </div>
                <div className={styles.content}>
                  {question?.questions?.map((itemQuestions) => {
                    return (
                      <div key={`itemQuestions-${itemQuestions?.id}`}>
                        <OneQuestion
                          form={form}
                          id={itemQuestions?.id}
                          questions={itemQuestions}
                          onAnswerChange={handleAnswerChange}
                          showDetails={showDetails}
                          answered={!!answers[itemQuestions.id]}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {Array.isArray(ListQuestion) && ListQuestion?.length > 0 && (
            <Field shouldUpdate>
              {(_, __, { getFieldsValue, getFieldsError }) => {
                return (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        htmlType="submit"
                        bottom={24}
                        type="btn-blue"
                        disabled={!isSubmitEnabled}
                      >
                        Nộp bài
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center justify-center gap-0">
                      <Text type="title-20-bold" color="main-color-primary">
                        Chúc mừng bạn đã hoàn thành bài tập
                      </Text>
                      <Image src={Success} width={180} height={180} alt={""} />
                      <DialogDescription>
                        Bạn làm đúng {correctCount} /
                        {Object.keys(answers).length} câu hỏi
                      </DialogDescription>
                      <DialogClose>
                        <Button
                          className="mt-5"
                          onClick={() => setShowDetails(true)}
                        >
                          Xem chi tiết
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                );
              }}
            </Field>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Studing;
