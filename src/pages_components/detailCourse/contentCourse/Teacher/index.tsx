import { useTranslation } from "next-i18next";
import styles from "./index.module.css";
import Text from "@/components/Text";
import Image from "next/image";
import Box from "@/components/Box";
import { IlistTeacher } from "@/utils/model/teacher";
import { useRequest } from "@umijs/hooks";
import { getTeacherDetailId } from "@/service/teacher";
import { convert } from "html-to-text";

interface TeacherCourseProps {
  idTeacher: string;
}

const TeacherCourse = ({ idTeacher }: TeacherCourseProps) => {
  const { t } = useTranslation("common");

  const {
    loading: loadingTeacher,
    data: teacherData,
  }: { loading: boolean; data: IlistTeacher[] } = useRequest(
    async () => {
      const result = await getTeacherDetailId(idTeacher);
      return result;
    },
    {
      onError: () => {},
    }
  );
  const teacher = teacherData?.[0];
  const infos = [
    {
      label: "Số học sinh đang giảng dạy",
      value: teacher?.view || 0,
    },
    {
      label: "Số khoá học đang giảng dạy",
      value: 5,
    },
  ];
  const OneTeacher = () => {
    return (
      <div className={styles.oneTeacher}>
        <Box flex agileItem="agile-center" bottom={24}>
          <Image
            src={teacher?.image}
            alt="avatar"
            layout="fixed"
            width={100}
            height={100}
            className={styles.avatar}
          />
          <div>
            <Text type="title-20-bold" color="neutral-1">
              {teacher?.name}
            </Text>
            <Text type="body-16-regular" color="neutral-3">
              Giảng viên
            </Text>
          </div>
        </Box>
        <div
          dangerouslySetInnerHTML={{ __html: convert(teacher?.content) }}
          style={{ marginBottom: 24 }}
        ></div>
        <div className={styles.bottom}>
          {infos.map((info, index) => {
            return (
              <div className={styles.item} key={info.label}>
                <Text type="body-14-regular" color="gray-500" bottom={4}>
                  {info.label}
                </Text>
                {
                  <Text type="body-16-semibold" color="dark-500">
                    {info?.value}
                  </Text>
                }
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.teacherCourse}>
      <OneTeacher />
    </div>
  );
};

export default TeacherCourse;
