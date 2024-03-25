import { useTranslation } from "next-i18next";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Text from "@/components/Text";
import styles from "./index.module.scss";
import Image from "next/image";
import Box from "@/components/Box";
import CheckBox from "@/components/CheckBox";
import { useRequest } from "@umijs/hooks";
import { login } from "../../src/service/login";
import { LoginParam } from "@/utils/model/login";
import { useState } from "react";
import { NextPageContext } from "next";
import LayoutAuth from "@/components/Layout/auth-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ToastComponent from "@/components/Toast";
import { validateEmail } from "@/utils/validate";
import { setCookie } from "cookies-next";

const LoginForm = () => {
  const { t } = useTranslation("common");
  const [isRememberLogin, setIsRememberLogin] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const { loading, data, run } = useRequest(
    async (values: LoginParam) => {
      const result = await login(values);
      if (result?.code === 404) {
        toast(
          <ToastComponent type="error" content="Tài khoản không tồn tại" />
        );
      }
      if (result?.code === 200) {
        const token = result?.data?.[0]?.user?.token;
        if (token) {
          setCookie("kosei-token", token);
          router.replace("/");
        }
      }
      return result;
    },
    {
      manual: true,
      onError: (err: any) => {},
    }
  );

  const onFinish = (values: LoginParam) => {
    run(values);
  };

  return (
    <div className={styles.loginWrap}>
      <Image
        src="/Images/kosei-logo.png"
        alt="kosei-logo"
        layout="fixed"
        width={76}
        height={76}
        style={{ marginBottom: 32 }}
      />
      <Text type="heading-h3" color="neutral-1" bottom={4}>
        Chào mừng đến với Kosei 👋
      </Text>
      <Text type="body-16-regular" color="neutral-5" bottom={32}>
        Vui lòng đăng nhập để có được những trải nghiệm tốt nhất.
      </Text>
      <Form form={form} className={styles.loginForm} onFinish={onFinish}>
        <div className={styles.form}>
          <div className={styles.loginFormItem}>
            <Field
              name="user_name"
              rules={[
                {
                  required: true,
                  message: t(
                    "Email hoặc tài khoản đăng nhập không được để trống"
                  ),
                },
              ]}
            >
              {({ value, onChange }, meta) => {
                return (
                  <TextInput
                    label="Email hoặc tài khoản đăng nhập"
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
          <div className={styles.loginFormItem}>
            <Field
              name="user_pass"
              rules={[
                {
                  required: true,
                  message: t("Mật khẩu không được để trống"),
                },
              ]}
            >
              {({ value, onChange }, meta) => {
                return (
                  <TextInput
                    placeholder="Nhập mật khẩu"
                    required
                    name="password"
                    value={value}
                    onChange={onChange}
                    meta={meta}
                    iconPath="/svg/lock.svg"
                    widthIcon={18}
                    heightIcon={18}
                    className={styles.input}
                  />
                );
              }}
            </Field>
          </div>
        </div>
        <Box
          flex
          agileItem="agile-center"
          justContent="content-beetween"
          bottom={34}
        >
          <div className={styles.registerFormItem}>
            <CheckBox
              value={isRememberLogin}
              handleChange={() => setIsRememberLogin(!isRememberLogin)}
              checked={false}
              label="Ghi nhớ đăng nhập"
            />
          </div>

          <Text
            type="body-16-regular"
            color="sematic-7"
            cursorPoiter
            onClick={() => router.push("/forgot-password")}
          >
            Quên mật khẩu?
          </Text>
        </Box>

        <Field dependencies={["user_name", "user_pass"]} shouldUpdate>
          {(_, __, { getFieldsError, getFieldValue }) => {
            const userName = getFieldValue("user_name");
            const userPass = getFieldValue("user_pass");
            const errors = getFieldsError(["user_name", "user_pass"]);
            const findError = errors?.find((error) => {
              return error?.errors?.length > 0;
            });
            const isError = !userName || !userPass || !!findError;

            return (
              <>
                <Button
                  htmlType="submit"
                  bottom={24}
                  type="btn-blue"
                  loading={loading}
                  disabled={isError}
                >
                  Đăng nhập
                </Button>
              </>
            );
          }}
        </Field>

        <Box
          flex
          agileItem="agile-center"
          justContent="content-beetween"
          bottom={24}
        >
          <div className={styles.border} />
          <Text
            type="body-14-medium"
            color="neutral-5"
            className={styles.textBottom}
            center
          >
            Hoặc đăng nhập bằng
          </Text>
          <div className={styles.border} />
        </Box>
        <Box flex agileItem="agile-center" justContent="content-beetween">
          <Box flex agileItem="agile-center" className={styles.faceBook}>
            <Image
              src="/svg/_Facebook.svg"
              alt="kosei-logo"
              layout="fixed"
              width={24}
              height={24}
              style={{ marginRight: 12 }}
            />
            <Text type="body-16-semibold" color="neutral-10">
              Facebook
            </Text>
          </Box>
          <Box flex agileItem="agile-center" className={styles.google}>
            <Image
              src="/svg/google.svg"
              alt="kosei-logo"
              layout="fixed"
              width={24}
              height={24}
              style={{ marginRight: 12 }}
            />
            <Text type="body-16-semibold" color="neutral-10">
              Google
            </Text>
          </Box>
        </Box>
      </Form>
    </div>
  );
};

export default LoginForm;

LoginForm.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
