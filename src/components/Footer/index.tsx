import Image from "next/image";
import Text from "../Text";
import classNames from "classnames";
import styles from "./index.module.scss";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Script from "next/script";

const Footer = () => {
  const { t } = useTranslation(["footer"]);

  return (
    <div className={styles.container}>
      <Script type="text/javascript" id="tracking_test">
        {` 
    (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
    vgo('setAccount', '1002382778');
    vgo('setTrackByDefault', true);

    vgo('process');`}
      </Script>
      <Script type="text/javascript" id="tracking">
        {`    (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
    vgo('setAccount', '225865633');
    vgo('setTrackByDefault', true);

    vgo('process');`}
      </Script>
      <Image
        src="/svg/hillridge_logo.svg"
        alt="x"
        width={123.5}
        height={24}
        layout="fixed"
      />
      <div className={styles.content}>
        <div className={styles.item}>
          <div className={styles.element}>
            <Text type="body-regular">{t("footer_hillridge_technology")}</Text>
          </div>
          <div className={classNames(styles.element, styles.middle)}>
            <Link href="/privacy_policy" passHref>
              <a>
                <Text type="body-regular">{t("footer_privacy_policy")}</Text>
              </a>
            </Link>
          </div>
          <div className={styles.element}>
            <Link href="/terms_of_use" passHref>
              <a>
                <Text type="body-regular">{t("footer_terms_of_use")}</Text>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <Text type="body-regular" className={styles.info}>
            {t("footer_description")}
          </Text>
        </div>
        <div className={styles.seperator} />
        <div className={styles.icon}>
          <div className={styles.iconContainer}>
            <Link href={"https://twitter.com/hillridgetech"} passHref>
              <a target="_blank">
                <Image
                  src="/svg/twitter.svg"
                  alt="x"
                  width={24}
                  height={24}
                  layout="fixed"
                />
              </a>
            </Link>
          </div>
          <div className={styles.iconContainer}>
            <Link href={"https://www.facebook.com/HillridgeVN"} passHref>
              <a target="_blank">
                <Image
                  src="/svg/facebook.svg"
                  alt="x"
                  width={24}
                  height={24}
                  layout="fixed"
                />
              </a>
            </Link>
          </div>
          <div className={styles.iconContainer}>
            <Link
              href={
                "https://au.linkedin.com/company/hillridge-technology?original_referer=https%3A%2F%2Fwww.google.com%2F "
              }
              target="_blank"
              passHref
            >
              <a target="_blank">
                <Image
                  src="/svg/linked_in.svg"
                  alt="x"
                  width={24}
                  height={24}
                  layout="fixed"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
