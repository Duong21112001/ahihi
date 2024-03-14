import { API_PATH } from "@/api/constant";
import { privateRequest, requestCommunity, requestPist } from "@/api/request";
import { CoursesOrderParams } from "@/utils/model/payment";

const getPayment = async () => {
  const result = await requestPist.get(API_PATH.COURSES_PAYMENT);
  return result?.data;
};

const checkCode = async (code: string) => {
  const result = await requestPist.get(API_PATH.COURSES_CODE, {
    params: { code },
  });
  return result;
};

const orderCourses = async (params: CoursesOrderParams) => {
  const result = await privateRequest(
    requestCommunity.post,
    API_PATH.COURSES_ORDER,
    {
      data: params,
    }
  );
  return result;
};
export { getPayment, checkCode, orderCourses };
