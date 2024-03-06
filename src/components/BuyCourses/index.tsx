import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";
import Button from "../Button";

const BuyCourses = () => {
  const { t } = useTranslation("common");
  const infos = [
    {
      icon: "/svg/donate-coin.svg",
      label: "Hoàn tiền nếu không hài lòng",
    },
    {
      icon: "/svg/browser.svg",
      label: "100 bài giảng đa dạng, 200 giờ học",
    },
    {
      icon: "/svg/online-learning.svg",
      label: "Học Online, mọi lúc mọi nơi",
    },
  ];

  return (
    <div className={styles.form}>
      <Box flex agileItem="agile-center" bottom={12}>
        <Image
          src="/svg/oclock.svg"
          alt="oclock"
          layout="fixed"
          width={24}
          height={24}
          style={{ marginRight: 8 }}
        />
        <Text type="body-16-semibold" color="main-color-secondary">
          Giá ưu đãi chỉ còn 1 ngày
        </Text>
      </Box>
      <Box flex agileItem="agile-flex-end" bottom={14}>
        <Text type="heading-h2" color="neutral-1" right={8}>
          599,000 đ
        </Text>
        <Text
          type="title-20-regular"
          color="neutral-6"
          className={styles.price}
        >
          899,000 đ
        </Text>
      </Box>
      <Box bottom={10}>
        {infos.map((info) => {
          return (
            <Box flex agileItem="agile-center" bottom={15} key={info.label}>
              <Image
                src={info.icon}
                alt={info.icon}
                layout="fixed"
                width={24}
                height={24}
                style={{ marginRight: 13 }}
              />
              <Text type="body-14-medium" color="neutral-2">
                {info.label}
              </Text>
            </Box>
          );
        })}
      </Box>
      <div>
        <Button type="btn-primary" bottom={12}>
          <Text type="body-16-semibold" color="neutral-10">
            Đăng kí ngay
          </Text>
        </Button>
        <Text type="tag-12-medium" color="neutral-4" bottom={12} center>
          hoặc
        </Text>
        <Button type="btn-secondary" className={styles.button}>
          <Image
            src="/svg/callRed.svg"
            alt="oclock"
            layout="fixed"
            width={24}
            height={24}
            style={{ marginRight: 4 }}
          />
          <Text type="body-14-semibold" color="main-color-secondary">
            Nhận tư vấn ngay
          </Text>
        </Button>
      </div>
    </div>
  );
};

export default BuyCourses;
