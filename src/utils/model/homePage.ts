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
