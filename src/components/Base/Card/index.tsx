import { CardProps, CardMediaProps } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { ReactNode } from 'react';
import useStyles from './style';

type CardAlign = 'horizontal' | 'vertical';

export interface CardDataProps {
  title: ReactNode;
  value: ReactNode;
  className?: string;
  reverse?: boolean;
}

export function CardData({ title, value, className, reverse }: CardDataProps) {
  const styles = useStyles();
  const classes = [className, styles['card-data'], reverse ? styles['reverse'] : false].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div>{title}</div>
      <div>{value}</div>
    </div>
  );
}

export interface ProjectCardProps<C extends React.ElementType> extends CardProps {
  label?: string;
  title: string;
  subtitle?: string;
  titleIcon?: ReactNode;
  actions?: ReactNode;
  onRenderLabel?: <TStyle extends ClassNameMap<any>>(style: TStyle) => ReactNode;
  media?: CardMediaProps<C, { component?: C; to?: string }>;
  align?: CardAlign;
}
