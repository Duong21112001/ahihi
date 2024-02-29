import { API_PATH } from "@/api/constant";
import { requestPist } from "@/api/request";

const listTeacher = async () => {
  const result = await requestPist.get(API_PATH.TEACHERS_LIST);
  return result?.data;
};
export { listTeacher };
