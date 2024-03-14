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
          <img src="/images/bg-footer.png" alt="bg-footer" />
        </div>

        <div className={styles.footerRegisterContainer}>
          <Text
            type="title-40-semiBold"
            color="neutral-10"
            center
            marginAuto
            className={styles.title}
          >
            Đăng kí tư vấn ngay hôm nay để được nhận những ưu đãi tốt nhất
          </Text>
          <Text
            type="body-16-regular"
            color="neutral-10"
            center
            className={styles.textContent}
          >
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
