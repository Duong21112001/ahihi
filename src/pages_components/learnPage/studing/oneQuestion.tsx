import { useState } from "react";
import styles from "./index.module.css";
import { Field } from "rc-field-form";
import Radio from "@/components/Radio";
import Text from "@/components/Text";
import { Questions } from "@/utils/model/courses";
import { convert } from "html-to-text";

interface StudingProps {
  form: any;
  id: number;
  questions: Questions;
  onAnswerChange: (questionId: number, answer: string) => void;
  showDetails: boolean;
  answered: boolean;
}

const OneQuestion: React.FC<StudingProps> = ({
  form,
  id,
  questions,
  onAnswerChange,
  showDetails,
  answered,
}) => {
  const [question, setQuestion] = useState<string | null>(null);
  const listQuestion = [
    {
      label: convert(convert(questions?.answer_a)),
      value: "A",
    },
    {
      label: convert(convert(questions?.answer_b)),
      value: "B",
    },
    {
      label: convert(convert(questions?.answer_c)),
      value: "C",
    },
    {
      label: convert(convert(questions?.answer_d)),
      value: "D",
    },
  ];
  const renderQuestionContent = (content: string) => {
    // Kiểm tra nếu content là URL ảnh
    const imageFormats = [".jpg", ".jpeg", ".png", ".gif"];
    const isImage = imageFormats.some((format) => content.includes(format));

    // Nếu là ảnh, hiển thị ảnh
    if (isImage) {
      return (
        <img
          src={`https://kosei-web.eupsolution.net${content}`}
          // alt="question visual"
        />
      );
      // src={`https://kosei-web.eupsolution.net${item.thumbnail}`}
    }

    // Nếu là text, hiển thị text
    return (
      <Text type="title-20-bold" color="neutral-3">
        {content}
      </Text>
    );
  };

  return (
    <div className={styles.question}>
      <Field
        name={id}
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        {({}, meta) => {
          const { errors } = meta;
          const onChangeRadio = (value: string) => {
            setQuestion(value);
            form.setFields([
              {
                name: id,
                value: value,
                errors: [],
              },
            ]);
            onAnswerChange(id, value);
          };
          return (
            <div>
              <Text type="title-20-bold" color="neutral-3" bottom={10}>
                {/* {convert(convert(questions?.question))} */}
                {renderQuestionContent(convert(convert(questions?.question)))}
              </Text>
              <div className={styles.questionRadio}>
                {listQuestion?.map((questionRadio) => {
                  return (
                    <div
                      className={styles.item}
                      key={`question-radio-${questionRadio?.label}`}
                    >
                      <Radio
                        id={questionRadio.value}
                        value={questionRadio?.value}
                        gender={question}
                        onChange={onChangeRadio}
                        label={questionRadio?.label}
                      />
                    </div>
                  );
                })}
              </div>
              {showDetails && answered && (
                <Text type="body-16-regular">Câu trả lời là...</Text>
              )}
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default OneQuestion;
