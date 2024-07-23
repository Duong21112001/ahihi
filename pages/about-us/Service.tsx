import Text from "@/components/Text";
import React from "react";
import styles from "./index.module.css";
import img1 from "../../public/Images/Frame (4).png";
import img2 from "../../public/Images/Frame (5).png";
import img3 from "../../public/Images/Frame (6).png";
import img4 from "../../public/Images/Asset 6 1.png";
import Image from "next/image";
const data = [
  {
    id: 1,
    title: "Đào tạo tiếng Nhật",
    describe1:
      "Trung tâm tiếng Nhật Kosei đào tạo từ sơ cấp đến cao cấp, phù hợp với nhiều đối tượng học viên.",
    describe2:
      "Các lớp học khai giảng thường xuyên hàng tháng với thời gian linh hoạt. Kosei cũng tổ chức các lớp học tiếng Nhật cấp tốc đáp ứng yêu cầu của học viên.",
    img: img1,
    imgStyle: "w-[114px] h-[177px]",
  },
  {
    id: 2,
    title: "Đào tạo nguồn nhân lực chất lượng cao",
    describe1:
      "Đào tạo tiếng Nhật từ cơ bản đến nâng cao và cung cấp tài liệu chuyên ngành phù hợp với các công việc thực tế.",
    describe2:
      "Học viên được huấn luyện về hán tự để dịch thuật và giao tiếp văn phòng, văn hóa công sở Nhật Bản.",
    img: img2,
    imgStyle: "w-[133px] h-[176px]",
  },
  {
    id: 3,
    title: "Du học chất lượng cao",
    describe1:
      "Tuyển chọn các bạn học sinh, sinh viên có mong muốn du học tại Nhật để học tập và trau dồi kiến thức, kỹ thuật tiên tiến nhất.",
    describe2:
      "Chương trình bao gồm đào tạo tiếng Nhật bài bản tại Kosei và cung cấp các lựa chọn du học sang Nhật với mức chi phí hợp lý nhất.",
    img: img3,
    imgStyle: "w-[149px] h-[170px]",
  },
  {
    id: 4,
    title: "Hoạt động biên phiên dịch",
    describe1:
      "Kosei có đội ngũ phiên dịch viên giàu kinh nghiệm, đến từ các trường Đại học danh tiếng. Hoạt động biên phiên dịch mở rộng vào nhiều ngành nghề khác nhau.",
    describe2:
      "Chúng tôi có kinh nghiệm trong biên phiên dịch tại nhiều lĩnh vực và được đánh giá cao bởi khách hàng.",
    img: img4,
    imgStyle: "w-[126px] h-[170px]",
  },
];
const Service = () => {
  return (
    <div className="bg-[#F7FBFF] text-center relative">
      <Text
        type="title-40-bold"
        className=" mb-[190px] pt-8 max-lg:mb-5 max-lg:text-3xl max-md:text-xl"
      >
        CÁC DỊCH VỤ – HOẠT ĐỘNG CỦA KOSEI
      </Text>
      <div className={styles.bgFilter}>
        <div className="absolute top-32 z-10 grid grid-cols-2 gap-10 max-lg:static max-lg:p-6 max-lg:grid-cols-1">
          {data.map((item) => (
            <div
              key={item.id}
              className="w-[530px] flex items-end text-left pl-10 pr-5 py-14  border-r-8 border-b-8 border-[#2770E9] bg-white rounded-3xl shadow-xl max-lg:w-fit max-lg:flex-col max-lg:items-center"
            >
              <div>
                <div className="flex items-end">
                  <Text className="rounded-full flex justify-center  items-center text-white bg-[#2770E9] w-8 h-8">
                    {item.id}
                  </Text>
                  <hr className="w-[136px] h-[3px] bg-[#2770E9]" />
                </div>
                <Text type="title-20-bold" className="my-2 w-[230px]">
                  {item.title}
                </Text>
                <div className=" text-base ">
                  <p>{item.describe1}</p>
                  <br />
                  <p>{item.describe2}</p>
                </div>
              </div>
              <Image src={item.img} alt="" className={`${item.imgStyle}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
