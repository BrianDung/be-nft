import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useStyles } from './style';
type ImgaeProps = {
  images: any;
  slidesToShow: number,
}

const CarouseImages = (props:ImgaeProps) => {
  const { images , slidesToShow } = props;
  const classes = useStyles();
  const [imageIndex, setImageIndex] = useState(0);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    dots: true,
    arrows: false,
    slidesToShow: slidesToShow,
    centerPadding: "0",
    swipeToSlide: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current: any, next: any) => setImageIndex(next),
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
  const templateImages = images.map((image: any, idx: number) => {
    if (image !== null) {
      return (
        <div
          className={idx === imageIndex ? "activeSlide" : `${classes.slide}`}
          key={image.id}
        >
          <div className={classes.slideWrapper}>
            {image.code ? image.code : <img className={classes.imageCarousel} src={image.src} alt={image.alt} />}
          </div>
        </div>
      );
    }
    return null;
  });
  return (
    <Slider {...settings}>
      {templateImages}
    </Slider>
  );
};

export default CarouseImages;
