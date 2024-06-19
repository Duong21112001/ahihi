import { API_PATH } from "@/api/constant";
import { privateRequest, requestCommunity, requestPist } from "@/api/request";

const getCourseId = async (course_id: string) => {
  const result = await requestPist.get(API_PATH.COURSES_COURSE_BY_ID, {
    params: { course_id },
  });
  return result?.data;
};

const getAchievement = async () => {
  const result = await requestPist.get(API_PATH.COURSES_ACHIEVEMENT);
  return result?.data;
};

const getSocials = async () => {
  const result = await requestPist.get(API_PATH.COURSES_SOCIALS);
  return result?.data;
};

const getCourseContent = async (course_id: string) => {
  const result = await privateRequest(
    requestCommunity.get,
    API_PATH.COURSES_CONTENT,
    {
      params: { course_id },
    }
  );
  return result?.data;
};

const getCourseStuding = async () => {
  const result = await privateRequest(
    requestCommunity.get,
    API_PATH.COURSE_STUDYING
  );
  return result?.data;
};

const getCourseQuestions = async (course_id: string | number) => {
  const result = await privateRequest(
    requestCommunity.get,
    API_PATH.COURSES_QUESTIONS,
    {
      params: { course_id },
    }
  );
  return result?.data;
};
export {
  getCourseId,
  getCourseContent,
  getCourseStuding,
  getCourseQuestions,
  getAchievement,
  getSocials,
};
