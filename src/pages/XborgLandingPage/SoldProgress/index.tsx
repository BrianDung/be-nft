import { useStyles } from "./style";

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
          <div className={styles.rightBotSec}>/5500</div>
        </div>
        <div className={styles.progress}>
            0 (number of NFT sold)
          <div className={styles.achieved} style={{ width: `0%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default SoldProgress;
