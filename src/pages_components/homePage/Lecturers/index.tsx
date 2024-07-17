import Text from "@/components/Text";
import styles from "./index.module.css";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { useRef } from "react";
import { useRequest } from "@umijs/hooks";
import { listTeacher } from "./service";
import { IlistTeacher } from "@/utils/model/teacher";
import Button from "@/components/Button";
import { convert } from "html-to-text";
import avt from "../../../../public/Images/avt.png";
import vector from "../../../../public/Images/arrow.png";
import React from "react";
import { cn } from "@/utils";
const data = [
  {
    img: avt,
    name: "NGUYỄN MINH A",
    des: [
      { des1: "Giáo viên phụ trách lớp offline" },
      { des1: "Tốt nghiệp trường Đại học Thương Mại" },
      { des1: "Đạt chứng chỉ JLPT N1" },
    ],
  },
  {
    img: avt,
    name: "NGUYỄN MINH A",
    des: [
      { des1: "Giáo viên phụ trách lớp offline" },
      { des1: "Tốt nghiệp trường Đại học Thương Mại" },
      { des1: "Đạt chứng chỉ JLPT N1" },
    ],
  },
  {
    img: avt,
    name: "NGUYỄN MINH A",
    des: [
      { des1: "Giáo viên phụ trách lớp offline" },
      { des1: "Tốt nghiệp trường Đại học Thương Mại" },
      { des1: "Đạt chứng chỉ JLPT N1" },
    ],
  },
  {
    img: avt,
    name: "NGUYỄN MINH A",
    des: [
      { des1: "Giáo viên phụ trách lớp offline" },
      { des1: "Tốt nghiệp trường Đại học Thương Mại" },
      { des1: "Đạt chứng chỉ JLPT N1" },
    ],
  },
  {
    img: avt,
    name: "NGUYỄN MINH A",
    des: [
      { des1: "Giáo viên phụ trách lớp offline" },
      { des1: "Tốt nghiệp trường Đại học Thương Mại" },
      { des1: "Đạt chứng chỉ JLPT N1" },
    ],
  },
  {
    img: avt,
    name: "NGUYỄN MINH A",
    des: [
      { des1: "Giáo viên phụ trách lớp offline" },
      { des1: "Tốt nghiệp trường Đại học Thương Mại" },
      { des1: "Đạt chứng chỉ JLPT N1" },
    ],
  },
];
const Lecturers = () => {
  return (
    <div className="container max-lg:min-w-fit max-lg:max-w-fit max-lg:px-5">
      <div className="">
        <Text
          type="heading-h2"
          color="shade-primary-5"
          center
          bottom={10}
          className=""
        >
          Đội ngũ giảng viên tại Kosei
        </Text>
        <Text type="body-16-regular" color="neutral-3" center bottom={8}>
          Đội ngũ giảng viên nhiều năm kinh nghiệm và được kiểm chứng bởi hơn
          80.000+ học viên
        </Text>
      </div>
      <div className="grid grid-cols-3 gap-y-[240px] mt-[190px] max-lg:grid-cols-1 max-lg:gap-y-[140px] max-lg:mt-[90px]">
        {React.Children.toArray(
          data.map((item) => (
            <div className={cn("relative", styles.bg)}>
              <div className="border-[#195AE7] border-8 w-fit rounded-full p-2 absolute top-[-20%] left-[14%]">
                <Image src={item.img} alt="" />
              </div>

              <div className="flex flex-col items-center mt-[196px]">
                <Text className="text-[22px] font-bold mb-5">{item.name}</Text>
                {React.Children.toArray(
                  item.des.map((it) => (
                    <div className="flex items-center gap-1">
                      <Image src={vector} alt="" width={6} height={8} />
                      <Text className="leading-6">{it.des1}</Text>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Lecturers;
