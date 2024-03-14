import { getCookie } from "cookies-next";
import { extend } from "umi-request";

const REQ_TIMEOUT = 60 * 1000;

export interface IOptions {
  onSuccess?: (r: any, params: any) => void;
  onError?: (e: any) => void;
}

export const KOSEI_API_PIST = "https://kosei-api.eupsolution.net/resapi";

const requestPist = extend({
  prefix: KOSEI_API_PIST,
  timeout: REQ_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  errorHandler: (error) => {
    console.log("error", error);
  },
});
requestPist.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    "Accept-Language": "vi",
  };

  return {
    url,
    options,
  };
});

const requestCommunity = extend({
  prefix: KOSEI_API_PIST,
  timeout: REQ_TIMEOUT,
  errorHandler: (error) => {},
});
requestCommunity.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    "Accept-Language": "vi",
  };

  return {
    url,
    options,
  };
});

const privateRequest = async (
  request: any,
  suffixUrl: string,
  configs?: any
) => {
  const token = getCookie("kosei-token");
  console.log("token", token);
  if (token) {
    return request(suffixUrl, {
      headers: {
        Authorization: token,
      },
      ...configs,
    });
  }
};

export { requestPist, privateRequest, requestCommunity };
