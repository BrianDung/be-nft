import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    thumbnail: {
      cursor: "pointer",
      borderRadius: "5px",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      objectFit: "cover",
    },
    rotate: {
      transform: 'rotate(180deg) !important'
    },

    slickSlider: {
      '&>div': {
        margin: '0 25px'
      },
      "& .slick-prev":{
        "@media (min-width: 375px)": {
          display:'none !important',
        },
      },
      "& .slick-next":{
        "@media (min-width: 375px)": {
          display:'none !important',
        },
      },
      "& .slick-dots":{
        "@media (min-width: 375px)": {
          bottom:'-50px',
          marginBottom:'20px',
        },
      },
    },
  };
});

export default useStyles;
