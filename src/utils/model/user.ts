export interface User {
  address: string;
  avatar: string;
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
