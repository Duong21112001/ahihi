import { useTranslation } from "next-i18next";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Text from "@/components/Text";
import styles from "./index.module.scss";
import { LoginParam } from "@/utils/model/login";
import { useState } from "react";
import { NextPageContext } from "next";
import LayoutAuth from "@/components/Layout/auth-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from "@/components/Box";
import Image from "next/image";
import { validateEmail } from "@/utils/validate";
import { useRouter } from "next/router";
import { useRequest } from "@umijs/hooks";
import { forgotPassword } from "./service";
import { ForgotPasswordParam } from "@/utils/model/forgotPassword";

const ForgotPasswordForm = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [form] = Form.useForm();
  const { loading, data, run } = useRequest(
    async (values: ForgotPasswordParam) => {
      const result = await forgotPassword(values);
      return result;
    },
    {
      manual: true,
      onError: (err: any) => {
        console.log("err", err);
      },
    }
  );
  const onFinish = (values: ForgotPasswordParam) => {
    run(values);
  };

  return (
    <div className={styles.forgotPasswordWrap}>
      <div
        onClick={() => {
          router.push("/login");
        }}
        className={styles.back}
      >
        <Image
          src="/svg/caret-left.svg"
          alt="arrow-left"
          layout="fixed"
          width={14}
          height={14}
          style={{ marginRight: 13 }}
        />
        <Text type="body-16-regular" color="neutral-4">
          Quay lại
        </Text>
      </div>
      <Text type="heading-h3" color="main-color-primary" bottom={4}>
        Quên mật khẩu
      </Text>
      <Text type="body-16-regular" color="neutral-5" bottom={32}>
        Nhập địa chỉ email đã đăng ký của bạn. chúng tôi sẽ gửi cho bạn một mã
        để đặt lại mật khẩu của bạn.
      </Text>
      <Form
        form={form}
        className={styles.forgotPasswordForm}
        onFinish={onFinish}
      >
        <div className={styles.form}>
          <div className={styles.forgotPasswordItem}>
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
                    placeholder="Nhập Email"
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
        </div>

        <Field dependencies={["email"]} shouldUpdate>
          {(_, __, { getFieldValue, getFieldError }) => {
            const userEmail = getFieldValue("email");
            const error = getFieldError("email");
            const isError = !userEmail || error?.length > 0;
            return (
              <>
                <Button
                  htmlType="submit"
                  bottom={24}
                  type="btn-blue"
                  loading={loading}
                  disabled={isError}
                >
                  Gửi mã
                </Button>
              </>
            );
          }}
        </Field>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;

ForgotPasswordForm.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
