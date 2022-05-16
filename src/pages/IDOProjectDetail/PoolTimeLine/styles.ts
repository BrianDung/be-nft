import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    sectionBuyTokenPoolTimeLine: {
      background: '#121327',
      borderRadius: 12,
      padding: '28px 28px',
      marginBottom: 12,
      color: '#FFFFFF',
      marginRight: 5,
      // minHeight: 270,
      height: '100%',
      [theme?.breakpoints?.down('sm')]: {
        padding: '28px 20px',
      },
    },

    title: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 18,
      lineHeight: '25px',
      textTransform: 'capitalize',
      marginRight: 40,
      color: '#FFFFFF',
      marginBottom: 20,

      [theme?.breakpoints?.down('sm')]: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: '24px',
      },
    },
    borderBottom: {
      background: 'rgba(255, 255, 255, 0.12)',
      borderRadius: '5px',
      transform: 'matrix(1, 0, 0, -1, 0, 0)',
      margin: '15px 0',
      height: '1px',
    },
    statusBarSteps: {
      display: 'flex',
      width: 'calc(100% - 30px)',
      marginBottom: 24,

      [theme?.breakpoints?.down('md')]: {
        flexDirection: 'column',
        width: 'calc(100%)',
      },

      '&>li:not(:last-child)': {
        position: 'relative',
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          left: 40,
          width: '80%',
          height: 5,
          background: '#1E123E',
          top: 20,

          [theme?.breakpoints?.down('md')]: {
            width: 5,
            height: '100%',
            top: 24,
            left: 10,
          },
        }
      }
    },

    itemStatusBarSteps: {
      width: 'calc(100%/3)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      fontFamily: 'Montserrat-Medium',
      fontSize: 14,
      lineHeight: '18px',
      color: '#AEAEAE',

      '&.active': {
        color: '#A84DFF',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        lineHeight: '24px',
      },

      '&:last-child': {
        width: 0,
      },

      '&:first-child .itemName': {
        left: 0,
        textAlign: 'left',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        lineHeight: '24px',
        color: '#FFFFFF',
        opacity: 0.4,
        '&.active': {
          color: '#A84DFF',
          fontFamily: 'Montserrat-Medium',
          fontSize: 14,
          lineHeight: '24px',
          opacity: 1,
        },
      },

      '&:last-child .itemName': {
        left: 0,
        textAlign: 'right',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        lineHeight: '24px',
        color: '#FFFFFF',
        opacity: 0.4,
        '&.active': {
          color: '#A84DFF',
          fontFamily: 'Montserrat-Medium',
          fontSize: 14,
          lineHeight: '24px',
          opacity: 1,
        },
      },

      [theme?.breakpoints?.down('md')]: {
        width: 'calc(100%)',
        flexDirection: 'row',
        paddingBottom: 24,

        '&:last-child': {
          width: '100%',
          paddingBottom: 0,
        },
      },

      '&.checkedList': {
        '&>span:first-child': {
          background: '#0961FE'
        },
        '&:before': {
          background:'#A84DFF !important'
        }
      },
    },
    itemValue: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: '#1E123E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: 16,
      fontFamily: 'Montserrat-SemiBold',
      lineHeight: '34px',
      color: '#ffffff99',

      '&.active': {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: '34px',
        background: '#A84DFF',
      },

      [theme?.breakpoints?.down('md')]: {
        width: 24,
        height: 24,
        fontSize: 16,
      },
    },

    itemName: {
      marginTop: 12,
      textAlign: 'center',
      position: 'relative',
      left: 'calc(-50% + 14px)',
      fontFamily: 'Montserrat-Medium',
      fontSize: 14,
      lineHeight: '24px',
      color: "#FFFFFF",
      opacity: 0.4,

      '&.active': {
        color: '#A84DFF',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        lineHeight: '24px',
        opacity: 1,
      },

      [theme?.breakpoints?.down('md')]: {
        marginTop: 0,
        fontSize: 14,
        lineHeight: '18px',
        left: '0',
        paddingLeft: 12,
        paddingTop: 3,
      },
    },

    title2: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '24px',
      color: '#FFFFFF',
      marginBottom: 15,

      [theme?.breakpoints?.down('sm')]: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: '18px',
      },
    },

    erroCountdown: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '24px',
      color: '#FFFFFF',
      marginTop: 100,
      display: 'flex',
      flexWrap: 'wrap',

      [theme?.breakpoints?.down('md')]: {
        marginTop: 30,
        fontSize: 14,
        lineHeight: '18px',
        textAlign: 'center',
        justifyContent: 'center',
      },
    },

    customToolTip: {
      width: 280,
      background: '#44454B',
      boxShadow: `0px 12px 20px rgba(0, 0, 0, 0.07)`,
      borderRadius: 4,
      padding: 13,

      [theme?.breakpoints?.down('sm')]: {
        marginTop: 10,
      },
    },

    nameToolTip: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 16,
      lineHeight: '18px',
      color: '#FFFFFF',
      marginBottom: 4,
    },

    desToolTip: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',

      '& span': {
        fontWeight: '400',
      }
    }
  };
});

export default useStyles;