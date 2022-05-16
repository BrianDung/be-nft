import { Button as MUIButton, ButtonProps as MUIButtonProps } from "@material-ui/core";
import useStyles from "./styles";

type ButtonColor = "primary" | "blue" | "gray";
type ButtonShadow = "none" | "primary";

type ButtonProps<C extends React.ElementType> = {
  shape?: "square" | "rounded";
  backgroundColor?: ButtonColor;
  shadow?: ButtonShadow;
} & MUIButtonProps<C, { component?: C; to?: string }>;

export function Button<C extends React.ElementType>({
  className,
  variant = "contained",
  shape = "square",
  backgroundColor = "primary",
  shadow = "primary",
  ...props
}: ButtonProps<C>) {
  const styles = useStyles();
  const classes = [styles.button, className, shape, styles[backgroundColor], styles[`shadow-${shadow}`]]
    .filter(Boolean)
    .join(" ");

  return <MUIButton {...props} variant={variant} className={classes}></MUIButton>;
}

export function ButtonLabel({ primary, secondary }: { primary: any; secondary?: string }) {
  const styles = useStyles();

  return (
    <>
      <span className={styles["secondary-text"]}>{secondary}</span>&nbsp;
      <span className={styles["primary-text"]}>{primary}</span>
    </>
  );
}
