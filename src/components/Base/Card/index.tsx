import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardProps,
  CardMediaProps,
  Box,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { ReactNode } from "react";
import useStyles from "./style";

type CardAlign = "horizontal" | "vertical";

export interface CardDataProps {
  title: ReactNode;
  value: ReactNode;
  className?: string;
  reverse?: boolean;
}

export function CardData({ title, value, className, reverse }: CardDataProps) {
  const styles = useStyles();
  const classes = [
    className,
    styles["card-data"],
    reverse ? styles["reverse"] : false,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div>{title}</div>
      <div>{value}</div>
    </div>
  );
}

export interface ProjectCardProps<C extends React.ElementType>
  extends CardProps {
  label?: string;
  title: string;
  subtitle?: string;
  titleIcon?: ReactNode;
  actions?: ReactNode;
  onRenderLabel?: <TStyle extends ClassNameMap<any>>(
    style: TStyle
  ) => ReactNode;
  media?: CardMediaProps<C, { component?: C; to?: string }>;
  align?: CardAlign;
}

export function ProjectCard<C extends React.ElementType>({
  label,
  title,
  subtitle,
  titleIcon,
  actions,
  children,
  className,
  onRenderLabel,
  media,
  align = "vertical",
  ...props
}: ProjectCardProps<C>) {
  const styles = useStyles();
  const classes = [className, styles.card, styles[align]]
    .filter(Boolean)
    .join(" ");
  const labelElement = onRenderLabel ? (
    onRenderLabel(styles)
  ) : (
    <span className={styles.label}>{label}</span>
  );

  return (
    <Card {...props} className={classes}>
      <div style={{height:'250px', border:'1px solid #38383D'}}>
      <CardMedia {...media} />
      </div>
      {labelElement}
      <Box>
        <CardContent className={styles.content}>
          <header>
            <section className={styles.title}>
              <h3>{title}</h3>
              <h4>{subtitle}</h4>
            </section>
            <section>{titleIcon}</section>
          </header>
          {children}
        </CardContent>
        <CardActions className={styles.actions}>{actions}</CardActions>
      </Box>
    </Card>
  );
}
