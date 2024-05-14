import Text from "@/components/Text";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Image from "next/image";
import CarouselComponent from "@/components/carousel";
import Carousel from "react-multi-carousel";
import classNames from "classnames";
import { useRequest } from "@umijs/hooks";
import { getAchievement } from "@/service/course";
import { AchievementResponse } from "@/utils/model/courses";
import ImageModal from "@/components/ImageModal";

const Achievements = () => {
  const { t } = useTranslation("common");
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 769 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 480 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
    },
  };
  const {
    loading: loadingAchievement,
    data: dataAchievement,
  }: {
    loading: boolean;
    data: AchievementResponse[];
  } = useRequest(
    async () => {
      const result = await getAchievement();
      return result;
    },
    {
      onError: () => {},
    }
  );
  const OneAchievements = (props: { data: AchievementResponse }) => {
    const { data } = props;
    return (
      <div className={styles.oneAchievementsPadding}>
        <div className={styles.oneAchievements}>
          <div className={styles.img}>
            <img src={data?.avatar} alt="achievements" />
            <div className={styles.zoomOut}>
              <ImageModal url={data?.avatar} />
            </div>
          </div>
          <div className={styles.info}>
            <div>
              <Text type="tag-12-medium" color="neutral-10">
                Học viên:
              </Text>
              <Text type="body-16-semibold" color="neutral-10">
                {data?.fullname}
              </Text>
            </div>
            <div className={styles.point}>
              <Text type="body-14-medium" color="neutral-10">
                điểm số:
              </Text>
              <Text type="title-20-bold" color="neutral-10">
                {data?.score}
              </Text>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.achievementsPadding}>
      <div className={styles.achievementsWrap}>
        <div className={styles.achievementsContainer}>
          <Text
            type="heading-h2"
            color="neutral-1"
            center
            className={styles.title}
          >
            Thành tích học viên
          </Text>
          <Text
            type="body-16-regular"
            color="neutral-3"
            center
            className={styles.textContent}
          >
            Những Kết quả xuất sắc của học viên Kosei đã đạt được sau bao nỗ lực
            cố gắng chinh phục JLPT
          </Text>
          <div>
            {!loadingAchievement && dataAchievement?.length > 0 && (
              <Carousel
                responsive={responsive}
                showDots={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                infinite={true}
                containerClass={classNames(
                  "container-class-course",
                  styles.carousel
                )}
                centerMode={false}
                renderArrowsWhenDisabled={true}
                arrows={true}
                transitionDuration={500}
              >
                {dataAchievement?.map((achievement) => {
                  return (
                    <div key={`achievement-${achievement?.id}`}>
                      <OneAchievements data={achievement} />
                    </div>
                  );
                })}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
