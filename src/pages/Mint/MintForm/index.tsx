import { MintTimeLine } from 'constants/mint';
import { useStyles } from '../style';
import MintForm from './components/Form';

interface MintFormContainerProps {
  rate: number | string;
  currentTimeline: MintTimeLine;
  endMintIndex: number;
  maxMintIndex: number;
  currentMintIndex : number;
}

const MintFormContainer = ({ rate, currentTimeline, endMintIndex, maxMintIndex , currentMintIndex}: MintFormContainerProps) => {
  const styles = useStyles();

  return (
    <>
      <div>
        <span className={styles.priceBigSize}>{rate} ETH</span>
        <span className={styles.priceMediumSize}>/ NFT</span>
      </div>
      <MintForm
        currentTimeline={currentTimeline}
        endMintIndex={endMintIndex}
        maxMintIndex={maxMintIndex}
        rate={Number(rate)}
        currentMintIndex={currentMintIndex}
      />
    </>
  );
};

export default MintFormContainer;
