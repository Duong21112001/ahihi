import Text from "@/components/Text";
import styles from "./index.module.css";
import "react-multi-carousel/lib/styles.css";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import vector from "../../../../public/Images/arrow.png";
import React from "react";
import { cn } from "@/utils";
import Carousel from "react-multi-carousel";

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
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1120, min: 480 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 540, min: 300 },
      items: 1,
    },
  };
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
    <div className="container max-xl:min-w-0 max-xl:flex max-xl:flex-col  max-lg:px-5">
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
      <div className="gap-x-[33px] max-xl:gap-x-10">
        <Carousel
          autoPlay
          autoPlaySpeed={3000}
          responsive={responsive}
          infinite={true}
          transitionDuration={500}
          centerMode={false}
          renderArrowsWhenDisabled={true}
          showDots={true}
          className="pb-10 max-lg:pb-5"
        >
          {React.Children.toArray(
            listTeacher.map((item) => (
              <div className={cn("relative", styles.bg)}>
                <div className="border-[#195AE7] border-8 w-fit rounded-full p-2 absolute top-[-20%] left-[18%] max-lg:left-[13%] max-xl:left-[25%]">
                  <img
                    src={`https://kosei-web.eupsolution.net${item.image}`}
                    alt=""
                    width={223}
                    height={223}
                    className="w-[223px] h-[223px] rounded-full object-cover"
                  />
                </div>

                <div className="flex flex-col items-center mt-40">
                  <div className="mt-52 flex flex-col items-center">
                    <Text className="text-[22px] font-bold mb-5">
                      {item.name}
                    </Text>
                    <div className="flex gap-1 items-start">
                      <Text className="leading-6 text-center h-[112px] overflow-auto max-xl:w-[322px]">
                        {item.content}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default Lecturers;
