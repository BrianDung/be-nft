import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    root: {
      width: '100%',
      padding: '40px 60px',
      // [theme.breakpoints.down('md')]: {
      //   padding: '25px 60px',
      // },
      "@media only screen and (max-width: 1700px)": {
        padding: '25px 60px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '27px 0px',
      },
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logoField: {},
    pageHeader: {
      display: 'flex',
      alignContent: 'center',
      '& > .connect-btn.MuiButton-contained': {
        background: '#000',
        borderRadius: 10,
        padding: '8px 28px',
        border: '4px solid #fff',
        "@media only screen and (max-width: 1700px)": {
          borderWidth: '3px',
          padding: '8px 20px',
        },
        // [theme.breakpoints.down('md')]: {
        //   borderWidth: '3px',
        //   padding: '8px 20px',
        // },
        [theme.breakpoints.down('sm')]: {
          borderWidth: '2px',
          padding: '8px 20px',
        },
        '& > span.MuiButton-label': {
          fontSize: 30,
          lineHeight: '58px',
          fontFamily: 'Montserrat-Regular',
          "@media only screen and (max-width: 1700px)": {
            fontSize: 18,
            lineHeight: '25px',
          },
          // [theme.breakpoints.down('md')]: {
          //   fontSize: 18,
          //   lineHeight: '25px',
          // },
        
        },
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
      whiteSpace: 'nowrap',
      "@media only screen and (max-width: 1700px)": {
        padding: '18px 24px',
      },
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
        "@media only screen and (max-width: 1700px)": {
          padding: 3
        },
        [theme.breakpoints.down('sm')]: {
          padding: 2,
        },
      },
      '&:first-child': {
        width: 'fit-content',
        marginRight: 37,
        padding: '9px 38px',
        [theme.breakpoints.down('sm')]: {
          marginRight: 5,
          padding: 10,
        },
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: 10,
        padding: 10,
        height: 40,
      },
      // [theme.breakpoints.down('md')]: {
      //   width: 'auto',
      //   justifyContent: 'flex-end',
      //   padding: '12px 9px',
      // },
      '&__networks': {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
          marginRight: 10,
          [theme.breakpoints.down('sm')]: {
            marginRight: 5,
          },
        },
        borderRight: '3px solid #FFFFFF',
        marginRight: 10,
        [theme.breakpoints.down('sm')]: {
          marginRight: 5,
        },
        color: '#FFFFFF',
        '& > p': {
          marginBottom: 0,
          fontSize: 26,
          fontFamily: 'Montserrat-Medium',
          lineHeight: '24px',
          "@media only screen and (max-width: 1700px)": {
            fontSize: 18
          },
          // [theme.breakpoints.down('sm')]: {
          //   fontSize: 18
          // },
          [theme.breakpoints.down('xs')]: {
            fontSize: 14,
          },
        },
      },
      '&__balance': {
        color: '#FFFFFF',
        fontSize: 26,
        marginBottom: 0,
        fontFamily: 'Montserrat-Medium',
        lineHeight: '24px',
        display: 'flex',
        alignItems: 'center',
        "@media only screen and (max-width: 1700px)": {
          fontSize: 18
        },
        // [theme.breakpoints.down('sm')]: {
        //   fontSize: 18
        // },
        [theme.breakpoints.down('xs')]: {
          fontSize: 14,
        },
      },
    },
  };
});
