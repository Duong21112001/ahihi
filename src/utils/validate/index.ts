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
  return /^(?=.*?[A-Z])(?=.*?[a-z]).{8,16}$/.test(value);
};
export const validatePhone = (t: any) => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        if (!isPhoneNumber(value)) {
          throw new Error(t("invalid_phone"));
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
          throw new Error(t("invalid_email"));
        }
      }
      return Promise.resolve();
    },
  };
};
export const validatePassword = (t: any) => {
  return {
    validator: async (value: any) => {
      if (value) {
        if (!isPassword(value)) {
          throw new Error(t("invalid_password"));
        }
      }
      return Promise.resolve();
    },
  };
};
export const validateConfirmPassword = (form: any, t: any) => {
  return {
    validator: async (rule: any, value: any) => {
      if (value) {
        if (value !== form.getFieldValue("new_password")) {
          throw new Error(t("password_not_match"));
        }
        return Promise.resolve();
      }
    },
  };
};
