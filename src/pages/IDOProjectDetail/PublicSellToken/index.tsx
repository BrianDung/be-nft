import { withWidth } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { getIconCurrencyUsdt } from '../../../utils/usdt';
import useStyles from '../TokenForm/style';
import { SwapTokenInfo } from '../TokenForm/TokenInfo';
import useAuth from '../../../hooks/useAuth';
import { SwapTokenForm } from '../TokenForm/SwapTokenForm';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';
import { usePublicSellPurchased } from './hooks/usePublicSellPurchased';
import useUserPurchased from 'pages/BuyToken/hooks/useUserPurchased';
import { UserSnapshot } from '../SwapToken/hooks/useUserPoolInfo';

type PublicSellFormProps = {
  purchasableCurrency?: string;
  poolDetails: any;
  userSnapshot?: UserSnapshot;
  setMaxBought: any;
};

const PublicSellForm: React.FC<PublicSellFormProps> = ({
  purchasableCurrency,
  poolDetails,
  userSnapshot,
  setMaxBought,
}: PublicSellFormProps) => {
  const { tokenDetails, networkAvailable, ethRate: rate, poolAddress, id: poolId, freeBuyTimeSetting } = poolDetails;
  const { start_buy_time: startBuyTime, end_buy_time: endBuyTime } = freeBuyTimeSetting ?? {};
  const maxAllocation = new BigNumber(freeBuyTimeSetting?.max_bonus ?? 0);

  const [userPublicSellPurchased, setUserPublicSellPurchased] = useState<number>(0);
  const [userSwapPurchased, setUserSwapPurchased] = useState<number>(0);
  const [, setLoading] = useState(false);

  const styles = useStyles();
  const { currencyName } = getIconCurrencyUsdt({ purchasableCurrency, networkAvailable });
  const { connectedAccount, isAuth } = useAuth();
  const { appChainID } = useTypedSelector((state) => state.appNetwork).data;
  const { retrieveUserPurchased } = useUserPurchased(tokenDetails, poolAddress, true);
  const { getPublicSellPurchased } = usePublicSellPurchased();

  const fetchUserPurchased = useCallback(async () => {
    // Get user purchased in swap time
    if (connectedAccount && poolAddress) {
      setUserSwapPurchased(((await retrieveUserPurchased(connectedAccount, poolAddress)) as number) ?? 0);
    }

    // Get user purchased in public sell time
    if (poolId) {
      setUserPublicSellPurchased(await getPublicSellPurchased(poolId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, poolAddress, poolId]);

  useEffect(() => {
    if (!connectedAccount) {
      return;
    }

    setLoading(true);
    fetchUserPurchased().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, appChainID, isAuth]);

  const swapMaxAllocation = new BigNumber(userSnapshot?.pkfBalance ?? 0);
  const displayUserPurchased = new BigNumber(userPublicSellPurchased).multipliedBy(rate);
  const remainingToken = maxAllocation.minus(displayUserPurchased);
  // Check is user swapped maximum allocate: disable swap form
  const isSwapMaxAllocate = swapMaxAllocation.minus(new BigNumber(userSwapPurchased)).isLessThanOrEqualTo(0);
  const isMaxBought = remainingToken.isLessThanOrEqualTo(0);

  // Check current time is in snapshot buy time
  const now = moment();
  const inPublicSellTime =
    freeBuyTimeSetting &&
    freeBuyTimeSetting.start_buy_time &&
    freeBuyTimeSetting.end_buy_time &&
    now.isAfter(moment.unix(Number(freeBuyTimeSetting.start_buy_time))) &&
    now.isBefore(moment.unix(Number(freeBuyTimeSetting.end_buy_time)));

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

  const isQualifiedUser = !!userSnapshot;

  return (
    <div className={styles.buyTokenForm}>
      <div className={styles.leftBuyTokenForm}>
        <h2 className={styles.title}>Public Sell</h2>
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
          buyTimeLabel="Public Sell Time:"
          disabled={!isQualifiedUser}
        />
        <SwapTokenForm
          inBuyTime={!!inPublicSellTime}
          poolDetails={poolDetails}
          maxAllocation={maxAllocation}
          userPurchased={displayUserPurchased}
          onFetchUserPurchased={fetchUserPurchased}
          remainingToken={remainingToken}
          currencyName={currencyName}
          disabled={isSwapMaxAllocate || !isQualifiedUser}
        />
      </div>
    </div>
  );
};

export const PublicSell = withWidth()(PublicSellForm);
