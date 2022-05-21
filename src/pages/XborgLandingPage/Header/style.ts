import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    root: {
      width: '100%',
      padding: '40px 60px',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: ' 15px',
      },
    },
    logoField: {},
    pageHeader: {
      display: 'flex',
      alignContent: 'center',
      '& > .connect-btn': {
        background: 'linear-gradient(90deg, #A74AFC 0%, rgba(7, 153, 206, 0.95) 100%)',
        borderRadius: 10,
        padding: '8px 28px',
        '& > span.MuiButton-label': {
          fontSize: 30,
          lineHeight: '58px',
          fontFamily: 'Montserrat-Regular',
        },
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    networks: {
      width: 62,
      maxWidth: '100%',
    },
    logNetworks: {
      background: 'linear-gradient(90deg, #A74AFC 0%, rgba(7, 153, 206, 0.95) 100%)',
      borderRadius: 8,
      cursor: 'pointer',
    },
    balance: {
      maxWidth: '100%',
      cursor: 'pointer',
      padding: '8px 28px',
    },
    textbalance: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 30,
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 0,
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      [theme.breakpoints.down('sm')]: {
        fontSize: 19,
      },
    },
    accountInfo: {
      display: 'flex',
      cursor: 'pointer',
      padding: '12px 33px',
      borderRadius: 8,
      position: 'relative',

      '&::before': {
        opacity: 1,
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 4,
        borderRadius: 8,
        background: 'linear-gradient(90deg, #692BA1 0%, #0D6699 100%)',
        '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        '-webkit-mask-composite': 'xor',
        transition: 'all 0.25s ease-in-out',
      },
      '&:first-child': {
        width: 'fit-content',
        marginRight: 37,
        padding: '9px 38px',
        [theme.breakpoints.down('sm')]: {
          marginBottom: 10,
          marginRight: 0,
        },
      },
      [theme.breakpoints.down('md')]: {
        width: 'auto',
        justifyContent: 'flex-end',
        padding: '12px 9px',
      },
      '&__networks': {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
          marginRight: 10,
        },
        borderRight: '3px solid #FFFFFF',
        marginRight: 10,
        color: '#FFFFFF',
        '& > p': {
          marginBottom: 0,
          fontSize: 26,
          fontFamily: 'Montserrat-Regular',
          lineHeight: '24px',
          [theme.breakpoints.down('sm')]: {
            fontSize: 20,
          },
        },
      },
      '&__balance': {
        color: '#FFFFFF',
        fontSize: 26,
        marginBottom: 0,
        fontFamily: 'Montserrat-Regular',
        lineHeight: '24px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          fontSize: 20,
        },
      },
    },
  };
});
