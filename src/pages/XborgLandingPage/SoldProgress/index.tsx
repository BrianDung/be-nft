import { BorderOutline } from '../BorderOutline';
import { useStyles } from './style';

interface SoldProgressProps {}

const SoldProgress = (props: SoldProgressProps) => {
  const styles = useStyles();
  const soldProgressShow = Math.floor(Math.random() * 100);

  return (
    <div>
      <p className={styles.xborgTitle}>XBORG</p>

      <div className={styles.soldProgress}>
        <div className={styles.jubValue}>
          <div className={styles.leftBotSec}>
            0.00% of Xborg Sold
          </div>
          <div className={styles.rightBotSec}>550/5500</div>
        </div>
        <BorderOutline>
          <div className={styles.progress}>
            <div className={`${styles.achieved} ${soldProgressShow === 100 ? styles.progressFull: ''}`} style={{ width: `calc(${soldProgressShow}% - 8px)`}} ></div>
          </div>
        </BorderOutline>
      </div>
    </div>
  );
};

export default SoldProgress;
