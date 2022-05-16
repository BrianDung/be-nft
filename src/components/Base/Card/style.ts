import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    card: {
      borderRadius: 24,
      background: "#222228",
      color: "#fff",
      position: "relative",
      transition: "all 0.25s ease-in-out",
      border:'1px solid #8247E5',
      "& > img": {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '100%'
      },
      "&:hover": {
        borderColor: "#a84dff",
        boxShadow: "10px 10px 50px 0px #320063"
      }
    },
    label: {
      position: "absolute",
      top: 14,
      left: 14,
      backgroundColor: "#fff",
      padding: "4px 9px",
      borderRadius: 6,
      fontWeight: 700,
      textTransform: "uppercase",
      color: "#3232DC",
      textAlign: "center",
      fontFamily: 'DM Sans',
      fontSize: 12,
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)"
    },
    content: {
      padding: "20px 14px 10px",
      "& > header": {
        display: "flex",
        justifyContent: "space-between",
      }
    },
    title: {
      maxWidth: "80%",
      "& > h3": {
        color: "#fff",
        fontWeight: 700,
        fontSize: 20,
        margin: 0
      },
      "& > h4": {
        color: "#fff",
        fontWeight: 400,
        fontSize: 14,
        margin: "6px 0 0"
      }
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      padding: "0 0 16px 0"
    },
    "card-data": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      margin: "0 0 9px",
      "& > div:first-child": {
        color: "#AEAEAE",
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "20px",
      },
      "& > div:last-child": {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: 700,
        lineHeight: "18px",
        fontFamily: "DM Sans",
      },
      "&:last-child": {
        marginBottom: 0,
        fontWeight: 500
      }
    },
    "reverse": {
      flexDirection: "row-reverse",
    },
    "vertical": {

    },
    "horizontal": {
      display: "flex",
      "& > img:first-child": {
        width: "45%",
        borderTopRightRadius: "initial",
      },
      "& > .MuiBox-root": {
        width: "55%",
      }
    }
  };
});

export default useStyles;
