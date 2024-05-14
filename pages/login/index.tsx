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
import {
  login,
  loginWithFaceBook,
  loginWithGoogle,
} from "../../src/service/login";
import { LoginParam } from "@/utils/model/login";
import { useState } from "react";
import { NextPageContext } from "next";
import LayoutAuth from "@/components/Layout/auth-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ToastComponent from "@/components/Toast";
import { setCookie } from "cookies-next";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { KOSEI_TOKEN } from "@/api/constant";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const { t } = useTranslation("common");
  const [isRememberLogin, setIsRememberLogin] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const { run: runLoginGoogle } = useRequest(async (accessToken) => {
    if (accessToken) {
      const result = await loginWithGoogle(accessToken);
      const token = result?.data?.accessToken;
      if (token) {
        setCookie(KOSEI_TOKEN, token);
        router.replace("/");
      }

      return result;
    }
  });
  const { run: runLoginFaceBook } = useRequest(
    async (accessToken) => {
      return await loginWithFaceBook(accessToken);
    },
    {
      manual: true,
      onSuccess: (result) => {
        const token = result?.data?.accessToken;
        if (token) {
          if (token) {
            setCookie(KOSEI_TOKEN, token);
            router.replace("/");
          }
        }
      },
      onError: (err: any) => {},
    }
  );
  const { loading, run } = useRequest(
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
          setCookie(KOSEI_TOKEN, token);
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
            <FacebookLogin
              appId="1165803831114574"
              onSuccess={(response) => {
                if (response?.accessToken) {
                  runLoginFaceBook(response?.accessToken);
                }
              }}
              onFail={(error) => {
                console.log("Login Failed!", error);
              }}
              onProfileSuccess={(response) => {
                console.log("responseFb======", response);

                setCookie("fullname", response.name);
                setCookie("avatar", response.picture?.data.url);
              }}
              style={{
                backgroundColor: "#1877f2",
                color: "#fff",
                fontSize: "16px",
                border: "none",
                borderRadius: "4px",
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src="/svg/_Facebook.svg"
                alt="kosei-logo"
                layout="fixed"
                width={24}
                height={24}
                style={{ marginRight: 12 }}
              />
              Facebook
            </FacebookLogin>
          </Box>
          <Box flex agileItem="agile-center" className={styles.google}>
            <GoogleOAuthProvider clientId="14716222725-oajn4fpcmb9psa0d39475kji8qt5nvef.apps.googleusercontent.com">
              <Image
                src="/svg/google.svg"
                alt="kosei-logo"
                layout="fixed"
                width={24}
                height={24}
                style={{ marginRight: 12 }}
              />
              <Text type="body-16-bold" color="neutral-10">
                Google
              </Text>
              <div style={{ opacity: 0 }}>
                <GoogleLogin
                  onSuccess={(credentialResponse: any) => {
                    const decoded = jwtDecode(
                      credentialResponse?.credential
                    ) as any;

                    setCookie("fullname", decoded.name);
                    setCookie("avatar", credentialResponse.picture);
                    if (credentialResponse.credential) {
                      runLoginGoogle(credentialResponse.credential);
                    }
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </GoogleOAuthProvider>
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
