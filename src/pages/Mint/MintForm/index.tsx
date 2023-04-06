import { useStyles } from '../style';
import MintForm from './components/Form';

interface MintFormContainerProps {
  nftPrice: number | string;
  maxSwapIndex: number;
  currentSwapIndex: number;
  saleState: number;
}

const MintFormContainer = ({ nftPrice, maxSwapIndex, currentSwapIndex, saleState }: MintFormContainerProps) => {
  const styles = useStyles();

  return (
    <>
      <div>
        <span className={styles.priceBigSize}>{Number(nftPrice).toLocaleString()} USDT</span>
        <span className={styles.priceMediumSize}>/ NFT</span>
      </div>
      <MintForm
        saleState={saleState}
        maxSwapIndex={maxSwapIndex}
        nftPrice={Number(nftPrice)}
        currentSwapIndex={currentSwapIndex}
      />
    </>
  );
};

export default MintFormContainer;
