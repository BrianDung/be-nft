import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    countdownPart: {
      display: 'inline-block',
      listStyleType: 'none',
      padding: '9px 23px',
      color: 'white',
      font: 'normal normal bold 18px/24px DM Sans',
      background: 'rgba(255, 255, 255, 0.07)',
      borderRadius:'5px',
      margin: '0px 5px',

      '& span': {
        display: 'block',
        textAlign: 'center'
      },

      '&.number': {
        display: 'block',
        minWidth: 60,
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '28px',
      }
    },
    countdown:{
      color: '#FFFFFF',
      opacity: 0.4,
      fontSize:'30px',
    },
    countdownInfo1:{
      fontFamily:'Montserrat-Medium',
      fontSize: 18,
      lineHeight: '25px',
    },
  
    listCountDown: {
      display: 'flex', 
      alignItems: 'center',
      marginBottom:5,

      [theme?.breakpoints?.down('sm')]: {
        textAlign: 'center',
        justifyContent: 'center',
      },
    },

    countdownInfo: {
      color: '#FFFFFF',
      fontSize: 12,
      lineHeight: '21px',
      marginTop: 4,
      opacity: '0.4',
      fontFamily:'Montserrat-Regular',
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
