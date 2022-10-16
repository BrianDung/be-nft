import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { BorderOutline } from '../BorderOutline';
import { useStyles } from './style';

interface SoldProgressProps {
  currentMintIndex: number;
  maxMintIndex: number;
  startMintIndex: number;
}

const SoldProgress = (props: SoldProgressProps) => {
  const styles = useStyles();
  const { currentMintIndex, maxMintIndex, startMintIndex } = props;

  const progress = useMemo(() => {
    return new BigNumber(currentMintIndex).minus(startMintIndex).div(maxMintIndex).multipliedBy(100).toNumber();
  }, [currentMintIndex, maxMintIndex , startMintIndex]);

  return (
    <div>
      <p className={styles.xborgTitle}>
        <div> XBORG</div>
        <div className={styles.mintText}>( mint 2.0 )</div>
      </p>

      <div className={styles.soldProgress}>
        <div className={styles.jubValue}>
          <div className={styles.leftBotSec}>{progress.toFixed(2)}% of Xborg Sold</div>
          <div className={styles.rightBotSec}>
            {currentMintIndex - startMintIndex}/{maxMintIndex}
          </div>
        </div>
        <BorderOutline>
          <div className={styles.progress} style={{ padding: `${progress <= 0.4 ? '6px 0' : '4px 0'}` }}>
            <div
              className={`${styles.achieved}  ${progress === 100 ? styles.progressFull : ''}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </BorderOutline>
      </div>
    </div>
  );
};

export default SoldProgress;
