import React, { useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithLayout } from "../_app";
import styles from "./index.module.css";
import Slider from "react-slick";
import Video from "@/components/Video";
import Image from "next/image";
import Collapse from "@/components/Collapse";
import { useRequest } from "@umijs/hooks";
import { getCourseContent, getCourseQuestions } from "@/service/course";
import { Lectures, ListCourseContent, Questions } from "@/utils/model/courses";
import CollapseLearning from "@/pages_components/learnPage/collapse";
import CollapseVideo from "@/pages_components/learnPage/collapseVideo";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import PlaceholderBox from "@/components/placeholderBox";
import Text from "@/components/Text";
import classNames from "classnames";
import Studing from "@/pages_components/learnPage/studing";
import Button from "@/components/Button";

const LearnPage: NextPageWithLayout = () => {
  const [nav1, setNav1]: any = useState();
  const [nav2, setNav2]: any = useState();
  const [tabActive, setTabActive] = useState("1");
  const [Lectures, setLectures] = useState<Lectures[]>([]);
  const params = useSearchParams();
  const id = params.get("id");
  const name = params.get("name");

  const breadcrumb = [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: "Khóa học của tôi",
      link: "/my-course",
    },
    {
      label: name || "",
      link: "",
    },
  ];
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
    data: ListCourseContent | undefined;
  } = useRequest(
    async () => {
      if (id) {
        const result = await getCourseContent(id);
        return result;
      }
    },

    {
      onSuccess: (result: ListCourseContent) => {
        setLectures(
          result?.courses?.[0]?.cats?.[0]?.lessons?.[0]?.list_lectures
        );
      },
      onError: (err) => {
        console.log("err", err);
      },
    }
  );

  const {
    data: dataListQuestion,
  }: {
    loading: boolean;
    data: Questions[];
  } = useRequest(
    async () => {
      if (id) {
        const result = await getCourseQuestions(id);
        return result;
      }
    },

    {
      onSuccess: (result) => {},
      onError: (err) => {},
    }
  );

  const tabs = [
    // {
    //   label: "Tổng quan",
    //   value: "1",
    // },
    {
      label: "Tài liệu học tập",
      value: "2",
    },
    {
      label: "Làm bài tập",
      value: "3",
    },
  ];

  const renderTab = () => {
    switch (tabActive) {
      case "3":
        return <Studing ListQuestion={dataListQuestion} />;
      default:
        return <></>;
    }
  };

  const onChoseLessons = (Lectures: Lectures[]) => {
    setLectures(Lectures);
  };

  const onClickCallBack = (index: number) => {
    nav1?.slickGoTo(index);
  };
  return (
    <div className={styles.learnPageWrap}>
      <div className={styles.breadcrumb}>
        <Breadcrumb breadcrumbs={breadcrumb} />
      </div>
      <div className={styles.learnPageContainer}>
        <div className={styles.learnPage}>
          <div className={styles.learnPageLeft}>
            <div className={styles.caroselTop}>
              {Lectures?.length > 0 && (
                <Slider
                  asNavFor={nav2}
                  ref={(slider1) => setNav1(slider1)}
                  infinite={false}
                >
                  {!loadingListCourse &&
                    Lectures?.map((Lecture: Lectures) => {
                      return (
                        <div
                          className={styles.videoTop}
                          key={`video-${Lecture?.id}`}
                        >
                          <PlaceholderBox loading={loadingListCourse}>
                            {Lecture?.youtube_id ? (
                              <Video
                                width="100%"
                                height="400px"
                                url={`https://youtube.com/embed/${Lecture?.youtube_id}`}
                              />
                            ) : Lecture.curriculum ? (
                              <iframe
                                src={`https://kosei-web.eupsolution.net${Lecture?.curriculum}`}
                                // target="_blank"
                                rel="noopener noreferrer"
                              >
                                {/* <Button type="btn-blue">Mở tài liệu</Button> */}
                              </iframe>
                            ) : (
                              <p>No video or document</p>
                            )}
                          </PlaceholderBox>
                        </div>
                      );
                    })}
                </Slider>
              )}
            </div>
            <div className={styles.caroselBottom}>
              {Lectures?.length > 0 && (
                <Slider
                  asNavFor={nav1}
                  ref={(slider2) => setNav2(slider2)}
                  slidesToShow={3}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  className="learning-slick"
                  arrows={true}
                  infinite={false}
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
                      <div
                        className={styles.videoBottom}
                        key={`video-2-${Lecture?.id}`}
                      >
                        <Video
                          width="100%"
                          height="114px"
                          url={`https://www.youtube.com/watch?v=${Lecture?.youtube_id}`}
                        />
                      </div>
                    );
                  })}
                </Slider>
              )}
            </div>
            <div className={styles.learnTabs}>
              {tabs.map((tab) => {
                return (
                  <div
                    onClick={() => setTabActive(tab.value)}
                    className={styles.tabItem}
                    key={`tab-${tab.value}`}
                  >
                    <Text
                      type={
                        tab.value === tabActive
                          ? "title-20-semibold"
                          : "title-20-regular"
                      }
                      color={
                        tab.value === tabActive ? "neutral-1" : "neutral-6"
                      }
                      className={classNames(
                        styles.tab,
                        tab.value === tabActive ? styles.tabActive : ""
                      )}
                    >
                      {tab.label}
                    </Text>
                  </div>
                );
              })}
            </div>
            <div className={styles.contentTabs}>{renderTab()}</div>
          </div>
          <div className={styles.learnPageRight}>
            {dataListCourse?.courses?.map((course) => {
              const numberTime = course?.cats?.length;
              return (
                <div
                  className={styles.collapseItem}
                  key={`course-${course?.id}`}
                >
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
                                          (lectures: Lectures, index) => {
                                            return (
                                              <div
                                                key={`lectures-${lectures?.id}`}
                                              >
                                                <CollapseVideo
                                                  title={lectures?.lec_title}
                                                  learned={lectures?.learned}
                                                  numberIndex={index}
                                                  onClickCallBack={
                                                    onClickCallBack
                                                  }
                                                  isDocument={
                                                    !lectures.youtube_id &&
                                                    !!lectures.curriculum
                                                  }
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
