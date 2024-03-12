import { API_PATH } from "@/api/constant";
import { requestPist } from "@/api/request";
import { ForgotPasswordParam } from "@/utils/model/forgotPassword";
import { LoginParam } from "@/utils/model/login";

const forgotPassword = async (params: ForgotPasswordParam) => {
  const result = await requestPist.post(API_PATH.FORGOT_PASSWORD, {
    params,
  });
  return result;
};
export { forgotPassword };
