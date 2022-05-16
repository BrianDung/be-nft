import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    poolDetails:{
      background: '#303035',
      borderRadius: '12px',
      padding: '28px',
      [theme.breakpoints.down('md')]: {
        padding: '12px',
      },
    },
    Titlepool:{
      fontFamily:'DM Sans',
      fontSize:'16px',
      lineHeight:'24px',
      color: '#FFFFFF',
      fontWeight: 700,
      textTransform: 'uppercase',
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
      fontFamily:'DM Sans',
      fontSize:'13px',
      lineHeight:'18px',
      color: '#AEAEAE',
      fontWeight: 700,
      width: '25%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    description:{
      fontFamily:'Helvetica',
      fontSize:'14px',
      lineHeight:'20px',
      color: '#FFFFFF',
      fontWeight: 400,
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
      fontFamily:'Helvetica',
      fontSize:'14px',
      lineHeight:'20px',
      color: '#6398FF',
      fontWeight: 400,
      textDecorationLine:'underline',
      cursor: 'pointer',
      "&:hover": {
        color: '#6398FF',
        textDecoration: 'underline',
      },
      marginBottom: 12
    },
    textDescription:{
      fontFamily:'Helvetica',
      fontSize:'14px',
      lineHeight:'20px',
      color: '#FFFFFF',
      fontWeight: 400,
    },
    boxDes:{
      marginTop:'15px',
    }
  };
});

export const useTabStyles = makeStyles((theme: any) => {
  return {
    root: {
      '& .MuiAppBar-colorPrimary': {
        backgroundColor: '#121327',
        borderRadius: 12,
      },
      '& .MuiPaper-elevation4': {
        boxShadow: 'none'
      }
    },
    styledTabs: {
      '& .MuiTab-wrapper': {
        fontSize: 16,
        fontWeight: 500,
      }
    }
  }
});
