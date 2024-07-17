import React from "react";
import vector1 from "../../public/Images/Frame (1).png";
import vector2 from "../../public/Images/Frame (2).png";
import vector3 from "../../public/Images/Frame (3).png";
import Text from "@/components/Text";
import Image from "next/image";
import { cn } from "@/utils";

const data = [
  {
    title: "Sứ mệnh",
    image: vector1,
    imgClass: "w-20 h-20",
    describe:
      "Đem lại các khóa học đa ngôn ngữ chất lượng nhất cho người Việt Nam",
  },
  {
    title: "Tầm nhìn",
    image: vector2,
    imgClass: "w-[122px] h-[79px]",
    describe:
      "Trở thành Hệ thống đào tạo đa ngôn ngữ toàn diện hàng đầu tại Việt Nam",
  },
  {
    title: "Giá trị cốt lõi",
    image: vector3,
    imgClass: "w-20 h-20",
    brand: "Tâm - Tín - Tốc",
    describe:
      "Đem lại các khóa học đa ngôn ngữ chất lượng nhất cho người Việt Nam",
  },
];
const Hover = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-[99px] text-center mb-[75px] max-lg:grid-cols-1 max-lg:gap-10 ",
        className
      )}
    >
      {React.Children.toArray(
        data.map((item) => (
          <div className="bg-white rounded-[18px] flex flex-col items-center p-10 ">
            <Text type="title-28-bold" className="text-[#2770E9]">
              {item.title}
            </Text>
            <Image
              src={item.image}
              alt=""
              className={`object-contain mt-10 ${item.imgClass}`}
            />
            <Text className="text-[#041F4A] my-4" type="body-16-semibold">
              {item.brand}
            </Text>
            <Text
              className="text-[#041F4A] max-w-[227px]"
              type="body-16-medium"
            >
              {item.describe}
            </Text>
          </div>
        ))
      )}
    </div>
  );
};

export default Hover;
