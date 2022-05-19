import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    container: {
      marginTop: 120,
    },
    carousel: {
      '& .slick-dots': {
        bottom: 6,
        '& li': {
          margin: 0,
          '& button': {
            '&:before': {
              fontSize: 10,
              opacity: '0.99',
            },
          },
        },
      },
    },
    imageCarousel: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    slide: {
      transform: 'scale(0.9)',
      transition: 'transform ease .3s',
      opacity: '0.5',
      zIndex: -1,
    },
    activeSlide: {
      transform: 'scale(0.1)',
      opacity: 1,
    },

    slideWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    Card: {
      transition: 'all 300ms ease',
      cursor: 'pointer',
      width: '100%',
      borderRadius: 15,
      height: '100%',
      position: 'relative',
    },
    fill: {
      width: '100%',
      height: '100%',
    },
    detail: {
      display: 'flex',
    },
    coverImage: {
      objectFit: 'cover',
      minWidth: '250px !important',
      height: '100%',
      borderRadius: 10,
    },
    cover: {
      position: 'absolute',
      transition: 'opacity 300ms ease',
    },
    on: {
      opacity: 1,
      zIndex: 1,
    },
    off: {
      opacity: 0,
      zIndex: -1,
    },
    cardOverlay: {
      userSelect: 'none',
      position: 'absolute',
      background: '#00000073',
      transition: 'all 300ms ease',
    },
  };
});
