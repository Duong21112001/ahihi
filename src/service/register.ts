import { API_PATH } from "@/api/constant";
import { privateRequest, requestCommunity, requestPist } from "@/api/request";
import {
  RegisterParam,
  RegisterTrial,
  UpdateProps,
} from "@/utils/model/register";

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
const update = async (param: UpdateProps) => {
  const result = await privateRequest(
    requestCommunity.post,
    API_PATH.UPDATE_PROFILE,
    { param }
  );
  return result;
};
export { register, registerTrialTest, update };
