import { API_PATH } from "@/api/constant";
import { requestPist } from "@/api/request";

const getTeacherDetailId = async (id: string) => {
  const result = await requestPist.get(API_PATH.TEACHERS_DETAIL, {
    params: { id },
  });
  return result?.data;
};
export { getTeacherDetailId };
