import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LandingPageCourse from "@/pages_components/detailCourse/LandingPageCourse";
import styles from "./index.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import ContentCourse from "@/pages_components/detailCourse/contentCourse";
import CourseCarouselComponent from "@/pages_components/component/carouselCourseComponent";
import Text from "@/components/Text";
import DownloadAppFooter from "@/pages_components/homePage/DownloadAppFooter";
import { useSearchParams } from "next/navigation";
import { getCourseContent, getCourseId } from "@/service/course";
import { Course, ListCourseContent, Lectures } from "@/utils/model/courses";
import { listCourse } from "@/pages_components/homePage/courseCarousel/service";
import BuyCourses from "@/components/BuyCourses";
import { useRequest } from "@umijs/hooks";
import Collapse from "@/components/Collapse";
import CollapseLearning from "@/pages_components/learnPage/collapse";
import CollapseVideo from "@/pages_components/learnPage/collapseVideo";
import { cn } from "@/utils";
import Button from "@/components/Button";
import Image from "next/image";
import Slider from "react-slick";
import Video from "@/components/Video";
import PlaceholderBox from "@/components/placeholderBox";
const CourseDetail = () => {
  const params = useSearchParams();
  const [nav1, setNav1]: any = useState();
  const [nav2, setNav2]: any = useState();
  const id = params.get("id");
  const [Lectures, setLectures] = useState<Lectures[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [loadingListCourse, setLoadingListCourse] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (id) {
        try {
          setLoading(true);
          const result = await getCourseId(id);
          setCourse(result);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourseData();
  }, [id]);

  useEffect(() => {
    const fetchRelatedCourses = async () => {
      try {
        setLoadingListCourse(true);
        const result = await listCourse();
        setRelatedCourses(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingListCourse(false);
      }
    };

    fetchRelatedCourses();
  }, []);
  const breadcrumb = [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: course?.name || "",
      link: "/",
    },
  ];
  const {
    data: dataListCourse,
  }: {
    data: ListCourseContent | undefined;
  } = useRequest(
    async () => {
      if (id) {
        const result = await getCourseContent(id);
        console.log("result=======", result);

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
  const onChoseLessons = (Lectures: Lectures[]) => {
    setLectures(Lectures);
  };

  const onClickCallBack = (index: number) => {
    nav1?.slickGoTo(index);
  };
  const next = () => {
    nav2?.current?.slickNext();
  };
  const previous = () => {
    nav2?.current?.slickPrev();
  };
  return (
    <div className={styles.courseDetailWrap}>
      <div className={styles.breadcrumb}>
        <Breadcrumb breadcrumbs={breadcrumb} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        course && <LandingPageCourse course={course} />
      )}
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <img
            src="/Images/mascot.png"
            alt="mascot"
            className={styles.mascot}
            width={288}
          />
          <img
            src="/Images/hand-left.png"
            alt="hand-left"
            className={styles.handLeft}
            width={70}
          />
          <img
            src="/Images/hand-right.png"
            alt="hand-right"
            className={styles.handRight}
            width={80}
          />
          {course && (
            <div className={styles.buyCourses}>
              <BuyCourses course={course} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.contentCourseWrap}>
        <div className={styles.contentCourseContainer}>
          <div className={cn("w-[50%]")}>
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
                          <Video
                            width="100%"
                            height="400px"
                            url={`https://youtube.com/embed/${Lecture?.youtube_id}`}
                          />
                        </PlaceholderBox>
                      </div>
                    );
                  })}
              </Slider>
            )}
          </div>
          <div className={cn("w-[50%] bg-white", styles.learnPageRight)}>
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
                                                {lectures.free === 0 ? (
                                                  <Button
                                                    disabled
                                                    type="btn-ghost"
                                                    className="opacity-20"
                                                  >
                                                    <CollapseVideo
                                                      title={
                                                        lectures?.video_titile
                                                      }
                                                      learned={
                                                        lectures?.learned
                                                      }
                                                      numberIndex={index}
                                                      onClickCallBack={
                                                        onClickCallBack
                                                      }
                                                    />
                                                  </Button>
                                                ) : (
                                                  <Button type="btn-ghost">
                                                    <CollapseVideo
                                                      title={
                                                        lectures?.video_titile
                                                      }
                                                      learned={
                                                        lectures?.learned
                                                      }
                                                      numberIndex={index}
                                                      onClickCallBack={
                                                        onClickCallBack
                                                      }
                                                    />
                                                  </Button>
                                                )}
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
        <div className={styles.courseCarousel}>
          <Text type="title-40-bold" color="neutral-1" bottom={48}>
            Khoá học liên quan
          </Text>
          {loadingListCourse ? (
            <p>Loading...</p>
          ) : (
            <CourseCarouselComponent
              dataCarousel={relatedCourses}
              loading={loadingListCourse}
            />
          )}
        </div>
      </div>
      <DownloadAppFooter />
    </div>
  );
};
export default CourseDetail;

CourseDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ locale }: NextPageContext) => ({
  props: {
    ...(await serverSideTranslations(locale || "vi", ["common"])),
  },
});
