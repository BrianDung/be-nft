import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    poolDetails:{
      background: '#121327',
      borderRadius: '12px',
      padding: '28px',
      [theme.breakpoints.down('md')]: {
        padding: '12px',
      },
    },
    flexDetails:{
      display: 'flex',
      marginTop:'30px',
      // [theme.breakpoints.down('sm')]: {
      //   flexDirection:'column',
      // },
      [theme.breakpoints.down('md')]: {
        flexDirection:'column',
      },
    },
    boxToken:{
      width: '50%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    boxLink:{
      width: '50%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    flexbox:{
      display: 'flex',
      alignItems:'center',
      gap: '20px',
      marginBottom:'15px',
      [theme.breakpoints.down('xs')]: {
        flexDirection:'column',
        alignItems: 'flex-start',
      },
    },
    text:{
      fontFamily:'Montserrat-Regular',
      fontSize:'14px',
      lineHeight:'24px',
      color: '#FFFFFF',
      width: '25%',
      opacity: 0.4,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    description:{
      fontFamily:'Montserrat-Medium',
      fontSize:'14px',
      lineHeight:'24px',
      color: '#FFFFFF',
      opacity: 0.8,
      width: '50%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    image:{
      marginLeft:'10px',
      cursor: 'pointer',
    },
    textLink:{
      fontFamily:'Montserrat-Medium',
      fontSize:'14px',
      lineHeight:'24px',
      color: '#0961FE',
      textDecorationLine:'underline',
      cursor: 'pointer',
      "&:hover": {
        color: '#6398FF',
        textDecoration: 'underline',
      },
      marginBottom: 12
    },
    borderBottom:{
      background: 'rgba(255, 255, 255, 0.12)',
      borderRadius:'5px',
      transform: 'matrix(1, 0, 0, -1, 0, 0)',
      margin: '15px 0',
      height: '1px',
    },
    textDescription:{
      fontFamily:'Montserrat-Regular',
      fontSize:'14px',
      lineHeight:'24px',
      color: '#FFFFFF',
      opacity: 0.8,
      margin: '10px 0px',
      whiteSpace:'break-spaces',
    },
    textInfo:{
      fontFamily:'Montserrat-Medium',
      fontSize:'14px',
      lineHeight:'24px',
      color: '#FFFFFF',
      opacity: 0.4,
    },
    boxDes:{
      marginTop:'15px',
    }
  };
});