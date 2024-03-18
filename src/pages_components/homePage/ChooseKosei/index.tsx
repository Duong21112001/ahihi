import { useTranslation } from "next-i18next";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.scss";
import RegisterForm from "../RegisterForm";
import { useSaleCountdown } from "@/utils/hooks/countdown";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Image from "next/image";

const ChooseKosei = () => {
  const { t } = useTranslation("common");
  const chooseKosei = [
    {
      title: "Lorem ipsum dolor sit amet consectetur. Sit.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdietempus felis vitae sit est quisque. Lorem ipsum dolor sit ametconsectetur adipiscing elit. Imperdiet tempus felis vitae sit estquisque.",
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur. Sit.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdietempus felis vitae sit est quisque. Lorem ipsum dolor sit ametconsectetur adipiscing elit. Imperdiet tempus felis vitae sit estquisque.",
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur. Sit.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdietempus felis vitae sit est quisque. Lorem ipsum dolor sit ametconsectetur adipiscing elit. Imperdiet tempus felis vitae sit estquisque.",
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur. Sit.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdietempus felis vitae sit est quisque. Lorem ipsum dolor sit ametconsectetur adipiscing elit. Imperdiet tempus felis vitae sit estquisque.",
    },
  ];

  return (
    <div className={styles.chooseKoseiWrap}>
      <img
        src="/svg/cloud-small-1.svg"
        alt="cloud-small-1"
        className={styles.cloudSmallLeft}
      />
      <img
        src="/svg/cloud-small-2.svg"
        alt="cloud-small-2"
        className={styles.cloudSmallRight}
      />
      <img
        src="/Images/bird-flower.png"
        alt="bird-flower"
        className={styles.bird}
      />
      <img
        src="/Images/cloud-right.png"
        alt="cloud-right"
        className={styles.cloud}
      />
      <div className={styles.background} />
      <div className={styles.chooseKoseiContainer}>
        <div className={styles.chooseKoseiLeft}>
          <Text
            type="heading-h2"
            color="neutral-1"
            bottom={8}
            className={styles.title}
          >
            Vì sao nên chọn Kosei?
          </Text>
          <Text
            type="body-16-regular"
            color="neutral-4"
            bottom={32}
            className={styles.textContent}
          >
            Lorem ipsum dolor sit amet consectetur. Aenean ac eu facilisi eu id
            diam ultricies nec. Sit eu eget et lectus pellentesque. Vestibulum
            id nisi erat lorem eget. Viverra tellus fermentum lobortis enim eget
            suspendisse. Ante nec aenean ornare feugiat. Faucibus nulla
            fermentum etiam vulputate facilisis. Mattis etiam nunc pellentesque
            odio et elementum lobortis. Arcu massa cursus in lacus malesuada.
          </Text>
          <Button type="btn-primary">Big button</Button>
        </div>
        <div className={styles.chooseKoseiRight}>
          {chooseKosei.map((item, index) => {
            return (
              <div
                className={styles.oneChooseKosei}
                key={`choose-kosei-${item.title}-${index}`}
              >
                <div className={styles.border} />
                <div className={styles.content}>
                  <div className={styles.icon}>
                    <Image
                      src="/svg/chooseKosei.svg"
                      alt="chooseKosei"
                      layout="fixed"
                      width={24}
                      height={34}
                    />
                  </div>
                  <Text type="title-20-semibold" color="neutral-1" bottom={12}>
                    {item.title}
                  </Text>
                  <Text type="body-14-regular" color="gray-500">
                    {item.content}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChooseKosei;
