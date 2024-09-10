import Image, { StaticImageData } from "next/image";
import Text from "../Text";
import styles from "./index.module.css";
import Logo from "../../../public/Images/Logo.png";
import call from "../../../public/Images/call.png";
import gmail from "../../../public/Images/gmail.png";
import location from "../../../public/Images/location.png";
import React, { useEffect, useState } from "react";
import Facebook from "../../../public/Images/Facebook - Original.png";
import Youtube from "../../../public/Images/YouTube - Original.png";
import Tiktok from "../../../public/Images/TikTok - Original.png";
import Message from "../../../public/Images/messenger icon.png";
import Zalo from "../../../public/Images/image 10.png";
import Link from "next/link";
import { cn } from "@/utils";
interface FooterProps {
  _token: string;
  site_title: string;
  site_name: string;
  company_name: string;
  hotline: string;
  phone: string;
  email: string;
  address_1: string;
  address_map_1: string;
  address_2: string;
  address_map_2: string;
  address_3: string;
  address_map_3: string;
  fanpage_facebook: string;
  fanpage_tiktok: string;
  fanpage_youtube: string;
  message: string;
  zalo: string;
  popup_event_url: string;
  popup_event: string;
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(
          "https://kosei-web.eupsolution.net/api/home-settings"
        );
        const data = await response.json();

        console.log("Response data:", data);

        if (data.data) {
          setFooterData(data.data);
          console.log("Footer data set:", data.data);
        } else {
          setError("No data received");
          console.log("Error:", "No data received");
        }
      } catch (err) {
        setError("Failed to fetch footer data");
        console.log("Error:", err);
      }
    };

    fetchFooterData();
  }, []);
  // const getImageByType = (type: string): StaticImageData => {
  //   switch (type.toLowerCase()) {
  //     case "facebook":
  //       return Facebook;
  //     case "youtube":
  //       return Youtube;
  //     case "tiktok":
  //       return Tiktok;
  //     default:
  //       return Facebook;
  //   }
  // };
  return (
    <div className={cn("mt-auto", styles.container)}>
      <div className="container !p-0 max-lg:min-w-fit">
        <div
          className={`${styles.top} flex flex-col border-b-[1px] border-[#EDF2F7] pb-8 `}
        >
          <Image src={Logo} alt="Logo" width={128} height={128} />
          <div className="ml-7 text-white">
            <div className="flex gap-5 justify-between w-full">
              {footerData && (
                <div className="flex w-full !justify-between max-md:grid max-md:grid-cols-1 max-md:gap-5 max-lg:grid max-lg:grid-cols-2 max-lg:gap-y-5 max-xl:grid-cols-3">
                  <div className="flex flex-col gap-5">
                    <Text className="text-lg font-bold">Liên hệ</Text>
                    <div className="flex gap-2 items-start">
                      <Image
                        src={call}
                        alt="Call Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <Text type="body-16-medium">
                        Hotline cơ sở 1: {footerData.hotline}
                      </Text>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Image
                        src={call}
                        alt="Call Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <Text type="body-16-medium">
                        Hotline cơ sở 2: {footerData.phone}
                      </Text>
                    </div>

                    <div className="flex gap-2 items-start">
                      <Image
                        src={gmail}
                        alt="Gmail Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <Text type="body-16-medium">{footerData.email}</Text>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 w-[220px]">
                    <Text type="title-18-bold">Địa chỉ</Text>
                    <div className="flex gap-2 items-start">
                      <Image
                        src={location}
                        alt="Location Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <a
                        href={footerData.address_map_1}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text type="body-16-medium">
                          CS1: {footerData.address_1}
                        </Text>
                      </a>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Image
                        src={location}
                        alt="Location Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <a
                        href={footerData.address_map_2}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text type="body-16-medium">
                          CS2: {footerData.address_2}
                        </Text>
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <Text className="text-lg font-bold">Về chúng tôi</Text>
                    <Link href={"/about-us"} className="text-base">
                      Giới thiệu trung tâm
                    </Link>
                    <Link href={"/#"} className="text-base">
                      Tuyển dụng
                    </Link>
                    <Link href={"/#"} className="text-base">
                      Chia sẻ
                    </Link>
                    <Link href={"/#"} className="text-base">
                      Sự kiện
                    </Link>
                    <Link href={"/#"} className="text-base">
                      Chính sách bảo mật
                    </Link>
                    <Link href={"/#"} className="text-base">
                      Điều khoản & Điều kiện
                    </Link>
                  </div>
                  <div>
                    <div>
                      <Text className="text-lg font-bold">
                        Kết nối với chúng tôi
                      </Text>
                      <div className="flex gap-4 my-4">
                        <Link href={footerData.fanpage_facebook}>
                          <Image src={Facebook} alt="" width={35} height={35} />
                        </Link>
                        <Link href={footerData.fanpage_tiktok}>
                          <Image src={Tiktok} alt="" width={35} height={35} />
                        </Link>
                        <Link href={footerData.fanpage_youtube}>
                          <Image src={Youtube} alt="" width={35} height={35} />
                        </Link>
                      </div>
                    </div>
                    <div>
                      <Text className="text-lg font-bold">Nhận tư vấn</Text>
                      <div className="flex gap-4 my-4">
                        <Link href={footerData.message}>
                          <Image src={Message} alt="" width={35} height={35} />
                        </Link>
                        <Link href={footerData.zalo}>
                          <Image src={Zalo} alt="" width={35} height={35} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-white text-center py-4">
          ©2023 Kosei All Rights are reserved️
        </p>
      </div>
    </div>
  );
};

export default Footer;
