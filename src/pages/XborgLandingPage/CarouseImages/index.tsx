import React from 'react';
import { StackedCarouselSlideProps } from 'react-stacked-center-carousel';
import { useStyles } from './style';

const CarouseImages = (props: StackedCarouselSlideProps) => {
  const classes = useStyles();
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props;

  const src = data[dataIndex]?.src;
  const alt = data[dataIndex]?.alt;

  return (
    <div className={classes.Card} draggable={false}>
      <div className={`${classes.cover} ${classes.fill} ${isCenterSlide ? `${classes.off}` : `${classes.on}`}`}>
        <div
          className={`${classes.cardOverlay} ${classes.fill} `}
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
      </div>
      <div className={`${classes.detail} ${classes.fill} `}>
        <img alt={alt} className={`${classes.coverImage}`} src={src} />
      </div>
    </div>
  );
};

export default CarouseImages;
