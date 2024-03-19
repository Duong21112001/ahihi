import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";
import Rating from "@/components/rating";

const TeacherCourse = () => {
  const { t } = useTranslation("common");
  const infos = [
    {
      label: "Review",
      value: "",
    },
    {
      label: "Số học sinh đang giảng dạy",
      value: 100,
    },
    {
      label: "Số khoá học đang giảng dạy",
      value: 5,
    },
  ];
  const OneTeacher = () => {
    return (
      <div className={styles.oneTeacher}>
        <Box flex agileItem="agile-center" bottom={24}>
          <Image
            src="/images/avatar-lecturers.png"
            alt="avatar"
            layout="fixed"
            width={100}
            height={100}
            style={{ marginRight: 24 }}
          />
          <div>
            <Text type="title-20-bold" color="neutral-1">
              Mai Lan SS
            </Text>
            <Text type="body-16-regular" color="neutral-3">
              Giảng viên
            </Text>
          </div>
        </Box>
        <Text type="body-16-regular" bottom={24}>
          Lorem ipsum dolor sit amet consectetur. Id augue elementum amet sit
          porta in pharetra consectetur. Egestas nec eu mi nibh velit sed nisl
          vitae vitae. In arcu a neque ipsum a tempor neque. Odio erat commodo
          tellus id urna sem mauris. Vehicula mi nunc sed nibh. Pellentesque
          eget lacus integer a. Ipsum eu tincidunt lacus massa porta feugiat.
          Eget tincidunt sem id mauris cursus. Id proin duis molestie
          suspendisse turpis accumsan sed gravida quis. Dignissim enim
          scelerisque cras tortor imperdiet sed ligula risus eget. Vivamus et
          suspendisse quam ac rhoncus nibh. Nulla enim donec feugiat sit.
          Tincidunt id condimentum commodo aliquam. Lacinia nibh erat suscipit
          nulla quam erat velit. Urna felis eu.
        </Text>
        <div className={styles.bottom}>
          {infos.map((info, index) => {
            return (
              <div className={styles.item} key={info.label}>
                <Text type="body-14-regular" color="gray-500" bottom={4}>
                  {info.label}
                </Text>
                {index === 0 && <Rating numberRating={4} />}
                {index !== 0 && (
                  <Text type="body-16-semibold" color="dark-500">
                    {info?.value}
                  </Text>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.teacherCourse}>
      <OneTeacher />
      <OneTeacher />
    </div>
  );
};

export default TeacherCourse;
