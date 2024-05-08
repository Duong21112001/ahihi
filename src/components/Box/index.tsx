import React from "react";
import classNames from "classnames";
import Link from "next/link";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  bottom?: number;
  alignText?: "text-center" | "text-left" | "text-right";
  right?: number;
  maxWidth?: number;
  flex?: boolean;
  agileItem?: "agile-center" | "agile-flex-end" | "agile-flex-start";
  justContent?: "content-beetween" | "content-center";
  left?: number;
  width?: number;
  radius?: number;
  paddingTop?: number;
  paddingLeft?: number;
  paddingBottom?: number;
  paddingRight?: number;
  // href: string;
}

const Box: React.FC<BoxProps> = ({
  className = "",
  onClick = () => {},
  children,
  bottom,
  alignText,
  right,
  maxWidth,
  width,
  left,
  flex,
  agileItem,
  justContent,
  radius,
  // href,
}) => {
  const classes = classNames(
    agileItem,

    justContent,
    alignText,
    className,
    {
      displayFlex: flex,
    }
  );
  return (
    <div
      className={classes}
      onClick={onClick}
      style={{
        width: width,
        marginBottom: bottom,
        marginLeft: left,
        marginRight: right,
        maxWidth: maxWidth,
        borderRadius: radius,
      }}
    >
      {children}
    </div>
  );
};

export default Box;
