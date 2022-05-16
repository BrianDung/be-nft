import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';

interface Props {
  url: string;
  muted?: boolean;
  type: string;
  collapsed?: boolean;
}

const useStyles = makeStyles<Theme, Props>((theme: any) => {
  return {
    container: {
      position: 'relative',
    },
    banner: {
      '& img': {
        objectFit: 'contain',
        width: '100%',
      },
      '& video': {
        objectFit: 'contain',
        maxWidth: '100%',
      },
    },
    body: {
      [theme.breakpoints.up(1440)]: {
        position: 'absolute',
        bottom: (props: any) => (props.collapsed ? '12vh' : '20px'),
        width: '100%',
      },
    },
    overlay: {
      [theme.breakpoints.up(1440)]: {
        display: 'flex',
        gap: 50,
      },
    },
    carousels: {
      marginTop: '50px',
      margin: '50px 15px 0 15px',
      [theme.breakpoints.up(1440)]: {
        alignSelf: 'flex-end',
        width: '400px',
        margin: 0,
      },
    },
    socials: {
      position: 'absolute',
      right: '50px',
      top: '30vh',
      [theme.breakpoints.down('sm')]: {
        top: '10vh',
        right: '20px',
      },
      '&__container': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '&--item': {
          paddingBottom: '18px',
          cursor: 'pointer',
        },
      },
    },
    sidebar: {
      [theme.breakpoints.up(1440)]: {
        width: 'calc(100vw - 800px)',
        alignSelf: 'flex-end',
        flexGrow: 1,
      },
      padding: '15px',
      color: '#fff',

      fontFamily: 'Montserrat-SemiBold',
      '&__status': {
        background: '#FF5E06',
        padding: '2px 10px',
        borderRadius: '40px',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
      },
      '&__title': {
        fontSize: '48px',
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
          fontSize: '32px',
        },
      },
      '&__network': {
        [theme.breakpoints.down('sm')]: {
          fontSize: '12px',
        },
        '&--name': {
          color: 'rgba(255, 255, 255, 0.6);',
          fontFamily: 'Montserrat-Medium',
        },
      },
      '&__content': {
        fontFamily: 'Montserrat-Regular',
        fontSize: '16px',
        lineHeight: '26px',
        opacity: 0.8,
        marginTop: '12px',
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '12px',
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
          // display: '-webkit-box',
          // '-webkit-line-clamp': 2,
          // '-webkit-box-orient': 'vertical',
        },
      },
      '&__muted': {
        cursor: 'pointer',
        '&:hover': {
          background: 'linear-gradient(270deg,#02acd3,#0961fe 31%,#454cf9 48%,#b347ff)',
          borderRadius: '50%',
        },
      },

      '&__footer': {
        [theme.breakpoints.down('md')]: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
        },
        '&--btn': {
          cursor: 'pointer',
          border: '1px solid #454CF9',
          borderRadius: '40px',
          padding: '10px 22px',
          marginRight: '10px',
          fontFamily: 'Montserrat-Medium',
          fontWeight: 500,
          '&:hover': {
            background: 'linear-gradient(270deg,#02acd3,#0961fe 31%,#454cf9 48%,#b347ff)',
          },
        },
      },
    },
  };
});

export default useStyles;
