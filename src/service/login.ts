import { API_PATH } from "@/api/constant";
import { privateRequest, requestCommunity, requestPist } from "@/api/request";
import { LoginParam } from "@/utils/model/login";

const login = async (params: LoginParam) => {
  const result = await requestPist.post(API_PATH.LOGIN, {
    params,
  });
  return result;
};

const logout = async () => {
  const result = await privateRequest(requestCommunity.post, API_PATH.LOGOUT);
  return result;
};
export { login, logout };
