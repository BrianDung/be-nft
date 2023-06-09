import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    countdownPart: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      listStyleType: 'none',
      padding: '9px 0',
      background: (props: any) => props.landingPage ? '#2B347D' : '#000000',
      borderRadius: '50%',
      width: '87px',
      height: '87px',
      margin: '0px 5px',
      // [theme.breakpoints.down('md')]: {
      //   width: '72px',
      //   height: '72px',
      // },
      "@media only screen and (max-width: 1800px)": {
        width: '72px',
        height: '72px',
      },
      '@media screen and (max-width: 1184px)': {
        width: '10vw',
        height: '10vw',
      },
      [theme.breakpoints.down('sm')]: {
        width: '12vw',
        height: '12vw',
      },
      [theme.breakpoints.down('xs')]: {
        width: '20vw',
        height: '20vw',
      },
      "@media only screen and (min-width: 500px) and (max-width: 600px)": {
        width: '18vw',
        height: '18vw',
      },
      // '@media screen and (orientation: landscape)': {
      //   width: '56px !important',
      //   height: '56px !important'
      // },
      '& span': {
        // display: 'block',
        textAlign: 'center'
      },
      '&.number': {
        // display: 'block',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: '24px',
        lineHeight: '28px',
        fontWeight: 500,
        color: '#FFFFFF',
        // [theme.breakpoints.down('md')]: {
        //   fontSize: '20px',
        // },
        "@media only screen and (max-width: 1800px)": {
          fontSize: '20px',
        },
        [theme.breakpoints.down('xs')]: {
          fontSize: '18px',
        },
        "@media only screen and (min-width: 500px) and (max-width: 600px)": {
          fontSize: '22px'
        },
      }
    },
    countdown: {
      color: '#FFFFFF',
      fontSize: '30px',
    },
    countdownInfo1: {
      lineHeight: '25px',
    },

    listCountDown: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 0,
      marginLeft: 30,
      [theme?.breakpoints?.down('md')]: {
        marginLeft: 0
      },
      [theme?.breakpoints?.down('xs')]: {
        textAlign: 'center',
        justifyContent: 'flex-start',
        marginLeft: '-5px'
      },
    },

    countdownInfo: {
      color: '#FFFFFF',
      fontSize: (props: any) => props.landingPage ? 12 : 14,
      lineHeight: '21px',
      fontFamily: 'Montserrat-Medium',
    },
    // [theme.breakpoints.down('md')]: {
    //   countdownPart: {
    //     padding: '10px 5px',
    //     '&.number': {
    //       padding: '5px 5px 15px 5px'
    //     }
    //   }
    // }
    "@media only screen and (max-width: 1800px)": {
      countdownPart: {
            padding: '10px 5px',
            '&.number': {
              padding: '5px 5px 15px 5px'
            }
          }
    },
  };
});

export default useStyles;
