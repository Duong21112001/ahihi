import React, { useEffect, useState } from "react";
import Text from "@/components/Text";
import styles from "./index.module.css";
import "react-multi-carousel/lib/styles.css";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Facebook from "../../../../public/Images/Facebook - Original.png";
import Youtube from "../../../../public/Images/YouTube - Original.png";
import Tiktok from "../../../../public/Images/TikTok - Original.png";
import bgFb from "../../../../public/Images/bg-fb.png";
import bgYt from "../../../../public/Images/bg-youtube.png";
import bgTt from "../../../../public/Images/bg-tiktok.png";
import { cn } from "@/utils";
interface FanpageProps {
  id: number;
  name: string;
  description: null;
  url: string;
  type: string;
  thumbnail: string;
  status: number;
  created_at: string;
  updated_at: string;
}

const Community = () => {
  const [fanpage, setFanpage] = useState<FanpageProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "https://kosei-web.eupsolution.net/api/fanpages"
        );
        const data = await response.json();
        console.log("fanpage", fanpage);

        if (Array.isArray(data.data)) {
          setFanpage(data.data);
        } else {
          setError("Data received is not an array");
        }
      } catch (err) {
        setError("Failed to fetch banners");
      }
    };

    fetchBanners();
  }, []);

  const getImageByType = (type: string): StaticImageData => {
    switch (type.toLowerCase()) {
      case "facebook":
        return Facebook;
      case "youtube":
        return Youtube;
      case "tiktok":
        return Tiktok;
      default:
        return Facebook;
    }
  };
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
              Cộng đồng tiếng nhật cùng Kosei
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
          <div
            className={cn(
              "max-md:flex-col max-lg:items-center max-mds:w-full !max-lg:grid max-lg:grid-cols-2",
              styles.communityContent
            )}
          >
            {React.Children.toArray(
              fanpage?.map((item) => (
                <Link target="_blank" href={item.url} className={styles.new}>
                  <Image
                    src={`https://kosei-web.eupsolution.net${item.thumbnail}`}
                    className={cn("object-cover", styles.img)}
                    alt={""}
                    width={50}
                    height={50}
                  />
                  <div className={styles.tag}>
                    <div className={styles.tagRing}>
                      <Image
                        src={getImageByType(item.type)}
                        alt=""
                        layout="fixed"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className={styles.tagText}>
                      <Text type="title-18-semibold" color="dark-500">
                        {item.type}
                      </Text>
                    </div>
                  </div>
                  <Text
                    type="title-18-semibold"
                    color="neutral-1"
                    className={styles.textNew}
                  >
                    {item.description}
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
