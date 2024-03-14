import { API_PATH } from "@/api/constant";
import { requestPist } from "@/api/request";

const getCourseId = async (course_id: string) => {
  const result = await requestPist.get(API_PATH.COURSES_COURSE_BY_ID, {
    params: { course_id },
  });
  return result?.data;
};
export { getCourseId };
