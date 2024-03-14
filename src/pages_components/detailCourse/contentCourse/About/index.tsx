import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";

const AboutCourse = () => {
  const { t } = useTranslation("common");
  const infos = [
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor sit",
    "Lorem ipsum dolor sit",
  ];
  const requirements = [
    "Thiết bị học tập: Máy tính, máy tính bảng, điện thoại,...",
    "Tải giáo trình của trung tâm",
    "Môi trường học yên tĩnh, đảm bảo độ tập trung",
  ];

  return (
    <div className={styles.AboutCourse}>
      <div className={styles.AboutCourseItem}>
        <Box flex agileItem="agile-center" bottom={10}>
          <Image
            src="/svg/book.svg"
            alt="book"
            layout="fixed"
            width={32}
            height={32}
            style={{ marginRight: 8 }}
          />
          <Text type="title-20-bold" color="neutral-1">
            Tổng quan khoá học
          </Text>
        </Box>
        <Text type="body-16-regular" color="neutral-2">
          Lorem ipsum dolor sit amet consectetur. Tempor neque porta ut cursus
          iaculis interdum orci lacus risus. Lacus iaculis facilisi tincidunt
          odio ligula turpis hendrerit aliquet. Vitae pellentesque non aliquet
          risus elementum nunc. Quis amet est ut lectus tincidunt rhoncus
          viverra tincidunt faucibus. Tortor tellus amet accumsan morbi
          consequat diam posuere duis fames. Et blandit libero netus imperdiet
          interdum vel. Congue velit enim fringilla vitae enim. Velit ipsum
          justo aliquam sed nulla sed. Lacinia massa vitae volutpat nulla eget.
          Ultrices sagittis lacus dolor bibendum amet. Tristique fermentum
          euismod morbi semper eget. Arcu mattis lectus mollis pulvinar aliquet.
          Amet leo aliquam sed dictum condimentum gravida suspendisse adipiscing
          sapien. Vel erat quis cras non id.
        </Text>
      </div>
      <div className={styles.AboutCourseItem}>
        <Box flex agileItem="agile-center" bottom={10}>
          <Image
            src="/svg/folder.svg"
            alt="folder"
            layout="fixed"
            width={32}
            height={32}
            style={{ marginRight: 8 }}
          />
          <Text type="title-20-bold" color="neutral-1">
            Khoá học Online N5 có gì?
          </Text>
        </Box>
        <div className={styles.listItem}>
          {infos.map((info, index) => {
            return (
              <Box
                key={`${info}-${index}`}
                flex
                agileItem="agile-center"
                className={styles.item}
              >
                <Image
                  src="/svg/check-circle-border.svg"
                  alt="rating"
                  layout="fixed"
                  width={20}
                  height={20}
                  style={{ marginRight: 10 }}
                />
                <Text type="body-16-regular" color="neutral-2">
                  {info}
                </Text>
              </Box>
            );
          })}
        </div>
      </div>
      <div className={styles.AboutCourseItem}>
        <Box flex agileItem="agile-center" bottom={10} className={styles.item}>
          <Image
            src="/svg/required.svg"
            alt="required"
            layout="fixed"
            width={32}
            height={32}
            style={{ marginRight: 8 }}
          />
          <Text type="title-20-bold" color="neutral-1">
            Yêu cầu cần có
          </Text>
        </Box>
        <div>
          {requirements.map((info, index) => {
            return (
              <Box
                key={`${info}-${index}`}
                flex
                agileItem="agile-center"
                className={styles.item}
              >
                <Image
                  src="/svg/check-circle-border.svg"
                  alt="rating"
                  layout="fixed"
                  width={20}
                  height={20}
                  style={{ marginRight: 10 }}
                />
                <Text type="body-16-regular" color="dark-500">
                  {info}
                </Text>
              </Box>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutCourse;
