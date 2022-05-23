import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    formControl: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0 20px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: '10px',
      },
    },
    boxNumber: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        '&>div:first-child': {
          width: '100%',
        },
      },
    },
    input: {
      background: 'transparent',
      padding: '11px 80px 11px 15px',
      textAlign: 'center',
      color: '#fff',
      fontFamily: 'Montserrat-Medium',
      fontSize: 24,
      lineHeight: '58px',
      border: 'none',
      outline: 'none',
      position: 'relative',
      width: '294px',
      zIndex: 99,
      [theme.breakpoints.down('sm')]: {
        padding: '11px 80px 11px 15px',
        lineHeight: 'normal',
        width: '100%',
      },
    },
    quantity: {
      background: 'transparent !important',
      '& > span.MuiButton-label': {
        fontFamily: 'Montserrat-Medium',
        fontSize: '38px',
        color: '#FFFFFF',
      },
      cursor: 'pointer',
      border: '3.5px solid #FFFFFF',
      borderRadius: '10px',
      padding: '13px 25px',
      marginLeft: '15px',
      lineHeight: 'normal',
      '&.form': {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 100,
      },
      '&:disabled': {
        background: '#8C8C8C !important',
        border: '4px solid #FFFFFF',
        '& > span.MuiButton-label': {
          opacity: 0.5,
        },
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px 25px',
        '& > span.MuiButton-label': {
          lineHeight: 'normal',
          fontSize: '36px',
        },
      },
    },
    max: {
      background: 'none !important',
      border: '4px solid #FFFFFF',
      borderRadius: '10px',
      '& > span.MuiButton-label': {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: '34px',
        color: '#FFFFFF',
        [theme.breakpoints.down('sm')]: {
          fontSize: '28px',
          lineHeight: '40px',
        },
      },
      cursor: 'pointer',
      margin: '10px 0 20px 15px',
      padding: '12px 22px',
      lineHeight: 'normal',
      '&:disabled': {
        background: '#8C8C8C !important',
        border: '4px solid #FFFFFF',
        '& > span.MuiButton-label': {
          opacity: 0.5,
        },
      },
      [theme.breakpoints.down('md')]: {
        padding: '0px 22px',
        lineHeight: 'normal',
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
        marginBottom: 30,
      },
    },
    mint: {
      background: '#60A444 !important',
      border: '4px solid #FFFFFF !important',
      marginBottom: 0,
      padding: '12px 84px',
      borderRadius: '10px',
      width: '80%',
      maxWidth: '390px',
      '& > span.MuiButton-label': {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: '34px',
        lineHeight: '58px',
        color: '#FFFFFF',
        [theme.breakpoints.down('sm')]: {
          fontSize: '28px',
          lineHeight: '30px',
        },
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '28px',
        width: '100%',
        maxWidth: 'unset',
      },
      '&:disabled': {
        background: '#8C8C8C !important',
        border: '4px solid #FFFFFF',
        '& > span.MuiButton-label': {
          opacity: 0.5,
        },
      },
    },
    mintForm: {
      display: 'flex',
    },
  };
});
