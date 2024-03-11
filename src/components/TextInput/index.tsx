import React, { useState } from "react";
import classNames from "classnames";
import Text from "../Text";
import Image from "next/image";
interface TextInputProps {
  className?: string;
  onClick?: () => void;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  type?: "input" | "textarea";
  name?: string;
  value?: any;
  onChange?: (value: any) => void;
  meta?: any;
  label?: string;
  iconPath?: string;
  widthIcon?: number;
  heightIcon?: number;
  password?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  className = "",
  placeholder = "",
  label,
  required = false,
  onClick = () => {},
  type = "input",
  name,
  value,
  onChange = () => {},
  meta = {},
  iconPath,
  widthIcon,
  heightIcon,
  password,
}) => {
  const { errors } = meta;
  const classes = classNames("text-input", [className], {
    errorInput: errors?.length > 0,
  });
  const [isVisibleEye, setIsVisibleEye] = useState(false);
  const handleToggleEyes = () => {
    setIsVisibleEye(!isVisibleEye);
  };
  return (
    <div
      onClick={onClick}
      className={classNames("inputText", { errors: errors?.length })}
    >
      {label && (
        <div className="input-label">
          <Text type="body-14-semibold" color="neutral-1">
            {label}
          </Text>
          {required && (
            <Text
              type="body-14-bold"
              color="sematic-1"
              className="text-required"
            >
              {" *"}
            </Text>
          )}
        </div>
      )}
      <div className="input-wrapper">
        {iconPath && (
          <Image
            src={iconPath}
            alt={iconPath}
            width={widthIcon || 20}
            height={heightIcon || 20}
            layout="fixed"
            className="icon-left-input"
            style={type === "textarea" ? { top: 14 } : {}}
          />
        )}
        {type === "input" ? (
          <input
            id={name}
            className={classes}
            aria-label={name}
            aria-required="false"
            value={value ? value : ""}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            type={isVisibleEye ? "password" : "text"}
          />
        ) : (
          <textarea
            className={classes}
            id={name}
            aria-label={name}
            aria-required="false"
            value={value ? value : ""}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            style={{ paddingTop: 16, minHeight: 86 }}
          />
        )}
        {value &&
          (password ? (
            <Image
              src={isVisibleEye ? "/svg/eye.svg" : "/svg/eye-disable.svg"}
              alt="eyes"
              width={20}
              height={20}
              layout="fixed"
              className="remove-input"
              onClick={handleToggleEyes}
              style={type === "textarea" ? { top: 14 } : {}}
            />
          ) : (
            <Image
              src="/svg/remove-circle.svg"
              alt="remove-circle"
              width={20}
              height={20}
              layout="fixed"
              className="remove-input"
              onClick={() => onChange("")}
              style={type === "textarea" ? { top: 14 } : {}}
            />
          ))}
      </div>

      {errors?.length > 0 && <p className="helperText">{errors[0]}</p>}
    </div>
  );
};

export default TextInput;
