export interface RegisterParam {
  fullname: string;
  gender: string;
  email: string;
  mobile: string;
  user_name: string;
  user_pass: string;
  rePassword?: string;
  rules?: string;
}
export interface RegisterTrial {
  name: string;
  mobile: string;
  email: string;
  level_id: number;
}
