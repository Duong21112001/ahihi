import Image from "next/image";
import Text from "../Text";
import styles from "./index.module.css";
import Link from "next/link";
import Logo from "../../../public/Images/Logo.png";
import call from "../../../public/Images/call.png";
import gmail from "../../../public/Images/gmail.png";
import location from "../../../public/Images/location.png";
import React from "react";
import facebook from "../../../public/Images/_Facebook.png";
import youtube from "../../../public/Images/YouTube - Original.png";
import tiktok from "../../../public/Images/image 8.png";
import mess from "../../../public/Images/messenger icon.png";
import zalo from "../../../public/Images/image 10.png";
const data = [
  {
    title: "Liên hệ",
    styles: "w-auto",
    content: [
      {
        img: call,
        hotline: "Hotline cơ sở 1: 0969 694 098",
      },
      {
        img: call,
        hotline: "Hotline cơ sở 2: 0965 130 415",
      },
      {
        img: call,
        hotline: "Hotline khoá Online: 0966 026 133",
      },
      {
        img: gmail,
        hotline: "nhatngukosei@gmail.com",
      },
    ],
  },
  {
    title: "Địa chỉ",
    styles: "w-[220px]",
    content: [
      {
        img: location,
        hotline: "CS1: Số 136 Lê Trọng Tấn, Khương Mai,Thanh Xuân, Hà Nội",
      },
      {
        img: location,
        hotline:
          "CS2: Số 3 Ngõ 6, Đặng Thuỳ Trâm, Hoàng Quốc Việt, Cầu giấy, Hà Nội",
      },
    ],
  },
];
const ABOUTUS = [
  {
    title: "Giới thiệu trung tâm",
  },
  {
    title: "Tuyển dụng",
  },
  {
    title: "Chia sẻ",
  },
  {
    title: "Sự kiện",
  },
  {
    title: "Chính sách bảo mật",
  },
  {
    title: "Điều khoản & Điều kiện",
  },
];
const SOCIAL = [
  {
    title: "Kết nối với chúng tôi",
    social: [
      {
        img: facebook,
      },
      {
        img: youtube,
      },
      {
        img: tiktok,
      },
    ],
  },
  {
    title: "Nhận tư vấn",
    social: [
      {
        img: mess,
      },
      {
        img: zalo,
      },
    ],
  },
];
const Footer = () => {
  return (
    <>
      <div className={styles.container}>
        <div className=" container !p-0">
          <div
            className={`${styles.top} flex flex-col border-b-[1px] border-[#EDF2F7] pb-8`}
          >
            <Image src={Logo} alt="" width={128} height={128} />
            <div className="ml-7 text-white">
              <div className="flex gap-5 justify-between max-md:flex-col max-lg:grid max-lg:grid-cols-2">
                <>
                  {React.Children.toArray(
                    data.map((item) => (
                      <div className="flex flex-col gap-5 ">
                        <Text type="title-18-bold">{item.title}</Text>
                        {React.Children.toArray(
                          item.content.map((it) => (
                            <div
                              className={`flex gap-2 items-start ${item.styles}`}
                            >
                              <Image
                                src={it.img}
                                alt=""
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                              <Text type="body-16-medium">{it.hotline}</Text>
                            </div>
                          ))
                        )}
                      </div>
                    ))
                  )}
                </>
                <div className="flex flex-col gap-5">
                  <Text type="title-18-bold">Về chúng tôi</Text>
                  {React.Children.toArray(
                    ABOUTUS.map((item) => (
                      <Text type="body-16-medium">{item.title}</Text>
                    ))
                  )}
                </div>
                <div className="flex flex-col gap-8">
                  {React.Children.toArray(
                    SOCIAL.map((item) => (
                      <div className="flex flex-col gap-5">
                        <Text type="body-16-medium">{item.title}</Text>
                        <div className="flex gap-4">
                          {React.Children.toArray(
                            item.social.map((it) => (
                              <Image
                                src={it.img}
                                alt=""
                                width={35}
                                height={35}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <>
            <p className="text-white text-center py-4">
              ©2023 Kosei All Rights are reserved️
            </p>
          </>
        </div>
      </div>
    </>
  );
};

export default Footer;
