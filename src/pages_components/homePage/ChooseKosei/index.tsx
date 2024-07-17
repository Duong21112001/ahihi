import { useTranslation } from "next-i18next";
import "react-multi-carousel/lib/styles.css";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Image from "next/image";
import { WebContentResponse } from "@/utils/model/homePage";
import { useRequest } from "@umijs/hooks";
import { getWebContent } from "@/service/homePage";
import styles from "./index.module.css";
import img1 from "../../../../public/Images/why1.png";
import img2 from "../../../../public/Images/why2.png";
import img3 from "../../../../public/Images/why3.png";
import img4 from "../../../../public/Images/why4.png";
import icon1 from "../../../../public/Images/icon1.png";
import icon2 from "../../../../public/Images/icon2.png";
import icon3 from "../../../../public/Images/icon3.png";
import icon4 from "../../../../public/Images/icon4.png";
import text1 from "../../../../public/Images/text1.png";
import text2 from "../../../../public/Images/text2.png";
import text3 from "../../../../public/Images/text3.png";
import text4 from "../../../../public/Images/text4.png";
import { delay, inView, motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/utils";
import { once } from "events";

const data = [
  {
    img: img1,
    icon: icon1,
    text: text1,
    title: "Giáo viên có chuyên môn",

    description:
      "Đội ngũ giáo viên là các sensei đều đạt trình độ N1,N2, có kinh nghiệm giảng dạy vững vàng, chuyên môn sư phạm chính là yếu tố quan trọng tạo nên những buổi học chất lượng tại Kosei!",
  },
  {
    img: img2,
    icon: icon2,
    text: text2,

    title: "Học mọi lúc mọi nơi",
    description:
      "Chỉ cần có laptop hoặc thiết bị di động có kết nối internet, học viên có thể học mọi lúc, mọi nơi, tận dụng được thời gian rảnh của mình. Việc chia nhỏ các bài học thành các video ngắn hỗ trợ học viên tiếp nhận cũng như ghi nhớ các bài học một cách thuận tiện hơn.",
  },
  {
    img: img3,
    icon: icon3,
    text: text3,

    title: "Hệ thống đề thi phong phú",
    description:
      "Kosei sở hữu hệ thống đề thi phong phú, chất lượng, phục vụ tốt nhất cho kỳ thi năng lực tiếng Nhật JLPT. Giúp bạn nhận ra ĐIỂM MẠNH cũng như ĐIỂM YẾU, luyện tập và chứng minh năng lực ngoại ngữ.",
  },
  {
    img: img4,
    icon: icon4,
    text: text4,

    title: "Hỗ trợ đa kênh",
    description:
      "Ngoài nội dung, kiến thức Kosei chia sẻ trên koseionline.vn, học viên sẽ được mời tham gia vào các nhóm học tiếng Nhật. Đây là nơi để trao đổi kiến thức, có Sensei hỗ trợ giải đáp mọi thắc mắc hoặc có thể inbox trực tiếp cho Kosei để được hỗ trợ.",
  },
];
const ChooseKosei = () => {
  return (
    <div className={`text-center ${styles.bgWhy} py-20`}>
      <Text type="title-40-bold">Vì sao nên chọn Kosei?</Text>
      <div className="container flex flex-col gap-20 items-center">
        {React.Children.toArray(
          data.map((item, index) => (
            <motion.div
              initial={{ x: -800 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring", delay: 0.1 }}
              className={cn(
                "flex gap-7 items-center",
                index % 2 === 0 ? "" : "flex-row-reverse"
              )}
            >
              <motion.div>
                <Image src={item.img} alt="" className="w-[378px] h-[263px]" />
              </motion.div>
              <motion.div>
                <div className="flex items-center">
                  <Image src={item.icon} alt="" className="w-[57px] h-[58px]" />
                  <Image
                    src={item.text}
                    alt=""
                    className="w-[323px] h-[50px]"
                  />
                </div>
                <Text className="w-[261px] text-left ml-14 mt-4 leading-5">
                  {item.description}
                </Text>
              </motion.div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChooseKosei;
