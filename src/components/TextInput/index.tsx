import React from "react";
import classNames from "classnames";
interface TextInputProps {
  className?: string;
  onClick?: () => void;
  placeholder?: string | React.ReactNode;
  required?: boolean;
  fullWidth?: boolean;
  type?: "input" | "textarea";
  name?: string;
  value?: any;
  onChange?: (value: any) => void;
  meta?: any;
}

const TextInput: React.FC<TextInputProps> = ({
  className = "",
  placeholder,
  required = false,
  onClick = () => {},
  type = "input",
  name,
  value,
  onChange = () => {},
  meta = {},
}) => {
  const classes = classNames([className]);
  const { errors } = meta;
  return (
    <div
      onClick={onClick}
      className={classNames("inputText", { errors: errors.length })}
    >
      {placeholder && (
        <label
          className={classNames("body-regular", { danger: errors.length })}
          color={"gray-1"}
          htmlFor={name}
        >
          {placeholder}
          {required && " *"}
        </label>
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
        />
      )}
      {errors.length > 0 && <p className="helperText">{errors[0]}</p>}
    </div>
  );
};

export default TextInput;
