import React from "react";
import styles from "./index.module.scss";
import Text from "../Text";
interface RadioProps {
  onChange: (value: string) => void;
  value?: any;
  gender: string | null;
  label?: string;
}

const Radio: React.FunctionComponent<RadioProps> = ({
  onChange,
  value,
  gender,
  label,
  ...props
}) => {
  return (
    <div className={styles.inputRadioWrap}>
      <label className={styles.inputRadio}>
        <input
          type="radio"
          {...props}
          checked={gender === value}
          onChange={() => onChange(value)}
        />

        <div className={styles.radio}>
          <div className={styles.selected}></div>
        </div>
      </label>
      {label && (
        <Text type="body-16-regular" color="neutral-1" className={styles.label}>
          {label}
        </Text>
      )}
    </div>
  );
};

export default Radio;
