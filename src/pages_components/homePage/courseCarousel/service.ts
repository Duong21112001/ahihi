import { API_PATH } from "@/api/constant";
import { requestPist } from "@/api/request";

const listCourse = async () => {
  const result = await requestPist.get(API_PATH.COURSES_LISTCOURSES);
  return result?.data;
};
export { listCourse };
