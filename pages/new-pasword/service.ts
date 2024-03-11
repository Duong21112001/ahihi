import { API_PATH } from "@/api/constant";
import { requestPist } from "@/api/request";
import { NewPasswordParam } from "@/utils/model/forgotPassword";

const newPassword = async (params: NewPasswordParam) => {
  const result = await requestPist.post(API_PATH.ACCEPT_PASSWORD, {
    params,
  });
  return result;
};
export { newPassword };
