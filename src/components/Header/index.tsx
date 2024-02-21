import { i18n, useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../Button";
import classNames from "classnames";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
const Header = () => {
  const { t } = useTranslation("header");
  const { t: commonTrans } = useTranslation("common");
  const router = useRouter();
  const [navBarOpen, setnavBarOpen] = useState(false);
  useEffect(() => {
    setnavBarOpen(false);
  }, [router]);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.headerMobile}>
          <div
            className={styles.logoGroup}
            onClick={() => {
              setnavBarOpen(true);
            }}
          >
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.200195 1.5998C0.200195 1.15798 0.558367 0.799805 1.0002 0.799805H17.0002C17.442 0.799805 17.8002 1.15798 17.8002 1.5998C17.8002 2.04163 17.442 2.3998 17.0002 2.3998H1.0002C0.558367 2.3998 0.200195 2.04163 0.200195 1.5998ZM0.200195 7.9998C0.200195 7.55798 0.558367 7.1998 1.0002 7.1998H17.0002C17.442 7.1998 17.8002 7.55798 17.8002 7.9998C17.8002 8.44163 17.442 8.7998 17.0002 8.7998H1.0002C0.558367 8.7998 0.200195 8.44163 0.200195 7.9998ZM0.200195 14.3998C0.200195 13.958 0.558367 13.5998 1.0002 13.5998H17.0002C17.442 13.5998 17.8002 13.958 17.8002 14.3998C17.8002 14.8416 17.442 15.1998 17.0002 15.1998H1.0002C0.558367 15.1998 0.200195 14.8416 0.200195 14.3998Z"
                fill="#151515"
              />
            </svg>

            <Image
              src="/svg/hillridge_logo.svg"
              alt="x"
              layout="fixed"
              width={123.5}
              height={24}
            />
          </div>
          <Button type="btn-default" href="/contact_us">
            {commonTrans("button_contact_us")}
          </Button>
        </header>
        <main className={classNames({ open: navBarOpen })}>
          <div
            className={classNames(styles.containerLink, { open: navBarOpen })}
          >
            <aside className={styles.mobileNavbar}>
              <div
                className={styles.logo}
                onClick={() => {
                  router.push("/");
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8937 6.28516C10.8937 6.28516 10.1383 7.77378 8.707 9.17907C7.64577 10.2204 6.58301 10.8604 6.58301 10.8604V14.6894C6.58301 14.6894 7.98906 14.0341 8.73834 13.7428C9.43258 13.4729 10.8937 12.9951 10.8937 12.9951V6.28516Z"
                    fill="#00A9E6"
                  />
                  <path
                    d="M9.49512 23.6509H21.7864C22.6229 23.6509 23.301 22.9727 23.301 22.1363V18.5825C19.5049 18.5825 15.9481 19.1689 13.2843 20.2348C10.8767 21.1981 9.49512 22.4436 9.49512 23.6509Z"
                    fill="#00BB32"
                  />
                  <path
                    d="M6.58299 0.349609C6.58299 3.97905 3.6302 6.9326 0 6.9326V11.2433C6.01644 11.2433 10.8937 6.36605 10.8937 0.349609H6.58299Z"
                    fill="#FFA200"
                  />
                  <path
                    d="M0.758301 23.6494L1.51447 23.6517H7.98047C7.98047 21.7647 9.66407 20.0528 12.7216 18.8295C15.5597 17.6941 19.3168 17.0695 23.301 17.0695V12.7588C17.1921 12.7588 11.4608 13.9424 7.16314 16.0916C3.03368 18.1552 0.75983 20.8396 0.758301 23.6494Z"
                    fill="#00BB32"
                  />
                  <path
                    d="M0 1.86423V5.41798C2.79911 5.41798 5.06837 3.14872 5.06837 0.349609H1.51462C0.678178 0.349609 0 1.02779 0 1.86423Z"
                    fill="#FFA200"
                  />
                  <path
                    d="M5.06837 15.5096V11.6714C3.5201 12.3671 1.80516 12.7578 0 12.7578V20.5168C0 20.5168 0.650653 18.993 2.45199 17.4057C3.69213 16.3131 5.06837 15.5096 5.06837 15.5096Z"
                    fill="#00A9E6"
                  />
                  <path
                    d="M16.7189 0.349609H12.4082V12.5667C13.786 12.2097 15.228 11.9222 16.7189 11.7081V2.53782V0.349609Z"
                    fill="#00A9E6"
                  />
                  <path
                    d="M21.7867 0.349609H18.2329V2.53782V11.517C19.8806 11.3381 21.5764 11.2433 23.3005 11.2433V1.86423C23.3013 1.02779 22.6231 0.349609 21.7867 0.349609Z"
                    fill="#00A9E6"
                  />
                </svg>

                <svg
                  width="94"
                  height="24"
                  viewBox="0 0 94 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.291504 0.328613H3.42167V9.73823H7.71017V0.328613H10.8403V23.6718H7.71017V12.6161H3.42167V23.6711H0.291504V0.328613Z"
                    fill="#494949"
                  />
                  <path
                    d="M16.534 0.328613V23.6718H13.4038V0.328613H16.534Z"
                    fill="#494949"
                  />
                  <path
                    d="M19.0977 0.328613H22.2278V20.8666H28.0982L27.8046 23.6718H19.0977V0.328613Z"
                    fill="#494949"
                  />
                  <path
                    d="M29.9629 0.328613H33.0931V20.8666H38.9635L38.6699 23.6718H29.9629V0.328613Z"
                    fill="#494949"
                  />
                  <path
                    d="M43.9578 13.0389V23.6718H40.8276V0.328613H45.4319C48.965 0.328613 50.9055 1.78895 50.9055 5.84731V6.81144C50.9055 10.223 49.5835 11.2987 48.5292 11.7001C49.9406 12.3011 50.6815 13.3386 50.6815 16.4871C50.6815 18.4651 50.6463 22.2321 50.9017 23.6718H47.8694C47.5651 22.2429 47.6247 18.371 47.6247 16.7005C47.6247 13.7798 47.2332 13.0389 45.0496 13.0389H43.9578ZM43.9578 10.4302H45.0779C47.1147 10.4302 47.7646 9.47446 47.7646 6.95442V6.05298C47.7646 4.11096 47.3036 2.93734 45.1383 2.93734H43.9578V10.4302Z"
                    fill="#494949"
                  />
                  <path
                    d="M56.5994 0.328613V23.6718H53.4692V0.328613H56.5994Z"
                    fill="#494949"
                  />
                  <path
                    d="M59.1621 0.328613H63.836C68.8256 0.328613 69.792 3.12619 69.792 7.19526V16.2593C69.792 19.8344 69.2048 23.6718 63.7664 23.6718H59.1621V0.328613ZM62.2923 20.989H63.5531C66.1136 20.989 66.6022 19.4338 66.6022 16.7486V6.90548C66.6022 4.52689 66.1794 3.03597 63.55 3.03597H62.293V20.989H62.2923Z"
                    fill="#494949"
                  />
                  <path
                    d="M82.202 23.672H79.747C79.6629 23.2737 79.5933 22.3164 79.5688 21.8064C78.9465 23.4342 77.6046 24 76.0915 24C72.7435 24 71.6562 21.5572 71.6562 17.6953V6.43084C71.6562 2.61179 73.1655 0 76.9655 0C81.517 0 82.1286 3.29685 82.1286 5.99732V6.68621H78.9985V5.87117C78.9985 4.47123 78.8134 2.85416 76.9555 2.85416C75.5128 2.85416 74.8461 3.8114 74.8461 6.00726V17.9859C74.8461 20.0364 75.4118 21.2192 76.8821 21.2192C78.6873 21.2192 79.0612 19.6312 79.0612 16.9873V13.4481H76.7873V10.7407H82.2013V23.672H82.202Z"
                    fill="#494949"
                  />
                  <path
                    d="M92.7341 12.7392H87.4784V20.7932H93.4972L93.085 23.6718H84.2993V0.328613H93.0285V3.2317H87.4784V9.86057H92.7341V12.7392Z"
                    fill="#494949"
                  />
                </svg>
              </div>

              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setnavBarOpen(false);
                }}
                className={styles.closeIcon}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.58579 8L0.292893 1.70711L1.70711 0.292893L8 6.58579L14.2929 0.292893L15.7071 1.70711L9.41421 8L15.7071 14.2929L14.2929 15.7071L8 9.41421L1.70711 15.7071L0.292893 14.2929L6.58579 8Z"
                  fill="#151515"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.292893 0.292893C0.683417 -0.0976312 1.31658 -0.097631 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.097631 15.3166 -0.0976312 15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683417 16.0976 0.292893 15.7071C-0.0976312 15.3166 -0.097631 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.097631 1.31658 -0.0976312 0.683417 0.292893 0.292893Z"
                  fill="#151515"
                />
              </svg>
            </aside>
            <aside className={styles.link}>
              <Link href="/">
                <a
                  className={classNames(
                    [router.asPath === "/" && styles.highlight],
                    styles.a
                  )}
                >
                  {t("header_home")}
                </a>
              </Link>
              <div
                className={classNames(
                  {
                    [styles.highlight]:
                      router.asPath === "/about_us" ||
                      router.asPath === "/press",
                  },
                  styles.a
                )}
              >
                <div className={styles.subTitle}>
                  {t("header_about_us")}
                  <svg
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.14645 6.64645C3.34171 6.45118 3.65829 6.45118 3.85355 6.64645L7.5 10.2929L11.1464 6.64645C11.3417 6.45118 11.6583 6.45118 11.8536 6.64645C12.0488 6.84171 12.0488 7.15829 11.8536 7.35355L7.85355 11.3536C7.75979 11.4473 7.63261 11.5 7.5 11.5C7.36739 11.5 7.24021 11.4473 7.14645 11.3536L3.14645 7.35355C2.95118 7.15829 2.95118 6.84171 3.14645 6.64645Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className={styles.subNavbar}>
                  <Link href="/about_us">
                    <a className={classNames()}>{t("header_what_we_do")}</a>
                  </Link>
                  <Link href="/press">
                    <a className={classNames()}>{t("header_press")}</a>
                  </Link>
                </div>
              </div>
              <Link href="/our_model">
                <a
                  className={classNames(
                    [router.asPath === "/our_model" && styles.highlight],
                    styles.a
                  )}
                >
                  {t("header_our_model")}
                </a>
              </Link>
              <Link href="/buying_cover">
                <a
                  className={classNames(
                    [router.asPath === "/buying_cover" && styles.highlight],
                    styles.a
                  )}
                >
                  {t("header_buying_cover")}
                </a>
              </Link>
              <Link href="/faqs">
                <a
                  className={classNames(
                    [router.asPath === "/faqs" && styles.highlight],
                    styles.a
                  )}
                >
                  {t("header_faqs")}
                </a>
              </Link>
              <div className={classNames(styles.a, styles.ml)}>
                <div className={styles.subTitle}>
                  {i18n?.language === "en" ? "EN" : "VI"}
                  <svg
                    width="15"
                    height="16"
                    viewBox="0 0 15 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.14645 6.64645C3.34171 6.45118 3.65829 6.45118 3.85355 6.64645L7.5 10.2929L11.1464 6.64645C11.3417 6.45118 11.6583 6.45118 11.8536 6.64645C12.0488 6.84171 12.0488 7.15829 11.8536 7.35355L7.85355 11.3536C7.75979 11.4473 7.63261 11.5 7.5 11.5C7.36739 11.5 7.24021 11.4473 7.14645 11.3536L3.14645 7.35355C2.95118 7.15829 2.95118 6.84171 3.14645 6.64645Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className={styles.subNavbar}>
                  <Link href={router.pathname} locale={"vi"}>
                    <a className={classNames()}>Tiếng Việt</a>
                  </Link>
                  <Link href={router.pathname} locale={"en"}>
                    <a className={classNames()}>English</a>
                  </Link>
                </div>
              </div>

              <Button type="btn-outlined" href="/contact_us">
                {commonTrans("button_contact_us")}
              </Button>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Header;
