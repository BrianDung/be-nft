import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    newLandingPage: {
      // backgroundImage: `url(/images/newPage/bg-banner-home.svg)`,
      // backgroundRepeat:'no-repeat',
      // backgroundSize:'100%',
      background: '#121327',
      minHeight: '100vh',
    },
    pageInfo: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '50px',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
    Info: {
      width: '40%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    carousel: {
      width: '60%',

      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginBottom: '50px',
      },
      '& .slick-dots li button': {
        color: '#A0A0A0',
        [theme.breakpoints.down('sm')]: {
          marginBottom: '40px',
        },
      },
      '& .slick-dots': {
        [theme.breakpoints.down('sm')]: {
          bottom: '-50px',
        },
      },
      '& .slick-dots li': {
        [theme.breakpoints.down('xs')]: {
          margin: '0',
        },
      },
      '& .react-stacked-center-carousel ': {
        overflow: 'unset !important',
        minHeight: '30vh !important',
      },
    },
    container: {
      padding: '0 50px',
      position: 'relative',
      minHeight: '90vh',
      [theme.breakpoints.down('sm')]: {
        padding: '0 20px',
        marginBottom: '50px',
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
      gap: 15,
      justifyContent: 'flex-end',
      margin: '40px',
      [theme.breakpoints.down('xs')]: {
        margin: '20px',
      },
    },
    link: {},
  };
});
