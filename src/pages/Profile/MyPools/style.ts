import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    pageMyPools: {
      marginTop:'20px',
      background: '#121327',
      borderRadius: '10px',
      padding: '20px 32px',

      [theme.breakpoints.down('sm')]: {
        padding: '20px 20px',
      },
      "& .MuiPaper-root":{
        backgroundColor:'unset',
      },
      "& .MuiTableCell-root":{
        padding: '16px 16px 16px 30px',
      },  
    },

    title: {
      fontFamily: 'Montserrat-Medium',
      fontSize: 18,
      lineHeight: '25px',
      textTransform: 'capitalize',
      color: '#FFFFFF',
      margin: '15px 0',
      [theme.breakpoints.down('sm')]: {
        marginBottom: 12,
      },
    },
    borderBottom:{
      background: 'rgba(255, 255, 255, 0.12)',
      borderRadius:'5px',
      transform: 'matrix(1, 0, 0, -1, 0, 0)',
      margin: '15px 0',
      height: '1px',
    },
    flexName:{
      display: 'flex',
      alignItems:'center',
    },
    des: {
      fontFamily: 'Helvetica',
      fontSize: 14,
      lineHeight: '20px',
      color: '#AEAEAE',
      marginBottom: 30,
    },

    listDes: {
      fontFamily: 'Helvetica',
      fontSize: 14,
      lineHeight: '20px',
      color: '#AEAEAE',
      listStyle: 'disc',
      paddingLeft: 25,
      marginBottom: 30,

      [theme.breakpoints.down('sm')]: {
        marginBottom: 20,
      },
    },

    headTable: {
      marginBottom: 20,
      display: 'flex',
      justifyContent: 'space-between',

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },

    leftFillter: {
     
      [theme.breakpoints.down('sm')]: {
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        gap: 15,
      },
    },

    formControlSelect: {
      maxWidth: '100%',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '5px',
      marginRight: 8,

      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },

    selectBox: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 16,
      lineHeight: '26px',
      color: '#FFFFFF',
      height: 40,
      width: 180,
      cursor: 'pointer',

      '&::before, &::after': {
        display: 'none',
      },

      '& select': {
        paddingLeft: 12,
        paddingTop: 0,
        paddingBottom: 0,
        height: 22,
      },

      '& .MuiSelect-select option': {
        backgroundColor: '#222228',
      },

      '& .MuiSelect-icon': {
        color: '#FFFFFF',
        fontSize: 20,
        top: 'calc(50% - 10px)',
        right: 4,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    groupSearch: {
      width: '100%',
      maxWidth: 370,
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: 5,
      display: 'flex',

      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',

        '& button': {
          minWidth: 40,
        }
      },

      '& input': {
        height: 40,
        width: '100%',
        border: 'none',
        outline: 'none',
        padding: 12,
        background: 'transparent',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        lineHeight: '26px',
        color: '#FFFFFF',
        '&::placeholder': {
          fontFamily: 'Montserrat-Regular',
          fontSize: 16,
          lineHeight: '26px',
          color: '#FFFFFF',
        }
      }
    },

    tableContainer: {
      marginTop:'20px',
      border: '1px solid #ffffff1f',
      borderRadius:5,
    },

    tableCellHead: {
      whiteSpace: 'nowrap',
      height: 48,
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '18px',
      color: '#FFFFFF',
      background: '#232436',
      borderBottom: 'none',
    },

    tableRow: {
      width: '100%',
      position: 'relative',
    },

    tableCellBody: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '20px',
      borderBottom: '1px solid #37373D',
      verticalAlign: 'middle',
      '& .status_pool': {
        whiteSpace: 'nowrap',
      },
      '& .registered': {
        color: '#07D600',
      },
      '& .qualified': {
        color: '#07D600',
      },
      '& .swapping': {
        color: '#A84DFF',
      },
      '& .public-sell': {
        color: '#A84DFFE',
      },
      '& .claimable': {
        color: '#A84DFF',
      },
      '& .not-qualified': {
        color: '#FFFFFF',
      },
      '& .none': {
        color: '#FFFFFF',
      },
    },

    tableCellBody1: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '20px',
      color: '#FFFFFF',
      borderBottom: '1px solid #37373D',
      verticalAlign: 'middle',
    },

    nameToken: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 14,
      color: '#FFFFFF',
      lineHeight:'18px',
      marginBottom:'0',
    },

    toDetailPool: {
      color: '#FFFFFF',

      '&:hover': {
        opacity: 0.85
      }
    },

    iconToken:{
      position: 'relative',
      marginRight: 6,
      width: 24,
      height: 24,
      borderRadius: '50%',
    },

    datasMobile: {
      padding: '20px 15px',
      borderRadius: 8,
      border: '1px solid #ffffff1f',
    },

    boxDataMobile: {
      padding: '20px 0',
      borderBottom: '1px solid rgb(255 255 255 / 10%)',
      '&:last-child': {
        borderBottom: 'none',
      },
    },

    titleBoxMobile: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 16,
      justifyContent:'space-between',
    },

    iconTokenMobile: {
      width: 36,
      height: 36,
      marginRight: 8,
      borderRadius: '50%',
    },

    nameTokenMobile: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 14,
      lineHeight: '18px',
      color: '#FFFFFF',
    },

    infoMobile: {
      display: 'grid',
      gridRowGap: 18,
      '& .status_pool': {
        whiteSpace: 'nowrap',
      },
      '& .registered': {
        color: '#07D600',
      },
      '& .qualified': {
        color: '#07D600',
      },
      '& .swapping': {
        color: '#A84DFF',
      },
      '& .public-sell': {
        color: '#A84DFFE',
      },
      '& .claimable': {
        color: '#A84DFF',
      },
      '& .not-qualified': {
        color: '#FFFFFF',
      },
      '& .none': {
        color: '#FFFFFF',
      },
    },
    flexMobile:{
      display: 'flex',
      alignItems:'center',
     justifyContent:'space-between',
    },

    nameMobile: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '18px',
      color: '#FFFFFF',
      marginBottom: 5,
    },

    valueMobile: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '20px',
      display: 'flex',
      alignItems: 'center',
      color: '#FFFFFF',
      
    },

    pagination: {
      "& .MuiPagination-ul":{
        justifyContent:'flex-end',
      },
      '& ul li:last-child > button': {
        border: 'none'
      },
      '& ul li:first-child > button': {
        border: 'none'
      },
      '& ul li > div': {
        color: '#FFFFFF',
      },
      
      "& .MuiButtonBase-root.Mui-disabled":{
        backgroundColor:'unset',
        color: '#FFFFFF',
        border:'none',
      },
      "& .MuiButtonBase-root":{
        color: '#FFFFFF',
      },
      "& .MuiPaginationItem-page.Mui-disabled":{
        opacity: 0.4,
        cursor: 'none',
      },
      "& .MuiPaginationItem-rounded.Mui-selected":{
        border: '1px solid #001F4D',
        borderRadius: 6,
        backgroundColor: '#ffffffb3',
        color: '#0B111B',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
      },
      "& .MuiPaginationItem-page.Mui-selected:hover, .MuiPaginationItem-page.Mui-selected.Mui-focusVisible":{
        backgroundColor: '#ffffffb3',
      },
      "& .MuiPaginationItem-root":{
        border: '1px solid #001F4D',
        borderRadius: 6,
      }
    },

    textError:{
      fontFamily: 'Montserrat-Regular',
      fontSize: 14,
      lineHeight: '18px',
      color: '#FFFFFF',
     textAlign:'center',
      borderBottom:'none',
      padding: '30px 0',
    },

  };
});

export default useStyles;
