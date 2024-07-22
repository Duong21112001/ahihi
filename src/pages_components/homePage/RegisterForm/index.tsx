import { useTranslation } from "next-i18next";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Select from "@/components/Select";
import styles from "./index.module.css";
import { validateEmail, validatePhone } from "@/utils/validate";
import { useRequest } from "@umijs/hooks";
import {
  getCentersList,
  getLevelsList,
  registerConsultation,
} from "@/service/homePage";
import {
  CentersResponse,
  LevelListResponse,
  RegisterConsultationParam,
} from "@/utils/model/homePage";
import { toast } from "react-toastify";
import ToastComponent from "@/components/Toast";
import ModalMessage, { PopUpRef } from "@/components/ModalMessage";
import { useRef } from "react";

const RegisterForm = () => {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const refModal = useRef<PopUpRef>(null);

  const {
    loading: loadingListLevel,
    data: listLevel,
  }: { loading: boolean; data: LevelListResponse[] } = useRequest(
    async () => {
      const result = await getLevelsList();

      return result;
    },
    {
      onError: () => {},
    }
  );

  const {
    loading: loadingListCenter,
    data: listCenter,
  }: { loading: boolean; data: CentersResponse[] } = useRequest(
    async () => {
      const result = await getCentersList();

      return result;
    },
    {
      onError: () => {},
    }
  );
  const { loading: loadingConsultation, run: runConsultation } = useRequest(
    async (params) => {
      const result = await registerConsultation(params);
      if (result?.code === 204) {
        refModal?.current?.open && refModal.current.open();
      } else {
        toast(
          <ToastComponent
            type="error"
            content="Đăng ký tư vấn không thành công"
          />
        );
      }
      return result;
    },
    {
      manual: true,
      onError: () => {},
    }
  );
  const convertListLevel = listLevel?.map((level) => {
    return {
      label: level?.name,
      value: level?.code,
    };
  });

  const convertListCenter = listCenter?.map((level) => {
    return {
      label: level?.name,
      value: level?.id,
    };
  });

  const onFinish = (values: RegisterConsultationParam) => {
    values.level = values?.level?.toString();
    runConsultation(values);
  };

  return (
    <>
      <Form form={form} className={styles.registerForm} onFinish={onFinish}>
        <Text type="title-24-bold" color="neutral-1" center bottom={20}>
          Nhận thông tin tư vấn
        </Text>

        <div className={styles.form}>
          <div className={styles.registerFormItem}>
            <Field
              name="fullname"
              rules={[
                {
                  required: true,
                  message: t("Họ tên không được để trống"),
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
            <Field
              name="phone"
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
            <Field name="email" rules={[validateEmail(t)]}>
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
            <Field name="level">
              {({ value, onChange }, meta) => {
                return (
                  <Select
                    options={convertListLevel}
                    required
                    placeholder="* học*"
                    value={value}
                    onChange={onChange}
                    meta={meta}
                    icon="/svg/rank.svg"
                    widthIcon={24}
                    heightIcon={24}
                    loading={loadingListLevel}
                  />
                );
              }}
            </Field>
          </div>
          <div className={styles.registerFormItem}>
            <Field name="address">
              {({ value, onChange }, meta) => {
                return (
                  <Select
                    loading={loadingListCenter}
                    options={convertListCenter}
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

        <div>
          <Field>
            {() => {
              return (
                <>
                  <Button
                    htmlType="submit"
                    bottom={24}
                    loading={loadingConsultation}
                  >
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
      <ModalMessage
        title="Cảm ơn bạn đã đăng ký khóa học trung tâm"
        content="Kosei sẽ liên hệ với bạn trong thời gian sớm nhất"
        ref={refModal}
        width={500}
        img="/Images/password-mess.png"
      />
    </>
  );
};

export default RegisterForm;
