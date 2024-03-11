import { API_PATH } from "@/api/constant";
import { requestPist } from "@/api/request";
import { RegisterParam } from "@/utils/model/register";

const register = async (params: RegisterParam) => {
  const result = await requestPist.post(API_PATH.REGISTER, {
    params,
  });
  return result;
};
export { register };
