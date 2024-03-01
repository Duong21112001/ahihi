import { useTranslation } from "next-i18next";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.scss";
import RegisterForm from "../RegisterForm";
import { useSaleCountdown } from "@/utils/hooks/countdown";
import Text from "@/components/Text";

const BannerRegister = () => {
  const { t } = useTranslation("common");
  const { remain } = useSaleCountdown({
    startDate: new Date("02/27/2024"),
    endDate: new Date("02/29/2024"),
  });
  const countDown = [
    {
      time: remain.days,
      label: "Ngày",
    },
    {
      time: remain.hours,
      label: "Giờ",
    },
    {
      time: remain.minutes,
      label: "Phút",
    },
  ];

  return (
    <div className={styles.bannerRegisterWrap}>
      <div className={styles.bannerRegisterContainer}>
        <div className={styles.form}>
          <div className={styles.icon}>
            <img src="/images/cotton-sheep.png" alt="cotton-sheep" />
          </div>

          <RegisterForm />
        </div>
        <div className={styles.image}>
          <div className={styles.countDown}>
            {countDown.map((item) => {
              return (
                <div className={styles.countDownItem} key={item.label}>
                  <Text
                    type="title-57-bold"
                    color="neutral-10"
                    className={styles.countDownTime}
                  >
                    {item.time}
                  </Text>
                  <Text
                    type="body-16-semibold"
                    color="neutral-10"
                    className={styles.countDownLabel}
                  >
                    {item.label}
                  </Text>
                </div>
              );
            })}
          </div>
          <img src="/images/banner-register-1.png" alt="banner-register" />
        </div>
      </div>
    </div>
  );
};

export default BannerRegister;
