import { useTranslation } from "next-i18next";
import styles from "./index.module.css";
import VideoModal from "@/components/VideoModal";
import { compile, convert } from "html-to-text";
import { Course, ListCourseContent, Lectures } from "@/utils/model/courses";
import Text from "@/components/Text";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRequest } from "@umijs/hooks";
import { getCourseContent } from "@/service/course";
import { cn } from "@/utils";
import Slider from "react-slick";
import PlaceholderBox from "@/components/placeholderBox";
import Video from "@/components/Video";
import Collapse from "@/components/Collapse";
import CollapseLearning from "@/pages_components/learnPage/collapse";
import Button from "@/components/Button";
import CollapseVideo from "@/pages_components/learnPage/collapseVideo";

interface CourseVideoProps {
  data: Course;
}
const CourseVideo: React.FC<CourseVideoProps> = ({ data }) => {
  const params = useSearchParams();
  const [nav1, setNav1]: any = useState();
  const [nav2, setNav2]: any = useState();
  const id = params.get("id");
  const [Lectures, setLectures] = useState<Lectures[]>([]);
  const [loadingListCourse, setLoadingListCourse] = useState<boolean>(true);
  const [currentFreeLecture, setCurrentFreeLecture] = useState<Lectures | null>(
    null
  );

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
        const freeLectures =
          result?.courses?.[0]?.cats?.[0]?.lessons?.[0]?.list_lectures?.filter(
            (lecture) => lecture.free === 1
          );
        if (freeLectures?.length > 0) {
          setCurrentFreeLecture(freeLectures[0]);
        }
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

  const handleFreeLectureClick = (lecture: Lectures) => {
    setCurrentFreeLecture(lecture);
  };
  return (
    <div className={styles.contentCourseContainer}>
      <div className={styles.caroselTop}>
        {currentFreeLecture && (
          <div className="flex justify-center mb-5 mt-10  w-full">
            {currentFreeLecture.youtube_id ? (
              <Video
                // width="100"
                className="w-full"
                url={`https://youtube.com/embed/${currentFreeLecture.youtube_id}`}
              />
            ) : currentFreeLecture.curriculum ? (
              <a
                href={currentFreeLecture.curriculum}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="btn-blue">Mở tài liệu</Button>
              </a>
            ) : (
              <p>No video or document available</p>
            )}
          </div>
        )}
      </div>

      {/* </div> */}

      <div className={cn(" bg-white", styles.learnPageRight)}>
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
                                      (lectures: Lectures, index) => {
                                        return (
                                          <div
                                            key={`lectures-${lectures?.id}`}
                                            className="px-5"
                                          >
                                            {lectures.free === 0 ? (
                                              <Button
                                                disabled
                                                type="btn-ghost"
                                                className="opacity-20"
                                              >
                                                <CollapseVideo
                                                  title={lectures?.lec_title}
                                                  learned={lectures?.learned}
                                                  numberIndex={index}
                                                  isDocument={
                                                    !lectures.youtube_id &&
                                                    !!lectures.curriculum
                                                  }
                                                  onClickCallBack={
                                                    onClickCallBack
                                                  }
                                                />
                                              </Button>
                                            ) : (
                                              <Button
                                                type="btn-ghost"
                                                onClick={() => {
                                                  if (lectures.free === 1) {
                                                    handleFreeLectureClick(
                                                      lectures
                                                    );
                                                  }
                                                }}
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
  );
};

export default CourseVideo;
