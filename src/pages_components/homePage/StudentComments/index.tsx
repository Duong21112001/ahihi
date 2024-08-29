import { useRequest } from "@umijs/hooks";
import Text from "@/components/Text";
import Image from "next/image";
import CarouselComponent from "@/components/carousel";
import styles from "./index.module.css";
import VideoModal from "@/components/VideoModal";
import { ListFeedbackResponse } from "@/utils/model/homePage";
import { getListFeedback } from "@/service/homePage";
import avt from "../../../../public/Images/avtcmt.png";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";

interface CommentProps {
  id: number;
  user_id: null;
  message: string;
  created_at: string;
  updated_at: string;
  name: string;
  job: string;
  avatar: string;
  status: number;
}
const StudentComments = () => {
  const [listComment, setListComment] = useState<CommentProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 769 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 480 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
    },
  };
  const OneComment = () => {
    useEffect(() => {
      const fetchBanners = async () => {
        if (!loading) {
          setLoading(true);
          try {
            const response = await fetch(
              "https://kosei-web.eupsolution.net/api/feedbacks"
            );
            const data = await response.json();
            console.log("data=====", data.data);

            if (Array.isArray(data.data)) {
              setListComment(data.data);
            } else {
              setError("Data received is not an array");
            }
          } catch (err) {
            setError("Failed to fetch banners");
          }
        }
      };

      fetchBanners();
    }, []);
    return (
      <div className={cn("flex items-center", styles.studentCommentsBox)}>
        <div className={styles.studentCommentsLeft}>
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
            Dưới đây là cảm nhận của tất cả các học viên đã theo học tại Kosei
            từ năm 2014 đến nay, học viên gửi những tâm tư, tình cảm, trải
            nghiệm học tập và kết quả đạt được trong suốt hành trang theo học
            tại Kosei.
          </Text>
          <Carousel
            autoPlay={true}
            autoPlaySpeed={3000}
            responsive={responsive}
            showDots={true}
            infinite={true}
            transitionDuration={500}
            centerMode={false}
            renderArrowsWhenDisabled={true}
            arrows={false}
            dotListClass="dot"
          >
            {listComment.map((item) => (
              <div className={cn(styles.boxRating)} key={item.id}>
                <Text type="title-18-regular" color="dark-500" bottom={41}>
                  {item.message}
                </Text>
                <div className={styles.user}>
                  <img
                    src={`https://kosei-web.eupsolution.net${item.avatar}`}
                    alt="user-comment"
                    // layout="fixed"
                    width={65}
                    height={65}
                    style={{ marginRight: 20 }}
                  />
                  <div style={{ textTransform: "capitalize" }}>
                    <Text type="title-24-bold" color="dark-500" bottom={8}>
                      {item.name}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
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
          <OneComment />
        </div>
      </div>
    </div>
  );
};

export default StudentComments;
