import React from "react";
import classNames from "classnames";
import Text from "../Text";
import styles from "./index.module.scss";
import Link from "next/link";
import Box from "../Box";

interface LinkProps {
  label: string;
  link: string;
}
interface BreadcrumbProps {
  breadcrumbs: LinkProps[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  className = "",
  breadcrumbs,
}) => {
  const classes = classNames(className, styles.breadcrumb);
  return (
    <div className={classes}>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <Box flex agileItem="agile-center">
            <Link href={breadcrumb.link}>
              <Text
                className={
                  index + 1 === breadcrumbs.length
                    ? styles.textActive
                    : styles.text
                }
                key={breadcrumb.label}
                type="body-14-regular"
              >
                {breadcrumb.label}
              </Text>
            </Link>
            {index + 1 !== breadcrumbs.length && <div className={styles.dot} />}
          </Box>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
