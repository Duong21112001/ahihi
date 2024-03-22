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
  key: "userProfile", // unique ID (with respect to other atoms/selectors)
  default: initUser, // default value (aka initial value)
});

const UserProvider = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
export default UserProvider;
