"use client";

import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import styles from "./index.module.scss";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

import {} from "../../../public/svg/arrow-left.svg";

type PropType<T> = {
  data: T[];
  options?: EmblaOptionsType;
  numSlides?: number;
  classEmbla?: string;
};

const flexStyle = [
  "flex-[0_0_100%]",
  "flex-[0_0_50%]",
  "flex-[0_0_33.33%]",
  "flex-[0_0_25%]",
  "flex-[0_0_20%]",
];

const EmblaCarousel = <T extends JSX.Element>({
  data,
  options = { align: "start", loop: true },
  numSlides = 3,
  classEmbla,
}: PropType<T>) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className={styles.embla}>
      <div className={styles.emblaItem} ref={emblaRef}>
        <div className={styles.item}>
          {React.Children.toArray(
            data?.map((item) => (
              <div
                className={`${numSlides > 0 ? flexStyle[numSlides - 1] : ""} ${
                  styles.itemSlide
                }`}
              >
                {item}
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.emblaActive}>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <div className={styles.emblaActiveItem}>
          {React.Children.toArray(
            scrollSnaps.map((_, index) => (
              <DotButton onClick={() => onDotButtonClick(index)}>
                {index === selectedIndex ? (
                  // <ActiveDotsCircleIcon />
                  // <Image src="../../../public/svg/arrow-left.svg" alt={""} />
                  <div className={styles.dotActive} />
                ) : (
                  // <DotsCircleIcon />
                  <div className={styles.dotNotActive} />
                )}
              </DotButton>
            ))
          )}
        </div>

        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default EmblaCarousel;
