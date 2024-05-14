import React from "react";
import classNames from "classnames";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

interface ButtonProps {
  children: React.ReactNode;
  numberItemShow: number;
  itemNumber: number;
  classButton?: string;
}

const CarouselComponent: React.FC<ButtonProps> = ({
  children,
  numberItemShow,
  itemNumber,
  classButton,
}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: numberItemShow,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: numberItemShow === 1 ? 1 : 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 480 },
      items: numberItemShow === 1 ? 1 : 2,
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1,
    },
  };
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const {
      carouselState: { currentSlide, slidesToShow, totalItems, transform },
    } = rest;

    return (
      <div className={classNames("carousel-button-group", classButton)}>
        <div
          className={
            currentSlide === 0
              ? "disable-button-carousel"
              : "able-button-carousel"
          }
          onClick={() => previous()}
          style={{ marginRight: 12 }}
        >
          <Image
            src={
              currentSlide === 0
                ? "/svg/caret-left.svg"
                : "/svg/caret-left-active.svg"
            }
            alt="caret-left"
            width={24}
            height={24}
            layout="fixed"
            color="red"
          />
        </div>
        <div
          onClick={() => next()}
          className={
            currentSlide + slidesToShow === itemNumber
              ? "disable-button-carousel"
              : "able-button-carousel"
          }
        >
          <Image
            src={
              currentSlide + slidesToShow === itemNumber
                ? "/svg/caret-right.svg"
                : "/svg/caret-right-active.svg"
            }
            alt="caret-right"
            width={24}
            height={24}
            layout="fixed"
          />
        </div>
      </div>
    );
  };
  const CustomDot = ({ onClick, ...rest }: any) => {
    const { active } = rest;
    const classes = classNames(
      "dotCarousel",
      { activeDot: active },
      { inactiveDot: !active }
    );
    return <div className={classes} onClick={() => onClick()} />;
  };
  return (
    <div className="carousel-container">
      <Carousel
        responsive={responsive}
        arrows={false}
        showDots={true}
        renderButtonGroupOutside={true}
        renderDotsOutside={true}
        customButtonGroup={<ButtonGroup />}
        customDot={<CustomDot />}
        dotListClass="dotListClass"
        containerClass="containerClass"
      >
        {children}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
