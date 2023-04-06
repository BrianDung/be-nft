import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    newLandingPage: {
      backgroundImage: `url(./images/newPage/background.svg)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      // background: 'linear-gradient(90deg, #06071D 0%, #290A4B 100%)',
      minHeight: '100vh',
    },
    newLandingPageMobile : {
      backgroundImage: `url(./images/newPage/backgroundMobile.svg)`,
    },
    pageInfo: {
      display: 'flex',
      alignItems: 'stretch',
      marginBottom: '35px',
      // [theme.breakpoints.down('md')]: {
      //   marginBottom: '25px',
      // },
      "@media only screen and (max-width: 1800px)": {
        marginBottom: '25px',
      },
      "@media only screen and (max-width: 1184px)": {
        flexDirection: 'column',
        padding: '0px',
      },
      padding: '0px 60px',
    },
    priceBigSize: {
      fontSize: '50px',
      fontFamily: 'Segoe-Medium',
      // [theme.breakpoints.down('md')]: {
      //   fontSize: '35px'
      // },
      "@media only screen and (max-width: 1800px)": {
        fontSize: '35px'
      },
    },
    priceMediumSize: {
      fontSize: '24px',
      // [theme.breakpoints.down('md')]: {
      //   fontSize: '20px'
      // },
      "@media only screen and (max-width: 1800px)": {
        fontSize: '20px'
      },
    },

    priceMediumSize2: {
      fontSize: '34px',
      // [theme.breakpoints.down('md')]: {
      //   fontSize: '20px'
      // },
      "@media only screen and (max-width: 1800px)": {
        fontSize: '20px'
      },
    },

    container: {
      position: 'relative',
      minHeight: '90vh',
      fontFamily: 'Segoe-Medium',
      '@media screen and (max-width: 1184px)': {
        padding: '0 60px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0 45px',
        // marginBottom: '50px',
      },
      [theme.breakpoints.down('xs')]: {
        padding: '0 10px',
        // marginBottom: '50px',
      },
    },
    dots: {
      height: 8,
      width: 8,
      borderRadius: '100%',
      border: '1px solid #A0A0A0',
      cursor: 'pointer',
      [theme.breakpoints.down('xs')]: {
        height: 8,
        width: 8,
      },
    },
    pagelink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '5px 120px 20px 0',
      // [theme.breakpoints.down('md')]: {
      //   paddingBottom: 15,
      // },
      "@media only screen and (max-width: 1800px)": {
        paddingBottom: 15,
        paddingRight: 65
      },
      [theme.breakpoints.down('sm')]: {
        padding: '5px 0 30px',
        justifyContent: 'center',
      },
    },
    link: {
      marginRight: 17,
      '& > img': {
        width: 36,
      },
      '&:last-child': {
        marginRight: 0,
      },
    },
  };
});
