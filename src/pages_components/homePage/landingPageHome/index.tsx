import styles from "./index.module.css";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { ROUTER } from "@/api/constant";
import { useRecoilState } from "recoil";
import { userProfile } from "@/context/User";
import Banner from "./Banner";

const LandingPageHome = () => {
  const [user, setUser] = useRecoilState(userProfile);
  const router = useRouter();
  const infos = [
    {
      label: "Đa dạng bài học cho từng cấp độ",
      icon: "/svg/exercise.svg",
    },
    {
      label: "Đội ngũ giảng viên ưu tú",
      icon: "/svg/teacher.svg",
    },
    {
      label: "50,000+ học viên đang theo học",
      icon: "/svg/student.svg",
    },
    {
      label: "23,622+ học viên đỗ JLPT",
      icon: "/svg/jlpt.svg",
    },
  ];

  return (
    <div>
      <Banner />
      <div className={styles.infoContainer}>
        <div className={styles.infoWrap}>
          {infos.map((info) => {
            return (
              <div className={styles.info} key={info.label}>
                <Image
                  src={info.icon}
                  alt="logo"
                  layout="fixed"
                  width={46}
                  height={46}
                  style={{ marginBottom: 16 }}
                />
                <Text
                  type="body-16-semibold"
                  color="neutral-10"
                  maxWidth={145}
                  center
                  className={styles.textInfo}
                >
                  {info.label}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPageHome;
