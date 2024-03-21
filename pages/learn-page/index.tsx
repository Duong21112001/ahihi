import React, { useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "../_app";
import styles from "./index.module.scss";
import Slider from "react-slick";
import Video from "@/components/Video";
import Image from "next/image";
import Collapse from "@/components/Collapse";
import { useRequest } from "@umijs/hooks";
import { getCourseContent } from "@/service/course";
import {
  CourseContent,
  Lectures,
  ListCourseContent,
} from "@/utils/model/courses";
import CollapseLearning from "@/pages_components/learnPage/collapse";
import CollapseVideo from "@/pages_components/learnPage/collapseVideo";
interface VideoInfo {
  video: string;
  parentId: number;
}

const LearnPage: NextPageWithLayout = () => {
  const [nav1, setNav1]: any = useState();
  const [nav2, setNav2]: any = useState();
  const [Lectures, setLectures] = useState<Lectures[]>([]);
  const settings1 = {
    asNavFor: ".slider-nav",
  };
  const settings2 = {
    focusOnSelect: true,
  };
  const next = () => {
    nav2?.current?.slickNext();
  };

  const previous = () => {
    nav2?.current?.slickPrev();
  };

  const {
    loading: loadingListCourse,
    data: dataListCourse,
  }: {
    loading: boolean;
    data: ListCourseContent;
  } = useRequest(
    async () => {
      const result = await getCourseContent("1");
      return result;
    },
    {
      onError: () => {},
    }
  );
  const listVideo: VideoInfo[] = [];
  dataListCourse?.courses?.forEach((course) => {
    course?.cats?.forEach((cat) => {
      cat?.lessons?.forEach((lesson) => {
        lesson?.list_lectures?.forEach((lecture) => {
          listVideo.push({
            video: `https://player.vimeo.com/video/${lecture?.video_id}`,
            parentId: lecture?.lec_part_id,
          });
        });
      });
    });
  });

  const onChoseLessons = (Lectures: Lectures[]) => {
    setLectures(Lectures);
  };
  console.log("Lectures", Lectures);
  return (
    <div className={styles.learnPage}>
      <div className={styles.learnPageLeft}>
        <div className={styles.caroselTop}>
          <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
            {Lectures?.map((Lecture: Lectures) => {
              console.log("Lectures222", Lectures);

              return (
                <div className={styles.videoTop} key={`video-${Lecture?.id}`}>
                  <Video
                    // url={`https://player.vimeo.com/video/${Lecture?.video_id}`}
                    width="200px"
                    height="200px"
                    url={`https://youtube.com/embed/${Lecture?.youtube_id}`}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className={styles.caroselBottom}>
          <Slider
            asNavFor={nav1}
            ref={(slider2) => setNav2(slider2)}
            slidesToShow={3}
            swipeToSlide={true}
            focusOnSelect={true}
            className="learning-slick"
            arrows={true}
            nextArrow={
              <div onClick={next} className={styles.lecturersArrowsRight}>
                <Image
                  src="/svg/caret-right.svg"
                  alt="arrow-right"
                  layout="fixed"
                  width={20}
                  height={20}
                />
              </div>
            }
            prevArrow={
              <div
                onClick={previous}
                style={{ marginRight: 12 }}
                className={styles.lecturersArrowsLeft}
              >
                <Image
                  src="/svg/caret-left.svg"
                  alt="arrow-left"
                  layout="fixed"
                  width={20}
                  height={20}
                />
              </div>
            }
          >
            {Lectures?.map((Lecture: Lectures) => {
              return (
                <div className={styles.videoTop} key={`video-2-${Lecture?.id}`}>
                  <Video
                    // url={`https://player.vimeo.com/video/${Lecture?.video_id}`}
                    width="200px"
                    height="200px"
                    url={`https://youtube.com/embed/${Lecture?.youtube_id}`}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className={styles.learnPageRight}>
        {dataListCourse?.courses?.map((course) => {
          const numberTime = course?.cats?.length;
          return (
            <div className={styles.collapseItem} key={`course-${course?.id}`}>
              <Collapse
                title={course?.part_title}
                numberTime={numberTime}
                isImage
              >
                {course?.cats?.map((cat) => {
                  const numberLessons = cat?.lessons?.length;

                  return (
                    <div
                      className={styles.collapseTitle}
                      key={`cats-${cat?.id}`}
                    >
                      <Collapse
                        title={cat?.part_title}
                        numberTime={numberLessons}
                      >
                        <div className={styles.collapseLessonWrap}>
                          {cat?.lessons?.map((lesson) => {
                            const percent = Math.ceil(
                              (lesson?.total_learned / numberLessons) * 100
                            );
                            return (
                              <div
                                className={styles.collapseLesson}
                                key={`lessons-${lesson?.id}`}
                              >
                                <CollapseLearning
                                  title={lesson?.part_title}
                                  percent={percent}
                                  lectures={lesson?.list_lectures}
                                  onClickCallBack={onChoseLessons}
                                >
                                  <div className={styles.collapseLectures}>
                                    {lesson?.list_lectures?.map(
                                      (lectures: Lectures) => {
                                        return (
                                          <div key={`lectures-${lectures?.id}`}>
                                            <CollapseVideo
                                              title="aaa"
                                              learned={lectures?.learned}
                                            />
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </CollapseLearning>
                              </div>
                            );
                          })}
                        </div>
                      </Collapse>
                    </div>
                  );
                })}
              </Collapse>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LearnPage;

LearnPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
