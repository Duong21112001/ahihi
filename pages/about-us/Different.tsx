import Text from "@/components/Text";
import React from "react";
import img1 from "../../public/Images/imgDif1.png";
import img2 from "../../public/Images/imgDif2.png";
import img3 from "../../public/Images/imgDif3.png";
import img4 from "../../public/Images/imgDif4.png";
import Image from "next/image";
import vector from "../../public/Images/Vector.png";

const data = [
  {
    title: "Đội ngũ giáo viên giàu kinh nghiệm",
    description1:
      "Kosei luôn ưu tiên chất lượng, đặc biệt là chất lượng giảng dạy của giáo viên. Đội ngũ giáo viên tại Kosei đều là chuyên gia dày dặn kinh nghiệm giảng dạy tiếng Nhật.",
    description2:
      "Đảm bảo môi trường học tập đáng tin cậy và chất lượng cho các bạn học viên tại trung tâm.",
    img: img1,
    img1: vector,
    imgStyle: "w-[488px] h-[282px] max-lg:h-[230px]",
  },
  {
    title: "Nắm vững Hán tự",
    description1:
      "Kosei tập trung đào tạo mảng Hán tự để học viên không chỉ nhớ mặt chữ mà còn hiểu nghĩa và biết cách viết chữ theo đúng cách.",
    description2:
      "Kosei cam kết giúp các bạn học viên nắm chắc tất cả các chữ mà họ đã học trong suốt khóa học.",
    img: img2,
    img1: vector,
    imgStyle: "w-[454px] h-[212px]",
  },
  {
    title: "Giao tiếp thành thạo",
    description1:
      "Kosei tạo ra một môi trường hoàn toàn bằng tiếng Nhật trong suốt các giờ học và kết hợp các hoạt động để giúp học viên tiếp cận và áp dụng ngôn ngữ một cách tự tin và thành thạo hơn sau khóa học. ",
    img: img3,
    img1: vector,
    imgStyle: "w-[452px] h-[205px]",
  },
  {
    title: "Đội ngũ giáo viên giàu kinh nghiệm",
    description1:
      "Đội ngũ nhân viên đều là những chuyên gia có kinh nghiệm trong giáo dục và đào tạo tiếng Nhật, với tác phong làm việc chuyên nghiệp.",
    description2:
      'Chúng tôi tự hào với khẩu hiệu "Itsumo niko niko" - "Luôn luôn mỉm cười", cam kết mang đến sự thân thiện và nhiệt tình trong mọi hoạt động. ',
    img: img4,
    img1: vector,
    imgStyle: "w-[387px] h-[215px]",
  },
];

const Different = () => {
  return (
    <div className="container flex flex-col items-center max-lg:min-w-[380px] max-lg:px-6">
      <Text type="title-40-bold" className="max-lg:text-3xl">
        SỰ KHÁC BIỆT
      </Text>
      <Text
        type="body-16-medium"
        className="w-[70%] text-center mt-3 max-lg:w-full"
      >
        Tiếng Nhật đang ngày càng phát triển và được nhiều người yêu thích. Mỗi
        trung tâm đều có những điểm khác biệt riêng và mỗi học viên lại có một
        lý do riêng để lựa chọn trung tâm học phù hợp với mình. Vậy tại sao bạn
        nên chọn Nhật ngữ Kosei? Kosei có điểm đặc biệt gì so với các trung tâm
        khác.
        <br /> Hãy cùng tìm hiểu nhé!
      </Text>
      <div className="flex flex-col gap-16 mt-5">
        {React.Children.toArray(
          data.map((item, index) => (
            <div
              className={`flex items-center justify-between gap-16 max-lg:flex-col ${
                index % 2 === 0 ? "" : "flex-row-reverse"
              }`}
            >
              <div className="flex flex-col gap-5">
                <Text className="bg-gradient-to-b-custom text-white text-[22px] w-fit px-3 py-2 rounded-xl ">
                  {item.title}
                </Text>
                <div className="flex gap-2 items-">
                  <Image
                    src={vector}
                    alt=""
                    width={12}
                    height={15}
                    className="w-3 h-[15px] mt-1"
                  />
                  <Text className="text-left leading-6">
                    {item.description1}
                  </Text>
                </div>
                {item.description2 && (
                  <div className="flex gap-2">
                    <Image
                      src={vector}
                      alt=""
                      width={12}
                      height={15}
                      className="w-3 h-[15px] mt-1"
                    />
                    <Text className="text-left leading-6">
                      {item.description2}
                    </Text>
                  </div>
                )}
              </div>
              <Image src={item.img} alt="" className={`${item.imgStyle}`} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Different;
