import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
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
        fontSize: 14,
        fontWeight: 700,
        lineHeight: "18px",
        fontFamily: "Montserrat-Regular",
      },
      "&:last-child": {
        marginBottom: 0,
        fontWeight: 500
      }
    },
    "reverse": {
      flexDirection: "row-reverse",
    },
  };
});

export default useStyles;
