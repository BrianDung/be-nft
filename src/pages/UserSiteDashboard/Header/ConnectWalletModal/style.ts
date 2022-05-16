import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    dialog: {
      '& .MuiPaper-root': {
        background: '#FFFFFF',
        padding: '60px 0 70px 0',
        maxWidth: 1200,
        borderRadius: 4,
        "& .MuiDialogContent-root": {
          padding: 0,
          marginTop: "22px"
        },
        "& .MuiDialogTitle-root": {
          margin: "0 80px 0 80px"
        }
      },
    },
    dialogContentTypo: {
      color: '#0B111B',
      fontSize: '16px',
      marginTop: 30,
      fontWeight: 600,
      //font: 'normal normal bold 16px/24px DM Sans',
      fontFamily: 'Montserrat-SemiBold',
      '&:first-child': {
        marginTop: 0,
      },
    },
    dialogTitle: {
      background: 'transparent !important',
      '& .MuiTypography-h6': {
        fontWeight: '600',
        fontSize: '32px',
        color: '#0B111B',
        borderBottom: '1px solid rgba(255, 255, 255 ,0.1)',
        fontFamily: 'Montserrat-SemiBold',
      },
    },
    dialogPrivacy: {
      margin: "0 80px 25px",
    },
    dialogPrivacyText: {
      fontFamily: 'Montserrat-Regular',
      fontSize: 16,
      lineHeight: '24px',
      color: '#0B111B',
      opacity: 0.7,
    },
    dialogPrivacyHighlight: {
      color: '#0961FE',
      fontWeight: 'normal',

      '&:hover': {
        color: '#4767af',
        textDecoration: 'underline',
      },
    },
    dialogCheckbox: {
      padding: 0,
      marginRight: 8,
    },
    dialogNetworks: {
      margin: "30px 80px 22px",
    },
    dialogContentBlock: {
      display: 'flex',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      dialog: {
        '& .MuiPaper-root': {
          maxWidth: '100%',
          width: '100%',
          padding: '69px 0px',
          margin: 15
        },
        "& .MuiDialogTitle-root": {
          margin: "0 20px 0 20px !important"
        },
      },
      dialogPrivacy: {
        margin: "0 20px 25px",
      },
      dialogNetworks: {
        margin: "30px 20px 22px",
      },
      dialogContentBlock: {
        justifyContent: "space-between"
      },
      error: {
        margin: "0 20px !important",
        "& .MuiButton-label": {
          textAlign: "center"
        }
      }
      // dialogPrivacy: {
      //   display: 'flex',
      //   alignItems: 'flex-start',
      //   gap: 0,
      // }
    },
    error: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '11px 17.5px 11px 23.42px',
      backgroundColor: 'rgba(242, 34, 34, 0.1)',
      fontFamily: 'Montserrat-Regular',
      borderRadius: 5,
      margin: "0 80px",
      '& > p': {
        fontFamily: "inherit",
        color: '#FF0000',
        fontSize: 14,
        "& > img": {
          marginRight: 10,
        }
      },
      '& > a': {
        fontFamily: 'Montserrat-Regular',
        borderRadius: 37,
        border: "1px solid #0961FE",
        color: "#0961FE",
        textTransform: "initial",
        "&:hover": {
          border: "1px solid #0961FE",
        }
      },
    },
  };
});

export default useStyles;
