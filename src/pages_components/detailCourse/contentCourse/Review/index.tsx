import { useTranslation } from "next-i18next";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";
import Rating from "@/components/rating";
import { useEffect, useState } from "react";
import Form, { Field } from "rc-field-form";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Comment from "../../../../../pages/document-detail/Comment";
import { useRouter } from "next/router";
interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_new: number;
}
interface DataItem {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  category: Category;
  created_by: string;
  status: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  views: number;
}
const ReviewCourse = () => {
  const [document, setDocument] = useState<DataItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation("common");
  const [rating, setRating] = useState(5);
  const [form] = Form.useForm();
  const route = useRouter();
  const { id } = route.query;
  const onFinish = () => {};

  const listRating = [
    {
      label: "Tuyệt vời",
      value: "100%",
    },
    {
      label: "Rất tốt",
      value: "30%",
    },
    {
      label: "Tốt",
      value: "10%",
    },
    {
      label: "Chưa ưng ý",
      value: "5%",
    },
    {
      label: "Tệ",
      value: "0%",
    },
  ];
  useEffect(() => {
    if (id) {
      const fetchDocumentDetail = async () => {
        try {
          const response = await fetch(
            `https://kosei-web.eupsolution.net/api/documents/${id}`
          );
          const data = await response.json();
          console.log("document====", data);

          setDocument(data);
        } catch (err) {
          setError("Failed to fetch document details");
        }
      };
      fetchDocumentDetail();
    }
  }, [id]);
  const RatingProgress = () => {
    return (
      <div>
        {/* {listRating.map((rating) => {
          return (
            <div
              className={styles.ratingProgress}
              key={`rating-${rating.label}`}
            >
              <Text
                type="body-16-regular"
                color="neutral-3"
                right={20}
                className={styles.text}
              >
                {rating.label}hihihihi
              </Text>
              <div className={styles.progress}>
                <div
                  className={styles.progressActive}
                  style={{ width: rating?.value }}
                />
              </div>
              <Text
                type="body-16-regular"
                color="neutral-5"
                className={styles.textNumber}
              >
                {rating?.value}
              </Text>
            </div>
          );
        })} */}
        <Comment className="w-full" documentId={document?.id ?? 0} />
      </div>
    );
  };
  return (
    <div className={styles.teacherCourse}>
      <RatingProgress />
    </div>
  );
};

export default ReviewCourse;
