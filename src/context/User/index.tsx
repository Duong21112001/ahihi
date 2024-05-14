import { ReactNode } from "react";
import { RecoilRoot, atom } from "recoil";

export const initUser = {
  address: "",
  avatar: "",
  birthday: "",
  email: "",
  fullname: "",
  gender: "",
  last_visit: "",
  mobile: "",
  oauth_provider: "",
  oauth_uid: "",
  reg_date: "",
  token: null,
  user_id: "",
  user_name: "",
};
export const userProfile = atom({
  key: "userProfile",
  default: initUser,
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
export default UserProvider;
