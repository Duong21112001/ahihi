import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import "react-multi-carousel/lib/styles.css";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";

const DownloadAppFooter = () => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.downloadAppWrap}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Text type="heading-h3" color="neutral-1" bottom={8}>
            Tải ứng dụng ngay
          </Text>
          <Text type="body-14-medium" color="gray-500" bottom={32}>
            Đã có sẵn trên App Store và Google Play
          </Text>
          <Box flex agileItem="agile-center">
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
          </Box>
        </div>
        <Box
          agileItem="agile-center"
          justContent="content-beetween"
          flex
          className={styles.right}
        >
          <Image
            src="/Images/qr-code.png"
            alt="zoom-out"
            layout="fixed"
            width={132}
            height={132}
            className={styles.qrCode}
          />
          <Image
            src="/Images/phones.png"
            alt="zoom-out"
            layout="fixed"
            width={357}
            height={244}
            className={styles.phones}
          />
        </Box>
      </div>
    </div>
  );
};

export default DownloadAppFooter;
