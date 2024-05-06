import { useTranslation } from "next-i18next";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.scss";
import RegisterForm from "../RegisterForm";
import { useSaleCountdown } from "@/utils/hooks/countdown";
import Text from "@/components/Text";
import { useEffect, useState } from "react";

const BannerRegister = () => {
  const [time, setTime] = useState({
    days: 2,
    hours: 2,
    minutes: 0,
    seconds: 60,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        const { days, hours, minutes, seconds } = prevTime;
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;
        let newDays = days;

        if (newSeconds === -1) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes === -1) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours === -1) {
          newHours = 23;
          newDays -= 1;
        }
        if (newDays === -1) {
          clearInterval(interval);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };
  return (
    <div className={styles.bannerRegisterWrap}>
      <div className={styles.bannerRegisterContainer}>
        <div className={styles.form}>
          <RegisterForm />
        </div>
        <div className={styles.image}>
          <div className={styles.countDown}>
            <div className={styles.countDownItem}>
              <Text
                type="title-57-bold"
                color="neutral-10"
                className={styles.countDownTime}
              >
                {formatTime(time.days)}
              </Text>
              <Text
                type="body-16-semibold"
                color="neutral-10"
                className={styles.countDownLabel}
              >
                {" "}
                {time.days === 1 ? "Ngày" : "Ngày"}
              </Text>
            </div>

            <div className={styles.countDownItem}>
              <Text
                type="title-57-bold"
                color="neutral-10"
                className={styles.countDownTime}
              >
                {" "}
                {formatTime(time.hours)}
              </Text>
              <Text
                type="body-16-semibold"
                color="neutral-10"
                className={styles.countDownLabel}
              >
                {time.hours === 1 ? "Giờ" : "Giờ"}
              </Text>
            </div>

            <div className={styles.countDownItem}>
              <Text
                type="title-57-bold"
                color="neutral-10"
                className={styles.countDownTime}
              >
                {" "}
                {formatTime(time.seconds)}{" "}
              </Text>
              <Text
                type="body-16-semibold"
                color="neutral-10"
                className={styles.countDownLabel}
              >
                {time.minutes === 1 ? "Phút" : "Phút"}
              </Text>
            </div>
          </div>
          <img src="/Images/banner-register-1.png" alt="banner-register" />
        </div>
      </div>
    </div>
  );
};

export default BannerRegister;
