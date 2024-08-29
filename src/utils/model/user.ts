import { StaticImageData } from "next/image";

export interface User {
  address: string;
  avatar: StaticImageData;
  birthday: number;
  email: string;
  fullname: string;
  gender: string;
  last_visit: string;
  mobile: string;
  oauth_provider: string;
  oauth_uid: string;
  reg_date: string;
  token: string;
  user_id: number;
  user_name: string;
}
export interface UserResponse {
  user: User;
}
export interface HistoryDetail {
  id: number;
  user_id: number;
  trial_test_id: number;
  test_id: number;
  vocab_score: number;
  reading_score: number;
  listening_score: number;
  total_score: number;
  created_at: string;
  updated_at: string;
  grammar_score: number;
  details: Details[];
}
export interface Details {
  id: number;
  user_test_id: number;
  question_id: number;
  type: string;
  answer: string;
  is_correct: number;
  created_at: string;
  updated_at: string;
  question: Question;
}
export interface Question {
  id: number;
  parent_id: number;
  course_id: number;
  exam_id: number;
  lecture_id: null;
  ctype: null;
  name: string;
  point: number;
  question_limit: number;
  question: string;
  attachment: null;
  image: null;
  video_id: null;
  translate: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  correct_answer: string;
  lang_code: string;
  active: number;
  created_at: null;
  updated_at: null;
  trial_test_id: null;
  test_id: null;
  explain: null;
  explain_media: null;
  entrance_test_id: null;
}
