import BigNumber from 'bignumber.js';
import { MintTimeLine, NUMBER_NFTS_CAN_SWAP } from 'constants/mint';
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
  const { currentSwapIndex, saleState, mintState } = props;

  const soldOutProgress = useMemo(() => {
    if (CheckCurrentRound(saleState, mintState) === Rounds.WhiteList) {
      if (saleState === MintTimeLine.WLMintPhase1) {
        return NUMBER_NFTS_CAN_SWAP.WL1;
      }
      if (saleState === MintTimeLine.WLMintPhase2) {
        return NUMBER_NFTS_CAN_SWAP.WL2;
      }
      if (saleState === MintTimeLine.WLMintPhase3) {
        return NUMBER_NFTS_CAN_SWAP.WL3;
      }
    }
    if (CheckCurrentRound(saleState, mintState) === Rounds.Public) {
      return NUMBER_NFTS_CAN_SWAP.PUBLIC;
    }
    if (mintState) {
      return NUMBER_NFTS_CAN_SWAP.AIRDROP;
    }
    if (saleState === MintTimeLine.NotSet) {
      return NUMBER_NFTS_CAN_SWAP.WL1;
    }
    return 0;
  }, [saleState, mintState]);

  const progress = useMemo(() => {
    return new BigNumber(currentSwapIndex).div(soldOutProgress).multipliedBy(100).toNumber();
  }, [currentSwapIndex, soldOutProgress]);

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
