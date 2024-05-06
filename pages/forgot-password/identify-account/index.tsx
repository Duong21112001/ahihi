import React from "react";
import Image from "next/image";
import LayoutAuth from "@/components/Layout/auth-layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import Form, { Field } from "rc-field-form";
import Text from "@/components/Text";
import { ForgotPasswordParam } from "@/utils/model/forgotPassword";
import { useTranslation } from "next-i18next";
import Otp from "./Otp";
import Button from "@/components/Button";

const IdentifyAccounts = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  // const onFinish = (values: ForgotPasswordParam) => {
  //   run(values);
  // };
  const { email } = router.query;

  const { t } = useTranslation("common");

  return (
    <div className={styles.forgotPasswordWrap}>
      <div
        onClick={() => {
          router.push("/forgot-password");
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
        Xác minh tài khoản
      </Text>
      <Text type="body-16-regular" color="neutral-5">
        Mã OTP đã được gửi về email{" "}
        <span className={styles.textEmail}>{email}.</span> <br />
        Vui lòng nhập mã OTP để xác minh tài khoản
        {/* {email && <p>{email}</p>}. */}
      </Text>
      <Otp />
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
                // loading={loading}
                // disabled={isError}
                // onClick={() =>
                //   router.push({
                //     pathname: "forgot-password/identify-account",
                //     query: { email: userEmail },
                //   })
                // }
              >
                Gửi mã
              </Button>
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default IdentifyAccounts;

IdentifyAccounts.getLayout = function (page: React.ReactElement) {
  return <LayoutAuth>{page}</LayoutAuth>;
};
export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
