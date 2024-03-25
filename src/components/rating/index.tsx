import React from "react";
import styles from "./index.module.scss";
import Text from "../Text";
import Box from "../Box";
import Image from "next/image";
interface RatingProps {
  numberRating: number;
}

const Rating: React.FunctionComponent<RatingProps> = ({ ...props }) => {
  const { numberRating } = props;
  return (
    <Box flex right={10} className={styles.rateIcon}>
      {[...Array(numberRating)].map((value, key) => {
        return (
          <Image
            src="/svg/rating.svg"
            alt="rating"
            layout="fixed"
            width={20}
            height={20}
            style={{ marginRight: 2 }}
            key={`rating-${key}`}
          />
        );
      })}
      {[...Array(5 - numberRating)].map((value, key) => {
        return (
          <Image
            src="/svg/un-rating.svg"
            alt="rating"
            layout="fixed"
            width={20}
            height={20}
            style={{ marginRight: 2 }}
            key={`un-rating-${key}`}
          />
        );
      })}
    </Box>
  );
};

export default Rating;
