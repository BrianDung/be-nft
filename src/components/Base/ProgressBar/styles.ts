import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  container: {
    width: "100%",
    height: 8,
    backgroundColor: "#2B313A",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    position: "relative",
    marginBottom: 17,
  },
  "progress-bar": {
    backgroundColor: "#D01F36",
    borderRadius: 20,
    boxShadow: " 0px 4px 8px rgba(208, 31, 54,2 0.4)",
    height: "100%",
    transition: "width 0.25s ease-in-out",
  },
  "progress-icon": {
    fontSize: 12,
    position: "absolute",
    textAlign: "left",

    "& > img": {
      width: 25,
      position: "relative",
      left: -13,
    },
  },
}));

export default useStyles;
