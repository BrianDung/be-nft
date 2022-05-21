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
    xborgPageWrapper:{
      display: 'flex',
      padding: '50px 0',
      color: '#FFFFFF',
      fontWeight: 500,
      flexWrap: 'wrap'
    },
    nftImage: {
      width: '25vw',
      height: '200px',
      [theme.breakpoints.down('md')]: {
        width: '100%',
  },
    },
    pageInfo:{
      marginLeft: '100px',
      [theme.breakpoints.down('md')]: {
        marginLeft: 0
  },
    },
    priceBigSize: {
      fontSize: '4.375rem',
    },
    priceMediumSize: {
      fontSize: '1.25rem'
    },
    roundInfo:{
      padding: '5px 13px',
      textAlign: 'center',
      borderRadius: '8px',
      width: 'fit-content',
      '&>p': {
        marginBottom: 10,
        fontSize: '1.125rem',
        textTransform: 'uppercase',
        padding: '0 25px',
        width: 'fit-content',
        margin: '0 auto',
      borderRadius: '6px',
      },
      [theme.breakpoints.down('md')]: {
        width: '100%',
  },
    
    },
    roundType: {
      marginBottom: 0, 
      fontSize: '2rem',
    },
    deActiveStatus: {
      backgroundColor: '#AF47FF',
    },
    activeStatus: {
      backgroundColor: '#AF47FF',
      display: 'flex',
      alignItems: 'center'
    },
    timer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    }
  };
});
