import { withWidth } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { getIconCurrencyUsdt } from '../../../utils/usdt';
import useStyles from '../TokenForm/style';
import { SwapTokenInfo } from '../TokenForm/TokenInfo';
import useUserPurchased from '../../BuyToken/hooks/useUserPurchased';
import useAuth from '../../../hooks/useAuth';
import { SwapTokenForm } from '../TokenForm/SwapTokenForm';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { UserSnapshot } from './hooks/useUserPoolInfo';

type SwapTokenFormProps = {
  purchasableCurrency?: string;
  poolDetails: any;
  userSnapshot?: UserSnapshot;
  setMaxBought: any;
};

const SwapToken: React.FC<SwapTokenFormProps> = ({
  purchasableCurrency,
  poolDetails,
  userSnapshot,
  setMaxBought,
}: SwapTokenFormProps) => {
  const { tokenDetails, networkAvailable, ethRate: rate, poolAddress, startBuyTime, endBuyTime } = poolDetails;
  const { pkfBalance } = userSnapshot ?? { pkfBalance: 0 };
  const maxAllocation = new BigNumber(pkfBalance ?? 0);

  const [userPurchased, setUserPurchased] = useState<number>(0);
  const [, setLoading] = useState(false);

  const styles = useStyles();
  const { currencyName } = getIconCurrencyUsdt({ purchasableCurrency, networkAvailable });
  const { connectedAccount } = useAuth();
  const { appChainID } = useTypedSelector((state) => state.appNetwork).data;
  const { retrieveUserPurchased } = useUserPurchased(tokenDetails, poolAddress, true);

  const fetchUserPurchased = useCallback(async () => {
    if (poolAddress && connectedAccount) {
      setUserPurchased(((await retrieveUserPurchased(connectedAccount, poolAddress)) as number) ?? 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, poolAddress]);

  useEffect(() => {
    if (!connectedAccount) {
      return;
    }

    setLoading(true);
    fetchUserPurchased().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, appChainID]);

  const displayUserPurchased = new BigNumber(userPurchased).multipliedBy(rate);
  const remainingToken = maxAllocation.minus(displayUserPurchased);
  const isMaxBought = remainingToken.isLessThanOrEqualTo(0);

  // Check current time is in snapshot buy time
  useEffect(() => {
    if (isMaxBought) {
      setMaxBought({
        isMaxBought: true,
        maxAllocation: maxAllocation,
      });
    } else {
      setMaxBought({
        isMaxBought: false,
        maxAllocation: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMaxBought]);

  return (
    <div className={styles.buyTokenForm}>
      <div className={styles.leftBuyTokenForm}>
        <h2 className={styles.title}>Swap Tokens</h2>
        <div className={styles.borderBottom}></div>
      </div>
      <div className={styles.flexSwap}>
        <SwapTokenInfo
          maxAllocation={maxAllocation}
          currencyName={currencyName}
          endBuyTime={endBuyTime}
          startBuyTime={startBuyTime}
          userPurchased={displayUserPurchased}
          remainingToken={remainingToken}
          buyTimeLabel="Swap Time:"
        />
        <SwapTokenForm
          inBuyTime={true}
          poolDetails={poolDetails}
          maxAllocation={maxAllocation}
          userPurchased={displayUserPurchased}
          onFetchUserPurchased={fetchUserPurchased}
          remainingToken={remainingToken}
          currencyName={currencyName}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default withWidth()(SwapToken);
