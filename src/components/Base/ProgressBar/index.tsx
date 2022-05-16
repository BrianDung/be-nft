import { ReactNode } from "react";
import useStyles from "./styles";

export interface ProgressBarProps {
  totalValue: number;
  currentValue: number;
  icon?: ReactNode;
  className?: string;
}

const ProgressIcon = () => <img src="images/icons/progress-icon.svg" alt="icon" />;

export function ProgressBar({
  totalValue = 100,
  currentValue = 0,
  icon = <ProgressIcon />,
  className,
}: ProgressBarProps) {
  const styles = useStyles();
  const progress = ((currentValue / totalValue) * 100).toFixed(2);
  const classes = [styles.container, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div style={{ width: progress + "%" }} className={styles["progress-bar"]}></div>
      <div style={{ left: Number(progress) + "%" }} className={styles["progress-icon"]}>
        {icon}
      </div>
    </div>
  );
}
