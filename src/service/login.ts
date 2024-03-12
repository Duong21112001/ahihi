import { API_PATH } from "@/api/constant";
import { requestPist } from "@/api/request";
import { LoginParam } from "@/utils/model/login";

const login = async (params: LoginParam) => {
  const result = await requestPist.post(API_PATH.LOGIN, {
    params,
  });
  return result;
};
export { login };
