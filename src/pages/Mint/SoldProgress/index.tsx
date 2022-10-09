import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { BorderOutline } from '../BorderOutline';
import { useStyles } from './style';

interface SoldProgressProps {
  currentMintIndex: number;
  maxMintIndex: number;
}

const SoldProgress = (props: SoldProgressProps) => {
  const styles = useStyles();
  const { currentMintIndex, maxMintIndex } = props;

  const progress = useMemo(() => {
    return new BigNumber(currentMintIndex).div(maxMintIndex).multipliedBy(100).toNumber();
  }, [currentMintIndex, maxMintIndex]);

  return (
    <div>
      <p className={styles.xborgTitle}>XBORG</p>

      <div className={styles.soldProgress}>
        <div className={styles.jubValue}>
          <div className={styles.leftBotSec}>{progress.toFixed(2)}% of Xborg Sold</div>
          <div className={styles.rightBotSec}>
            {currentMintIndex}/{maxMintIndex}
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
