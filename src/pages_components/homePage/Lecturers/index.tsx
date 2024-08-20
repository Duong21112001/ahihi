import Text from "@/components/Text";
import styles from "./index.module.css";
import "react-multi-carousel/lib/styles.css";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
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
interface TeacherProps {
  name: string;
  content: string;
  facebook: string;
  instagram: null;
  twitter: null;
  image: string;
}
const Lecturers = () => {
  const [listTeacher, setListTeacher] = useState<TeacherProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "https://kosei-web.eupsolution.net/api/teachers"
        );
        const data = await response.json();
        console.log("data=====", data.data);

        if (Array.isArray(data.data)) {
          setListTeacher(data.data);
        } else {
          setError("Data received is not an array");
        }
      } catch (err) {
        setError("Failed to fetch banners");
      }
    };

    fetchBanners();
  }, []);
  return (
    <div className="container max-xl:min-w-fit max-lg:max-w-fit max-xl:flex max-xl:flex-col max-xl:items-center max-lg:px-5">
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
      <div className="grid grid-cols-3 gap-y-[140px] gap-x-[33px] mt-[190px] max-lg:grid-cols-1 max-xl:gap-y-[140px] max-xl:mt-[150px] max-xl:grid-cols-2 max-xl:gap-x-10">
        {React.Children.toArray(
          listTeacher.map((item) => (
            <div className={cn("relative", styles.bg)}>
              <div className="border-[#195AE7] border-8 w-fit rounded-full p-2 absolute top-[-20%] left-[14%]">
                <Image
                  src={`https://kosei-web.eupsolution.net${item.image}`}
                  alt=""
                  width={223}
                  height={223}
                  className="w-[223px] h-[223px] rounded-full object-cover"
                />
              </div>

              <div className="flex flex-col items-center mt-[196px]">
                <Text className="text-[22px] font-bold mb-5">{item.name}</Text>
                <div className="flex gap-1">
                  <Image
                    src={vector}
                    alt=""
                    width={6}
                    height={8}
                    className="h-fit"
                  />
                  <Text className="leading-6 w-[266px] text-center">
                    {item.content}
                  </Text>
                </div>
                {/* {React.Children.toArray(
                  item.des.map((it) => (
                    <div className="flex items-center gap-1">
                      <Image src={vector} alt="" width={6} height={8} />
                      <Text className="leading-6">{it.des1}</Text>
                    </div>
                  ))
                )} */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Lecturers;
