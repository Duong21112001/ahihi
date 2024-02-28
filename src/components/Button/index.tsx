import React from "react";
import classNames from "classnames";
import Link from "next/link";

interface ButtonProps {
  type?:
    | "btn-primary"
    | "btn-secondary"
    | "btn-disable"
    | "btn-secondary-disable"
    | "btn-blue";
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  htmlType?: "button" | "submit";
  width?: string;
  bottom?: number;
  right?: number;
}

const Button: React.FC<ButtonProps> = ({
  type = "btn-primary",
  children,
  className,
  onClick,
  href,
  loading,
  disabled,
  htmlType = "submit",
  width = "170px",
  bottom = 0,
  right = 0,
}) => {
  const classes = classNames(
    type,
    className,
    { loading: loading },
    { disabled: disabled }
  );

  if (href) {
    return (
      <Link href={href}>
        <button
          className={classes}
          onClick={onClick}
          disabled={disabled || loading}
          style={{ width: width, marginBottom: bottom, marginRight: right }}
        >
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      type={htmlType}
      disabled={disabled || loading}
      style={{ width: width, marginBottom: bottom, marginRight: right }}
    >
      {children}
    </button>
  );
};

export default Button;
