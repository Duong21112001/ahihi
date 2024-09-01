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
export interface UpdateProps {
  fullname: string;
  birthday: string;
  gender: string;
  address: string;
  mobile: string;
  email: string;
  avatar_path: string;
}
