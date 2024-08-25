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
interface UserProfileProps {
  fullname: string;
  birthday: string;
  // city: string;
  address: string;
  gender: string;
  mobile: string;
  email: string;
}

const UpdateProfile = () => {
  const refModal = useRef<PopUpRef>(null);

  const [userProfile, setUserProfile] = useState<UserProfileProps>({
    fullname: "",
    birthday: "",
    address: "",
    gender: "",
    mobile: "",
    email: "",
  });

  const token = getCookie("kosei-token");

  useEffect(() => {
    const savedProfile = getCookie("update_profile");
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile as string));
    } else {
      fetchUserData();
    }
  }, []);

  const fetchUserData = () => {
    setUserProfile({
      fullname: getCookie("fullname") || "",
      birthday: getCookie("birthday") || "",
      address: getCookie("address") || "",
      gender: getCookie("gender") || "Nam",
      mobile: getCookie("mobile") || "",
      email: getCookie("email") || "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!token) {
      console.error("Token not found. Please log in again.");
      return;
    }

    try {
      const result = await update(userProfile);
      console.log("Update successful", userProfile);
      if (result && result.status === 204) {
        refModal?.current?.open && refModal.current.open();

        setCookie("update_profile", JSON.stringify(userProfile));
      } else {
        console.error("Update failed with status:", result?.status);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className={cn("flex flex-col items-center ", styles.bg)}>
      <div className="flex flex-col items-center gap-20 w-full container">
        {/* <div className="mr-8">
          <img
            src="/path/to/default/profile/pic.png"
            alt="Profile"
            className="w-32 h-32 rounded-md object-cover"
          />
          <input type="file" className="mt-2" />
        </div> */}
        <Text type="title-28-bold">Thông tin cá nhân</Text>
        <div className="w-[60%] mx-auto">
          <div className="mb-4">
            <Text type="body-16-semibold">Họ và tên</Text>
            <input
              name="fullname"
              value={userProfile.fullname}
              onChange={handleChange} // <-- Thêm sự kiện này
              className="w-full px-4 py-2 border rounded-md mt-2 outline-blue-500"
              type="text"
            />
          </div>
          <div className="mb-4">
            <Text type="body-16-semibold">Ngày sinh</Text>
            <input
              name="birthday"
              value={userProfile.birthday}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-2 outline-blue-500"
              type="date"
            />
          </div>

          <div className="mb-4">
            <Text type="body-16-semibold">Địa chỉ</Text>
            <input
              name="address"
              value={userProfile.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-2 outline-blue-500"
              type="text"
            />
          </div>
          <div className="mb-4">
            <Text type="body-16-semibold">Giới tính</Text>
            <select
              name="gender"
              value={userProfile.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md mt-2 outline-blue-500"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md mt-2 outline-blue-500"
            onClick={handleUpdate}
          >
            Cập nhật
          </button>
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
