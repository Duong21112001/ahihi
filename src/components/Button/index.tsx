import React from "react";
import classNames from "classnames";
import Link from "next/link";

interface ButtonProps {
  type?:
    | "btn-ghost"
    | "btn-primary"
    | "btn-secondary"
    | "btn-disable"
    | "btn-secondary-disable"
    | "btn-blue"
    | "btn-blue-secondary";

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
  bottom = 0,
  right,
}) => {
  const classes = classNames(
    type,
    className,
    { [`loading`]: loading },
    { [`disabled`]: disabled }
  );

  if (href) {
    return (
      <Link href={href}>
        <button
          className={classes}
          onClick={onClick}
          disabled={disabled || loading}
          style={{ marginBottom: bottom, marginRight: right }}
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
      style={{ marginBottom: bottom, marginRight: right }}
    >
      {loading && (
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
      )}
      {children}
    </button>
  );
};

export default Button;
