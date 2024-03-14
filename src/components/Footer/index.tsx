import Image from "next/image";
import Text from "../Text";
import styles from "./index.module.scss";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import DownloadAppFooter from "@/pages_components/homePage/DownloadAppFooter";

const Footer = () => {
  const { t } = useTranslation(["footer"]);
  const menuFooter = [
    {
      title: "Company",
      menu: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "About Us",
          link: "/",
        },
        {
          label: "Our Services",
          link: "/",
        },
        {
          label: "Testimonial",
          link: "/",
        },
        {
          label: "Book a meeting",
          link: "/",
        },
      ],
    },
    {
      title: "Company",
      menu: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "About Us",
          link: "/",
        },
        {
          label: "Our Services",
          link: "/",
        },
        {
          label: "Testimonial",
          link: "/",
        },
        {
          label: "Book a meeting",
          link: "/",
        },
      ],
    },
    {
      title: "Company",
      menu: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "About Us",
          link: "/",
        },
        {
          label: "Our Services",
          link: "/",
        },
        {
          label: "Testimonial",
          link: "/",
        },
        {
          label: "Book a meeting",
          link: "/",
        },
      ],
    },
    {
      title: "Company",
      menu: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "About Us",
          link: "/",
        },
        {
          label: "Our Services",
          link: "/",
        },
        {
          label: "Testimonial",
          link: "/",
        },
        {
          label: "Book a meeting",
          link: "/",
        },
      ],
    },
  ];

  const contacts = [
    {
      icon: "/svg/phone-footer.svg",
      label: "(704) 555-0127",
    },
    {
      icon: "/svg/gmail.svg",
      label: "excellent@example.com",
    },
    {
      icon: "/svg/location.svg",
      label: "3891 Ranchview Dr. Richardson,California 62639",
    },
  ];
  const cards = [
    "/images/Visa.png",
    "/images/Mastercard.png",
    "/images/GooglePay.png",
    "/images/Amex.png",
    "/images/PayPal.png",
  ];

  const socials = [
    {
      icon: "/svg/facebook.svg",
      link: "",
    },
    {
      icon: "/svg/instagram.svg",
      link: "",
    },
    {
      icon: "/svg/twitter.svg",
      link: "",
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.contact}>
              <Image
                src="/images/kosei-logo-footer.png"
                alt="logo"
                layout="fixed"
                width={128}
                height={128}
              />
              <div className={styles.icons}>
                {contacts?.map((contact) => {
                  return (
                    <div key={contact.label} className={styles.iconItem}>
                      <Image
                        src={contact.icon}
                        alt={contact.label}
                        layout="fixed"
                        width={24}
                        height={24}
                        style={{ marginRight: 10 }}
                      />
                      <Text type="body-16-regular" color="neutral-10">
                        {contact.label}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.menu}>
              {menuFooter.map((item) => {
                return (
                  <div className={styles.menuItem} key={item.title}>
                    <Text
                      type="title-18-bold"
                      color="neutral-10"
                      bottom={20}
                      className={styles.menuText}
                    >
                      {item.title}
                    </Text>
                    <div>
                      {item.menu.map((menuItem) => {
                        return (
                          <Link href={menuItem.link} key={menuItem.link}>
                            <Text
                              type="body-16-regular"
                              color="neutral-10"
                              bottom={16}
                            >
                              {menuItem.label}
                            </Text>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.cardImage}>
              {cards.map((card) => {
                return (
                  <Image
                    src={card}
                    alt={card}
                    layout="fixed"
                    width={36}
                    height={24}
                    style={{ marginRight: 10 }}
                    key={card}
                  />
                );
              })}
            </div>
            <Text
              type="body-16-regular"
              color="neutral-10"
              className={styles.TextFooter}
            >
              ©2023 Kosei All Rights are reserved️
            </Text>
            <div className={styles.socialWrap}>
              {socials.map((social) => {
                return (
                  <Link
                    href={social.link}
                    key={social.link}
                    className={styles.social}
                  >
                    <Image
                      src={social.icon}
                      alt={social.icon}
                      layout="fixed"
                      width={20}
                      height={20}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
