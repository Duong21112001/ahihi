import React from "react";
import styles from "./index.module.css";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import Text from "@/components/Text";
const ContactForm = () => {
  const { handleSubmit } = useForm();
  const onSubmit = (d: any) => {
    alert(JSON.stringify(d));
  };
  return (
    <form className={styles.contentItem}>
      <Text type="heading-h2" className={styles.text}>
        Liên hệ với chúng tôi
      </Text>
      <div className={styles.content}>
        <div className={styles.inputForm}>
          <input
            type="text"
            placeholder="Họ và tên"
            className={styles.inputItem}
          />

          <input
            type="text"
            placeholder="Địa chỉ email"
            className={styles.inputItem}
          />
          <input type="text" placeholder="Tuổi" className={styles.inputItem} />

          <input
            type="text"
            placeholder="Số điện thoại"
            className={styles.inputItem}
          />
        </div>
        <textarea
          name=""
          id=""
          rows={4}
          cols={50}
          className={styles.inputItem}
        />
        <Button type="btn-blue" onClick={() => onSubmit}>
          Gửi
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
