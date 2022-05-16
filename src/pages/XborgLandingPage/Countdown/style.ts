import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    countdownPart: {
      display: 'inline-block',
      listStyleType: 'none',
      padding: '9px 0',
      background: '#2B347D',
      borderRadius:'50%',
      width: '60px',
      height: '60px',
      margin: '0px 5px',
      '& span': {
        display: 'block',
        textAlign: 'center'
      },
      '&.number': {
        display: 'block',
        fontFamily:'Montserrat-SemiBold',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: '28px',
        color:'#FFFFFF',
      }
    },
    countdown:{
      color: '#FFFFFF',
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
      marginBottom:20,

      [theme?.breakpoints?.down('sm')]: {
        textAlign: 'center',
        justifyContent: 'center',
      },
    },

    countdownInfo: {
      color: '#FFFFFF',
      fontSize: 9,
      lineHeight: '21px',
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
