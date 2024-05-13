import { useTranslation } from "next-i18next";
import "react-multi-carousel/lib/styles.css";
import styles from "./index.module.scss";
import RegisterForm from "../RegisterForm";
import { useSaleCountdown } from "@/utils/hooks/countdown";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Image from "next/image";
import { WebContentResponse } from "@/utils/model/homePage";
import { useRequest } from "@umijs/hooks";
import { getWebContent } from "@/service/homePage";

const ChooseKosei = () => {
  const { t } = useTranslation("common");

  const { data } = useRequest<WebContentResponse[]>(() =>
    getWebContent("why_kosei")
  );

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
      {data
        ? data.map((item) => (
            <div className={styles.chooseKoseiContainer} key={item.id}>
              <div className={styles.chooseKoseiLeft}>
                <Text
                  type="heading-h2"
                  color="neutral-1"
                  bottom={8}
                  className={styles.title}
                >
                  {item.title}
                </Text>
                <Text
                  type="body-16-regular"
                  color="neutral-4"
                  bottom={32}
                  className={styles.textContent}
                >
                  {item.text}
                </Text>
                <Button type="btn-primary">Big button</Button>
              </div>
              <div className={styles.chooseKoseiRight}>
                {item.content
                  ? item.content.map((it: any, index: number) => (
                      <div
                        className={styles.oneChooseKosei}
                        key={`choose-kosei-${it.title}-${index}`}
                      >
                        <div className={styles.border} />
                        <div className={styles.content}>
                          <div className={styles.icon}>
                            <Image
                              src={it.icon}
                              alt="chooseKosei"
                              layout="fixed"
                              width={24}
                              height={34}
                            />
                          </div>
                          <Text
                            type="title-20-semibold"
                            color="neutral-1"
                            bottom={12}
                          >
                            {it.title}
                          </Text>
                          <Text type="body-14-regular" color="gray-500">
                            {it.content}
                          </Text>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ChooseKosei;
