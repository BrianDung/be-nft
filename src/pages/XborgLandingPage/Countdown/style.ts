import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    countdownPart: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      listStyleType: 'none',
      padding: '9px 0',
      background: '#000000',
      borderRadius: '50%',
      width: '87px',
      height: '87px',
      margin: '0px 5px',
      [theme.breakpoints.down('md')]: {
        width: '72px',
        height: '72px',
      },
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
        [theme.breakpoints.down('sm')]: {
          fontSize: '18px',
        },
      }
    },
    countdown: {
      color: '#FFFFFF',
      fontSize: '30px',
    },
    countdownInfo1: {
      fontFamily: 'Montserrat-Medium',
      fontSize: '1rem',
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
      fontSize: 14,
      lineHeight: '21px',
      fontFamily: 'Montserrat-Regular',
    },
    [theme.breakpoints.down('md')]: {
      countdownPart: {
        padding: '10px 5px',
        '&.number': {
          padding: '5px 5px 15px 5px'
        }
      }
    }
  };
});

export default useStyles;
