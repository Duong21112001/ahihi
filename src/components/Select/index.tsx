import classNames from "classnames";
import RCSelect, { Option } from "rc-select";
import styles from "./index.module.scss";
import Image from "next/image";

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
  Label?: string;
  icon?: string;
  widthIcon?: number;
  heightIcon?: number;
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
  Label,
  icon,
  widthIcon,
  heightIcon,
}) => {
  const { errors } = meta;

  return (
    <div>
      {Label && (
        <label
          className={classNames("body-regular", { danger: errors.length })}
          htmlFor={name}
        >
          {Label} {required && " *"}
        </label>
      )}
      <div className={styles.select}>
        {icon && (
          <Image
            src={icon}
            alt={icon}
            width={widthIcon || 20}
            height={heightIcon || 20}
            layout="fixed"
            className={styles.iconLeft}
          />
        )}
        <RCSelect
          disabled={disabled}
          id={name}
          // aria-haspopup={name}
          aria-owns={name}
          // aria-autocomplete={name}
          aria-controls={name}
          aria-activedescendant={name}
          aria-expanded="false"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          suffixIcon={
            <Image
              src="/svg/icon-down.svg"
              alt="icon-down"
              width={12}
              height={6}
              layout="fixed"
            />
          }
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
