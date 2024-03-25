import Text from "@/components/Text";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { useRequest } from "@umijs/hooks";
import { getSocials } from "@/service/course";
import { SocialsResponse } from "@/utils/model/courses";

const Community = () => {
  const {
    loading: loadingSocials,
    data: dataSocials,
  }: {
    loading: boolean;
    data: SocialsResponse[];
  } = useRequest(
    async () => {
      const result = await getSocials();
      return result;
    },
    {
      onError: () => {},
    }
  );
  const { t } = useTranslation("common");
  const New = (props: { data: SocialsResponse }) => {
    const { data } = props;
    return (
      <div className={styles.new}>
        <div className={styles.img}></div>
        <div className={styles.tag}>
          <div className={styles.tagRing}>
            <Image
              src={
                data?.platform === "Facebook"
                  ? "/svg/fb.svg"
                  : data?.platform === "Youtube"
                  ? "/svg/youtube.svg"
                  : "/svg/tiktok.svg"
              }
              alt="fb"
              layout="fixed"
              width={48}
              height={48}
            />
          </div>
          <div className={styles.tagText}>
            <Text type="title-18-semibold" color="dark-500">
              {data?.platform}
            </Text>
          </div>
        </div>
        <Text
          type="title-18-semibold"
          color="neutral-1"
          className={styles.textNew}
        >
          {data?.title}
        </Text>
      </div>
    );
  };

  return (
    <div className={styles.communityWrap}>
      <div className={styles.communityContainer}>
        <div className={styles.title}>
          <Image
            src="/svg/fish-left.svg"
            alt="fish-right"
            layout="fixed"
            width={40}
            height={48}
          />
          <Text type="heading-h2" color="neutral-1" center>
            Cồng đồng tiếng nhật cùng Kosei
          </Text>
          <Image
            src="/Images/fish-right.png"
            alt="fish-right"
            layout="fixed"
            width={70}
            height={52}
          />
        </div>

        <Text
          type="body-16-regular"
          color="neutral-3"
          center
          className={styles.textContent}
        >
          Gần 999+ Video học miễn phí được đăng lên Kosei Youtube channel
        </Text>
        <div className={styles.communityContent}>
          {dataSocials?.map((social) => {
            return <New data={social} key={`social-${social?.id}`} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Community;
