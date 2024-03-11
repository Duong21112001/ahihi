export const isPhoneNumber = (value: any) => {
  return /^(03[2-9]|05[25689]|07[06789]|08[1-9]|09[0-9])([0-9]{7})$/.test(
    value.toLowerCase()
  );
};
export const isCCCD = (value: any) => {
  return /^[0-9]{9,15}$/.test(value.toLowerCase());
};

export const isEmail = (value: any) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value.toLowerCase()
  );
};
export const isPassword = (value: any) => {
  console.log("value", value);
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(value);
};
export const validatePhone = (t: any) => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        if (!isPhoneNumber(value)) {
          throw new Error(t("Số điện thoại không hợp lệ"));
        }
      }
      return Promise.resolve();
    },
  };
};
export const validateEmail = (t: any) => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        if (!isEmail(value)) {
          throw new Error(t("Email không hợp lệ. Vui lòng thử lại"));
        }
      }
      return Promise.resolve();
    },
  };
};
export const validatePassword = (t: any) => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        console.log("aa", isPassword(value));
        if (!isPassword(value)) {
          throw new Error(t("Sai định dạng"));
        }
      }
      return Promise.resolve();
    },
  };
};
export const validateConfirmPassword = (form: any, name: string, t: any) => {
  return {
    validator: async (rule: any, value: any) => {
      const password = form.getFieldValue(name);
      if (value) {
        if (value !== password) {
          throw new Error("Mật khẩu không trùng nhau. Vui lòng thử lại");
        }
        return Promise.resolve();
      }
    },
  };
};
