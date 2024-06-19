import React from "react";
import classNames from "classnames";
import Text from "../Text";
import styles from "./index.module.css";
import Link from "next/link";
import Box from "../Box";
import Image from "next/image";

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
      <div className={styles.breadcrumbContainer}>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <Box flex agileItem="agile-center" key={breadcrumb.label}>
              {index + 1 === breadcrumbs.length ? (
                <Text
                  key={breadcrumb.label}
                  type="body-14-regular"
                  color="neutral-10"
                >
                  {breadcrumb.label}
                </Text>
              ) : (
                <Link href={breadcrumb.link}>
                  <Text
                    key={breadcrumb.label}
                    type="body-14-regular"
                    color="neutral-10"
                  >
                    {breadcrumb.label}
                  </Text>
                </Link>
              )}

              {index + 1 !== breadcrumbs.length && (
                <Box
                  width={24}
                  flex
                  agileItem="agile-center"
                  justContent="content-center"
                >
                  <Image
                    src="/svg/caret-right-active.svg"
                    alt="rating"
                    layout="fixed"
                    width={11}
                    height={11}
                  />
                </Box>
              )}
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
