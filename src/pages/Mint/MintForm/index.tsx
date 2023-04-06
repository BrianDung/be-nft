import { MintTimeLine } from 'constants/mint';
import { useStyles } from '../style';
import MintForm from './components/Form';

interface MintFormContainerProps {
  nftPrice: number | string;
  maxSwapIndex: number;
  currentSwapIndex: number;
  saleState: number;
  mintedCount: number;
  numberNftSwaped: number;
  mintState: boolean;
}

const MintFormContainer = ({
  nftPrice,
  maxSwapIndex,
  currentSwapIndex,
  saleState,
  mintedCount,
  numberNftSwaped,
  mintState
}: MintFormContainerProps) => {
  const styles = useStyles();

  return (
    <>
      <div>
        {saleState <= MintTimeLine.WLMintPhase3 && (
          <>
            <span className={styles.priceBigSize}>{Number(nftPrice).toLocaleString()} USDT</span>
            <span className={styles.priceMediumSize}>/ NFT</span>
          </>
        )}
        {saleState > MintTimeLine.WLMintPhase3 && (
          <span className={styles.priceMediumSize2}>{`Your allocation is ${numberNftSwaped - mintedCount} NFT`}</span>
        )}
      </div>
      <MintForm
        saleState={saleState}
        maxSwapIndex={maxSwapIndex}
        nftPrice={Number(nftPrice)}
        currentSwapIndex={currentSwapIndex}
        numberNftSwaped={numberNftSwaped}
        mintedCount={mintedCount}
        mintState={mintState}
      />
    </>
  );
};

export default MintFormContainer;
