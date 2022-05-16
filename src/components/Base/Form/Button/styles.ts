import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    button: {
      borderRadius: 8,
      color: '#FFFFFF',
      padding: '9px 23px',
      '&.MuiButton-contained': {
        fontFamily: 'Montserrat-Medium',
      },
      '&.MuiButton-outlined': {
        position: 'relative',
        transition: 'all 5s ease-in-out',
        borderStyle: 'solid',
        borderWidth: '2.5px',
      },
      '& > .MuiButton-label': {
        fontSize: '14px',
        textTransform: 'initial',
        fontFamily: 'Montserrat-Medium',
      },
      '&.rounded': {
        borderRadius: 40,

        '&.MuiButton-outlined': {
          '&::before': {
            borderRadius: 40,
          },
        },
      },
    },
    'shadow-primary': {
      boxShadow: '0px 3.84762px 3.84762px rgba(0, 0, 0, 0.25)',
    },
    'shadow-none': {
      boxShadow: 'none',
    },
    primary: {
      '&.MuiButton-contained': {
        background: 'linear-gradient(102.92deg, #B347FF 6.55%, #454CF9 47.11%, #0961FE 71.51%, #02ACD3 98.22%);',
      },
      '&.MuiButton-outlined': {
        border: 'none',
        // backgroundColor: "#554DAC",
        '&::before': {
          opacity: 1,
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: 1,
          borderRadius: 8,
          background: 'linear-gradient(102.92deg, #B347FF 6.55%, #454CF9 47.11%, #0961FE 71.51%, #02ACD3 98.22%)',
          '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          '-webkit-mask-composite': 'xor',
          transition: 'all 0.25s ease-in-out',
        },
        "&:hover": {
            background: "linear-gradient(270deg,#02acd3,#0961fe 31%,#454cf9 48%,#b347ff)",
        }
      },
    },
    blue: {
      '&.MuiButton-contained': {
        background: '#3232DC',
      },
      '&.MuiButton-outlined': {
        color: '#6398FF',
        borderColor: '#6398FF',
      },
    },
    gray: {
      '&.MuiButton-contained': {
        background: '#38383D',
      },
      '&.MuiButton-outlined': {
        color: '#38383D',
        borderColor: '#38383D',
      },
    },
    'secondary-text': {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '20px',
      color: '#AEAEAE',
    },
    'primary-text': {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '24px',
    },
  };
});

export default useStyles;
