import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    soldProgress: {
      margin: '10px 0 20px',
      '@media only screen and (min-width: 1550px)': {
        marginTop: '30px',
      },
    },
    jubValue: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 5,
      fontSize: '24px',

      '@media only screen and (max-width: 1800px)': {
        fontSize: '20px',
      },
      // [theme.breakpoints.down('md')]: {
      //     fontSize: '20px'
      // },
      [theme.breakpoints.down('sm')]: {
        fontSize: '18px',
      },
    },
    leftBotSec: {},
    progress: {
      border: '3px solid rgba(255, 255, 255, 1)',
      borderRadius: 10,
      height: 47,
      textAlign: 'center',
      lineHeight: '35px',
      width: 'calc(100% - 8px)',
      '@media only screen and (max-width: 1800px)': {
        height: 25,
        width: 'calc(100% - 6px)',
        // padding: '3px 0',
      },
    },
    achieved: {
      //   position: 'absolute',
      //   left: '4px',
      //   top: '4px',
      marginLeft: 4,
      // marginTop: 4,
      height: '100%',
      background: 'linear-gradient(270deg, #9CCFEC 0%, rgba(0, 0, 0, 0.2) 124.81%)',
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
      '@media only screen and (max-width: 1800px)': {
        height: '100%',
        marginLeft: 3,
        // marginTop: 3,
      },
    },
    rightBotSec: {
      width: 'inherit',
    },
    xborgTitle: {
      display: 'flex',
      alignItems: 'baseline',
      fontSize: '100px',
      fontWeight: 620,
      fontFamily: 'Mokoto',
      textShadow: '2px 2px 4px #000000',
      marginBottom: 0,
      marginTop: '15px',
      '@media only screen and (max-width: 1800px)': {
        fontSize: '75px',
        lineHeight: '100px',
      },
      // [theme.breakpoints.down('md')]: {
      //     fontSize: '75px',
      //     lineHeight: '100px'
      // },
      [theme.breakpoints.down('sm')]: {
        fontSize: '80px',
      },
      '@media only screen and (min-width: 500px) and (max-width: 670px)': {
        fontSize: '75px',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '50px',
        textAlign: 'center',
        width: '100%',
      },
    },
    mintText: {
      fontSize: '20px',
      [theme.breakpoints.down('xs')]: {
        fontSize: '15px',
      },
    },
    progressFull: {
      borderRadius: 6,
    },
  };
});
