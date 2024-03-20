import { API_PATH } from "@/api/constant";
import { requestPist } from "@/api/request";
import { RegisterConsultationParam } from "@/utils/model/homePage";

const getLevelsList = async () => {
  const result = await requestPist.get(API_PATH.LEVELS_LIST);
  return result?.data;
};
const getCentersList = async () => {
  const result = await requestPist.get(API_PATH.CENTERS_LIST);
  return result?.data;
};

const registerConsultation = async (params: RegisterConsultationParam) => {
  const result = await requestPist.post(API_PATH.COURSES_CONSULTATION, {
    data: params,
  });
  return result;
};
export { getLevelsList, registerConsultation, getCentersList };
