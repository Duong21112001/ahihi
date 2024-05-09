import { useRequest } from "@umijs/hooks";
import Text from "@/components/Text";
import Image from "next/image";
import CarouselComponent from "@/components/carousel";
import styles from "./index.module.scss";
import VideoModal from "@/components/VideoModal";
import { ListFeedbackResponse } from "@/utils/model/homePage";
import { getListFeedback } from "@/service/homePage";

const StudentComments = () => {
  const { data } = useRequest<ListFeedbackResponse[]>(() => getListFeedback());
  const itemNumber = data ? data.length : 0;

  const OneComment = () => {
    return (
      <div className={styles.studentCommentsBox}>
        {data
          ? data.map((item: ListFeedbackResponse) => (
              <div className={styles.studentCommentsLeft} key={item.id}>
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
                    Dưới đây là cảm nhận của tất cả các học viên đã theo học tại
                    Kosei từ năm 2014 đến nay, học viên gửi những tâm tư, tình
                    cảm, trải nghiệm học tập và kết quả đạt được trong suốt hành
                    trang theo học tại Kosei.
                  </Text>
                  <div className={styles.boxRating}>
                    <div className={styles.rating}>
                      {[...Array(5)].map((value, key) => {
                        return (
                          <div key={`rating-${key}`}>
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
                      {item.message}
                    </Text>
                    <div className={styles.user}>
                      <Image
                        src={
                          item.user.avatar_path
                            ? item.user.avatar_path
                            : "/svg/no-user.svg"
                        }
                        alt="user-comment"
                        layout="fixed"
                        width={65}
                        height={65}
                        style={{ marginRight: 20 }}
                      />
                      <div style={{ textTransform: "capitalize" }}>
                        <Text type="title-24-bold" color="dark-500" bottom={8}>
                          {item.user.name}
                        </Text>
                        <Text type="body-16-regular" color="gray-500">
                          {item.user.address}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
        <div className={styles.studentCommentsRight}>
          <div className={styles.boxBlue} />
          <div className={styles.videoComment}>
            <VideoModal url="https://youtube.com/embed/n-WbAWqZ7t4" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.studentCommentsPadding}>
      <div className={styles.studentCommentsWrapper}>
        <div className={styles.studentComments}>
          <CarouselComponent
            numberItemShow={1}
            itemNumber={itemNumber}
            classButton={styles.studentCommentsButton}
          >
            <OneComment />
          </CarouselComponent>
        </div>
      </div>
    </div>
  );
};

export default StudentComments;
