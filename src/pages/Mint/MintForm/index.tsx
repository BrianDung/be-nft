import { useStyles } from '../style';
import MintForm from './components/Form';

interface MintFormContainerProps {
  nftPrice: number | string;
  endSwapIndex: number;
  maxSwapIndex: number;
  currentSwapIndex: number;
  timeServer: number;
  maxSupply: number;
  saleState: number;
}

const MintFormContainer = ({
  nftPrice,
  endSwapIndex: endMintIndex,
  maxSwapIndex: maxMintIndex,
  currentSwapIndex: currentMintIndex,
  timeServer,
  maxSupply: startMintIndex,
  saleState,
}: MintFormContainerProps) => {
  const styles = useStyles();

  return (
    <>
      <div>
        <span className={styles.priceBigSize}>{Number(nftPrice).toLocaleString()} USDT</span>
        <span className={styles.priceMediumSize}>/ NFT</span>
      </div>
      <MintForm
        saleState={saleState}
        endMintIndex={endMintIndex}
        maxMintIndex={maxMintIndex}
        nftPrice={Number(nftPrice)}
        currentMintIndex={currentMintIndex}
        timeServer={timeServer}
        startMintIndex={startMintIndex}
      />
    </>
  );
};

export default MintFormContainer;
