import { MintTimeLine } from 'constants/mint';
import { useStyles } from '../style';
import MintForm from './components/Form';

interface MintFormContainerProps {
  rate: number | string;
  currentTimeline: MintTimeLine;
  endMintIndex: number;
  maxMintIndex: number;
  currentMintIndex: number;
  timeServer: number;
  startMintIndex: number;
  saleState: number;
}

const MintFormContainer = ({
  rate,
  currentTimeline,
  endMintIndex,
  maxMintIndex,
  currentMintIndex,
  timeServer,
  startMintIndex,
  saleState,
}: MintFormContainerProps) => {
  const styles = useStyles();

  return (
    <>
      <div>
        <span className={styles.priceBigSize}>{rate} USDT</span>
        <span className={styles.priceMediumSize}>/ NFT</span>
      </div>
      <MintForm
        saleState={saleState}
        currentTimeline={currentTimeline}
        endMintIndex={endMintIndex}
        maxMintIndex={maxMintIndex}
        rate={Number(rate)}
        currentMintIndex={currentMintIndex}
        timeServer={timeServer}
        startMintIndex={startMintIndex}
      />
    </>
  );
};

export default MintFormContainer;
