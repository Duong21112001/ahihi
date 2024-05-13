import Text from "@/components/Text";
import styles from "./index.module.scss";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { useRef } from "react";
import { useRequest } from "@umijs/hooks";
import { listTeacher } from "./service";
import { IlistTeacher } from "@/utils/model/teacher";
import Button from "@/components/Button";
import { convert } from "html-to-text";
import Slider from "react-slick";
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";
import LectureItem from "./LectureItem";
// import DataTeacher from "./dataTeacher";

const Lecturers = () => {
  const { loading, data } = useRequest(
    async () => {
      const result = await listTeacher();
      return result;
    },
    {
      onError: () => {},
    }
  );

  const lectureItems: JSX.Element[] =
    data && data.map((item: any) => <LectureItem key={item.id} data={item} />);
  console.log("lecture====", lectureItems);

  return (
    <div className={styles.lecturersPadding}>
      <div className={styles.lecturersWrap}>
        <div className={styles.lecturersContainer}>
          <Text
            type="heading-h2"
            color="shade-primary-5"
            center
            bottom={10}
            className={styles.lecturersTitle}
          >
            Đội ngũ giảng viên tại Kosei
          </Text>
          <Text type="body-16-regular" color="neutral-3" center bottom={8}>
            Đội ngũ giảng viên nhiều năm kinh nghiệm và được kiểm chứng bởi hơn
            80.000+ học viên
          </Text>
          <div className="border border-black">
            {lectureItems}
            {/* {loading ? (
              <p>Loading...</p>
            ) : data && data.length > 0 ? (
              <EmblaCarousel data={lectureItems} numSlides={4} />
            ) : (
              <p>No data available</p>
            )}{" "} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecturers;
