import { StaticImageData } from "next/image";

export interface RegisterConsultationParam {
  fullname: string;
  email: string;
  phone: string;
  level: string;
  address: string;
  content: string;
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
