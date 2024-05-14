import React from "react";
import Text from "@/components/Text";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import Facebook from "../../../../public/Images/Facebook - Original.png";
import Youtube from "../../../../public/Images/YouTube - Original.png";
import Tiktok from "../../../../public/Images/TikTok - Original.png";
import bgFb from "../../../../public/Images/bg-fb.png";
import bgYt from "../../../../public/Images/bg-youtube.png";
import bgTt from "../../../../public/Images/bg-tiktok.png";

const data = [
  {
    title: "Facebook",
    link: "https://www.facebook.com/NhatNguKosei/",
    icon: Facebook,
    img: bgFb,
    desciption:
      "Fanpage Tiếng Nhật Kosei là nơi chia sẻ kiến thức, các sự kiện của Kosei được cập nhật mỗi ngày.",
  },
  {
    title: "Youtube",
    link: "https://www.youtube.com/@TrungtamtiengNhatKoseiVN",
    icon: Youtube,
    img: bgYt,
    desciption:
      "Kênh Youtube Kosei, với 999+ nội dung chia sẻ các kiến thức tiếng Nhật, bí quyết thi đỗ JLPT.",
  },
  {
    title: "Tiktok",
    link: "https://www.facebook.com/NhatNguKosei/",
    icon: Tiktok,
    img: bgTt,
    desciption:
      "Kênh Tiktok Kosei, nơi chia sẽ các tips thi JLPT hiệu quả, nhanh chóng.",
  },
];
const Community = () => {
  return (
    <>
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
            {React.Children.toArray(
              data?.map((item) => (
                <Link target="_blank" href={item.link} className={styles.new}>
                  <Image src={item.img} className={styles.img} alt={""} />
                  <div className={styles.tag}>
                    <div className={styles.tagRing}>
                      <Image
                        src={item.icon}
                        alt=""
                        layout="fixed"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className={styles.tagText}>
                      <Text type="title-18-semibold" color="dark-500">
                        {item.title}
                      </Text>
                    </div>
                  </div>
                  <Text
                    type="title-18-semibold"
                    color="neutral-1"
                    className={styles.textNew}
                  >
                    {item.desciption}
                  </Text>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
