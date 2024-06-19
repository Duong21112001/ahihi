import styles from "./index.module.css";
import Text from "@/components/Text";
import classNames from "classnames";
import { Questions } from "@/utils/model/courses";
import Form, { Field } from "rc-field-form";
import Button from "@/components/Button";
import OneQuestion from "./oneQuestion";

interface StudingProps {
  ListQuestion?: Questions[];
}

const Studing: React.FC<StudingProps> = ({ ListQuestion }) => {
  const [form] = Form.useForm();
  const { convert } = require("html-to-text");

  const onFinish = (values: any) => {};
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
                  <>
                    <Button htmlType="submit" bottom={24} type="btn-blue">
                      Nộp bài
                    </Button>
                  </>
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
