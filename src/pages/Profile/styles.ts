import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    container:{
      padding: '40px 50px',
      [theme.breakpoints.down('md')]: {
        padding: '40px 20px',
      },
    },
    page:{
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        flexDirection:'column'
      },
    },
    pageLeft:{
      width: '100%',
      display: 'flex',
      gap: '20px',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        flexDirection:'column'
      },
    },
    address:{
      fontFamily:'Montserrat-Regular',
      fontSize:'14px',
      color: '#FFFFFF',
      opacity: 0.8,
    },
    titleprofile:{
      fontFamily:'Montserrat-SemiBold',
      fontSize: 32,
      color: '#FFFFFF',
    },
    flexWallet:{
      display: 'flex',
      alignItems:'center',
      gap: '20px',
      paddingTop: '10px',
      paddingBottom:'25px',
    },
    flexImage:{
      position: 'relative',
    },
    borderBottom:{
      background: 'rgba(255, 255, 255, 0.12)',
      borderRadius:'5px',
      transform: 'matrix(1, 0, 0, -1, 0, 0)',
      margin: '15px 0',
      height: '1px',
    },
    NotConnected:{
      position: 'absolute',
      top: '30%',
      left: '35%',
      right: '35%',
      bottom: '30%',
      background: '#121327',
      borderRadius:'10px',
      width: '50vh',
      height: '300px',
      maxWidth:'100%',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
      [theme.breakpoints.down('md')]: {
        width:'100%',
        height: '250px',
        position: 'unset',
        margin: '0 auto'
        },
    },
    borderRight:{
      background: '#A84DFF',
      height: '3px',
      width: '120px',
      marginLeft:'-8px',
      [theme.breakpoints.down('md')]: {
        width: '120px',
        transform: 'rotate(90deg)',
        marginLeft:'-2px',
        marginBottom:'25px',
      },
    },
    borderRightDisConnect:{
      background: '#301E52',
      height: '3px',
      width: '120px',
      [theme.breakpoints.down('xs')]: {
        transform: 'rotate(90deg)',
        marginLeft:'-2px',
      },
    },
    flexStep:{
     display: 'flex',
     alignItems:'center',
     [theme.breakpoints.down('xs')]: {
      width: '100%',
      flexDirection:'column',
      gap: '59px',
      marginBottom:'5px',
      marginRight:'180px',
      },
    },
    boxImageStep:{
      position: 'relative',
    },
    ImageStepDone:{
      width: '25px',
      height: '25px',
      position: 'absolute',
      bottom: '0',
      right: '0'
    },
    boxStep:{
      display: 'flex',
      alignItems:'center',
    },
    textStep:{
      fontFamily:'Montserrat-Regular',
      fontSize: '14px',
      color: '#FFFFFF',
      marginBottom:'0',
      opacity: 0.6,
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius:'24px',
      textAlign:'center',
      marginTop: '20px',
      [theme.breakpoints.down('xs')]: {
        position: 'absolute',
        top: '0',
        },
    },
    textStepDisconnect:{
      fontFamily:'Montserrat-SemiBold',
      fontSize: '16px',
      color: '#FFFFFF',
      marginBottom:'0',
      opacity: 0.6,
      margin: '5px 0px',
      [theme.breakpoints.down('xs')]: {
        position: 'absolute',
        top: '40px',
        paddingRight:'10px',
        },
    },
    textDes:{
      fontFamily:'Montserrat-SemiBold',
      fontSize: '16px',
      color: '#FFFFFF',
      marginBottom:'0',
      margin: '5px 0px',
      [theme.breakpoints.down('xs')]: {
        position: 'absolute',
        top: '40px',
        
        },
    },
    walletaddress:{
      fontFamily:'Montserrat-Regular',
      fontSize:'14px',
      color: '#FFFFFF',
      opacity: 0.4,
      marginBottom:'0',
      [theme.breakpoints.down('md')]: {
        fontSize:'12px',
        },
    },
    boxAddress:{
      background: 'rgba(255, 255, 255, 0.07)',
      borderRadius: '5px',
      display: 'flex',
      alignItems:'center',
      padding: '7px 16px',
      justifyContent:'space-between',
      marginTop: '10px',
      marginBottom:'25px',
      height: '40px',
    },
    flexKYC:{
      display: 'flex',
      alignItems:'center',
      justifyContent:'space-between',
      marginBottom:'24px',
      marginTop:'10px',
      "& .MuiButton-label":{
        color: '#FFFFFF',
        fontSize:'12px',
        fontFamily:'Montserrat-Regular',
      },
    },
    walletName:{
     
    },
    textHeaderTier:{
      fontFamily:'Montserrat-Medium',
      fontSize: 14,
      lineHeight:'24px',
      color: '#FFFFFF',
      marginBottom:'0',
    },
    boxEmail:{
      marginTop:'0',
    },
    profile:{
      background: '#121327',
      borderRadius:'10px',
      lineHeight:'175%',
      marginBottom: 30,
      padding: '30px 35px 20px 35px',
      width: '50%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        padding: '20px',
      },
    },
    borderbottom:{
      background: 'rgba(255, 255, 255, 0.12)',
      borderRadius: '5px',
      transform: 'matrix(1, 0, 0, -1, 0, 0)',
      height: '1px',
      marginBottom:'15px',
    },
    textprofile:{
      fontFamily:'Montserrat-Medium',
      fontSize:'18px',
      color: '#FFFFFF',
    },
    flexaddress:{
      display: 'flex',
      alignItems:'center',
      fontSize:'14px',
      color: '#FFFFFF',
      gap: '5px',
      marginBottom: '0',
    },
    flexbox:{
      display: 'flex',
      alignItems:'center',
      gap: '15px',
      paddingTop:'5px',
      [theme.breakpoints.down('md')]: {
        flexDirection:'column',
        alignItems: 'flex-start',
      },
    },
    mywallet:{

    },
    borderkyc:{
      background: '#001F4D',
      boxShadow:'0px 2px 4px rgba(138, 146, 166, 0.3)',
      borderRadius:'30px',
      color: '#FFFFFF',
      fontSize:'14px',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
      width: '30%',
      padding: '8px 24px',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginBottom:'10px',
      },
    },
    flexboxnetwork:{
      display: 'flex',
      flexDirection:'column',
    },
    image:{
      width: '40px',
      height: '40px',
    },
    imagenetwork:{
      width: '20px',
      height: '20px',
      position: 'absolute',
      bottom: '-3px',
      right: '-7px'
    },
    wallet:{
      background: '#121327',
      borderRadius:'10px',
      marginBottom: 30,
      padding: '30px',
      width: '50%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    walletinfor:{
      width: '100%',
    },
    mytier:{
      background: '#303035',
      border: '0.5px solid #FFFEFE',
      borderRadius:'10px',
      margin: '30px 20px',
      display: 'flex',
      alignItems:'center',
    },
    mypool:{
      background: '#121327',
      borderRadius:'10px',
      marginBottom: 30,
      padding: '30px',
      [theme.breakpoints.down('md')]: {
        padding: '15px',
      },
    },
    flexpool:{
      [theme.breakpoints.down('xs')]: {
        position: 'relative',
        display: 'flex',
        justifyContent:'space-between',
        flexDirection:'row-reverse'
      },
    },
    boxDes:{
      [theme.breakpoints.down('xs')]: {
        position: 'absolute',
        top: '0',
        left:'50%',
        width: '55%',
        },
    },
    boxtable:{
      border: '1px solid #ffffff1f',
      borderRadius:'5px',
      "& .MuiTableCell-root": {
        borderBottom: 'none',
      },
      "& .MuiTableRow-head":{
        border: '1px solid #ffffff1f',
      },
      "& .MuiTableHead-root":{
        background: '#232436',
        borderRadius:'4px 4px 0px 0px',
      },
      "& .MuiTableBody-root":{
        border: '1px solid #ffffff1f',
      },
      "& .MuiTableCell-head":{
        [theme.breakpoints.down('md')]: {
         padding:'16px 0'
          },
      },  
    },
    
    flexStepTier:{
      display: 'flex',
      width: '100%',
      justifyContent:'center',
      margin: '30px 0',
      [theme.breakpoints.down('xs')]: {
        flexDirection:'column',
      },
    },
    ImageTable:{
      width: 20,
      height: 20,
     
      [theme.breakpoints.down('md')]: {
        position:'absolute',
        top: '30px',
      right: '-8px',
      },
    },
    textHeader:{
      "& .MuiButton-label":{
        fontFamily: 'Montserrat-Medium',
        fontSize: '16px',
        lineHeight:'20px',
        color: '#FFFFFF',
        margin: '0 8px',
        padding: '12px 12px',
      },
    },
    flexBox:{
      margin: '20px 0',
      display: 'flex',
      flexDirection:'column',
      alignItems:'center',
      gap: 30,
    },
    textTable:{
      color: '#FFFFFF',
      fontSize:'16px',
      fontFamily:'Montserrat-Regular',
      opacity: 0.6,
    },
    borderRightTabletd:{
      color: '#FFFFFF',
      fontSize:'14px',
      fontFamily:'Montserrat-Regular',
    },
    texTable:{
      color: '#FFFFFF',
      fontSize:'16px',
      fontFamily:'Montserrat-SemiBold',
    },
    texTableTd:{
      color: '#FFFFFF',
      fontSize:'16px',
      fontFamily:'Montserrat-Regular',
      opacity: 0.8,
    },
    borderBottomTable:{
      borderBottom: '1px solid #ffffff1f',
      marginTop:'10px',
    },
    borderTable:{
      width: '40%',
      height: '57px',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
    },
    boxText:{
      marginLeft:'-15px',
    },
    customToolTip: {
      minWidth: 350,
      maxWidth: '100%',
      background: '#44454B',
      borderRadius: 5,
      textAlign:'center',
      fontFamily:'Montserrat-Regular',
      fontSize:'12px',
      padding: 10,
      [theme?.breakpoints?.down('sm')]: {
        marginTop: 10,
      },
    },
    boxUnver:{
      background: '#F22222',
      borderRadius:'40px',
      display: 'flex',
      alignItems:'center',
      gap: '5px',
      padding: '2px 15px',
      cursor: 'pointer',
      height: '28px',
    },
    textunver:{
      color: '#FFFFFF',
      fontSize:'12px',
      fontFamily:'Montserrat-Regular',
    },
    // moblie
    flexMobile:{
      display: 'flex',
      alignItems:'center',
      justifyContent:'space-between',
      background: '#232436',
      borderRadius:'4px 4px 0px 0px',
    },
    borderMobile:{
      opacity: '0.12',
      border: '1px solid #FFFFFF',
    },
    titleMobile:{
      fontFamily:'Montserrat-Regular',
      fontSize:'12px',
      color: '#FFFFFF',
      opacity: 0.4,
      textAlign:'center',
      padding:'10px 0',
    },
    boxTittle:{
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
      width: '100%',
    },
    flexDesMobile:{
      display: 'flex',
      alignItems:'center',
      justifyContent:'flex-end',
      padding: '0 15px',
      width: '100%',
      
    },
    textMobile:{
      fontFamily:'Montserrat-Regular',
      fontSize:'16px',
      color: '#FFFFFF',
      opacity: 0.8,
      margin:'0 auto',
    },
    boxStartMobile:{
      width: '50%',
      textAlign:'center',
      display: 'flex',
      alignItems:'center',
      justifyContent:'space-between',
      '&::after': {
        content: '""',
        border: '1px solid #ffffff1f',
        width: '1px',
        height:'80px',
        transform: 'rotate(180deg)',
      }
    },
    textMobileDes:{
      fontFamily:'Montserrat-Regular',
      fontSize:'16px',
      color: '#FFFFFF',
      opacity: 0.8,
      marginBottom:'0',
      width: '50%',
      textAlign:'center',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
      padding: '0 23px',
    },
    textMobileProgress:{
      fontFamily:'Montserrat-Regular',
      fontSize:'16px',
      color: '#FFFFFF',
      opacity: 0.8,
      marginBottom:'0',
      textAlign:'center',
    },
    borderRightMobie:{
      // opacity: 0.12,
      // border: '1px solid #FFFFFF',
      // transform: 'rotate(90deg)',
      // minWidth: '8%',
      // height: '0px',
    },
    borderRightMobieLast:{
      opacity: 0.12,
      border: '1px solid #FFFFFF',
      transform: 'rotate(90deg)',
      width: '50px',
      height: '0px',
      marginRight:'3px',
    },
    boxMobileStart:{
      width: '50%',
      display: 'flex',
      alignContent:'center',
      justifyContent:'space-between',
      textAlign:'center',
      padding: '0 0 0 15px',
      position: 'relative',
      '&::after': {
        content: '""',
        border: '1px solid #ffffff1f',
        width: '1px',
        height:'80px',
        transform: 'rotate(180deg)',
      }
    },
    boxMobile:{
      width: '50%',
      display: 'flex',
      flexDirection:'column',
      justifyContent:'center',
      textAlign:'center',
      gap: 5,
    },
    boxStart:{
      display: 'flex',
      flexDirection:'column',
      justifyContent:'center',
      textAlign:'center',
      gap: 5,
    },
    paddingRight:{
      paddingRight:'49px',
    },
  };
});

export default useStyles;
