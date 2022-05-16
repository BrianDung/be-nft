import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    dialog: {
      "& .MuiPaper-root": {
        borderRadius: 10,
        position: "relative",
      }
    },
    "dialog-container": {
      background: "#fff",
      padding: "30px 0",
      boxShadow: "0px 3px 50px rgba(0, 0, 0, 0.078)"
    },
    header: {
      background: "transparent",
      marginLeft: 30,
      "& > h6.MuiTypography-root": {
        color: "#000000",
        fontSize: 20,
        fontFamily: 'Montserrat-Medium'
      },
      "& > .MuiButtonBase-root": {
        position: "absolute",
        top: 13,
        right: 14,
        width: 30,
        height: 30,
        backgroundColor: "#fff"
      }
    },
    dialogContent: {
      position: 'relative',
      padding: '0'
    },
    loadingIcon: {
      position: 'absolute',
      left: '50%',
      top: '30%',
      transform: 'translate(-50%, -50%)'
    }
  };
});

export default useStyles;
