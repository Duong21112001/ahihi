import { useTranslation } from "next-i18next";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Text from "@/components/Text";
import styles from "./index.module.scss";
import Image from "next/image";
import Box from "@/components/Box";

const LoginForm = () => {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("values", values);
  };

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginContainer}>
        <div className={styles.left}>Graphic</div>
        <div className={styles.right}>
          <div className={styles.rightBackground}>
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
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: t("not_empty"),
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
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: t("not_empty"),
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
                <Box flex agileItem="agile-center">
                  <input className={styles.checkBox} type="checkbox" />
                  <Text
                    type="body-14-regular"
                    color="neutral-1"
                    className={styles.textCheckBox}
                  >
                    Ghi nhớ đăng nhập
                  </Text>
                </Box>
                <Text type="body-16-regular" color="sematic-7">
                  Quên mật khẩu?
                </Text>
              </Box>
              <div>
                <Field>
                  {() => {
                    return (
                      <>
                        <Button htmlType="submit" bottom={24} type="btn-blue">
                          Đăng nhập
                        </Button>
                      </>
                    );
                  }}
                </Field>
              </div>
              <div>
                <Text
                  type="body-14-medium"
                  color="neutral-5"
                  className={styles.textBottom}
                  center
                  bottom={24}
                >
                  Hoặc đăng nhập bằng
                </Text>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
