import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Image from "next/image";

const LandingPageHome = () => {
  const { t } = useTranslation("common");
  const infos = [
    {
      label: "Đa dạng bài học cho từng cấp độ",
      icon: "/svg/exercise.svg",
    },
    {
      label: "Đội ngũ giảng viên ưu tú",
      icon: "/svg/teacher.svg",
    },
    {
      label: "50,000+ học viên đang theo học",
      icon: "/svg/student.svg",
    },
    {
      label: "23,622+ học viên đỗ JLPT",
      icon: "/svg/jlpt.svg",
    },
  ];

  return (
    <div>
      <div className={styles.LandingPage}>
        <div className={styles.LandingPageImage}>
          <img src="/Images/landingpage-background.png" />
        </div>
        <div className={styles.textContent}>
          <p className={styles.title}>Trung tâm tiếng nhật Kosei</p>
          <Text
            type="title-20-bold"
            color="neutral-10"
            maxWidth={587}
            bottom={16}
            className={styles.contentText}
          >
            Hệ thống đào tạo Nhật Ngữ toàn diện hàng đầu Việt Nam
          </Text>
          <Text
            type="body-14-regular"
            color="neutral-9"
            maxWidth={560}
            bottom={32}
            className={styles.descriptionText}
          >
            Lorem ipsum dolor sit amet consectetur. Sagittis tortor enim egestas
            vitae gravida justo. Mi ut eget placerat tellus cras platea. Urna
            euismod egestas augue adipiscing pellentesque vitae id pellentesque.
            Ultricies maecenas quis sed purus dui. Rhoncus montes aliquam
            bibendum egestas pellentesque in diam sit. Purus est placerat
            iaculis.
          </Text>
          <div className={styles.buttons}>
            <Button type="btn-primary">Đăng ký ngay!</Button>
          </div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoWrap}>
          {infos.map((info) => {
            return (
              <div className={styles.info}>
                <Image
                  src={info.icon}
                  alt="logo"
                  layout="fixed"
                  width={46}
                  height={46}
                  style={{ marginBottom: 16 }}
                />
                <Text
                  type="body-16-semibold"
                  color="neutral-10"
                  maxWidth={145}
                  center
                  className={styles.textInfo}
                >
                  {info.label}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPageHome;
