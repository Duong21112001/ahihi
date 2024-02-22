import React from "react";
import classNames from "classnames";

interface TextProps {
  children: React.ReactNode;
  type?:
    | "title-28-regular"
    | "title-28-medium"
    | "title-28-semibold"
    | "title-28-bold"
    | "title-32-bold"
    | "title-24-bold"
    | "title-24-semibold"
    | "title-24-medium"
    | "title-24-regular"
    | "title-20-bold"
    | "title-20-semibold"
    | "title-20-medium"
    | "title-20-regular"
    | "title-18-bold"
    | "title-18-semibold"
    | "title-18-regular"
    | "title-18-medium"
    | "body-16-bold"
    | "body-16-semibold"
    | "body-16-medium"
    | "body-16-medium-italic"
    | "body-16-regular"
    | "body-14-bold"
    | "body-14-semibold"
    | "body-14-medium"
    | "body-14-medium-italic"
    | "body-14-regular"
    | "tag-12-bold"
    | "tag-12-semibold"
    | "tag-12-medium"
    | "tag-12-medium-italic"
    | "tag-12-regular"
    | "tag-10-bold"
    | "tag-10-semibold"
    | "tag-10-semibold-italic"
    | "tag-10-medium"
    | "tag-10-medium-italic"
    | "tag-10-regular"
    | "heading-h1"
    | "heading-h2"
    | "heading-h3"
    | "heading-h4"
    | undefined;
  color?:
    | "primary-bule"
    | "neutral-1"
    | "neutral-2"
    | "neutral-3"
    | "neutral-4"
    | "neutral-5"
    | "neutral-10"
    | "neutral-8"
    | "main-color-secondary"
    | "main-color-primary "
    | "shade-primary-4"
    | "shade-primary-5"
    | "bule-4"
    | "bule-5"
    | "tint-primary-3"
    | "sematic-1"
    | undefined;
  disabled?: boolean;
  state?: null | "disable";
  className?: string;
  onClick?: () => void;
}

const Text: React.FC<TextProps> = ({
  type,
  color,
  disabled = false,
  className = "",
  onClick = () => {},
  children,
}) => {
  const classes = classNames(
    type,
    color,
    { "text-disable": disabled },
    className
  );
  return (
    <p className={classes} onClick={onClick}>
      {children}
    </p>
  );
};

export default Text;
