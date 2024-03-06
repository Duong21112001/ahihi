import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";
import Breadcrumb from "@/components/Breadcrumb";
import BuyCourses from "@/components/BuyCourses";

const LandingPageCourse = () => {
  const { t } = useTranslation("common");
  const infos = [
    {
      label: "Giảng viên",
      value: "Nguyễn Thị Thu Hương",
    },
    {
      label: "Cập nhật gần nhất",
      value: "03/2024",
    },
    {
      label: "Học viên đã đăng ký",
      value: "5.7K",
    },
  ];
  const breadcrumb = [
    {
      label: "Khoá học",
      link: "/",
    },
    {
      label: "Khoá học N5",
      link: "/course_detail",
    },
  ];

  return (
    <div className={styles.LandingPageCourse}>
      <div className={styles.LandingPageImage}>
        <img src="/Images/landing-page-course.png" />
      </div>
      <img
        src="/images/cloud-right.png"
        alt="cloud-right"
        className={styles.cloud}
        width={200}
      />
      <div className={styles.textContent}>
        <div className={styles.left}>
          <div className={styles.breadcrumb}>
            <Breadcrumb breadcrumbs={breadcrumb} />
          </div>

          <Text
            className={styles.title}
            type="heading-h1"
            bottom={24}
            color="neutral-10"
          >
            Khoá học tiếng nhật N5 Online
          </Text>
          <Text
            type="body-14-medium"
            color="neutral-8"
            bottom={4}
            className={styles.contentText}
          >
            Khoá học N5 Online tại Kosei cung cấp đầy đủ kiến thức gồm Từ vựng –
            Kanji – Ngữ pháp – Đọc hiểu và Nghe hiểu. Bài giảng luôn kèm theo
            cách sử dụng từ vựng và các ví dụ minh hoạ sinh động, áp dụng từ mới
            vào các mẫu ngữ pháp để đạt hiệu quả ghi nhớ cao. Bên cạnh đó, các
            tips hoặc mẹo làm bài theo từng dạng đề sẽ giúp học viên dễ dàng
            vượt qua kỳ thi JLPT N5. Khoá học này không chỉ giúp học viên đạt
            được mục tiêu JLPT mà còn hướng tới việc ứng dụng tiếng Nhật trong
            giao tiếp đời thường và trong công việc.
          </Text>
          <Text
            type="tag-12-regular"
            color="neutral-10"
            className={styles.seeMore}
          >
            Xem thêm
          </Text>
          <Box flex agileItem="agile-center" bottom={16}>
            <Box flex agileItem="agile-center">
              {[...Array(5)].map(() => {
                return (
                  <Image
                    src="/svg/rating.svg"
                    alt="rating"
                    layout="fixed"
                    width={35}
                    height={35}
                    style={{ marginRight: 4 }}
                  />
                );
              })}
            </Box>
            <Text type="body-14-regular" color="neutral-10">
              (100 đánh giá)
            </Text>
          </Box>
          <div className={styles.infoCourse}>
            {infos.map((info) => {
              return (
                <div key={info.label} className={styles.infoItem}>
                  <Text type="body-14-regular" color="neutral-10" bottom={8}>
                    {info.label}
                  </Text>
                  <Text type="body-16-semibold" color="neutral-10">
                    {info.value}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.right}>
          <BuyCourses />
        </div>
      </div>
    </div>
  );
};

export default LandingPageCourse;
