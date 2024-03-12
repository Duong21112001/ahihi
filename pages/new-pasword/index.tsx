import { useTranslation } from "next-i18next";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Text from "@/components/Text";
import styles from "./index.module.scss";
import { LoginParam } from "@/utils/model/login";
import { useRef, useState } from "react";
import { NextPageContext } from "next";
import LayoutAuth from "@/components/Layout/auth-layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "@/utils/validate";
import { useRouter } from "next/router";
import { useRequest } from "@umijs/hooks";
import {
  ForgotPasswordParam,
  NewPasswordParam,
} from "@/utils/model/forgotPassword";
import { newPassword } from "../../src/service/newPassword";
import { useSearchParams } from "next/navigation";
import ModalMessage, { PopUpRef } from "@/components/ModalMessage";
import { toast } from "react-toastify";
import ToastComponent from "@/components/Toast";

const NewPasswordForm = () => {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const refModal: any = useRef();

  const { loading, data, run } = useRequest(
    async (values: NewPasswordParam) => {
      const result = await newPassword(values);
      if (result?.code === 401) {
        toast(
          <ToastComponent type="error" content="Đường link không tồn tại" />
        );
      }
      if (result?.success) {
        refModal?.current?.open();
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

  const onFinish = (values: NewPasswordParam) => {
    if (token) {
      run({
        newPassword: values.newPassword,
        remember_token: token,
      });
    }
  };

  return (
    <>
      <div className={styles.newPasswordWrap}>
        <Text type="heading-h3" color="main-color-primary" bottom={4}>
          Tạo mật khẩu mới
        </Text>
        <Text type="body-16-regular" color="neutral-5" bottom={32}>
          Vui lòng đăng nhập để có được những trải nghiệm tốt nhất.
        </Text>
        <Form
          form={form}
          className={styles.newPasswordForm}
          onFinish={onFinish}
        >
          <div className={styles.form}>
            <div className={styles.newPasswordItem}>
              <Field
                name="newPassword"
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
                      label="Mật khẩu mới"
                      placeholder="Nhập mật khẩu mới"
                      required
                      value={value}
                      onChange={onChange}
                      meta={meta}
                      iconPath="/svg/lock.svg"
                      className={styles.input}
                      password
                    />
                  );
                }}
              </Field>
            </div>
            <div className={styles.newPasswordItem}>
              <Field
                name="re-password"
                rules={[
                  {
                    required: true,
                    message: t("Mật khẩu không được để trống"),
                  },
                  validateConfirmPassword(form, "newPassword", t),
                ]}
              >
                {({ value, onChange }, meta) => {
                  return (
                    <TextInput
                      label="Nhập lại mật khẩu mới"
                      placeholder="Nhập lại mật khẩu mới"
                      required
                      value={value}
                      onChange={onChange}
                      meta={meta}
                      iconPath="/svg/lock.svg"
                      className={styles.input}
                      password
                    />
                  );
                }}
              </Field>
            </div>
          </div>

          <Field dependencies={["email"]} shouldUpdate>
            {(_, __, { getFieldValue, getFieldsError }) => {
              const newPassword = getFieldValue("newPassword");
              const rePassword = getFieldValue("re-password");
              const errors = getFieldsError(["newPassword", "re-password"]);
              const findError = errors?.find((error) => {
                return error?.errors?.length > 0;
              });
              const isError =
                !newPassword || !rePassword || !!findError || !token;
              return (
                <>
                  <Button
                    htmlType="submit"
                    bottom={24}
                    type="btn-blue"
                    loading={loading}
                    disabled={isError}
                  >
                    Lưu mật khẩu
                  </Button>
                </>
              );
            }}
          </Field>
        </Form>
      </div>
      <ModalMessage
        title="Thay đổi mật khẩu thành công"
        content="mật khẩu của bạn đã được cập nhật thành công"
        titleBack="Quay lại đăng nhập"
        ref={refModal}
        width={500}
        img="/images/password-mess.png"
        routerBack="/login"
      />
    </>
  );
};

export default NewPasswordForm;

NewPasswordForm.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
