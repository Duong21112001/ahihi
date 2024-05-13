import Image from "next/image";
import React from "react";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { IlistTeacher } from "@/utils/model/teacher";
interface LectureItemProps {
  data: IlistTeacher;
}
const LectureItem: React.FC<LectureItemProps> = ({ data }) => {
  const { image, name, content, id } = data;
  return (
    <div className={styles.embla}>
      <div className={styles.lecturers}>
        <Image
          src={image}
          width={120}
          height={120}
          alt=""
          className={styles.lecturesImage}
        />
        <Text type="heading-h3">{name}</Text>
        <Text type="body-16-bold" color="neutral-3">
          Trình độ:
        </Text>
        <Text type="body-16-medium" color="neutral-4">
          {content}
        </Text>
        <Button type="btn-blue">Xem chi tiết</Button>
      </div>
    </div>
  );
};

export default LectureItem;
