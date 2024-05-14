import { SignWithGGResponse } from "./../utils/model/homePage";
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

const loginWithFaceBook = async (fbAccessToken: string) => {
  const result = await requestPist.post(API_PATH.SIGNIN_WITH_FACEBOOK, {
    params: { fbAccessToken },
  });
  return result;
};

const loginWithGoogle = async (id_token: string) => {
  const result = await requestPist.get(API_PATH.SIGNIN_WITH_GOOGLE, {
    params: { id_token },
  });

  return result;
};

export { login, logout, loginWithFaceBook, loginWithGoogle };
