import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    currencyName: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '24px',
      color: '#A84DFF',
    },

    btnGroup: {
      marginTop: 20,
      paddingTop: 12,
      borderTop: '1px solid #44454B',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: 12,

      '&>div>button': {
        height: 42,
        width: '100%',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        lineHeight: '24px',
        color: '#FFFFFF',
        padding: 5,
        borderRadius: 40,
      },

      '&>div:last-child>button': {
        backgroundColor: '#2B313A !important',
      },

      '&>div:last-child>button:disabled': {
        backgroundColor: '#2B313A !important',
        cursor: 'not-allowed',
      },

      '&>div:first-child>button': {
        backgroundColor: '#3232DC !important',
      },

      '&>div:first-child>button:disabled': {
        backgroundColor: '#3232DC !important',
        opacity: 0.6,
        cursor: 'not-allowed',
      },

      [theme?.breakpoints?.down('sm')]: {
        marginTop: 12,
        paddingTop: 32,
        // gridTemplateColumns: '1fr',

        '&>div:first-child>button': {
          marginBottom: 12,
        },
      },
    },

    buyTokenForm: {
      background: '#121327',
      borderRadius: 12,
      padding: '28px 28px',
      marginBottom: 12,
      color: '#FFFFFF',
   //  display: 'grid',
   //  gridColumnGap: 40,
   //  gridTemplateColumns: '1fr 1fr',

      [theme?.breakpoints?.down('sm')]: {
        // gridTemplateColumns: '1fr',
        padding: '28px 20px',
        border: '1px solid #6398FF',
      },
    },

    leftBuyTokenForm: {

    },

    rightBuyTokenForm: {
      wordBreak: 'break-word',
    },

    listStep: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    step: {
      width: 'calc(50% - 2.5px)',
      fontFamily:'Montserrat-Medium',
      fontSize: 16,
      lineHeight: '24px',
      color: '#ffffff66',
      borderBottom: '4px solid #1E123E',
      paddingBottom: 4,
      textAlign: 'center',
      marginBottom: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems:'center',

      '& img': {
        marginRight: 9,
      },
      
      '& > span': {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        opacity: "0.6",
        color: "#FFFFFF",
      },

      [theme?.breakpoints?.down('sm')]: {
        marginTop: 25,
        marginBottom: 28,
        fontSize: 14,
        lineHeight: '18px',
        paddingBottom: 8,
      },
    },

    stepOneActive: {
      borderColor: '#A84DFF',
      color: '#A84DFF',
      '&.disabled': {
        borderColor: '#2B313A'
      },
      '& > span': {
        backgroundColor: "#A84DFF",
        opacity: 1,
        color: "#FFFFFF",
      },
    },

    activeDisableStep1: {
      borderColor: '#A84DFF',
      color: '#FFFFFF',
      opacity: 0.5,
    },
    boxStep:{
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      opacity: "0.6",
      width: 22,
      height: 22,
      borderRadius:'50%',
      color: '#FFFFFF',
      fontFamily:'Montserrat-Medium',
      fontSize:14,
      marginRight: '10px',
    },
    boxStep2:{
      background: '#ffffff1a',
      width: 22,
      height: 22,
      borderRadius:'50%',
      color: '#ffffff99',
      fontFamily:'Montserrat-Medium',
      fontSize:14,
      marginRight: '10px',
    },
    title: {
      fontFamily:'Montserrat-Medium',
      fontSize: 18,
      lineHeight: '25px',
      textTransform: 'capitalize',
      marginRight: 40,
      color: '#FFFFFF',

      [theme?.breakpoints?.down('sm')]: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: '24px',
      },
    },

    title2: {
      marginBottom: 4,
      fontFamily: 'Montserrat-Regular',
      fontSize: 17,
      lineHeight: '23px',
      color: '#FFFFFF',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 14,
        lineHeight: '18px',
      },
    },

    buyTokenFormTitle: {
      marginTop: 10,
     // lineHeight: '24px',
    //  color: '#AEAEAE',
     // fontFamily: 'DM Sans',
      //fontWeight: 500,
     // fontSize: 16,

      [theme?.breakpoints?.down('sm')]: {
        fontSize: 14,
        lineHeight: '20px',
        marginTop: 0,
      },
    },

    buyTokenInputForm: {
      border: '1px solid rgba(255, 255, 255, 0.3)',
      maxWidth: '100%',
      padding: '7px 13px',
      borderRadius: 5,
    },

    buyTokenInputWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 14,
      lineHeight: '18px',

      [theme?.breakpoints?.down('sm')]: {
        display: 'grid',
        gridTemplateColumns:' auto 125px',
      },

      '& span': {
        fontWeight: 'bold'
      },

    },

    buyTokenInput: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#FFFFFF',
      fontFamily: 'Montserrat-Regular',
      fontSize: 16,
      lineHeight: '26px',

      '&:focus': {
        outline: 'none'
      },

      '&::placeholder': {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        lineHeight: '26px',
        color: '#FFFFFF',
      },

      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },

    borderBottom:{
      background: 'rgba(255, 255, 255, 0.12)',
      borderRadius:'5px',
      transform: 'matrix(1, 0, 0, -1, 0, 0)',
      margin: '15px 0',
      height: '1px',
    },

    flexSwap:{
      display: 'flex',
      justifyContent:'space-between',
      margin:'40px 0',
      [theme?.breakpoints?.down('md')]: {
        flexDirection: 'column'
      },
    },

    buyTokenInputLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#999999',
      font: 'normal normal normal 12px/18px Helvetica'
    },

    buyTokenFee: {
      color: '#999999',
      marginTop: 10,
      font: 'normal normal normal 12px/18px Helvetica'
    },

    buyTokenEstimate: {
      marginTop: 20,

      [theme.breakpoints.down('sm')]: {
        marginTop: 24,
      },
    },

    buyTokenEstimateLabel: {
      font: 'normal normal bold 14px/18px DM Sans'
    },

    buyTokenEstimateAmount: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 18,
      lineHeight: '25px',
      color: '##FFFFFF',
      margin: '5px 0',
    },

    [theme.breakpoints.down('xs')]: {
      btnGroup: {}
    },

    poolErrorBuyWarning: {
      fontFamily: 'Montserrat-Regular',
      marginTop: 25,
      fontWeight: 'bold',
      color: '#fff100',
      fontSize: 15
    },

    poolErrorBuy: {
      fontFamily: 'Montserrat-Regular',
      marginTop: 25,
      fontWeight: 'bold',
      fontSize: 15,
      color: '#D01F36'
    },

    purchasableCurrency: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Montserrat-Medium',
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',
    },

    purchasableCurrencyIcon: {
      width: 30,
      height: 30,
      marginRight: 7
    },

    purchasableCurrencyMax: {
      background: '#0961FE',
      borderRadius: 4,
      minWidth: 60,
      height: 32,
      border: 'none',
      fontFamily: 'Montserrat-Medium',
      fontSize: 14,
      lineHeight: '24px',
      color: '#FFFFFF',
      marginLeft: 13,

      '&:hover': {
        opacity: '.9'
      },

      '&:disabled': {
        backgroundColor: '#0961FE',
        opacity: 0.6
      },

      '&:focus': {
        outline: 'none'
      },

      '&:active': {
        transform: 'translateY(-3px)'
      }
    },

    approveWarning: {
      marginTop: 16,
      fontFamily: 'Montserrat-Regular',
      fontSize: 12,
      lineHeight: '21px',
      color: '#FFFFFF',
      background: '#ffffff0d',
      borderRadius: 5,
      textAlign:'center',
      padding: '10px 10px',
      [theme.breakpoints.down('sm')]: {
        marginTop: 32,
      },
    },

    allowcationWrap: {
      marginBottom: 14,
      //fontFamily: 'Helvetica',
      //color: '#FFFFFF',
      //fontSize: 14,
      //lineHeight: '20px',
      display: 'grid',
      gridColumnGap: 12,
      gridTemplateColumns: 'minmax(140px, 155px) 1fr',

      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'minmax(140px, 140px) 1fr',
      },
    },

    allowcationTitle: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '24px',
      color: '#FFFFFF',
      opacity: 0.4,
    },
    allocationContent:{
      fontFamily: 'Montserrat-Medium',
      fontSize: 14,
      lineHeight: '24px',
      color: '#FFFFFF',
      opacity: 0.8,
    },
    allowcationContent: { 
    },
    captchaContainer: {
      margin: "auto",
      marginTop: 10,
      marginBottom: -10,
      width: "fit-content",
      textAlign: "center"
    },
    approvedBtn:{
      background:'linear-gradient(102.92deg, #B347FF 6.55%, #454CF9 47.11%, #0961FE 71.51%, #02ACD3 98.22%)',
      boxShadow: 'none',
      color:'#FFFFFF !important',
      borderRadius: '40px !important',
      "&:disabled": {
        background: "#2B313A !important",
        "& > .MuiButton-label": {
          fontWeight: 500,
          fontSize: 14,
        }
      }
    },
    swapBtn:{
      background:'none !important',
      color:'#FFFFFF',
      boxShadow: 'none',
      borderRadius: '40px !important',
      '&:before': {
        borderRadius: '40px !important',
        padding: '1px !important'
      },
      "&:disabled": {
        "&::before": {
          content: "none !important",
        },
        background: "#2B313A !important",
        "& > .MuiButton-label": {
          fontWeight: 500,
          fontSize: 14,
          color: "#FFF !important"
        }
      }
    }
  };
});

export default useStyles;