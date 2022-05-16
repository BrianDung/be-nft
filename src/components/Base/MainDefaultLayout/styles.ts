import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    mainLayout: {
      gridArea: 'main',
      width: '100%',
    },

    alertVerifyEmail: {
      position: 'relative',
      width: '100%',
      maxWidth: '1040px',
      margin: '0 auto',
      padding: 9,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#D0AA4D',
      marginBottom: 15,
      borderRadius: '8px',
      minHeight: 42,
      
      [theme.breakpoints.down('sm')]: {
        alignItems: 'flex-start',
        width: '90%',
      },

      '& img': {
        marginTop: 3,
        [theme.breakpoints.down('sm')]: {
          marginTop: 6,
        },
      },

      '& .btn-close': {
        position: 'absolute',
        top: '50%',
        right: '15px',
        transform: 'translateY(-50%)'
      },

      '& span': {
        font: 'normal normal 400 14px/24px Helvetica',
        color: '#070A1B',
      },

      '& a': {
        color: '#3232DC'
      }
    },

    errorSwich: {
      marginBottom: 20,
    },
  };
});

export default useStyles;
