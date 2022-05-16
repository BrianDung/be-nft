import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  
  return {
    navigationField: {
      height: 80,
      background: '#121327',
      position: (props: any) => ((props.pageYOffset > 70 && props.scrollingUp) ? 'fixed' : 'relative'),
      width: '100%',
      zIndex: 1
    },
    marginTopField: {
      height: 80,
      position: (props: any) => ((props.pageYOffset <=70 || !props.scrollingUp) ? 'fixed' : 'relative')
    },
    backgroundComponent: {
      background: '#000',
      minHeight: '100vh',
    },
    page: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    DefaultLayout: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    NavLeft: {
      backgroundImage: 'url(/images/icon_nav_left/sidebar.svg)',
      backgroundRepeat: 'repeat-y',
      width: (props: any) => (props.collapsed ? '80px' : '250px'),
      position: 'relative',
      backgroundSize: '100%',
      // transition: 'all 0.2s ease',
      [theme.breakpoints.up('md')]: {
        paddingTop: 20,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100% !important',
      },
    },
    XSidebar: {
      marginTop: '6vh',
      transform: (props: any) => (props.collapsed ? 'translateX(-90px)' : 'none'),
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    iconX: {
      position: 'fixed',
      left: 0,
      bottom: '13%',
      transform: (props: any) => (props.collapsed ? 'translateX(-50%)' : 'none'),
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    RightLayout: {
      width: (props: any) => (props.collapsed ? 'calc(100% - 80px)' : 'calc(100% - 250px)'),
      position: 'relative',
      paddingLeft: (props: any) => {
        if (props.pathName === '/' || props.pathName === '/profile' || props.pathName === '/new-landing') {
          return 0;
        }
        return '50px';
      },
      paddingRight: (props: any) => {
        if (props.pathName === '/' || props.pathName === '/profile' || props.pathName === '/new-landing') {
          return 0;
        }
        return '50px';
      },
      [theme.breakpoints.down('md')]: {
        width: '90%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        '& > .header': {
          display: 'none',
        },
      },
      background: 'url(images/bgr-user-site.svg)',
    },
    headerLayout: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  };
});

export default useStyles;
