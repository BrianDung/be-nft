import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    alertVerifyEmail: {
      marginTop: -25,
      marginBottom: 15,
      position: 'relative',
      width: '100%',
      padding: 9,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#591425',
      borderRadius: '8px',
      minHeight: 42,

      '& .btn-close': {
        position: 'absolute',
        top: '50%',
        right: '15px',
        transform: 'translateY(-50%)',
      },

      '& span': {
        fontFamily: 'Helvetica',
        fontSize: 14,
        lineHeight: '20px',
        color: '#FFFFFF',
      },

      '& a': {
        color: '#6398FF',
      },

      [theme?.breakpoints?.down('sm')]: {
        alignItems: 'flex-start',
      },
    },

    errroTier: {
      width: 'fit-content',
      display: 'flex',
      padding: 12,
      position: 'relative',
      background: '#8203D0',
      alignItems: 'center',
      borderRadius: 8,
      marginBottom: 25,
      flexDirection: 'row',
      justifyContent: 'center',
      fontFamily: 'Helvetica',
      fontSize: 16,
      lineHeight: '24px',
      color: '#FFFFFF',
      marginLeft: 10,

      [theme?.breakpoints?.down('sm')]: {
        alignItems: 'flex-start',
      },
    },

    warningWhite: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 25,
      background: '#244A9C',
      borderRadius: 8,
      fontFamily: 'Helvetica',
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',
      minHeight: 42,

      [theme?.breakpoints?.down('sm')]: {
        alignItems: 'flex-start',
      },
    },

    whitelistPending: {
      width: '100%',
      display: 'flex',
      padding: 12,
      flexDirection: 'row',
      paddingLeft: '2rem',
      marginBottom: 25,
      background: '#D0AA4D',
      borderRadius: 8,
      fontFamily: 'Helvetica',
      fontSize: 16,
      lineHeight: '24px',
      color: '#070A1B',
      '& svg': {
        marginRight: '.5rem',
        minWidth: '20px',
      },

      [theme?.breakpoints?.down('sm')]: {
        alignItems: 'flex-start',
        paddingLeft: '1rem',
      },
    },

    registeredSuccess: {
      width: 'fit-content',
      display: 'flex',
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      marginLeft: 10,
      marginBottom: 25,
      background: 'linear-gradient(90.08deg, #A84DFF -58.13%, #454CF9 24.91%, #454CF9 100.35%)',
      borderRadius: 8,
      fontFamily: 'Helvetica',
      fontSize: 16,
      lineHeight: '24px',
      color: '#FFFFFF',
      '& svg': {
        marginRight: '.5rem',
        minWidth: '20px',
      },

      [theme?.breakpoints?.down('sm')]: {
        alignItems: 'flex-start',
        paddingLeft: '1rem',
      },
      '&>span': {
        marginLeft: 5,
      },
    },

    headerComponent: {
      color: '#FFFFFF',
      marginBottom: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    top: {
      marginBottom: 15,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      [theme?.breakpoints?.down('sm')]: {
        flexDirection: 'column',
      },

      '&.is_address': {
        flexDirection: 'column',
        marginBottom: 8,
      },
    },

    iconToken: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      marginRight: 12,
    },

    title: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 32,
      lineHeight: '45px',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: 0,

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 28,
        lineHeight: '32px',
        marginTop: 8,
        textAlign: 'center',
      },
    },

    address: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Helvetica',
      fontSize: 14,
      lineHeight: '18px',
      marginBottom: 20,

      '& a': {
        color: '#6398FF',
        textDecoration: 'underline',
      },
      '& img': {
        marginLeft: 6,
      },
    },

    navHeaderComponent: {
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      wordBreak: 'break-word',

      // [theme?.breakpoints?.down('sm')]: {
      //   display: 'grid',
      //   gridTemplateColumns: '50% 50%',
      //   width: '100%',
      //   gridRowGap: 14,
      // },
    },

    item: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Montserrat-Medium',
      fontSize: 14,
      lineHeight: '24px',
      padding: '0 20px',
      borderRight: '2px solid #131A26',
      color: 'rgba(255, 255, 255, 0.8)',

      '&:last-child': {
        borderRight: 0,
      },

      [theme?.breakpoints?.down('sm')]: {
        borderRight: 0,
        fontSize: 14,
        lineHeight: '18px',
        fontWeight: 'bold',
        padding: '0 8px',
      },
    },

    iconItem: {
      height: 20,
      marginRight: 4,
      color: '#fff',

      [theme?.breakpoints?.down('sm')]: {
        height: 16,
      },
    },

    // applyWhiteListButton: {
    //   width: 200,
    //   height: 42,
    //   background: '#8203D0',
    //   borderRadius: 60,
    //   color: 'white',
    //   border: 'none',
    //   marginTop: 32,
    // },
    notification: {
      display: 'flex',
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'center',
      marginBottom: 25,
      background: 'linear-gradient(90.08deg, #A84DFF -58.13%, #454CF9 24.91%, #454CF9 100.35%)',
      fontFamily: 'Helvetica',
      fontSize: 16,
      lineHeight: '24px',
      color: '#FFFFFF',
      '& svg': {
        marginRight: '.5rem',
        minWidth: '20px',
      },

      [theme?.breakpoints?.down('sm')]: {
        alignItems: 'flex-start',
        paddingLeft: '1rem',
      },
      '&>span': {
        marginLeft: 5,
      },
    },
  };
});

export default useStyles;
