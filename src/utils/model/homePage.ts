import { StaticImageData } from "next/image";

export interface RegisterConsultationParam {
  fullname: string;
  email: string;
  phone: string;
  level: string;
  address: string;
  content: string;
}
export interface DataLearning {
  author_infor: string;
  cat_id: number;
  cou_price: number;
  cou_sale: number;
  cou_summary: string;
  cou_title: string;
  course_status: number;
  cover_path: string;
  curriculum: null;
  detail: string;
  expired_at: string;
  hot: number;
  image: string;
  intro_video_path: null;
  level_id: number;
  name: string;
  price_jp: number;
  teacher_id: number;
  total_learned: number;
  vimeo_link: string;
  youtube_link: string;
}
export interface LevelListResponse {
  id: number;
  name: string;
  code: string;
  status: number;
  image: string;
  lang_code: string;
  des: string;
  auth_id: number;
}
export interface CentersResponse {
  id: number;
  name: string;
  address: string;
  email: string;
  status: number;
  hotline: string;
}

export interface ContentWeb {
  [x: string]: any;
  icon: StaticImageData;
  title: string;
  content: string;
}
export interface WebContentResponse {
  id: number;
  type: string;
  text: string;
  title: string;
  content: ContentWeb;
}

export interface IListFeedback {
  id: number;
  name: string;
  email: string;
  password: string;
  status: number;
  confirmation_code: string;
  deleted_at: null;
  phone: number;
  avatar_path: string;
  gender: 0 | 1;
  full_name: null;
  address: string;
  status_text: null;
  user_type: string;
  birthday: string;
  created_at: string;
  remember_token: null;
}
export interface ListFeedbackResponse {
  id: number;
  user_id: number;
  message: string;
  created_at: string;
  updated_at: number;
  user: IListFeedback;
}

export interface SignWithFBResponse {
  id: number;
  full_name: string;
  email: string;
  password: null | string;
  created_at: null | string;
  avatar_path: string;
  accessToken: string;
}

export interface SignWithGGResponse {
  id: number;
  email: string;
  name: string;
  password: string;
  status: number;
  confirmation_code: null | string | number;
  deleted_at: null;
  phone: null | number;
  avatar_path: StaticImageData;
  gender: 0 | 1;
  full_name: null | string;
  address: null | string;
  status_text: null;
  user_type: string;
  birthday: string;
  created_at: string;
  remember_token: string;
  accessToken: string;
}
