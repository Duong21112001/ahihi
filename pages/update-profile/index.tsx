import Layout from "@/components/Layout";
import { PopUpRef } from "@/components/ModalMessage";
import { update } from "@/service/register";
import { cn } from "@/utils";
import { UpdateProps } from "@/utils/model/register";
import { useRequest } from "@umijs/hooks";
import { getCookie, setCookie } from "cookies-next";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { getUser } from "@/service/user";
import classNames from "classnames";
import Image from "next/image";
import { toast } from "react-toastify";
import ToastComponent from "@/components/Toast";
import { useRecoilState } from "recoil";
import { userProfile } from "@/context/User";
import { imageUrl } from "@/api/constant";
interface UserProfileProps {
  fullname: string;
  birthday: string;
  // city: string;
  address: string;
  gender: string;
  mobile: string;
  email: string;
  // avt: string;
}

const UpdateProfile = () => {
  const refModal = useRef<PopUpRef>(null);
  const [form] = Form.useForm();
  const [user, setUser] = useRecoilState(userProfile);
  const fullName = user?.fullname;

  const token = getCookie("kosei-token");

  const { loading: loadingUploadImage, run: uploadImage } = useRequest(
    async (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        try {
          const response = await fetch(
            "https://kosei-web.eupsolution.net/api/upload",
            {
              method: "POST",
              body: formData,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            form.setFieldValue("avatar", data?.image);
          }
        } catch (error) {}
      }
    },
    {
      manual: true,
      onError: (err: any) => {},
    }
  );
  const { loading: loadingUpdateProfile, run: updateProfile } = useRequest(
    async (values) => {
      const params = {
        fullname: values?.fullname || null,
        birthday: values?.birthday || null,
        gender: values?.gender || null,
        address: values?.address || null,
        mobile: values?.mobile || null,
        email: values?.email || null,
        avatar_path: values?.avatar || null,
      };
      const result = await update(params);

      if (result?.code === 200 || result?.code === 204) {
        const result = await getUser();
        if (result?.[0]?.user) {
          const data = result?.[0]?.user;
          setUser(data);
        }
        // setCookie("update_profile", JSON.stringify(params));

        toast(
          <ToastComponent
            type="success"
            content="Cập nhật thông tin cá nhân thành công"
          />
        );
      } else {
        toast(
          <ToastComponent
            type="error"
            content="Cập nhật thông tin cá nhân thất bại"
          />
        );
      }
      return result;
    },
    {
      manual: true,
      onError: (err: any) => {
        toast(
          <ToastComponent
            type="error"
            content="Cập nhật thông tin cá nhân thất bại"
          />
        );
      },
    }
  );
  useEffect(() => {
    if (user) {
      const values = {
        fullname: user?.fullname,
        birthday: user?.birthday
          ? new Date(user.birthday).toISOString().split("T")[0]
          : undefined,
        mobile: user?.mobile,
        address: user?.address,
        gender: user?.gender === "Female" ? "1" : "0",
        avatar: user?.avatar,
        email: user?.email,
      };
      form.setFieldsValue(values);
    }
  }, [fullName]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadImage(e);
  };

  const onFinish = (values: any) => {
    const converDate = new Date(values.birthday).getTime();
    values.birthday = converDate;
    updateProfile(values);
  };
  const avatar = form.getFieldValue("avatar");
  return (
    <div className={cn("flex gap-10", styles.bg)}>
      <div className="container flex">
        <div className="flex flex-col items-center"></div>
        <div className="flex flex-col items-center gap-5 w-full">
          <Text type="title-28-bold">Thông tin cá nhân</Text>
          <Form form={form} className={styles.profileForm} onFinish={onFinish}>
            <div className={styles.form}>
              <div className="w-full mx-auto">
                <div className={styles.profileFormItem}>
                  <Text
                    type="body-14-semibold"
                    color="neutral-1"
                    className="mb-2"
                  >
                    Ảnh đại diện
                  </Text>
                  <Field name="avatar">
                    {({ value, onChange }, meta) => {
                      return (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="mt-2"
                        />
                      );
                    }}
                  </Field>
                  {avatar && !loadingUploadImage && (
                    <img
                      src={avatar ? `${imageUrl}${avatar}` : ""}
                      alt="Profile"
                      className="w-32 h-32 rounded-md object-cover"
                    />
                  )}
                </div>
              </div>
              <div className={styles.profileFormItem}>
                <Field name="email">
                  {({ value, onChange }, meta) => {
                    return (
                      <TextInput
                        label="Email"
                        placeholder="Email"
                        value={value}
                        onChange={onChange}
                        meta={meta}
                        iconPath="/svg/mail.svg"
                        widthIcon={20}
                        heightIcon={20}
                        className={styles.input}
                        isDisabled={true}
                      />
                    );
                  }}
                </Field>
              </div>
              <div className={styles.profileFormItem}>
                <Field name="fullname">
                  {({ value, onChange }, meta) => {
                    return (
                      <TextInput
                        label="Họ và tên"
                        placeholder="Họ và tên"
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
              <div className={styles.profileFormItem}>
                <Field name="birthday">
                  {({ value, onChange }, meta) => {
                    return (
                      <div>
                        <Text
                          type="body-14-semibold"
                          color="neutral-1"
                          className="mb-2"
                        >
                          Ngày sinh
                        </Text>
                        <div className={styles.birthday}>
                          <Image
                            src="/svg/user-circle.svg"
                            alt="birthday"
                            width={20}
                            height={20}
                            layout="fixed"
                            className={styles.iconBirthday}
                          />
                          <input
                            value={value}
                            onChange={onChange}
                            className={
                              (classNames(
                                "w-full px-4 py-2 border rounded-md mt-2 outline-blue-500"
                              ),
                              styles.datePicker)
                            }
                            type="date"
                          />
                        </div>
                      </div>
                    );
                  }}
                </Field>
              </div>

              <div className={styles.profileFormItem}>
                <Field name="mobile">
                  {({ value, onChange }, meta) => {
                    return (
                      <TextInput
                        label="Số điện thoại"
                        placeholder="Nhập Email"
                        value={value}
                        onChange={onChange}
                        meta={meta}
                        iconPath="/svg/call.svg"
                        className={styles.input}
                      />
                    );
                  }}
                </Field>
              </div>
              <div className={styles.profileFormItem}>
                <Field name="address">
                  {({ value, onChange }, meta) => {
                    return (
                      <TextInput
                        label="Địa chỉ"
                        placeholder="Nhập Địa chỉ"
                        value={value}
                        onChange={onChange}
                        meta={meta}
                        iconPath="/svg/school.svg"
                        className={styles.input}
                      />
                    );
                  }}
                </Field>
              </div>
              <div className={styles.profileFormItem}>
                <Field
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Phương thức thanh toán không được để trống",
                    },
                  ]}
                >
                  {({ value, onChange }, meta) => {
                    return (
                      <Select
                        options={[
                          { label: "Nam", value: "0" },
                          { label: "Nữ", value: "1" },
                        ]}
                        value={value}
                        onChange={onChange}
                        meta={meta}
                        icon="/svg/card.svg"
                        Label="Giới tính"
                        className={styles.selectPayment}
                        placeholder="Giới tính"
                      />
                    );
                  }}
                </Field>
              </div>
            </div>

            <Field>
              {(_, __, { getFieldsError, getFieldValue }) => {
                return (
                  <>
                    <Button
                      htmlType="submit"
                      bottom={24}
                      loading={loadingUpdateProfile}
                      disabled={loadingUpdateProfile}
                      type="btn-blue"
                      className={styles.buttonSubmit}
                    >
                      Cập nhật
                    </Button>
                  </>
                );
              }}
            </Field>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

UpdateProfile.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
