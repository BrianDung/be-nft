import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    cardImage: {
      width: '52px',
      height: '52px',
      background: '#D01F36',
      borderRadius: '18px',
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '2px 2px 2px #D01F36',
      position: 'relative',

      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '18px',
        background: '#D01F36',
        filter: 'blur(32px)'
      },

      '& img': {
        width: '32px',
        zIndex: 2
      }
    },
    mainContent: {
      '& h2.card__title': {
        padding: '0 32px',
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: '8px',
        marginTop: '0px',
        fontSize: '20px',
        lineHeight: '24px'
      },

      '& p': {
        padding: '0 12px',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.6)'
      }
    },
    cardContainer: {
      height: '100%',
      paddingBottom: '50px',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
  };
});

export default useStyles;
