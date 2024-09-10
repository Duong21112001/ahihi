import React, { useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextPageWithLayout } from "../_app";
import Text from "@/components/Text";
import styles from "./index.module.css";
import Box from "@/components/Box";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { useRequest } from "@umijs/hooks";
import { Course } from "@/utils/model/courses";
import { getCourseId } from "@/service/course";
import { useSearchParams } from "next/navigation";
import { checkCode, getPayment, orderCourses } from "@/service/payment";
import { CoursesOrderParams, OnePaymentResponse } from "@/utils/model/payment";
import { toast } from "react-toastify";
import ToastComponent from "@/components/Toast";
import { formatNumber, validateEmail } from "@/utils/validate";

const PayMent: NextPageWithLayout = () => {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const params = useSearchParams();
  const id = params.get("id");
  const [typePayment, setTypePayment] = useState<string | null>(null);
  const [codeDiscount, setCodeDiscount] = useState<string | null>(null);
  const { loading, data }: { loading: boolean; data: Course } = useRequest(
    async () => {
      if (id) {
        const result = await getCourseId(id);
        return result;
      }
    },
    {
      onError: () => {},
    }
  );
  const {
    loading: loadingPayment,
    data: dataPayment,
  }: { loading: boolean; data: OnePaymentResponse[] } = useRequest(
    async () => {
      if (id) {
        const result = await getPayment();

        return result;
      }
    },

    {
      onError: () => {},
    }
  );

  const { loading: loadingCheckCode, run: runCheckCode } = useRequest(
    async (code: string) => {
      const result = await checkCode(code);
      if (result?.data?.length === 0) {
        toast(
          <ToastComponent type="error" content="Mã khuyễn mãi không tồn tại" />
        );
        form.setFields([
          {
            name: "promotion",
            errors: [""],
          },
        ]);
      } else if (result?.data?.length > 0) {
        toast(
          <ToastComponent
            type="success"
            content="Mã khuyễn mãi đã được áp dụng"
          />
        );
      }

      return result;
    },
    {
      manual: true,
      onError: (err) => {
        console.log("err", err);
      },
    }
  );
  const { loading: loadingCreateOrder, run: runCreateOrder } = useRequest(
    async (value: CoursesOrderParams) => {
      if (id) {
        value.course_id = id;
      }

      const result = await orderCourses(value);
      if (result?.code === 400) {
        toast(<ToastComponent type="error" content={result?.msg} />);
        form.setFields([
          {
            name: "promotion",
            errors: [""],
          },
        ]);
      } else if (result?.code === 204) {
        toast(
          <ToastComponent type="success" content="Đăng ký hóa học thành công" />
        );
      }
      return result;
    },
    {
      manual: true,
      onError: (err) => {
        console.log("err", err);
      },
    }
  );

  const listPayment = [
    {
      label: "Thanh toán trực tiếp tại Kosei",
      value: "1",
    },
    {
      label: "Chuyển khoản ngân hàng",
      value: "0",
    },
  ];
  const filterPayment = dataPayment?.filter((payment) => {
    if (typePayment) {
      return payment?.type === Number(typePayment);
    }
  });
  const DirectPayment = () => {
    return (
      <div className={styles.directPayment}>
        <Text type="title-20-bold" color="neutral-1">
          Địa chỉ trung tâm
        </Text>
        <div className={styles.directPaymentPading}>
          {filterPayment?.map((payment, index) => {
            return (
              <div className={styles.item} key={`payment-${payment?.id}`}>
                <Text type="title-20-bold" color="neutral-1" bottom={8}>
                  Cơ sở {index + 1}
                </Text>
                <Text type="body-16-regular" color="neutral-3" bottom={8}>
                  {payment?.name}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const BankPayment = () => {
    return (
      <div className={styles.bankPayment}>
        {filterPayment?.map((payment, index) => {
          return (
            <div className={styles.item} key={`payment-${payment?.id}`}>
              <Text type="title-20-bold" color="neutral-1" bottom={8}>
                {payment?.name}
              </Text>
              <Box flex agileItem="agile-center">
                <Text
                  type="body-14-medium"
                  color="neutral-3"
                  bottom={8}
                  right={5}
                >
                  Chủ tài khoản:
                </Text>
                <Text
                  type="body-16-semibold"
                  color="main-color-primary"
                  bottom={8}
                >
                  {payment?.account_holder}
                </Text>
              </Box>
              <Box flex agileItem="agile-center">
                <Text
                  type="body-14-medium"
                  color="neutral-3"
                  bottom={8}
                  right={5}
                >
                  Số tài khoản:
                </Text>
                <Text
                  type="body-16-semibold"
                  color="main-color-primary"
                  bottom={8}
                >
                  {payment?.account_number}
                </Text>
              </Box>
            </div>
          );
        })}
        <div className={styles.notWrap}>
          <Text type="body-14-semibold" color="neutral-1" bottom={8}>
            Nội dung chuyển khoản*
          </Text>
          <Text type="body-16-semibold" color="neutral-1" bottom={8}>
            Khoa hoc {data?.name}
          </Text>
          <Text type="tag-12-medium" color="neutral-3" className={styles.note}>
            Lưu ý nội dung chuyển khoản bỏ qua ký tự đặc biệt như: @, +, - ,...
          </Text>
        </div>
      </div>
    );
  };
  const onCheckCode = () => {
    if (codeDiscount) {
      runCheckCode(codeDiscount);
    }
  };
  const onFinish = (values: CoursesOrderParams) => {
    runCreateOrder(values);
  };

  return (
    <div className={styles.payMentWrap}>
      <div className={styles.payMentContainer}>
        <Text
          type="heading-h3"
          color="neutral-1"
          center
          className={styles.title}
        >
          Thông tin đăng ký
        </Text>
        <div className={styles.about}>
          <div className={styles.border} />
          <div className={styles.aboutPadding}>
            <Text type="heading-h4" bottom={4}>
              {data?.name}
            </Text>
            <Text type="tag-12-medium" color="neutral-4" bottom={16}>
              Các thông tin cơ bản của khoá học
            </Text>
            <Box flex agileItem="agile-center" bottom={16}>
              <Text type="body-16-semibold" color="neutral-4" right={5}>
                Học phí:
              </Text>
              <Text type="body-16-semibold" color="neutral-1">
                {formatNumber(data?.cou_price)}VNĐ
              </Text>
            </Box>
            <Box flex agileItem="agile-center">
              <Text type="body-16-semibold" color="neutral-4" right={5}>
                Thời gian:
              </Text>
              <Text type="body-16-semibold" color="neutral-1">
                {data?.expired_at} Tháng
              </Text>
            </Box>
          </div>
        </div>
        <Text type="title-20-bold" color="neutral-1" bottom={8}>
          Điền thông tin đăng kí:
        </Text>

        <Form form={form} className={styles.paymentForm} onFinish={onFinish}>
          <div className={styles.form}>
            <div className={styles.paymentFormItem}>
              <Field
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: t("Họ và tên không được để trống"),
                  },
                ]}
              >
                {({ value, onChange }, meta) => {
                  return (
                    <TextInput
                      label="Họ và tên"
                      placeholder="Nhập Họ và tên"
                      required
                      value={value}
                      onChange={onChange}
                      meta={meta}
                      iconPath="/svg/user-circle.svg"
                      className={styles.input}
                    />
                  );
                }}
              </Field>
            </div>
            <div className={styles.paymentFormItem}>
              <Field
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: t("Số điện thoại không được để trống"),
                  },
                ]}
              >
                {({ value, onChange }, meta) => {
                  return (
                    <TextInput
                      placeholder="Nhập số điện thoại"
                      required
                      label="Số điện thoại"
                      name="phone"
                      value={value}
                      onChange={onChange}
                      meta={meta}
                      iconPath="/svg/call.svg"
                      widthIcon={18}
                      heightIcon={18}
                      className={styles.input}
                    />
                  );
                }}
              </Field>
            </div>
            <div className={styles.paymentFormItem}>
              <Field
                name="email"
                rules={[
                  {
                    required: true,
                    message: t("Email không được để trống"),
                  },
                  validateEmail(t),
                ]}
              >
                {({ value, onChange }, meta) => {
                  return (
                    <TextInput
                      label="Email"
                      placeholder="Nhập email"
                      required
                      value={value}
                      onChange={onChange}
                      meta={meta}
                      iconPath="/svg/mail.svg"
                      className={styles.input}
                    />
                  );
                }}
              </Field>
            </div>
            <div className={styles.paymentFormItem}>
              <Field name="promo_code">
                {({ value, onChange }, meta) => {
                  const onChangeCode = (value: string) => {
                    onChange(value);
                    setCodeDiscount(value);
                  };
                  return (
                    <TextInput
                      placeholder="Nhập khuyến mãi"
                      label="Khuyến mãi"
                      name="phone"
                      value={value}
                      onChange={onChangeCode}
                      meta={meta}
                      widthIcon={18}
                      heightIcon={18}
                      className={styles.input}
                      iconRight={
                        <button
                          className={styles.buttonRight}
                          type="button"
                          onClick={onCheckCode}
                          disabled={!codeDiscount || loadingCheckCode}
                        >
                          {loadingCheckCode ? (
                            <svg
                              className="loading-btn"
                              width="17"
                              height="18"
                              viewBox="0 0 17 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.54262 17.2908C4.10519 17.287 0.449085 13.8066 0.226926 9.37472C0.00476593 4.94285 3.29449 1.11424 7.70929 0.666672V4.03334C5.20147 4.45715 3.41254 6.69768 3.5544 9.2371C3.69626 11.7765 5.7236 13.8039 8.26302 13.9457C10.8024 14.0876 13.043 12.2987 13.4668 9.79084H16.8335C16.3999 14.0463 12.8201 17.2851 8.54262 17.2908Z"
                                fill="white"
                              />
                            </svg>
                          ) : (
                            <Text type="body-16-regular" color="neutral-10">
                              Áp dụng
                            </Text>
                          )}
                        </button>
                      }
                    />
                  );
                }}
              </Field>
            </div>
            <div className={styles.paymentFormItem}>
              <Field
                name="payment_method"
                rules={[
                  {
                    required: true,
                    message: "Phương thức thanh toán không được để trống",
                  },
                ]}
              >
                {({ value, onChange }, meta) => {
                  const onChangePayment = (value: string) => {
                    onChange(value);
                    setTypePayment(value);
                  };
                  return (
                    <Select
                      options={listPayment}
                      required
                      value={value}
                      onChange={onChangePayment}
                      meta={meta}
                      icon="/svg/card.svg"
                      Label="Phương thức thanh toán"
                      className={styles.selectPayment}
                      placeholder="Chọn phương thức thanh toán"
                      loading={loadingPayment}
                    />
                  );
                }}
              </Field>
            </div>
            {typePayment == "1" && <DirectPayment />}
            {typePayment == "0" && <BankPayment />}
            <div className={styles.paymentFormItem}>
              <Field name="note">
                {({ value, onChange }, meta) => {
                  return (
                    <TextInput
                      placeholder="Nhập ghi chú"
                      value={value}
                      onChange={onChange}
                      meta={meta}
                      type="textarea"
                      label="Ghi chú"
                      className={styles.note}
                    />
                  );
                }}
              </Field>
            </div>
          </div>
          <div>
            <Field
              dependencies={[
                "fullname",
                "mobile",
                "email",
                "mobile",
                "payment_method",
                "promo_code",
              ]}
              shouldUpdate
            >
              {(_, __, { getFieldsValue, getFieldsError }) => {
                const errors = getFieldsError([
                  "fullname",
                  "mobile",
                  "email",
                  "payment_method",
                ]);
                const getValues = getFieldsValue([
                  "fullname",
                  "mobile",
                  "email",
                  "payment_method",
                ]);
                const convertValues = Object?.values(getValues);
                const findError = errors?.find((error) => {
                  return error?.errors?.length > 0;
                });
                const fillterEmtyValue = convertValues?.filter((value) => {
                  return value !== undefined;
                });

                const isError =
                  !!findError || fillterEmtyValue?.length < 4 || !id;

                return (
                  <>
                    <Button
                      htmlType="submit"
                      bottom={24}
                      type="btn-blue"
                      disabled={isError}
                      className={styles.button}
                      loading={loadingCreateOrder}
                    >
                      Tiếp tục
                    </Button>
                  </>
                );
              }}
            </Field>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default PayMent;

PayMent.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
