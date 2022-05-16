import BigNumber from 'bignumber.js';
import React from 'react';
import { DATE_TIME_FORMAT } from '../../../../constants/formatDate';
import { convertUnixTimeToDate } from '../../../../utils/convertDate';
import { formatRoundDown, formatRoundUp, numberWithCommas } from '../../../../utils/formatNumber';
import useStyles from '../style';

type SwapTokenInfoProps = {
  maxAllocation: BigNumber;
  userPurchased: BigNumber;
  remainingToken: BigNumber;
  startBuyTime?: number | string;
  endBuyTime?: number | string;
  currencyName: string;
  buyTimeLabel: string;
  disabled?: boolean;
};

export const SwapTokenInfo: React.FC<SwapTokenInfoProps> = ({
  maxAllocation,
  endBuyTime,
  remainingToken,
  startBuyTime,
  userPurchased,
  currencyName,
  buyTimeLabel,
  disabled,
}: SwapTokenInfoProps) => {
  const styles = useStyles();

  return (
    <div className={styles.leftBuyTokenForm}>
      <div className={styles.buyTokenFormTitle}>
        <div className={styles.allowcationWrap}>
          <span className={styles.allowcationTitle}>Max Allocation: </span>
          <span className={styles.allocationContent}>
            {disabled ? 'N/A' : `${numberWithCommas(formatRoundDown(maxAllocation))} ${currencyName}`}
          </span>
        </div>
        <div className={styles.allowcationWrap}>
          <span className={styles.allowcationTitle}>Have Bought: </span>
          <span className={styles.allocationContent}>
            {disabled ? 'N/A' : `${numberWithCommas(formatRoundUp(userPurchased))} ${currencyName}`}
          </span>
        </div>
        <div className={styles.allowcationWrap}>
          <span className={styles.allowcationTitle}>Remaining: </span>
          <span className={styles.allocationContent}>
            {disabled
              ? 'N/A'
              : `${numberWithCommas(
                  remainingToken.lte(0) ? '0' : formatRoundDown(new BigNumber(remainingToken))
                )} ${currencyName}`}
          </span>
        </div>
        <div className={styles.allowcationWrap}>
          <span className={styles.allowcationTitle}>{buyTimeLabel}</span>
          <span className={styles.allocationContent}>
            {startBuyTime && endBuyTime && (
              <>
                {convertUnixTimeToDate(Number(startBuyTime), DATE_TIME_FORMAT.CMR6)} - <br />
                {convertUnixTimeToDate(Number(endBuyTime), DATE_TIME_FORMAT.CMR6)}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
