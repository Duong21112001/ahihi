import { useTranslation } from "next-i18next";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";
import Button from "../Button";
import { useRouter } from "next/router";
import { Course } from "@/utils/model/courses";
import { getCookie } from "cookies-next";
import VideoModal from "../VideoModal";

interface BuyCoursesProps {
  course: Course;
}

const BuyCourses = ({ course }: BuyCoursesProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const infos = [
    {
      icon: "/svg/camera-video.svg",
      label: "Video theo yêu cầu 5 giờ",
    },
    {
      icon: "/svg/download.svg",
      label: "Hơn 30 tài nguyên có thể tải xuống",
    },
    {
      icon: "/svg/font-rectangle.svg",
      label: "Tiếng Việt - Nhật",
    },
    {
      icon: "/svg/clock-rectangle.svg",
      label: "Truy cập trọn đời",
    },
    {
      icon: "/svg/mobile.svg",
      label: "Truy cập trên thiết bị di động và TV",
    },
    {
      icon: "/svg/file-3.svg",
      label: "10+ Tài liệu học tập",
    },
    {
      icon: "/svg/medal.svg",
      label: "Chứng chỉ khoá học",
    },
  ];
  const discount = course?.discount_value;
  const price = course?.cou_price;
  const token = getCookie("kosei-token");
  return (
    <div className={styles.buyCourseWrap}>
      <div className={styles.buyCourse}>
        {!course?.youtube_link ? (
          <VideoModal url="https://youtube.com/embed/CSwvnpY_dnc" />
        ) : course?.image ? (
          <img src={course.image} alt="course" className={styles.img} />
        ) : (
          <img
            src="https://koseionline.vn/uploads/Clip-Promo.png"
            alt="course"
            className={styles.img}
          />
        )}

        <div className={styles.video}></div>

        <Text type="heading-h2" color="neutral-1" bottom={8}>
          {discount ? (((100 - discount) * price) / 100).toFixed(0) : price}đ
        </Text>
        {course?.discount_value && (
          <Box flex agileItem="agile-center" bottom={32}>
            <Text
              type="title-18-regular"
              color="neutral-5"
              right={8}
              className={styles.price}
            >
              {course?.cou_price} đ
            </Text>
            <div className={styles.sale}>
              <Text type="body-14-regular" color="neutral-10">
                Giảm giá {discount}%
              </Text>
            </div>
          </Box>
        )}

        <Button
          type="btn-primary"
          bottom={16}
          onClick={() =>
            router.push(
              token
                ? {
                    pathname: "/payment",
                    query: { id: course?.cat_id },
                  }
                : {
                    pathname: "/login",
                  }
            )
          }
        >
          Đăng ký ngay!
        </Button>
        <Button type="btn-secondary" bottom={21}>
          Liên hệ tư vấn
        </Button>
        <img
          src="/Images/cloud-right-3.png"
          alt="cloud-left"
          className={styles.cloudLeft}
        />
        <img
          src="/svg/cloud-small-2.svg"
          alt="cloud-right"
          className={styles.cloudRight}
        />
      </div>
      {/* <div className={styles.infos}>
        <Text type="title-20-bold" color="neutral-1" bottom={10}>
          Khoá học này gồm có
        </Text>
        <div className={styles.listInfo}>
          {infos.map((info, index) => {
            return (
              <div
                className={styles.infoItem}
                key={`buy-${info.label}-${index}`}
              >
                <Image
                  src={info.icon}
                  alt={info.icon}
                  layout="fixed"
                  width={20}
                  height={20}
                  style={{ marginRight: 10 }}
                />
                <Text type="body-16-regular" color="neutral-1">
                  {info.label}
                </Text>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default BuyCourses;
