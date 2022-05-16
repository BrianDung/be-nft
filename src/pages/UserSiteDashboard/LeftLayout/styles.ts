import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    secondMenuItem: {
      display: 'flex',
      '&>a': {
        width: '100%',
      },
      position: 'relative'
    },
    devider: {
      border: '0.5px solid #8A92A6',
      width: 0.5,
      height: '80%',
      // marginRight: 20,
      position: 'absolute',
      left: 32,
      top: 4,
      '&.active': {
        border: '0.5px solid #FFFFFF',
      }
    },
    deviderSecond: {
      border: '0.5px solid #8A92A6',
      width: 0.5,
      height: '30%',
      // marginRight: 20,
      position: 'absolute',
      left: 32,
      bottom: 16,
      '&.active': {
        border: '0.5px solid #FFFFFF',
      },
    },
    deviderStakingPools: {
      border: '0.5px solid #8A92A6',
      width: 0.5,
      height: '25%',
      // marginRight: 20,
      position: 'absolute',
      left: 32,
      top: 56,
      '&.active': {
        border: '0.5px solid #FFFFFF',
      }
    },
    deviderFarmingPools: {
      border: '0.5px solid #8A92A6',
      width: 0.5,
      height: '25%',
      // marginRight: 20,
      position: 'absolute',
      left: 32,
      bottom: 12,
      '&.active': {
        border: '0.5px solid #FFFFFF',
      }
    },
    pageSlider: {
      // padding: '0px 10px',
      position: 'fixed',
      width: (props: any) => (props.collapsed ? 80 : 250),
      [theme.breakpoints.down(960)]: {
        position: 'unset',
        width: '100% !important',
      },
      zIndex: 10,
      '&>span>img': {
        cursor: 'pointer',
      },
    },
    navLeft: {
      marginLeft: (props: any) => (props.collapsed ? 0 : 12),
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '32px',
        marginLeft: '0 !important'
      },
    },
    smallNavMenu: {
      '&>ul>li': {
        '&:hover': {
          '& .itemNavLeftCollapse': {
            [theme.breakpoints.up('md')]: {
              display: 'block',
            },
          },
        },
        // '& .itemNavLeftCollapse': {
        //   [theme.breakpoints.up('md')]: {
        //     display: 'block',
        //   },
        // },
      },
    },
    imageDropdown: {
    },
    imageFull: {
      marginLeft: (props: any) => (props.collapsed ? 10 : 20),
      [theme.breakpoints.down('sm')]: {
        marginLeft: '20 !important',
      },
      marginBottom: '20px',
    },
    arrow: {
      position: 'absolute',
      top: 20,
      right: (props: any) => (props.collapsed ? -16 : -11),
      [theme.breakpoints.down('sm')]: {
        right: '-11 !important',
      },
      zIndex: 10,
      cursor: 'pointer',
      '&:hover': {
        opacity: 0.8,
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    itemNavLeft: {
      width: '100%',
      marginBottom: 9,
      fontFamily: 'Montserrat-SemiBold',
      cursor: 'pointer',
      position: 'relative',
      paddingRight: 12,
      '&:hover': {
        '&>a>svg': {
          opacity: 1,
          transition: 0.3
        },
        '&>div>svg': {
          opacity: '1 !important',
          transition: 0.3
        }
      }
    },
    dealDrop: {
      borderBottomLeftRadius: (props: any) => ((props.isShowManageDeal && !props.collapsed) ? '0px' : '8px'),
      borderBottomRightRadius: (props: any) => ((props.isShowManageDeal && !props.collapsed) ? '0px' : '8px'),
    },
    poolDrop: {
      borderBottomLeftRadius: (props: any) => ((props.isShowManagePool && !props.collapsed) ? '0px' : '8px'),
      borderBottomRightRadius: (props: any) => ((props.isShowManagePool && !props.collapsed) ? '0px' : '8px'),
    },
    itemChild: {
      marginBottom: '0 !important',
      paddingRight: '0'
    },
    itemNavLeftCollapse: {
      display: 'none',
      minWidth: '200px',
      maxWidth: '300px',
      zIndex: 1,
      position: 'absolute',
      background: '#252535',
      borderRadius: '0 9px 9px 0',
      padding: '8px 0px 8px 20px',
      left: '80px',
      top: '0px',
      fontFamily: 'Montserrat-SemiBold',
      lineHeight: '24px',
      '&__header': {
        fontSize: '16px',
        padding: '8px 20px',
        color: '#FFFFFF',
        '&:hover': {
          cursor: 'pointer',
          opacity: 0.8,
        },
      },
      '&__items': {
        marginLeft: '20px',
        // borderLeft: '2px solid rgba(255,255,255,0.1)',
        '& .active': {
          background: 'none !important',
        },
      },
      '&__item': {
        fontSize: '14px',
        opacity: 0.4,
        padding: '12px 25px',
        '&:hover': {
          cursor: 'pointer',
        },
      },
      '&__active': {
        opacity: 1,
      },
    },
    itemNavLeftMultipleLinks: {
      left: '68px !important'
    },
    linkItemNavLeft: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: 8,
      width: (props: any) => (props.collapsed ? '60px' : '100%'),
      transform: (props: any) => (props.collapsed ? 'translate(12px, 0px)' : ''),
      padding: (props: any) => (props.collapsed ? '13px 0px' : '13px 26px'),
      margin: (props: any) => (props.collapsed ? '0' : '0 auto'),
      [theme.breakpoints.down('sm')]: {
        padding: '13px 26px',
        justifyContent: 'flex-start !important',
        background: '#1d2536',
      },
      fontSize: 16,
      lineHeight: '20px',
      color: '#8D8D8D',
      transition: '0.3s',
      gap: '20px',
      justifyContent: (props: any) => {
        if (props.collapsed) {
          return 'center';
        }
        return 'flex-start';
      },
      //background: '#1d2536',
      '&.active': {
        background: '#301E52',
        color: '#FFFFFF',

        '& .icon': {
          backgroundColor: '#FFFFFF',
        },

        '&>img': {
          opacity: 1,
        },
      },

      '&>img': {
        opacity: 0.5,
      },

      '&:hover': {
        background: '#301E52',
        color: '#FFFFFF',
        transition: '0.3s',
        '& .icon': {
          backgroundColor: '#FFFFFF',
        },
      },

      '& .icon': {
        width: 30,
        height: 30,
        maskImage: `url('/images/icon_nav_left/icon-home.svg')`,
        backgroundColor: '#9A9A9A',
        maskPosition: 'center',
        maskRepeat: 'no-repeat',
        marginRight: 19,

        '&.icon-small': {
          margin: 'auto',
        },
      },
    },
    linkIDOProjectsItem: {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      fontSize: 14,
      fontFamily: 'Montserrat-Medium',
      paddingLeft: '60px !important',
    },
    linkIDOProjectsItemSecond: {
      fontSize: 14,
      fontFamily: 'Montserrat-Medium',
      width: '106px !important'
    },
    linkStakingPoolsItem: {
      borderRadius: 0,
      fontSize: 14,
      fontFamily: 'Montserrat-Medium',
      paddingLeft: '60px !important',
    },
    linkStakingPoolsItemSecond: {
      fontSize: 14,
      fontFamily: 'Montserrat-Medium',
      width: '106px !important'
    },
    linkFarmingPoolsItem: {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      fontSize: 14,
      fontFamily: 'Montserrat-Medium',
      paddingLeft: '60px !important',
    },
    linkFarmingPoolsItemSecond: {
      fontSize: 14,
      fontFamily: 'Montserrat-Medium',
      width: '106px !important'
    },
    textNav: {
      display: (props: any) => (props.collapsed ? 'none' : 'flex'),
      [theme.breakpoints.down('sm')]: {
        display: 'flex !important',
      },
    },
    textNavField: {
      display: (props: any) => (props.collapsed ? 'none' : 'flex'),
      justifyContent: 'space-between',
      width: '80%',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      },
    },
    closeIcon: {
      width: '32px',
      height: '32px',
      textAlign: 'center',
      paddingTop: '5px',
      borderRadius: '50%',
      cursor: 'pointer',
      marginRight: '16px',
    },

    [theme.breakpoints.down('sm')]: {
      navMenu: {
        display: 'none',
      },
    },

    DealMenu: {
      // [theme.breakpoints.down('lg')]: {
      display: (props: any) => (props.isShowManageDeal && !props.collapsed ? 'block' : 'none'),
      // },
      [theme.breakpoints.down('sm')]: {
        display: (props: any) => (props.isShowManageDeal ? 'block' : 'none'),
      },
    },
    poolMenu: {
      // [theme.breakpoints.down('lg')]: {
      display: (props: any) => (props.isShowManagePool && !props.collapsed ? 'block' : 'none'),
      // },
      [theme.breakpoints.down('sm')]: {
        display: (props: any) => (props.isShowManagePool ? 'block' : 'none'),
      },
    },
  };
});

export const useDrawerStyles = makeStyles((theme: any) => {
  return {
    headerField: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 16px 12px 24px',

      //alignItems: 'center'
    },
    logoImage: {

    },
    hamburgerImage: {
      display: (props: any) => (props.width >= 960 ? 'none' : 'block'),
      float: 'right', 
      transform: 'translate(-10px, 15px)',
    },
    root: {
      '& .MuiDrawer-paper': {
        width: '100%',
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        backgroundImage: 'url(/images/icon_nav_left/sidebar.svg)'
      },
    },
    headerNavMenuMobile: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '16px',
    },
    imageFull: {
      marginLeft: '20px',
      marginBottom: '20px',
    },
    headerNav: {
      background: 'none',
      // position: 'absolute',
      // bottom: '6vh',
      // display: 'flex',
      // flexDirection: 'column-reverse',
      alignItems: 'flex-start',
      '&>div': {
        width: '70%',
      },
      '&>button': {
        width: '70%',
      },
    },
    xImage: {
      position: 'absolute',
      bottom: 56,
      left: -12,
      zIndex: -100
    }
  };
});
