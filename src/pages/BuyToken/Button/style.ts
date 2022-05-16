import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    button: {
      color: '#FFFFFF',
      border: 'none',
      fontWeight: 700,
      fontSize: 14,
      padding: '15px 50px',
      borderRadius: 60,
      cursor: 'pointer',
      transition: '.2s all ease-in',
      width: 180,
      fontFamily: 'Montserrat-Bold',
      background: (props: any) => props.background,

      '&:focus': {
        outline: 'none',
      },

      '&:hover': {
        //opacity: .12
      },

      '&:active': {
        transform: 'translateY(-3px)',
      },

      '&:disabled': {
        // backgroundColor: '#b5b5b5 !important' as any
        cursor: 'not-allowed',
        // opacity: .6
      },
    },
  };
});

export default useStyles;
