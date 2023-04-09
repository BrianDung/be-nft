import BigNumber from 'bignumber.js';
import { MintTimeLine } from 'constants/mint';
import { useMemo } from 'react';
import { CheckCurrentRound, Rounds } from 'utils/convertDate';
import { useStyles } from './style';

interface SoldProgressProps {
  currentSwapIndex: number;
  maxSwap: number;
  maxSupply: number;
  saleState: number;
  mintState: boolean;
}

const SoldProgress = (props: SoldProgressProps) => {
  const styles = useStyles();
  const { currentSwapIndex, maxSwap, maxSupply, saleState, mintState } = props;
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

  const soldOutProgress = useMemo(() => {
    if (CheckCurrentRound(saleState, mintState) === Rounds.WhiteList) {
      if (saleState === MintTimeLine.WLMintPhase1) {
        return 50;
      }
      if (saleState === MintTimeLine.WLMintPhase2) {
        return 100;
      }
      if (saleState === MintTimeLine.WLMintPhase3) {
        return 150;
      }
    }
    if (CheckCurrentRound(saleState, mintState) === Rounds.Public) {
      return 225;
    }
    if (mintState) {
      return 250;
    }
    if (saleState === MintTimeLine.NotSet) {
      return 50;
    }
    return 0;
  }, [saleState, mintState]);

  return (
    <div>
      <p className={styles.xborgTitle}>
        <img src="/images/newPage/benft.svg" alt="name" className={styles.rightBotSec} />
      </p>

      <div className={styles.soldProgress}>
        <div className={styles.jubValue}>
          <div className={styles.leftBotSec}>{progress.toFixed(2)}% of BeNFT Sold</div>
          <div className={styles.rightBotSec}>
            {currentSwapIndex}/{soldOutProgress}
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
