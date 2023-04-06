import BigNumber from 'bignumber.js';
import { MintTimeLine } from 'constants/mint';
import { useMemo } from 'react';
import { useStyles } from './style';

interface SoldProgressProps {
  currentSwapIndex: number;
  maxSwap: number;
  maxSupply: number;
  saleState: number;
}

const SoldProgress = (props: SoldProgressProps) => {
  const styles = useStyles();
  const { currentSwapIndex, maxSwap, maxSupply, saleState } = props;
  const isPublicRound = saleState > MintTimeLine.WLMintPhase3;

  const progress = useMemo(() => {
    let total;
    if (isPublicRound) {
      total = maxSupply;
    } else {
      total = maxSwap;
    }
    return new BigNumber(currentSwapIndex).div(total).multipliedBy(100).toNumber();
  }, [currentSwapIndex, maxSwap, maxSupply, isPublicRound]);

  return (
    <div>
      <p className={styles.xborgTitle}>
        <img src="/images/newPage/benft.svg" alt="name" className={styles.rightBotSec} />
      </p>

      <div className={styles.soldProgress}>
        <div className={styles.jubValue}>
          <div className={styles.leftBotSec}>{progress.toFixed(2)}% of BeNFT Sold</div>
          <div className={styles.rightBotSec}>
            {currentSwapIndex}/{isPublicRound ? maxSupply : maxSwap}
          </div>
        </div>
        <div className={styles.progress}>
          <div
            className={`${styles.achieved}  ${progress === 100 ? styles.progressFull : ''}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SoldProgress;
