import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import "react-multi-carousel/lib/styles.css";
import Text from "@/components/Text";
import Button from "@/components/Button";

const FooterRegister = () => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.footerRegisterPadding}>
      <div className={styles.footerRegisterWrap}>
        <div className={styles.footerBackground}>
          <img src="/images/bg-footer.png" />
        </div>

        <div className={styles.footerRegisterContainer}>
          <Text
            type="title-40-semiBold"
            color="neutral-10"
            center
            maxWidth={700}
            marginAuto
            bottom={23}
          >
            Đăng kí tư vấn ngay hôm nay để được nhận những ưu đãi tốt nhất
          </Text>
          <Text type="body-16-regular" color="neutral-10" center bottom={64}>
            20k+ students daily learn with Eduvi. Subscribe for new courses.
          </Text>
          <Button type="btn-primary" width="411px">
            Đăng ký ngay!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FooterRegister;
