import React, { useRef } from 'react';
import Slider from 'react-slick';
import { useStyles } from './style';
const CarouseImages = () => {
  const ref = useRef(null);
  const classes = useStyles();
  const settings = {
    dots: false,
    className: classes.carousel,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider ref={ref} {...settings}>
      {[...Array(12)].map((element, index) => (
        <span key={index}>
          <img
            style={{ height: '100%', width: '100%' }}
            alt={element}
            src={`/images/newLanding/CarouselImages/${index + 1}.png`}
          />
        </span>
      ))}
    </Slider>
  );
};

export default CarouseImages;
