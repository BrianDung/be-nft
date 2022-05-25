import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    xborgPageWrapper: {
      // paddingTop: '15px',
      color: '#FFFFFF',
      fontWeight: 500,
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '@media screen and (max-width: 1184px)': {
        width: '100%',
      },
    },
    nftImage: {
      width: '25vw',
      height: '200px',
      "@media only screen and (max-width: 1800px)": {
        width: '100%',
      },
      // [theme.breakpoints.down('md')]: {
      //   width: '100%',
      // },
    },
    pageInfo: {
      marginLeft: '100px',
      "@media only screen and (max-width: 1800px)": {
        marginLeft: 0
      },
      // [theme.breakpoints.down('md')]: {
      //   marginLeft: 0
      // },
    },
    roundInfo: {
      padding: '13px',
      textAlign: 'center',
      borderRadius: '8px',
      width: 'fit-content',
      minWidth: '170px',
      [theme.breakpoints.up('lg')]: {
        minWidth: '270px',
      },
      "@media only screen and (max-width: 1800px)": {
        padding: 10,
      },
      // [theme.breakpoints.down('md')]: {
      //   padding: 10,
      // },
      '&>p': {
        marginBottom: 10,
        padding: '0 25px',
        width: 'fit-content',
        margin: '0 auto',
        borderRadius: '6px',
        [theme.breakpoints.down('xs')]: {
          margin: 0,
        },
      },
      '&>p:first-child':{
        padding: 0,
        fontSize: '34px',
        whiteSpace: 'nowrap',
        "@media only screen and (max-width: 1800px)": {
          fontSize: '22px',
          marginBottom: 5
        },
        // [theme.breakpoints.down('md')]: {
        //   fontSize: '22px',
        //   marginBottom: 5
        // },
        [theme.breakpoints.down('sm')]: {
          fontSize: '20px',
        },
       
      },
      '&>p:last-child':{
        fontSize: '18px',
        textTransform: 'uppercase',
        "@media only screen and (max-width: 1800px)": {
          fontSize: '16px',
        },
        // [theme.breakpoints.down('md')]: {
        //   fontSize: '16px',
        // },
        [theme.breakpoints.down('sm')]: {
          padding: '0 15px',
        },
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },

    },
    roundType: {
      fontFamily: 'Montserrat-Medium',
    },
    deActiveStatus: {
      backgroundColor: '#8C8C8C',
      marginBottom: '0 !important'
    },
    activeStatus: {
      backgroundColor: '#AF47FF',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0 !important'
    },
    timer: {
      display: 'flex',
      justifyContent: 'space-between',
      '&>div:nth-child(2)': {
        margin: 'auto'
      },
      "@media only screen and (max-width: 1800px)": {
        marginLeft: 0,
      },
      '@media screen and (max-width: 1184px)': {
        marginTop: 40
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 25
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        '&>div:nth-child(2)': {
          marginTop: 20,
          margin: 'auto'
        }
      },
     
    }
  };
});
