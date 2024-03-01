import { useTranslation } from "next-i18next";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Image from "next/image";
import CarouselComponent from "@/components/carousel";
import styles from "./index.module.scss";
import Video from "@/components/Video";

const StudentComments = () => {
  const { t } = useTranslation("common");
  const OneComment = () => {
    return (
      <div className={styles.studentCommentsBox}>
        <div className={styles.studentCommentsLeft}>
          <div>
            <Text type="heading-h2" bottom={10} className={styles.title}>
              Cảm nhận của học viên
            </Text>
            <Text
              type="body-16-regular"
              color="gray-500"
              bottom={32}
              maxWidth={500}
              className={styles.textContent}
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters.
            </Text>
            <div className={styles.boxRating}>
              <div className={styles.rating}>
                {[...Array(5)].map(() => {
                  return (
                    <div>
                      <Image
                        src="/svg/rating.svg"
                        alt="rating"
                        layout="fixed"
                        width={29}
                        height={29}
                        style={{ marginRight: 5 }}
                      />
                    </div>
                  );
                })}
              </div>
              <Text type="title-18-regular" color="dark-500" bottom={41}>
                Pinmay online learning platform. I am really glad to be a member
                of this online classes
              </Text>
              <div className={styles.user}>
                <Image
                  src="/images/user-comment.png"
                  alt="user-comment"
                  layout="fixed"
                  width={65}
                  height={65}
                  style={{ marginRight: 20 }}
                />
                <div>
                  <Text type="title-24-bold" color="dark-500" bottom={8}>
                    Smith Johnson
                  </Text>
                  <Text type="body-16-regular" color="gray-500">
                    London, United Kingdom
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.studentCommentsRight}>
          <div className={styles.boxBlue} />
          <div>
            <Video
              url="https://www.youtube.com/watch?v=n-WbAWqZ7t4"
              width="100%"
              className={styles.videoComment}
              height="560px"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.studentCommentsPadding}>
      <div className={styles.studentCommentsWrapper}>
        <div className={styles.studentComments}>
          <CarouselComponent numberItemShow={1} itemNumber={2}>
            <OneComment />
            <OneComment />
          </CarouselComponent>
        </div>
      </div>
    </div>
  );
};

export default StudentComments;
