import * as React from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import Image from "next/image";
import Text from "../Text";
interface CheckBoxProps {
  label?: string | React.ReactNode;
  value: any;
  checked: boolean;
  handleChange?: (value: any) => void;
  className?: string;
  name?: string;
}

const CheckBox: React.FunctionComponent<CheckBoxProps> = ({
  label,
  className,
  checked = false,
  handleChange = (value: any) => typeof value || {},
  name,
  value,
}) => {
  return (
    <>
      <label className={classNames(styles.circleCheck, className)}>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={value}
          onChange={(event) => {
            if (event?.target?.checked) {
              handleChange(event?.target?.checked);
            } else {
              handleChange(undefined);
            }
          }}
        />
        <div className={styles.checkbox}>
          <Image
            src="/svg/checked.svg"
            alt="checked"
            layout="fixed"
            width={11}
            height={8}
            className={styles.iconCheckbox}
          />
        </div>
        <Text type="body-16-regular" color="neutral-1">
          {label}
        </Text>
      </label>
    </>
  );
};

export default CheckBox;
