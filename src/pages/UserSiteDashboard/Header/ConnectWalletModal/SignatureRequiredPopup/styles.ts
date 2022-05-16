import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    signatureModal: {
      '& .MuiPaper-root': {
        width: 560,
        background: '#000',
        boxShadow: '0px 3px 50px rgba(0, 0, 0, 0.161)',
        alignItems: 'center',
        padding: '32px 0',
        borderRadius: 10
      },
      '&__icon': {
        width: 80,
      },
      '&__title': {
        color: '#FFF',
        fontSize: 32,
        fontFamily: 'Montserrat-Medium',
        lineHeight: '45px',
        margin: '17px 0 0',
      },
      '&__message': {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        lineHeight: '45px',
        marginBottom: 0,
      },
    },
    [theme.breakpoints.down('xs')]: {
      signatureModal: {
        '&__title': {
          color: '#FFF',
          fontSize: 18,
          fontFamily: 'Montserrat-Medium',
          lineHeight: '45px',
          margin: '17px 0 0',
        },
        '&__message': {
          color: '#FFF',
          fontSize: 14,
          lineHeight: 'normal',
          marginTop: 14.5,
          marginBottom: 0,
        },
      },
    },
  };
});

export default useStyles;
