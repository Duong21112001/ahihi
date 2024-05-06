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

const getWebContent = async (type: string) => {
  const result = await requestPist.get(API_PATH.WEB_CONTENT, {
    params: { type },
  });
  return result?.data;
};

const getListFeedback = async () => {
  const result = await requestPist.get(API_PATH.FEEDBACK);
  return result?.data;
};

const signInWithFacebook = async (
  fbAccessToken: "EAAGcb2rZC1gUBO4PoNxcsCEmnY3Op6iweZAg9alFSRi4sYndHjvMe7EWAqJJmcgPAKxMUsieKayoGqZB3NOI84HnCZCSBtqiR8nq6ybUHOH9WPfRq4pbJZCXuYxYZCFXGNFZBJ8oQulcClwF0BFi7FIvJAk9HGmkn5V2wDkZA1V3n62pFcs6fpO6ZAaINDTVdYAJ2oPWtlkSlmRCnS4UZBdhZAZCm5DDvSUdbrE5EYupH2tJw6HCuMKKTt6ZCA2YmVXDtpshya2AZD"
) => {
  const result = await requestPist.post(API_PATH.SIGNIN_WITH_FACEBOOK, {
    params: { fbAccessToken },
  });
  return result?.data;
};
export {
  getLevelsList,
  registerConsultation,
  getCentersList,
  getWebContent,
  getListFeedback,
  signInWithFacebook,
};
