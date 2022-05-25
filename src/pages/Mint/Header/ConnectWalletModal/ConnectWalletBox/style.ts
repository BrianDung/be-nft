import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    walletBox: {
      minWidth: 133,
      border: '2px solid transparent',
      maxWidth: 180,
      width: '100%',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: '.1s all linear',
      boxSizing: 'border-box',
      borderRadius: 10,
      boxShadow: '0px 3px 50px rgba(0, 0, 0, 0.078)',
      '&:not(:first-child)': {
        marginLeft: 18,
      },
      padding: '24px 72px',
      position: 'relative',
    },
    walletBoxIcon: {
      width: 40,
    },
    networkImage: {
      '&.network-disabled': {
        'mix-blend-mode': 'luminosity',
      },
    },
    walletBoxText: {
      color: '#0B111B',
      marginTop: 10,
      marginBottom: 0,
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      textAlign: 'center',
      opacity: 0.5,
    },
    walletBoxIconWrap: {
      position: 'relative',
      borderRadius: 4,
    },
    [theme.breakpoints.down('xs')]: {
      walletBox: {
        '&:not(:first-child)': {
          marginLeft: 12,
        },
        padding: '12px',
      },
      walletBoxIcon: {
        width: 30,
      },
    },
  };
});

export default useStyles;
