import { useRequest } from "@umijs/hooks";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";

interface BannerProps {
  id: number;
  path: string;
  redirect: string;
  status: number;
  order: number;
  created_at: string;
  updated_at: string;
}
const Banner = () => {
  const [banners, setBanners] = useState<BannerProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 769 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 480 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "https://kosei-web.eupsolution.net/api/banners"
        );
        const data = await response.json();
        console.log("data=====", data.data);

        if (Array.isArray(data.data)) {
          setBanners(data.data);
        } else {
          setError("Data received is not an array");
        }
      } catch (err) {
        setError("Failed to fetch banners");
      }
    };

    fetchBanners();
  }, []);

  return (
    <Carousel
      autoPlay
      autoPlaySpeed={8000}
      responsive={responsive}
      infinite={true}
      transitionDuration={500}
      centerMode={false}
      renderArrowsWhenDisabled={true}
      showDots={false}
    >
      {banners.map((item) => (
        <Image
          src={`https://kosei-web.eupsolution.net${item.path}`}
          alt=""
          key={item.id}
          className="w-full h-[70vh] object-cover"
          width={500}
          height={500}
        />
      ))}
    </Carousel>
  );
};

export default Banner;
