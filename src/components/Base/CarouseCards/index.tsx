import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useStyles from './style';

// const nextArrowSmall = "images/landing/arrow-next-carousel.svg";
// const prevArrowSmall = "images/landing/arrow-prev-carousel.svg";

const activeArrowBig = 'images/landing/next-arrow-big.svg';
const deactiveArrowBig = 'images/landing/prev-arrow-big.svg';

function SampleNextArrow(props: any) {
  const { className, onClick, isNext, styles, display = 'block' } = props;
  return (
    <img
      className={`${className} ${!isNext ? styles.rotate : ''}`}
      src={isNext ? activeArrowBig : deactiveArrowBig}
      alt="prev"
      onClick={onClick}
      style={{ right: '-50px', display, transform: 'unset', width: '48px', height: '48px' }}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, onClick, isPrev, styles, display = 'block' } = props;
  return (
    <img
      className={`${className} ${isPrev ? styles.rotate : ''}`}
      src={isPrev ? activeArrowBig : deactiveArrowBig}
      alt="prev"
      onClick={onClick}
      style={{ left: '-50px', display, transform: 'unset', width: '48px', height: '48px' }}
    />
  );
}

export default function CarouselCards({ children, length }: any) {
  const [isPrev, setPrev] = useState(false);
  const [isNext, setNext] = useState(true);
  const styles = useStyles();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 15000,
    slidesToScroll: 3,
    autoplay: true,
    fade: false,
    prevArrow: <SamplePrevArrow isPrev={true} styles={styles} />,
    nextArrow: <SampleNextArrow isNext={true} styles={styles} />,
    afterChange: (current: any) => {
      setPrev(current !== 0);
      setNext(current < length - 3);
    },
    responsive: [
      {
        breakpoint: 3840,
        settings: {
          slidesToShow: length <= 3 ? length : 5,
          slidesToScroll: length <= 3 ? length : 5,
        },
      },
      {
        breakpoint: 2048,
        settings: {
          slidesToShow: length <= 2 ? length : 4,
          slidesToScroll: length <= 2 ? length : 4,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: length <= 2 ? length : 4,
          slidesToScroll: length <= 2 ? length : 4,
        },
      },
      {
        breakpoint: 1439,
        settings: {
          slidesToShow: length <= 2 ? length : 3,
          slidesToScroll: length <= 2 ? length : 3,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          prevArrow: <SamplePrevArrow isPrev={isPrev} styles={styles} display="none" />,
          nextArrow: <SampleNextArrow isNext={isNext} styles={styles} display="none" />,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          prevArrow: <SamplePrevArrow isPrev={isPrev} styles={styles} display="none" />,
          nextArrow: <SampleNextArrow isNext={isNext} styles={styles} display="none" />,
        },
      },
    ],
  };
  return <Slider {...settings}>{children}</Slider>;
}
