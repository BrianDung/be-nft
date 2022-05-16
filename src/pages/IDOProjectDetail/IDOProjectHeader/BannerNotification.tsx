/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useEffect, useState } from 'react';
import { trimMiddlePartAddress } from '../../../utils/accountAddress';
import useStyles from './styles';
import { ACCEPT_CURRENCY, PUBLIC_WINNER_STATUS, TIER_LEVELS, TIERS } from '../../../constants';
import { Link } from 'react-router-dom';
import { formatRoundDown, formatRoundUp, numberWithCommas } from '../../../utils/formatNumber';
import { PurchaseCurrency } from '../../../constants/purchasableCurrency';
import { getBUSDAddress, getUSDCAddress, getUSDTAddress } from '../../../utils/contractAddress/getAddresses';
import { ETH_CHAIN_ID } from '../../../constants/network';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import useTokenAllowance from '../../../hooks/useTokenAllowance';
import BigNumber from 'bignumber.js';
import { convertTimeToStringFormat, unixTime } from '../../../utils/convertDate';
import { PoolStatus } from '../../../utils/getPoolStatus';
import useUserPurchased from '../../BuyToken/hooks/useUserPurchased';
import useDetectClaimConfigApplying from '../../BuyToken/hooks/useDetectClaimConfigApplying';
import _ from 'lodash';
import Notification from './Notification';
import { useSelectedNetwork } from '../../../hooks/useSelectedNetwork';
import { useWallet } from '@solana/wallet-adapter-react';
import { BaseRequest } from '../../../request/Request';
import { getUserTierAlias } from 'utils/getUserTierAlias';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';

const blankHref = undefined;

function BannerNotification(props: any) {
  const styles = useStyles();
  const {
    poolDetails,
    ableToFetchFromBlockchain,
    winnersList,
    verifiedEmail,
    currentUserTier,
    existedWinner,
    currencyName,
    userBuyLimit,
    // startBuyTimeInDate,
    // endBuyTimeInDate,
    alreadyJoinPool,
    joinPoolSuccess,
    connectedAccount,
    isKYC,
    // whitelistCompleted,
    // whitelistLoading,
    scrollToWinner,
    maximumBuy,
    // userCanceledWhiteList,
    notMatchMinTier,
    maxBought,
    soldProgress,
    notEnoughPoint,
  } = props;

  const { appChainID } = useTypedSelector((state) => state.appNetwork).data;
  //
  const { publicKey } = useWallet();
  const { isSelectedSolana } = useSelectedNetwork();
  const { account: address } = useWeb3ReactLocal();
  const addressWallet = isSelectedSolana ? publicKey?.toBase58() ?? '' : address;
  const [tierUser, setTierUser] = useState<any>({});

  // Fet User Claim Info
  const userClaimInfo = useTypedSelector((state) => state.claimUserInfo).data;
  const userPurchasedValue = userClaimInfo?.userPurchased || 0;
  const userClaimed = userClaimInfo?.userClaimed || 0;
  const { maximumTokenClaimUtilNow } = useDetectClaimConfigApplying(poolDetails, userPurchasedValue, userClaimed);
  const isInPublicSell = poolDetails?.campaignStatus === PoolStatus.PublicSell && new BigNumber(soldProgress).lt(100);

  const today = unixTime(new Date());

  //const currentTierLevel = _.get(currentUserTier, "tierId", 0);
  const tokenDetails = _.get(poolDetails, 'tokenDetails', '');
  const poolAddress = _.get(poolDetails, 'poolAddress', '');
  const startBuyTime = _.get(poolDetails, 'startBuyTime', '');
  const endBuyTime = _.get(poolDetails, 'endBuyTime', '');
  const isOverTimeRegister = poolDetails?.endRegisterTime < today;
  // const announcementTime = formatTimeInDate(poolDetails?.whitelistBannerSetting?.announcement_time);
  const purchasableCurrency = poolDetails?.purchasableCurrency?.toUpperCase();

  // Fetch Token Allow
  const getApproveToken = useCallback(
    (appChainID: string) => {
      if (purchasableCurrency && purchasableCurrency === PurchaseCurrency.USDT) {
        return {
          address: getUSDTAddress(appChainID),
          name: 'USDT',
          symbol: 'USDT',
          decimals: appChainID === ETH_CHAIN_ID ? 6 : 18,
        };
      }

      if (purchasableCurrency && purchasableCurrency === PurchaseCurrency.BUSD) {
        return {
          address: getBUSDAddress(appChainID),
          name: 'BUSD',
          symbol: 'BUSD',
          decimals: 18,
        };
      }

      if (purchasableCurrency && purchasableCurrency === PurchaseCurrency.USDC) {
        return {
          address: getUSDCAddress(appChainID),
          name: 'USDC',
          symbol: 'USDC',
          decimals: appChainID === ETH_CHAIN_ID ? 6 : 18,
        };
      }

      if (purchasableCurrency && purchasableCurrency === PurchaseCurrency.ETH) {
        return {
          address: '0x00',
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18,
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line
    [purchasableCurrency, appChainID]
  );
  const tokenToApprove = getApproveToken(appChainID);
  const [tokenAllowance, setTokenAllowance] = useState<number | undefined>(undefined);
  const [userPurchased, setUserPurchased] = useState<number>(0);
  const WARNING_ICON = '/images/icons/warning-white.svg';

  const { retrieveTokenAllowance } = useTokenAllowance();
  const { retrieveUserPurchased } = useUserPurchased(tokenDetails, poolAddress, ableToFetchFromBlockchain);
  const fetchPoolDetails = useCallback(async () => {
    if (tokenDetails && poolAddress && connectedAccount && tokenToApprove) {
      setTokenAllowance((await retrieveTokenAllowance(tokenToApprove, connectedAccount, poolAddress)) as number);
      setUserPurchased((await retrieveUserPurchased(connectedAccount, poolAddress)) as number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenDetails, connectedAccount, tokenToApprove, poolAddress]);

  useEffect(() => {
    const loadPool = async () => {
      await fetchPoolDetails();
    };
    loadPool();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, ableToFetchFromBlockchain]);

  const getCurrentTier = async () => {
    const baseRequest = new BaseRequest();
    let url = `user/get-tier?owner=${addressWallet}` as any;
    const response = (await baseRequest.get(url)) as any;
    const resObject = await response.json();
    return resObject;
  };

  const callCurrentTier = async () => {
    const res = await getCurrentTier();
    if (res.status === 200) {
      setTierUser(res.data);
    } else {
      // console.log(res.message);
    }
  };
  useEffect(() => {
    // callCurrentTier();
  }, [addressWallet]);

  const now = new Date();
  const readyAllowance =
    purchasableCurrency !== PurchaseCurrency.ETH
      ? new BigNumber(tokenAllowance || 0).gt(0) || maxBought.isMaxBought
      : true;
  // const isInBuying = startBuyTimeInDate && endBuyTimeInDate && startBuyTimeInDate < now && now < endBuyTimeInDate;
  const isInFreeBuying =
    poolDetails?.freeBuyTimeSetting?.start_buy_time &&
    endBuyTime &&
    new Date(poolDetails.freeBuyTimeSetting.start_buy_time * 1000) < now &&
    now < endBuyTime;
  const isInPreOrderTime =
    poolDetails?.startPreOrderTime &&
    startBuyTime &&
    new Date(poolDetails.startPreOrderTime * 1000) < now &&
    now < startBuyTime;
  const releaseTimeInDate = poolDetails?.campaignClaimConfig[0]?.start_time
    ? new Date(Number(poolDetails?.campaignClaimConfig[0]?.start_time) * 1000)
    : undefined;

  const isInBuying = startBuyTime && endBuyTime && startBuyTime < today && endBuyTime > today;

  // Convert from max buy USDT to max buy Token
  const userPurchasedUsdt = formatRoundUp(
    new BigNumber(userPurchased || 0).multipliedBy(poolDetails?.ethRate || poolDetails?.eth_conversion_rate || 1)
  );

  // const isCanceledWhitelist = userCanceledWhiteList && userCanceledWhiteList.id;
  const inApprove =
    isInBuying &&
    poolDetails.campaignStatus === PoolStatus.Progress &&
    alreadyJoinPool &&
    !notMatchMinTier &&
    !readyAllowance;
  const inSwap =
    isInBuying &&
    poolDetails.campaignStatus === PoolStatus.Progress &&
    alreadyJoinPool &&
    !notMatchMinTier &&
    readyAllowance;
  const swapNotMaxBought = inSwap && !maxBought.isMaxBought;
  const inMaxBought = inSwap && maxBought.isMaxBought;

  return (
    <>
      {poolDetails && !isKYC && connectedAccount && (
        <div className={styles.alertVerifyEmail}>
          <img src={WARNING_ICON} style={{ marginRight: '8px' }} alt="" />
          <span>
            The connected wallet address ({trimMiddlePartAddress(connectedAccount || '')}) is unverified.&nbsp;
            <a
              href="https://verify-with.blockpass.org/?clientId=red_kite_kyc_7a0e6&serviceName=Red%20Kite%20KYC&env=prod"
              target="_blank"
              rel="noreferrer"
            >
              Please submit KYC now
            </a>
            &nbsp;or switch to a verified address. Click{' '}
            <a
              href="https://medium.com/polkafoundry/what-to-do-before-joining-idos-on-red-kite-de9b0d778dbe"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>{' '}
            for more process details.
          </span>
        </div>
      )}

      {
        // isKYC &&
        tierUser.tier?.tier_id < poolDetails?.minTier && (
          //  !isOverTimeRegister &&
          <Notification type="warning">
            <span>
              You Have not achieved min tier ({TIERS[poolDetails?.minTier]?.name || ''}) to join the project. To upgrade
              your Tier, please click&nbsp;
              <Link to="/account" style={{ color: 'white', textDecoration: 'underline' }}>
                However
              </Link>
            </span>
            .
          </Notification>
        )
      }

      {/* {tierUser.tier?.tier_id > poolDetails?.minTier && (
                <Notification type="success">
                    <span>Registration successful! Thank you for your participation.</span>
                </Notification>
            )} */}

      {poolDetails?.campaignStatus === PoolStatus.Closed && (
        <Notification type="infor">
          <span>The pool is over. Thank you for your participation</span>
        </Notification>
      )}

      {poolDetails?.campaignStatus === PoolStatus.Filled && alreadyJoinPool && (
        <Notification type="infor">
          <span>
            The pool is full. Thank you for your participation. You can claim your token at{' '}
            {releaseTimeInDate && convertTimeToStringFormat(releaseTimeInDate)}.
          </span>
        </Notification>
      )}

      {isInPublicSell && (
        <Notification type="warning">
          <span>Public Sell opens now. You can approve USDT.</span>
        </Notification>
      )}

      {(poolDetails?.campaignStatus === PoolStatus.Progress || poolDetails?.campaignStatus === PoolStatus.Claimable) &&
        !alreadyJoinPool && (
          <Notification type="warning">
            <span>
              We are sorry! You have not met the latest requirements to join the project. Hope to see you in the next
              project.
            </span>
          </Notification>
        )}

      {poolDetails?.campaignStatus === PoolStatus.Claimable &&
        alreadyJoinPool &&
        new BigNumber(formatRoundDown(maximumTokenClaimUtilNow, 2)).eq(0) && (
          <Notification type="warning">
            <span>The swap period is closed. Hope to see you in the next project.</span>
          </Notification>
        )}

      {poolDetails?.campaignStatus === PoolStatus.Progress && notMatchMinTier && (
        <Notification type="warning">
          <span>
            You haven't achieved min tier ({getUserTierAlias(poolDetails?.minTier).text}) to join this project. To
            upgrade your Tier, please click here.
          </span>
        </Notification>
      )}

      {inApprove && (
        <Notification type="infor">
          The pool is open now. You must first approve {currencyName} (one time only).
        </Notification>
      )}

      {swapNotMaxBought && (
        <Notification type="infor">
          You have approved successfully. Enter the {currencyName} amount to swap tokens.
        </Notification>
      )}

      {inMaxBought && (
        <Notification type="infor">
          You have reached your {numberWithCommas(formatRoundDown(maxBought.maxAllocation, 0))} {currencyName}{' '}
          individual cap. Refer to Your Allocation for details.
        </Notification>
      )}

      {poolDetails?.campaignStatus === PoolStatus.Claimable &&
        new BigNumber(formatRoundDown(maximumTokenClaimUtilNow, 2)).gt(0) &&
        // && !!currentClaimIndex
        alreadyJoinPool && (
          <Notification type="infor">
            <span>You can claim your tokens now. Check Claim Policy and click Claim Tokens button.</span>
          </Notification>
        )}

      {isInPreOrderTime && alreadyJoinPool && currentUserTier && currentUserTier.tierId === TIER_LEVELS.MAXIMALS && (
        <div className={styles.warningWhite}>
          <img src="/images/warning-white.svg" style={{ marginRight: '10px' }} alt="" />
          {purchasableCurrency.toUpperCase() === ACCEPT_CURRENCY.ETH?.toUpperCase() ? (
            new BigNumber(userPurchasedUsdt).lt(maximumBuy) ? ( // userPurchased < maximumBuy
              <span>The pool is open now. Click Pre-order button to buy tokens.</span>
            ) : (
              <span>
                You have reached your&nbsp;
                <span style={{ color: '#ff673e' }}>
                  {numberWithCommas(`${userBuyLimit}`)} {currencyName}
                </span>
                &nbsp; individual cap. Refer to Your Allocation for details.
              </span>
            )
          ) : !readyAllowance ? (
            <span>The pool is open now. You must first approve {currencyName} (one time only).</span>
          ) : new BigNumber(userPurchasedUsdt).lt(maximumBuy) ? ( // userPurchased < maximumBuy
            new BigNumber(userPurchasedUsdt).isZero() ? (
              <span>You have approved successfully. Enter the {currencyName} amount to pre-order tokens.</span>
            ) : (
              <span>You have successfully pre-order the tokens.</span>
            )
          ) : (
            <span>
              You have reached your&nbsp;
              <span style={{ color: '#ff673e' }}>
                {numberWithCommas(`${userBuyLimit}`)} {currencyName}
              </span>
              &nbsp; individual cap. Refer to Your Allocation for details.
            </span>
          )}
        </div>
      )}

      {(alreadyJoinPool || joinPoolSuccess) &&
        // !whitelistCompleted &&
        // !whitelistLoading &&
        currentUserTier &&
        currentUserTier.level < 3 &&
        tierUser.tier?.tier_id > poolDetails?.minTier &&
        !(winnersList && winnersList.total > 0 && poolDetails?.publicWinnerStatus === PUBLIC_WINNER_STATUS.PUBLIC) &&
        !isOverTimeRegister && ( // User must not canceled whitelist
          // !isCanceledWhitelist &&
          <div className={styles.whitelistPending}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0C4.48578 0 0 4.48578 0 10C0 15.5142 4.48578 20 10 20C15.5142 20 20 15.5142 20 10C20 4.48578 15.5142 0 10 0ZM14.7559 15.1724C14.5934 15.3349 14.38 15.4167 14.1667 15.4167C13.9534 15.4167 13.7399 15.3349 13.5776 15.1724L9.41086 11.0059C9.25415 10.8501 9.16672 10.6383 9.16672 10.4167V5C9.16672 4.53918 9.53995 4.16672 10 4.16672C10.4601 4.16672 10.8333 4.53918 10.8333 5V10.0717L14.7559 13.9941C15.0816 14.3201 15.0816 14.8466 14.7559 15.1724Z"
                fill="#090B1B"
              />
            </svg>
            <p>
              We will verify your application WITHIN 1 DAY. We will send you an email at support@polkafoundry.com to
              explain why your application is pending approval. Please be patient and keep an eye on the email.
            </p>
          </div>
        )}

      {
        //TODO: condition check registration successfully
        (alreadyJoinPool || joinPoolSuccess) &&
          // whitelistCompleted &&
          // !whitelistLoading &&
          startBuyTime &&
          !(
            winnersList &&
            winnersList.total > 0 &&
            poolDetails?.publicWinnerStatus === PUBLIC_WINNER_STATUS.PUBLIC
          ) && (
            <Notification type="star">
              <span>Registration successful! Thank you for your participation.</span>
            </Notification>
          )
      }
      {notEnoughPoint && (
        <Notification type="warning">
          <span>You do not have enough point to join the project.</span>
        </Notification>
      )}

      {ableToFetchFromBlockchain &&
        winnersList &&
        winnersList.total > 0 &&
        verifiedEmail &&
        poolDetails?.publicWinnerStatus === PUBLIC_WINNER_STATUS.PUBLIC &&
        now.valueOf() < startBuyTime.valueOf() &&
        (alreadyJoinPool || joinPoolSuccess) &&
        !(currentUserTier && currentUserTier.level === TIER_LEVELS.MAXIMALS && isInPreOrderTime) && (
          // (currentUserTier && currentUserTier.level == TIER_LEVELS.DOVE) &&
          <>
            {existedWinner && (
              <div className={styles.warningWhite}>
                <img src="/images/fire-cracker.svg" alt="file-cracker" /> &nbsp;{' '}
                <span>
                  The whitelist winners are out! Congratulations on your&nbsp;
                  <span style={{ color: '#ff673e' }}>
                    {numberWithCommas(`${userBuyLimit}`)} {currencyName}{' '}
                  </span>
                  allocation for {poolDetails?.title}. You can view the list of winners&nbsp;
                  <a
                    href={blankHref}
                    style={{
                      color: '#6398ff',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      scrollToWinner();
                    }}
                  >
                    here
                  </a>
                  .
                </span>
              </div>
            )}
            {!existedWinner && (
              <div className={styles.warningWhite}>
                <img src="/images/warning-white.svg" style={{ marginRight: '10px' }} alt="" />
                <span>
                  Sorry, you have not been chosen as whitelist winner. However, you can join the free token purchase
                  mode for {poolDetails?.title} Pool. Click{' '}
                  <a
                    style={{
                      color: '#6398ff',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    href={'https://bit.ly/3r3sniO'}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    here
                  </a>{' '}
                  to read more.
                </span>
              </div>
            )}
          </>
        )}

      {alreadyJoinPool &&
        !!poolDetails?.freeBuyTimeSetting?.start_buy_time &&
        isInFreeBuying &&
        poolDetails?.campaignStatus !== PoolStatus.Filled && (
          <div className={styles.warningWhite}>
            <span>Free Time Purchase (Phase 2) has started!</span>
          </div>
        )}

      {alreadyJoinPool &&
        !!poolDetails?.freeBuyTimeSetting?.start_buy_time &&
        isInFreeBuying &&
        poolDetails?.campaignStatus !== PoolStatus.Filled &&
        new BigNumber(userPurchasedUsdt).eq(maximumBuy) && (
          <div className={styles.warningWhite}>
            <span>
              You have reached your&nbsp;
              <span style={{ color: '#ff673e' }}>
                {numberWithCommas(`${userBuyLimit}`)} {currencyName}
              </span>
              &nbsp; individual cap. Refer to Your Allocation for details.
            </span>
          </div>
        )}
    </>
  );
}

export default BannerNotification;
