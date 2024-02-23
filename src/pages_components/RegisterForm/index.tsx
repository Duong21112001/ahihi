import { useTranslation } from "next-i18next";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Select from "@/components/Select";
import styles from "./index.module.scss";
import Image from "next/image";

const RegisterForm = () => {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("values", values);
  };

  return (
    <>
      <Form form={form} className={styles.registerForm} onFinish={onFinish}>
        <div className={styles.registerFormHeader}>
          <Image
            src="/Images/register-logo-left.png"
            alt="register-logo-left"
            width={40}
            height={40}
          />
          <Text type="title-24-bold" color="main-color-primary ">
            Thông tin đăng ký
          </Text>
          <Image
            src="/Images/register-logo-right.png"
            alt="register-logo-right"
            width={40}
            height={40}
          />
        </div>
        <div className={styles.form}>
          <div className={styles.registerFormItem}>
            <Field
              name="name"
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
                    placeholder="Họ và tên"
                    required
                    value={value}
                    onChange={onChange}
                    meta={meta}
                    iconPath="/svg/user-circle.svg"
                  />
                );
              }}
            </Field>
          </div>
          <div className={styles.registerFormItem}>
            <Field name="phone_number">
              {({ value, onChange }, meta) => {
                return (
                  <TextInput
                    placeholder="Số điện thoại"
                    required
                    name="phone_number"
                    value={value}
                    onChange={onChange}
                    meta={meta}
                    iconPath="/svg/call.svg"
                    widthIcon={18}
                    heightIcon={18}
                  />
                );
              }}
            </Field>
          </div>
          <div className={styles.registerFormItem}>
            <Field name="email">
              {({ value, onChange }, meta) => {
                return (
                  <TextInput
                    placeholder="Email của bạn"
                    required
                    value={value}
                    onChange={onChange}
                    meta={meta}
                    iconPath="/svg/mail.svg"
                    widthIcon={20}
                    heightIcon={18}
                  />
                );
              }}
            </Field>
          </div>
          <div className={styles.registerFormItem}>
            <Field
              name="qualifications"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              {({ value, onChange }, meta) => {
                return (
                  <Select
                    options={[{ label: "1", value: 1 }]}
                    required
                    placeholder="*Trình độ học*"
                    value={value}
                    onChange={onChange}
                    meta={meta}
                    icon="/svg/rank.svg"
                    widthIcon={24}
                    heightIcon={24}
                  />
                );
              }}
            </Field>
          </div>
          <div className={styles.registerFormItem}>
            <Field
              name="qualifications"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              {({ value, onChange }, meta) => {
                return (
                  <Select
                    options={[{ label: "1", value: 1 }]}
                    required
                    placeholder="*Cơ sở học*"
                    value={value}
                    onChange={onChange}
                    meta={meta}
                    icon="/svg/school.svg"
                  />
                );
              }}
            </Field>
          </div>
          <div className={styles.registerFormItem}>
            <Field name="content">
              {({ value, onChange }, meta) => {
                return (
                  <TextInput
                    placeholder="Nội dung cần tư vấn"
                    required
                    value={value}
                    onChange={onChange}
                    meta={meta}
                    type="textarea"
                    iconPath="/svg/document-text.svg"
                  />
                );
              }}
            </Field>
          </div>
        </div>
        <Text type="tag-12-semibold" color="tint-primary-3" bottom={24}>
          Gửi thông tin quý khách chú ý: (*) Vui lòng điền đầy đủ thông tin để
          chúng tôi có thể hỗ trợ tốt nhất
        </Text>
        <div>
          <Field>
            {() => {
              return (
                <>
                  <Button htmlType="submit" width={"100%"} bottom={24}>
                    Đăng ký
                  </Button>
                </>
              );
            }}
          </Field>
        </div>
        <Text type="tag-12-regular" color="tint-primary-3" center>
          Trung Tâm Tiếng Nhật Kosei Hotline : 0966026133
        </Text>
      </Form>
    </>
  );
};

export default RegisterForm;
