import { API_PATH } from "@/api/constant";
import { privateRequest, requestCommunity } from "@/api/request";

const getUser = async () => {
  const result = await privateRequest(
    requestCommunity.get,
    API_PATH.USERS_PROFILE
  );

  return result?.data;
};
export { getUser };
