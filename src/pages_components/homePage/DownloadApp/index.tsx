import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Image from "next/image";

const DownloadApp = () => {
  return (
    <div className={styles.downloadAppWrap}>
      <div className={styles.downloadAppContainer}>
        <div className={styles.left}>
          <Image
            src="/Images/iPhone.png"
            alt="zoom-out"
            layout="fixed"
            width={426}
            height={510}
          />
        </div>
        <div className={styles.right}>
          <Text type="body-16-semibold" color="main-color-primary" bottom={4}>
            #Ứng dụng
          </Text>
          <Text
            type="heading-h2"
            color="neutral-1"
            bottom={12}
            className={styles.title}
          >
            Tải phiên bản Kosei app ngay!
          </Text>
          <Text
            type="title-18-regular"
            color="neutral-4"
            bottom={32}
            className={styles.textContent}
          >
            Get the mobile version for easy access. the mobile version has more
            features
          </Text>
          <div>
            <Image
              src="/svg/appleStore.svg"
              alt="zoom-out"
              layout="fixed"
              width={142}
              height={48}
              className={styles.appleStore}
            />
            <Image
              src="/Images/google-play.png"
              alt="zoom-out"
              layout="fixed"
              width={142}
              height={48}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
