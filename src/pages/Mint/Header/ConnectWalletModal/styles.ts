import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    dialog: {
      '& .MuiPaper-root': {
        borderRadius: 10,
        position: 'relative',
      },

      '&__container': {
        background: '#fff',
        padding: '30px 30px 46px',
      },

      '&__header': {
        background: '#fff',
        padding: '0px 0px 20px',
        '& > h6': {
          color: '#000000',
          fontSize: 32,
          lineHeight: '25px',
          fontFamily: 'Montserrat-SemiBold',
          margin: 0,
        },
        '& > img': {
          cursor: 'pointer',
        },
      },

      '&__content': {
        display: 'flex',
      },
    },
  };
});

export default useStyles;
