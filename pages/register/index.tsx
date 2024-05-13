import { useTranslation } from "next-i18next";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Text from "@/components/Text";
import styles from "./index.module.scss";
import Box from "@/components/Box";
import CheckBox from "@/components/CheckBox";
import Radio from "@/components/Radio";
import { useState } from "react";
import { RegisterParam } from "@/utils/model/register";
import { register } from "../../src/service/register";
import { useRequest } from "@umijs/hooks";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/utils/validate";
import LayoutAuth from "@/components/Layout/auth-layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import ToastComponent from "@/components/Toast";
import { ROUTER } from "@/api/constant";
import Link from "next/link";

const RegisterForm = () => {
  const { t } = useTranslation("common");
  const [gender, setGender] = useState<string | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();
  const { loading, data, run } = useRequest(
    async (values: RegisterParam) => {
      delete values.rePassword;
      delete values.rules;
      const result = await register(values);
      if (result?.code === 200) {
        toast(
          <ToastComponent
            type="success"
            content="Tài khoản đã đăng ký thành công"
          />
        );
        router.push("/login");
      }
      if (result?.code === 404) {
        toast(
          <ToastComponent
            type="error"
            content="Email hoặc số điện thoại đã được đăng ký"
          />
        );
      }
      return result;
    },
    {
      manual: true,
      onError: (err: any) => {
        console.log("err", err);
      },
    }
  );
  const onFinish = (values: any) => {
    run(values);
  };

  return (
    <div className={styles.registerWrap}>
      <Text type="heading-h3" color="neutral-1" bottom={4}>
        Tạo tài khoản mới 👋
      </Text>
      <Text type="body-16-regular" color="neutral-5" bottom={32}>
        Vui lòng nhập đúng thông tin để tạo tài khoản đăng nhập
      </Text>
      <Form form={form} className={styles.registerForm} onFinish={onFinish}>
        <div className={styles.form}>
          <div className={styles.registerFormItem}>
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
          <div className={styles.registerFormItem}>
            <Field
              name="user_name"
              rules={[
                {
                  required: true,
                  message: t("Tên đăng nhập không được để trống"),
                },
              ]}
            >
              {({ value, onChange }, meta) => {
                return (
                  <TextInput
                    label="Tên đăng nhập"
                    placeholder="Nhập Tên đăng hập"
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
          <div className={styles.registerFormItem}>
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
                    placeholder="Nhập Email"
                    required
                    name="email"
                    label="Email"
                    value={value}
                    onChange={onChange}
                    meta={meta}
                    iconPath="/svg/mail.svg"
                    widthIcon={20}
                    heightIcon={20}
                    className={styles.input}
                  />
                );
              }}
            </Field>
          </div>
          <div className={styles.registerFormItem}>
            <Field
              name="mobile"
              rules={[
                {
                  required: true,
                  message: t("Số điện thoại không được để trống"),
                },
                validatePhone(t),
              ]}
            >
              {({ value, onChange }, meta) => {
                return (
                  <TextInput
                    placeholder="Nhập số điện thoại"
                    required
                    label="Điện thoại"
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
          <div className={styles.registerFormItem}>
            <Field
              name="user_pass"
              rules={[
                {
                  required: true,
                  message: t("Mật khẩu không được để trống"),
                },
                validatePassword(t),
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
                    label="Mật khẩu"
                    password
                  />
                );
              }}
            </Field>
          </div>
          <div className={styles.registerFormItem}>
            <Field
              name="rePassword"
              rules={[
                {
                  required: true,
                  message: t("Mật khẩu không được để trống"),
                },
                validateConfirmPassword(form, "user_pass", t),
              ]}
            >
              {({ value, onChange }, meta) => {
                return (
                  <TextInput
                    placeholder="Nhập lại mật khẩu"
                    required
                    name="rePassword"
                    value={value}
                    onChange={onChange}
                    meta={meta}
                    iconPath="/svg/lock.svg"
                    widthIcon={18}
                    heightIcon={18}
                    className={styles.input}
                    label="Nhập lại mật khẩu"
                    password
                  />
                );
              }}
            </Field>
          </div>
          <div className={styles.registerFormItem}>
            <Field
              name="gender"
              rules={[
                {
                  required: true,
                  message: t("Giới tính không được để trống"),
                },
              ]}
            >
              {({}, meta) => {
                const { errors } = meta;
                const onChangeRadio = (value: string) => {
                  setGender(value);
                  form.setFields([
                    {
                      name: "gender",
                      value: value,
                      errors: [],
                    },
                  ]);
                };
                return (
                  <Box>
                    <Box
                      flex
                      alignText="text-center"
                      justContent="content-beetween"
                      maxWidth={300}
                    >
                      <Text type="body-16-regular" color="neutral-1">
                        Giới tính:
                      </Text>
                      <Box>
                        <Radio
                          value={0}
                          gender={gender}
                          onChange={onChangeRadio}
                          label="Nam"
                        />
                      </Box>

                      <Radio
                        value={1}
                        gender={gender}
                        onChange={onChangeRadio}
                        label="Nữ"
                      />
                    </Box>
                    {errors?.length > 0 && (
                      <p className={styles.textError}>{errors[0]}</p>
                    )}
                  </Box>
                );
              }}
            </Field>
          </div>
          <Box
            flex
            agileItem="agile-center"
            bottom={32}
            className={styles.registerFormItem}
          >
            <Field
              name="rules"
              rules={[
                {
                  required: true,
                  message: t("not_empty"),
                },
              ]}
            >
              {({ value, onChange }, meta) => {
                return (
                  <CheckBox
                    value={value}
                    handleChange={onChange}
                    checked={false}
                  />
                );
              }}
            </Field>

            <Box flex agileItem="agile-center">
              <Text type="body-16-regular" color="neutral-1" right={4}>
                Tôi đã đọc và đồng ý với
              </Text>
              <Text type="body-16-medium" color="sematic-7">
                Điều khoàn sử dụng
              </Text>
            </Box>
          </Box>
        </div>
        <div>
          <Field
            dependencies={[
              "fullname",
              "user_name",
              "email",
              "mobile",
              "user_pass",
              "rePassword",
              "gender",
              "rules",
            ]}
            shouldUpdate
          >
            {(_, __, { getFieldsValue, getFieldsError }) => {
              const errors = getFieldsError([
                "fullname",
                "user_name",
                "email",
                "mobile",
                "user_pass",
                "rePassword",
                "gender",
                "rules",
              ]);
              const getValues = getFieldsValue([
                "fullname",
                "user_name",
                "email",
                "mobile",
                "user_pass",
                "rePassword",
                "gender",
                "rules",
              ]);
              const convertValues = Object?.values(getValues);
              const findError = errors?.find((error) => {
                return error?.errors?.length > 0;
              });
              const fillterEmtyValue = convertValues?.filter((value) => {
                return value !== undefined;
              });

              const isError = !!findError || fillterEmtyValue?.length < 8;

              return (
                <>
                  <Button
                    htmlType="submit"
                    bottom={24}
                    type="btn-blue"
                    loading={loading}
                    disabled={isError}
                  >
                    Đăng ký
                  </Button>
                </>
              );
            }}
          </Field>
        </div>
        <Box flex agileItem="agile-center">
          <Link href={ROUTER.LOGIN}>
            <Text
              type="body-16-bold"
              color="main-color-primary"
              right={4}
              // onClick={() => router.push(ROUTER.LOGIN)}
              cursorPoiter
            >
              Đăng nhập
            </Text>
          </Link>
          <Text type="body-16-regular" color="neutral-1">
            nếu bạn đã có tài khoản
          </Text>
        </Box>
      </Form>
    </div>
  );
};

export default RegisterForm;

RegisterForm.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
