import React from "react";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Hover from "./Hover";
import { cn } from "@/utils";

const Introduce = ({ className }: { className?: string }) => {
  return (
    <div className={cn(`${styles.bgr} text-white pt-[500px]`, className)}>
      <div className="container flex flex-col gap-10 max-lg:gap-5 relative max-lg:px-6  max-lg:min-w-[320px]">
        <div className="flex flex-col gap-10 max-lg:gap-4">
          <Text
            type="title-40-bold"
            className="uppercase text-center max-lg:text-xl"
          >
            GIỚI THIỆU về kosei
          </Text>
          <Text type="body-16-medium" className="!font-light">
            Trung tâm tiếng Nhật Kosei đã được thành lập vào ngày 3/3/2014 bởi
            một đội ngũ doanh nhân trẻ, các chuyên gia và các giảng viên uy tín
            trong nước và Nhật Bản. Thông qua việc đào tạo tiếng Nhật, chúng tôi
            muốn các bạn học viên không chỉ học thêm một thứ tiếng mới mà còn
            được tiếp xúc với một nền văn hóa mới. Qua những bài học trên lớp,
            những câu chuyện từ thầy cô, các bạn có thể hiểu hơn về đất nước mặt
            trời mọc, về con người và sự nỗ lực cố gắng giúp Nhật Bản ngày càng
            phát triển.
            <br />
            <br />  Ngoài ra, với việc tập trung đào tạo tiếng Nhật một cách bài
            bản tại Việt Nam cùng các chương trình du học chất lượng cao, chúng
            tôi cũng mong muốn mang đến cho các bạn cơ hội học tập tốt hơn tại
            Nhật. Tại Nhật, bạn không chỉ có thể trau dồi thêm kiến thức mà còn
            học được cách ứng xử, tác phong làm việc chuyên nghiệp của người
            Nhật để sau này phát triển bản thân được tốt hơn.
          </Text>
        </div>
        <div className="flex gap-2 w-full items-center justify-center flex-nowrap">
          <hr className="h-[2px] w-[389px] max-lg:w-[100px]" />
          <Text
            type="title-40-bold"
            className="flex flex-nowrap max-lg:text-lg"
          >
            /社会概要/
          </Text>
          <hr className="h-[2px] w-[389px] max-lg:w-[100px]" />
        </div>
        <div className="flex flex-col gap-10 max-lg:gap-5">
          <Text
            type="title-40-bold"
            className="uppercase text-center max-lg:text-lg"
          >
            tổng quan về kosei
          </Text>
          <Text type="body-16-medium" className="!font-light">
            Tại Kosei, chúng tôi đầu tư kỹ lưỡng từ cơ sở vật chất đến đội ngũ
            giảng viên giàu kinh nghiệm. Hơn 50.000 học viên đã thành thạo tiếng
            Nhật và đỗ JLPT với tỷ lệ trên 90%.
            <br />
            <br />  Kosei nỗ lực nâng cao chất lượng đào tạo tiếng Nhật thông
            qua nghiên cứu phương pháp giảng dạy và cập nhật giáo trình. Chúng
            tôi đang triển khai đào tạo online và offline, mở rộng từ Hà Nội
            sang các tỉnh thành và Nhật Bản, nhằm trở thành đối tác đáng tin cậy
            của các doanh nghiệp và trường đại học.
          </Text>
        </div>
        <Hover className="relative z-30" />
      </div>
    </div>
  );
};

export default Introduce;
