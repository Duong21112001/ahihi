import Text from "@/components/Text";
import React from "react";
import styles from "./index.module.scss";
import Button from "@/components/Button";
const Amount = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.title}>
        <Text type="heading-h1">Apply For Admission</Text>
        <Text className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod
          non arcu nec volutpat.
        </Text>
      </div>
      <Button>Đăng ký ngay</Button>
    </div>
  );
};

export default Amount;
