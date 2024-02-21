import classNames from "classnames";
import RCSelect, { Option } from "rc-select";
import styles from "./index.module.scss";

interface SelectOption {
  value: number | string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  name?: string | "";
  value?: string;
  onChange?: (value: any) => void;
  meta?: any;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  placeholder,
  required = false,
  options = [],
  name = "",
  value,
  onChange = () => {},
  meta,
  disabled,
}) => {
  const { errors } = meta;
  return (
    <div>
      {placeholder && (
        <label
          className={classNames("body-regular", { danger: errors.length })}
          htmlFor={name}
        >
          {placeholder} {required && " *"}
        </label>
      )}
      <div className={styles.select}>
        <RCSelect
          disabled={disabled}
          id={name}
          // aria-haspopup={name}
          aria-owns={name}
          // aria-autocomplete={name}
          aria-controls={name}
          aria-activedescendant={name}
          aria-expanded="false"
          value={value ? value : ""}
          onChange={onChange}
        >
          {options.map((e) => {
            return (
              <Option value={e.value} key={`${e.label}-${e.value}`}>
                {e.label}
              </Option>
            );
          })}
        </RCSelect>
      </div>
    </div>
  );
};

export default Select;
