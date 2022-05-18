import BigNumber from 'bignumber.js';
import { numberWithCommas } from '../../../utils/formatNumber';
import useTokenSoldProgress from '../../BuyToken/hooks/useTokenSoldProgress';
import useStyles from './styles';

interface PoolSwapInfoProps {
  poolDetails: any;
  currencyName?: any;
}

// eslint-disable-next-line
export default (props: PoolSwapInfoProps) => {
  const { poolDetails, currencyName } = props;

  const styles = useStyles();

  const { tokenSold, soldProgress } = useTokenSoldProgress(poolDetails);

  const soldProgressShow = new Date() < new Date(poolDetails?.startBuyTime * 1000) ? '0' : soldProgress;
  const tokenSoldShow = new Date() < new Date(poolDetails?.startBuyTime * 1000) ? '0' : tokenSold;

  const renderToken = () => {
    return (
      <>
        {poolDetails?.amount ? (
          <>
            {numberWithCommas(poolDetails?.amount.toString())} {poolDetails?.tokenDetails?.symbol || 'Tokens'}
          </>
        ) : (
          'TBA'
        )}
      </>
    );
  };

  const renderExchangeRate1 = () => {
    const displayPriceRate = poolDetails?.displayPriceRate;
    const block1 = () => {
      return (
        <>
          1&nbsp;{poolDetails?.tokenDetails?.symbol}
          &nbsp;=&nbsp;
          {poolDetails?.priceUsdt}&nbsp;USD
          <br />
          1&nbsp;{poolDetails?.tokenDetails?.symbol}
          &nbsp;=&nbsp;
          {poolDetails?.ethRate} &nbsp;{currencyName}
        </>
      );
    };

    const block2 = () => {
      return (
        <>
          1&nbsp;{poolDetails?.tokenDetails?.symbol}
          &nbsp;=&nbsp;
          {poolDetails?.priceUsdt}&nbsp;USD
        </>
      );
    };

    const group1 = () => {
      return <>{displayPriceRate ? block1() : block2()}</>;
    };

    return <>{group1()}</>;
  };

  const renderExchangeRate2 = () => {
    const isShowExchangeRate = poolDetails?.tokenDetails?.symbol && poolDetails?.ethRate;

    return (
      <>
        {isShowExchangeRate && (
          <>
            1&nbsp;{poolDetails?.tokenDetails?.symbol}
            &nbsp;=&nbsp;
            {poolDetails?.ethRate} &nbsp;{currencyName}
          </>
        )}
      </>
    );
  };

  const renderPercent = () => {
    const isShowPercent = poolDetails?.amount && tokenSoldShow;
    const data = () => {
      return (
        <>
          {numberWithCommas(
            new BigNumber(tokenSoldShow).gt(`${poolDetails?.amount}`) ? `${poolDetails?.amount}` : tokenSoldShow,
            2
          )}
          &nbsp; / {numberWithCommas(`${poolDetails?.amount}` || '0', 2)}
        </>
      );
    };
    return <>{isShowPercent ? data() : ''}</>;
  };

  return (
    <section className={styles.sectionBuyTokenPoolSwapInfo}>
      <h2 className={styles.title}>Swap Info</h2>
      <div className={styles.borderBottom}></div>
      <div className={styles.topSec}>
        <div className={styles.leftTopSec}>
          <h3 className={styles.titleSub}>
            Swap Amount:
            <div className={styles.rightTopSec}>
              {poolDetails?.purchasableCurrency === 'eth' ? <>{renderExchangeRate1()}</> : <>{renderExchangeRate2()}</>}
            </div>
          </h3>
          <div className={styles.valueLeftTopSec}>{renderToken()}</div>
        </div>
      </div>
      <div className={styles.borderBottom}></div>
      <div className={styles.botSec}>
        <h3 className={styles.titleSub2}>Swap Progress:</h3>
        <div className={styles.progress}>
          <div
            className={styles.achieved}
            style={{ width: `${new BigNumber(soldProgressShow).gt(100) ? '100' : soldProgressShow}%` }}
          ></div>
        </div>
        <div className={styles.jubValue}>
          <div className={styles.leftBotSec}>
            {numberWithCommas(new BigNumber(soldProgressShow).gt(99) ? '100' : soldProgressShow)}%
          </div>
          <div className={styles.rightBotSec}>{renderPercent()}</div>
        </div>
      </div>
    </section>
  );
};
