import moment from 'moment';
import { unixToDate } from 'utils/convertDate';
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
  isLiveSoon: boolean;
}

const MintFormContainer = ({
  nftPrice,
  maxSwapIndex,
  currentSwapIndex,
  saleState,
  mintedCount,
  numberNftSwaped,
  mintState,
  isLiveSoon,
}: MintFormContainerProps) => {
  const styles = useStyles();

  const startPublic = unixToDate(process.env.REACT_APP_START_PUBLIC_SALE || '');
  const endPublic = unixToDate(process.env.REACT_APP_END_PUBLIC_SALE || '');

  const remainingMint = numberNftSwaped - mintedCount;
  const message = remainingMint > 0 ? `Your allocation is ${numberNftSwaped - mintedCount} changed to All NFTs claimed` : 'All NFTs are claimed';

  return (
    <>
      <div>
        {mintState ? (
          isLiveSoon ? (
            <>
              <div className={styles.priceMediumSize2}>{`Mint will open on  ${moment(startPublic).format(
                'LL'
              )} at ${moment(endPublic).format('LT')}`}</div>
              <div className={styles.priceMediumSize2}>{message}</div>
            </>
          ) : (
            <span className={styles.priceMediumSize2}>{message}</span>
          )
        ) : (
          <>
            <span className={styles.priceBigSize}>{Number(nftPrice).toLocaleString()} USDT</span>
            <span className={styles.priceMediumSize}>/ NFT</span>
          </>
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
