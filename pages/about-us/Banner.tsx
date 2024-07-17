import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import banner from "../../public/Images/contentbanner.png";

const Banner = () => {
  return (
    <div
      className={`${styles.bg} flex items-center justify-center mb-[-500px]`}
    >
      <Image src={banner} alt={""} className="" width={1055} height={641} />
    </div>
  );
};

export default Banner;
