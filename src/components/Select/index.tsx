import classNames from "classnames";
import RCSelect, { Option } from "rc-select";
import styles from "./index.module.scss";
import Image from "next/image";
import Text from "../Text";

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
  className?: string;
  loading?: boolean;
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
  className,
  loading = false,
}) => {
  const { errors } = meta;

  return (
    <div>
      {Label && (
        <Text type="body-14-semibold" color="neutral-1">
          {Label} {required && " *"}
        </Text>
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
          className={className}
          suffixIcon={
            loading ? (
              <svg
                className="loading-btn"
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.54262 17.2908C4.10519 17.287 0.449085 13.8066 0.226926 9.37472C0.00476593 4.94285 3.29449 1.11424 7.70929 0.666672V4.03334C5.20147 4.45715 3.41254 6.69768 3.5544 9.2371C3.69626 11.7765 5.7236 13.8039 8.26302 13.9457C10.8024 14.0876 13.043 12.2987 13.4668 9.79084H16.8335C16.3999 14.0463 12.8201 17.2851 8.54262 17.2908Z"
                  fill="white"
                />
              </svg>
            ) : (
              <Image
                src="/svg/icon-down.svg"
                alt="icon-down"
                width={12}
                height={6}
                layout="fixed"
              />
            )
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
