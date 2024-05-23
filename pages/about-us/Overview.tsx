import React from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import img from "../../public/Images/Rectangle 34624235.png";
import avt from "../../public/Images/avatar-lecturers.png";
const Overview = () => {
  return (
    <div className={styles.contentOverview}>
      <Image
        src={img}
        alt=""
        className={styles.imgAbout}
        width={560}
        height={560}
      />
      <div className={styles.content}>
        <Text type="heading-h2">
          Revolutionizing Education Through LMS Solutions.
        </Text>
        <Text type="title-18-regular" color="gray-500">
          Mauris sit amet lacinia est, vitae tristique metus. Nulla facilisi.
          Mauris tempor nibh vitae pulvinar ultricies. Sed malesuada placerat
          metus. Vivamus sagittis arcu elit semper, eget varius turpis posuere.
          Suspendisse ac nibh cursus, dignissim urna a, porttitor nisi
        </Text>
        <div className={styles.user}>
          <Image src={avt} alt="" width={46} height={46} />
          <div>
            <Text type="title-20-regular">Hugh Millie-Yate</Text>
            <Text type="title-18-regular" color="gray-500">
              Vice Principal
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
