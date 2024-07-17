import React from "react";
import Text from "@/components/Text";
import ios from "../../public/Images/Frame 427320409.png";
import android from "../../public/Images/Frame 427320410.png";
import Image from "next/image";
import qr from "../../public/Images/Kosei_qrcode.png";
import phone from "../../public/Images/phone.png";
import Link from "next/link";
const Download = () => {
  return (
    <div className="bg-[rgb(238,245,255)] ">
      <div className="container flex items-center relative max-lg:min-w-[380px]">
        <div className="max-lg:mx-auto">
          <Text type="title-32-bold"> Tải ứng dụng ngay</Text>
          <Text type="body-14-medium" className="text-[#98A5AE] mt-2 mb-8">
            Đã có sẵn trên App Store và Google Play
          </Text>
          <div className="flex gap-2 items-center">
            <Link
              href={
                "https://apps.apple.com/vn/app/kosei-online/id6502620494?l=vi"
              }
              target="_blank"
            >
              <Image src={ios} alt="" width={150} height={55} />
            </Link>
            <Link
              href={
                "https://play.google.com/store/search?q=kosei&c=apps&hl=vi-VN"
              }
              target="_blank"
            >
              <Image src={android} alt="" width={162} height={55} />
            </Link>
          </div>
        </div>
        <Image
          src={qr}
          alt=""
          className="w-[150px] h-[150px] ml-[200px] max-lg:hidden"
        />
        <div>
          <Image
            src={phone}
            alt=""
            className="w-[373px] pb-[-60px] absolute bottom-0 right-0 max-lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Download;
