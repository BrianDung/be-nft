import { ReactElement } from 'react';
import { useStyles } from './style';

interface BorderOutlineProps {
    children: ReactElement | JSX.Element;
}
export const BorderOutline = (props: BorderOutlineProps) => {
  const styles = useStyles();

  return (
    <div className={styles.borderWrapper}>
      <div className={styles.divInside}>{props.children}</div>
    </div>
  );
};
