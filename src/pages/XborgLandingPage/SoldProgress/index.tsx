import { BorderOutline } from '../BorderOutline';
import { useStyles } from './style';

interface SoldProgressProps {}

const SoldProgress = (props: SoldProgressProps) => {
  const styles = useStyles();

  return (
    <div>
      <p className={styles.xborgTitle}>XBORG</p>

      <div className={styles.soldProgress}>
        <div className={styles.jubValue}>
          <div className={styles.leftBotSec}>
            {/* {numberWithCommas(new BigNumber(soldProgressShow).gt(99) ? '100' : soldProgressShow)}% */}
            0.00% of Xborg Sold
          </div>
          <div className={styles.rightBotSec}>550/5500</div>
        </div>
        <BorderOutline>
          <div className={styles.progress}>
            <div className={styles.achieved} style={{ width: `0%` }}></div>
          </div>
        </BorderOutline>
      </div>
    </div>
  );
};

export default SoldProgress;
