import { useTranslation } from "next-i18next";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";
import Rating from "@/components/rating";
import { useState } from "react";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

const ReviewCourse = () => {
  const { t } = useTranslation("common");
  const [rating, setRating] = useState(5);
  const [form] = Form.useForm();

  const onFinish = () => {};

  const listRating = [
    {
      label: "Tuyệt vời",
      value: "100%",
    },
    {
      label: "Rất tốt",
      value: "30%",
    },
    {
      label: "Tốt",
      value: "10%",
    },
    {
      label: "Chưa ưng ý",
      value: "5%",
    },
    {
      label: "Tệ",
      value: "0%",
    },
  ];

  const RatingProgress = () => {
    return (
      <div>
        {listRating.map((rating) => {
          return (
            <div
              className={styles.ratingProgress}
              key={`rating-${rating.label}`}
            >
              <Text
                type="body-16-regular"
                color="neutral-3"
                right={20}
                className={styles.text}
              >
                {rating.label}
              </Text>
              <div className={styles.progress}>
                <div
                  className={styles.progressActive}
                  style={{ width: rating?.value }}
                />
              </div>
              <Text
                type="body-16-regular"
                color="neutral-5"
                className={styles.textNumber}
              >
                {rating?.value}
              </Text>
            </div>
          );
        })}
      </div>
    );
  };

  const OneComment = () => {
    return (
      <div className={styles.oneComment}>
        <Box flex agileItem="agile-center" bottom={16}>
          <Image
            src="/images/avatar-lecturers.png"
            alt="avatar"
            layout="fixed"
            width={100}
            height={100}
            style={{ marginRight: 10 }}
          />
          <div>
            <Text type="body-16-bold" color="dark-500" bottom={4}>
              Mark Williams
            </Text>
            <Rating numberRating={5} />
          </div>
        </Box>
        <Text type="body-16-bold" color="neutral-1" bottom={8}>
          Khoá học tuyệt vời, em rất thích ạ 😍
        </Text>
        <Text type="body-16-regular" color="neutral-2" bottom={8}>
          Lorem ipsum dolor sit amet consectetur. Dolor ullamcorper nisl
          pharetra mauris volutpat eu porttitor nunc. Diam consequat quam in
          sagittis auctor tellus dis a. Ut aliquam sit in volutpat condimentum.
          Lectus enim amet consequat amet rhoncus. Nibh volutpat luctus
          ullamcorper vitae sed integer.
        </Text>
        <Box flex agileItem="agile-center">
          <Text type="body-14-regular" color="neutral-2" right={5}>
            Đã đăng vào
          </Text>
          <Text type="body-14-regular" color="neutral-4">
            18:00 12/03/2024
          </Text>
        </Box>
      </div>
    );
  };

  return (
    <div className={styles.review}>
      <Text type="title-20-bold" color="neutral-1" bottom={20}>
        Đánh giá
      </Text>
      <div className={styles.reviewTop}>
        <div className={styles.reviewLeft}>
          <Text type="heading-h1" color="neutral-1" bottom={16}>
            5
          </Text>
          <Text type="body-16-regular" color="neutral-4" bottom={12}>
            (120 đánh giá)
          </Text>
          <Rating numberRating={5} />
        </div>
        <div className={styles.reviewRight}>
          <RatingProgress />
        </div>
      </div>
      <div className={styles.comments}>
        <OneComment />
        <OneComment />
      </div>
      <div className={styles.formComments}>
        <Text type="title-20-bold" color="neutral-1" bottom={24}>
          Thêm vào bình luận
        </Text>
        <Text type="body-16-regular" color="neutral-1" bottom={8}>
          Đánh giá của bạn:
        </Text>
        <div className={styles.yourRating}>
          {[...Array(5)].map((value, key) => {
            return (
              <Image
                src={
                  key + 1 <= rating ? "/svg/rating.svg" : "/svg/un-rating.svg"
                }
                alt="rating"
                layout="fixed"
                width={20}
                height={20}
                style={{ marginRight: 2, cursor: "pointer" }}
                key={`rating-${key}`}
                onClick={() => setRating(key + 1)}
              />
            );
          })}
        </div>
        <div>
          <Form form={form} className={styles.form} onFinish={onFinish}>
            <div className={styles.formItem}>
              <Field name="user_name">
                {({ value, onChange }, meta) => {
                  return (
                    <TextInput
                      label="Tên của bạn"
                      placeholder="Nhập tên của bạn"
                      value={value}
                      onChange={onChange}
                      meta={meta}
                      className={styles.input}
                    />
                  );
                }}
              </Field>
            </div>
            <div className={styles.formItem}>
              <Field name="email">
                {({ value, onChange }, meta) => {
                  return (
                    <TextInput
                      placeholder="Nhập Email của bạn"
                      value={value}
                      onChange={onChange}
                      className={styles.input}
                      label="Email"
                    />
                  );
                }}
              </Field>
            </div>
            <div className={styles.formItem}>
              <Field name="comment">
                {({ value, onChange }, meta) => {
                  return (
                    <TextInput
                      placeholder="Nhập đánh giá của bạn"
                      value={value}
                      onChange={onChange}
                      className={styles.input}
                      label="Đánh giá của bạn"
                      type="textarea"
                    />
                  );
                }}
              </Field>
            </div>
            <Field>
              {() => {
                return (
                  <>
                    <Button htmlType="submit" type="btn-blue">
                      Xác nhận
                    </Button>
                  </>
                );
              }}
            </Field>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ReviewCourse;
