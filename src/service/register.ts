import { API_PATH } from "@/api/constant";
import { requestPist } from "@/api/request";
import { RegisterParam, RegisterTrial } from "@/utils/model/register";

const register = async (params: RegisterParam) => {
  const result = await requestPist.post(API_PATH.REGISTER, {
    params,
  });
  return result;
};
const registerTrialTest = async (params: RegisterTrial) => {
  const result = await requestPist.post(API_PATH.REGISTER_TRIAL_TEST, {
    params,
  });
  return result;
};
export { register, registerTrialTest };
