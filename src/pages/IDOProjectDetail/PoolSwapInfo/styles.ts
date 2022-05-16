import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    sectionBuyTokenPoolSwapInfo: {
      background: '#121327',
      borderRadius: 12,
      padding: '28px 28px',
      marginBottom: 12,
      color: '#FFFFFF',
     // fontFamily: 'DM Sans',
      marginLeft: 5,
      height: '100%',
      [theme?.breakpoints?.down('sm')]: {
        padding: '28px 20px',
      },
    },
    
    title: {
      fontFamily:'Montserrat-Medium',
      fontSize: 18,
      lineHeight: '25px',
      textTransform: 'capitalize',
      marginBottom: 20,
      color: '#FFFFFF',

      [theme?.breakpoints?.down('sm')]: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: '24px',
      },
    },
    borderBottom:{
      background: 'rgba(255, 255, 255, 0.12)',
      borderRadius:'5px',
      transform: 'matrix(1, 0, 0, -1, 0, 0)',
      margin: '15px 0',
      height: '1px',
    },
    topSec: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 24,
    },

    leftTopSec: {
      width: '100%',
    },

    valueLeftTopSec: {
      marginTop: 4,
      fontFamily: 'Montserrat-Medium',
      fontSize: 18,
      lineHeight: '24px',
      color: '#FFFFFF',
    },

    rightTopSec: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '20px',
      color: '#A84DFF',
      marginLeft: 'auto',
      textAlign: 'right',
    },

    titleSub: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '24px',
      color: '#ffffff66',
      marginBottom: 10,
      display: 'flex',
    },

    titleSub2: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '24px',
      color: '#FFFFFF',
      marginBottom: 24,
      display: 'flex',
      opacity: '0.4',
    },

    botSec: {

    },

    jubValue: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 15,
    },

    leftBotSec: {
      fontSize: 14,
      lineHeight: '24px',
      color: '#F22222',
      fontFamily: 'Montserrat-Medium',
    },

    rightBotSec: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 14,
      lineHeight: '24px',
      color: '#AEAEAE',
      opacity: 0.8,
    },

    progress: {
      width: '100%',
      height: 8,
      backgroundColor: '#2B313A',
      position: 'relative',
      borderRadius: 41,
    },

    achieved: {
      width: '30%',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      background: 'linear-gradient(270deg, #F22222 0%, rgba(242, 34, 34, 0.5) 100%)',
      borderRadius: 20,
    },
  };
});

export default useStyles;