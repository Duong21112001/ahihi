import React, { useState } from "react";
import OtpInput from "react18-input-otp";
import styles from "./index.module.scss";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const handleChange = (enteredOtp: React.SetStateAction<string>) => {
    setOtp(enteredOtp);
  };
  return (
    <OtpInput
      value={otp}
      onChange={handleChange}
      numInputs={6}
      placeholder="......"
      // separator={<span>-</span>}
      containerStyle={styles.otpInput}
      inputStyle={styles.inputOtp}
    />
  );
};
export default Otp;
