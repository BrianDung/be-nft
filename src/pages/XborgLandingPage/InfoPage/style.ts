import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    // InfoPage: {
    //   marginTop: '50px',
    //   [theme.breakpoints.down('sm')]: {
    //     margin: '50px 0',
    //   },
    // },
    // title: {
    //   fontFamily: 'Montserrat-SemiBold',
    //   fontSize: '56px',
    //   lineHeight: '26px',
    //   color: '#FFFFFF',
    // },
    // description: {
    //   marginTop: '20px',
    //   fontFamily: 'Montserrat-Medium',
    //   fontSize: '20px',
    //   lineHeight: '26px',
    //   color: '#FFFFFF',
    //   paddingRight: '37px',
    //   // width: '60%',
    //   [theme.breakpoints.down('xs')]: {
    //     paddingRight: '0',
    //     width: '100%',
    //   },
    // },
    // name: {
    //   fontFamily: 'Montserrat-Bold',
    //   fontSize: '20px',
    //   lineHeight: '26px',
    //   color: '#FFFFFF',
    // },
    // boxMint: {
    //   background: '#858585',
    //   borderRadius: '7px',
    //   height: 33,
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   maxWidth: 310,
    //   marginTop: '20px',
    //   [theme.breakpoints.down('xs')]: {
    //     width: '100%',
    //   },
    // },
    // nameMint: {
    //   fontFamily: 'Montserrat-SemiBold',
    //   fontSize: '16px',
    //   lineHeight: '26px',
    //   color: '#FFFFFF',
    //   marginBottom: 0,
    //   cursor: 'not-allowed',
    //   background: 'none',
    //   border: 'none',
    // },
    // input: {
    //   background: '#BDBDBD',
    //   borderRadius: '7px',
    //   height: 33,
    //   border: 'none',
    //   fontFamily: 'Montserrat-Medium',
    //   fontSize: '20px',
    //   color: '#FFFFFF',
    //   textAlign: 'center',
    //   marginBottom: '0',
    // },
    // textInput: {
    //   fontFamily: 'Montserrat-Medium',
    //   fontSize: '20px',
    //   color: '#FFFFFF',
    //   textAlign: 'center',
    //   marginBottom: '0',
    // },
    // quantity: {
    //   background: '#D05BE3',
    //   borderRadius: '7px',
    //   height: 33,
    //   width: '33px',
    //   fontFamily: 'Montserrat-Medium',
    //   fontSize: '20px',
    //   lineHeight: '26px',
    //   color: '#FFFFFF',
    //   position: 'absolute',
    //   right: 0,
    //   top: 0,
    //   cursor: 'pointer',
    //   border: 'none',
    // },
    // quantitysum: {
    //   background: '#D05BE3',
    //   borderRadius: '7px',
    //   height: 32,
    //   // width: '33px',
    //   padding: 11,
    //   fontFamily: 'Montserrat-Medium',
    //   fontSize: '20px',
    //   lineHeight: '13px',
    //   color: '#FFFFFF',
    //   cursor: 'pointer',
    //   border: 'none',
    //   marginLeft: '8px',
    //   // [theme.breakpoints.down('xs')]: {
    //   //   width: '40px',
    //   // },
    // },
    // boxNumber: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   // width: '60%',
    //   position: 'relative',
    //   [theme.breakpoints.down('xs')]: {
    //     // width: '100%',
    //   },
    // },
    // formControl: {
    //   display: 'flex',
    //   alignItems: 'center',
    // },

    // saleActions: {
    //   width: '50%',
    //   [theme.breakpoints.down('xs')]: {
    //     width: '100%',
    //   },
    // }
    xborgPageWrapper: {
      paddingTop: '15px',
      color: '#FFFFFF',
      fontWeight: 500,
      width: '50%',
      "@media only screen and (min-width: 960px) and (max-width: 1370px)": {
        width: '60%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    nftImage: {
      width: '25vw',
      height: '200px',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    pageInfo: {
      marginLeft: '100px',
      [theme.breakpoints.down('md')]: {
        marginLeft: 0
      },
    },
    priceBigSize: {
      fontSize: '50px',
    },
    priceMediumSize: {
      fontSize: '24px'
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
        [theme.breakpoints.down('md')]: {
          fontSize: '24px',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '20px',
        },
       
      },
      '&>p:last-child':{
        fontSize: '18px',
        textTransform: 'uppercase',
        [theme.breakpoints.down('sm')]: {
          padding: '0 15px',
        },
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
      },

    },
    roundType: {},
    deActiveStatus: {
      backgroundColor: '#AF47FF',
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
      '&>div:first-child': {
        marginRight: 10
      },
      '&>div:last-child': {
        margin: 'auto'
      },
      // flexWrap: 'wrap',
      "@media only screen and (min-width: 960px) and (max-width: 1370px)": {
        flexDirection: 'column',
        '&>div:first-child': {
          width: 'fit-content'
        },
        '&>div:last-child': {
          marginTop: 20,
          marginLeft: 0
        }
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        '&>div:last-child': {
          marginTop: 20,
          marginLeft: 0
        }
      },
     
    }
  };
});
