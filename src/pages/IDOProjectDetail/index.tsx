/* eslint-disable react-hooks/exhaustive-deps */

import { useWallet } from '@solana/wallet-adapter-react';
import moment from 'moment';
import useUserPurchased from 'pages/BuyToken/hooks/useUserPurchased';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PoolStatus } from 'utils/getPoolStatus';
// eslint-disable-next-line
import { formatTime, formatTimeInDate } from '../../constants/formatDate';
import useAuth from '../../hooks/useAuth';
import usePoolDetails from '../../hooks/usePoolDetails';
import { useSelectedNetwork } from '../../hooks/useSelectedNetwork';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getPoolCountDown } from '../../utils/getPoolCountDown';
import { getIconCurrencyUsdt } from '../../utils/usdt';
import RegisterToJoinButton from './IDOProjectHeader/ApplyWhiteListButton';
import usePoolDetailsMapping from '../BuyToken/hooks/usePoolDetailsMapping';
import useTokenSoldProgress from '../BuyToken/hooks/useTokenSoldProgress';
import ClaimToken from './ClaimToken';
import IDOProjectHeader from './IDOProjectHeader';
import BannerNotification from './IDOProjectHeader/BannerNotification';
//import ButtonRegister from "./ButtonRegister/ButtonRegister";
import PoolDetailsAndQualifiedUserField from './PoolDetailsAndQualifiedUsers';
import PoolSwapInfo from './PoolSwapInfo';
import PoolTimeLine from './PoolTimeLine';
import { PublicSell } from './PublicSellToken';
import styles from './style.module.scss';
import { useHistory } from 'react-router-dom';
import usePoolJoinAction from 'pages/BuyToken/hooks/usePoolJoinAction';
import SwapToken from './SwapToken';
import { useUserPoolInfo } from './SwapToken/hooks/useUserPoolInfo';
import { useCheckJoinCampaign } from 'hooks/useCheckJoinCampaign';
import { Button } from 'components/Base/Form/Button';
import ConnectWalletModal from 'pages/UserSiteDashboard/Header/ConnectWalletModal';
import ComingSoon from 'pages/ComingSoon';

const IDOProjectDetail = () => {
  const params: any = useParams();
  const { connectedAccount: address, isAuth } = useAuth();
  const { poolDetails } = usePoolDetails(params.id);
  const poolDetailsMapping = usePoolDetailsMapping(poolDetails);
  const [maxBought, setMaxBought] = useState({
    isMaxBought: false,
    maxAllocation: 0,
  });

  const backIcon = '/images/icons/backIcon.svg';

  const { soldProgress } = useTokenSoldProgress(poolDetails);
  const isInPreOrderTime = false;

  const joinTimeInDate = formatTimeInDate(poolDetails?.startRegisterTime);
  const endJoinTimeInDate = formatTimeInDate(poolDetails?.endRegisterTime);
  const startStartTimePreOrder = formatTimeInDate(poolDetails?.startPreOrderTime);
  const startBuyTimeNormal = formatTimeInDate(poolDetails?.startBuyTime);
  const releaseTimeInDate = formatTimeInDate(poolDetails?.releaseTime);
  const startBuyTimeInDate = isInPreOrderTime ? startStartTimePreOrder : startBuyTimeNormal;
  const endStartTimePreOrder = formatTimeInDate(poolDetails?.startBuyTime);
  const endBuyTimeNormal = formatTimeInDate(poolDetails?.endBuyTime);
  const endBuyTimeInDate = isInPreOrderTime ? endStartTimePreOrder : endBuyTimeNormal;

  // const startRegisterTime = formatTime(poolDetails?.startRegisterTime);
  // const endRegisterTime = formatTime(poolDetails?.endRegisterTime);
  const [openConnect, setOpenConnect] = useState(false);

  const now = moment();
  // const validDate = startRegisterTime.isValid() && endRegisterTime.isValid();
  // const nowIsBetweenRegisterTime = now.isAfter(startRegisterTime) && now.isBefore(endRegisterTime);
  // const availableJoin = validDate ? nowIsBetweenRegisterTime : false;
  const { publicKey } = useWallet();
  const { isSelectedSolana } = useSelectedNetwork();
  const addressWallet = isSelectedSolana ? publicKey?.toBase58() ?? '' : address;
  const isConnectWallet = useMemo(() => {
    if (addressWallet && addressWallet.length > 0) {
      return true;
    }

    return false;
  }, [addressWallet]);

  const { joinPoolSuccess } = usePoolJoinAction({ poolId: poolDetails?.id, poolDetails });

  const hasPublicSell = !!poolDetails?.freeBuyTimeSetting;
  const { start_buy_time: startPublicSell } = poolDetails?.freeBuyTimeSetting ?? {};
  // If in pre public sell: start public sell > now > end swap time
  const inPrePublicSell =
    hasPublicSell &&
    poolDetails?.endBuyTime &&
    now.isBefore(moment.unix(Number(startPublicSell))) &&
    now.isAfter(moment.unix(Number(poolDetails?.endBuyTime)));
  const { userPoint } = useTypedSelector((state: any) => ({
    userPoint: state.global.userPoint,
  }));
  const { connectedAccount } = useAuth();
  const userTier = useTypedSelector((state) => state.userTier).data;

  const {
    userSnapshot,
    userJoinedPoolSnapshot: { isJoined, point: registerSnapshotPoint },
  } = useUserPoolInfo(params.id, connectedAccount);

  const isQualifiedUser = !!userSnapshot;
  const matchPointCondition =
    isJoined && isQualifiedUser && userSnapshot.point >= registerSnapshotPoint && userPoint >= userSnapshot.point;

  const displayCountDownTime = useCallback(
    (
      method: string | undefined,
      startJoinTime: Date | undefined,
      endJoinTime: Date | undefined,
      startBuyTime: Date | undefined,
      endBuyTime: Date | undefined,
      alreadyJoinPool: boolean | undefined,
      joinPoolSuccess: boolean | undefined
    ) => {
      // if (isEnoughTierPreOrder && isInPreOrderTime) { // Pool is PreOrder Pool and Pool in PreOrder Time Actived
      //   return getPoolCountDownPreOrder({ endBuyTime });
      // }
      return getPoolCountDown(
        startJoinTime,
        endJoinTime,
        startBuyTime,
        endBuyTime,
        releaseTimeInDate,
        method,
        poolDetails?.campaignStatus,
        poolDetails,
        soldProgress,
        poolDetails?.isPrivate,
        alreadyJoinPool,
        joinPoolSuccess
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      poolDetails?.method,
      poolDetails?.isPrivate,
      joinTimeInDate,
      endJoinTimeInDate,
      startBuyTimeInDate,
      endBuyTimeInDate,
      isJoined,
      joinPoolSuccess,
    ]
  );

  const inBuyTime =
    startBuyTimeNormal && endBuyTimeNormal && startBuyTimeNormal < new Date() && new Date() < endBuyTimeNormal;

  const { date: countDownDate, display } = displayCountDownTime(
    poolDetails?.method,
    joinTimeInDate,
    endJoinTimeInDate,
    startBuyTimeNormal,
    endBuyTimeNormal,
    isJoined,
    joinPoolSuccess
  );

  const { currencyName } = getIconCurrencyUsdt({
    purchasableCurrency: poolDetails?.purchasableCurrency,
    networkAvailable: poolDetails?.networkAvailable,
  });

  const [userPurchased, setUserPurchased] = useState<any>('');

  const { retrieveUserPurchased } = useUserPurchased(poolDetails?.tokenDetails, poolDetails?.poolAddress, true);

  const fetchPoolDetails = useCallback(async () => {
    if (poolDetails?.tokenDetails && poolDetails?.poolAddress) {
      setUserPurchased(
        ((await retrieveUserPurchased(connectedAccount as string, poolDetails?.poolAddress)) as number) ?? 0
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolDetails]);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    fetchPoolDetails();
  }, [poolDetails]);

  const { canJoin } = useCheckJoinCampaign(params.id);

  const renderComingSoon = () => {
    return (
      <>
        <ComingSoon />
      </>
    );
  };

  const renderContent = () => {
    const content = () => {
      return (
        <>
          <section className={styles.headerComponent}>
            <BannerNotification
              notEnoughPoint={!canJoin}
              poolDetails={poolDetails}
              ableToFetchFromBlockchain={true}
              winnersList={{}}
              verifiedEmail={true}
              currentUserTier={userTier}
              existedWinner={false}
              currencyName={currencyName}
              userBuyLimit={100}
              startBuyTimeInDate={startBuyTimeNormal}
              endBuyTimeInDate={endBuyTimeNormal}
              alreadyJoinPool={isJoined}
              joinPoolSuccess={joinPoolSuccess}
              isKYC={true}
              dataUser={{}}
              connectedAccount={connectedAccount}
              // whitelistCompleted={false}
              // whitelistLoading={true}
              scrollToWinner={false}
              maximumBuy={100}
              countDownDate={countDownDate}
              userCanceledWhiteList={false}
              isPreOrderPool={false}
              isInPreOrderTime={isInPreOrderTime}
              notMatchMinTier={matchPointCondition}
              maxBought={maxBought}
              soldProgress={soldProgress}
            />
          </section>
          <div className={styles.container}>
            <div className={styles.back} onClick={goBack}>
              <img src={backIcon} alt="back" />
              <span>Back</span>
            </div>
            <IDOProjectHeader poolDetails={poolDetails} poolDetailsMapping={poolDetailsMapping} />
            <div className={styles.reigsterBtn}>
              {isConnectWallet ? (
                <RegisterToJoinButton poolDetails={poolDetails} />
              ) : (
                <Button className={styles.textHeader} shape="rounded" onClick={() => setOpenConnect(true)}>
                  Connect wallet
                </Button>
              )}
            </div>
            <div className={styles.poolInfoTimeLine}>
              <div className={styles.poolTimeLine}>
                <PoolTimeLine
                  display={display}
                  countDownDate={countDownDate}
                  poolDetails={poolDetails}
                  soldProgress={soldProgress}
                />
              </div>
              <div className={styles.PoolSwapInfo}>
                <PoolSwapInfo currencyName={currencyName} poolDetails={poolDetails} />
              </div>
            </div>
            {/* <div className={styles.poolInfo}> */}
            {isAuth && inBuyTime && isJoined && matchPointCondition && (
              <SwapToken
                purchasableCurrency={poolDetails?.purchasableCurrency?.toUpperCase()}
                poolDetails={poolDetails ?? {}}
                userSnapshot={userSnapshot}
                setMaxBought={(maxBought: any) => setMaxBought(maxBought)}
              />
            )}
            {isAuth &&
              (poolDetails?.campaignStatus === PoolStatus.PublicSell || inPrePublicSell) &&
              isJoined &&
              matchPointCondition && (
                <PublicSell
                  purchasableCurrency={poolDetails?.purchasableCurrency?.toUpperCase()}
                  poolDetails={poolDetails ?? {}}
                  userSnapshot={userSnapshot}
                  setMaxBought={(maxBought: any) => setMaxBought(maxBought)}
                />
              )}
            {poolDetails?.campaignStatus === PoolStatus.Claimable && +userPurchased > 0 && (
              <ClaimToken
                releaseTime={releaseTimeInDate || undefined}
                ableToFetchFromBlockchain={true}
                buyTokenSuccess={true}
                disableAllButton={false}
                poolDetails={poolDetails}
                currencyName={currencyName}
                startBuyTimeInDate={startBuyTimeInDate}
                isPreOrderPool={false}
                allowUserBuyPreOrder={false}
                startBuyTimeNormal={startBuyTimeNormal}
                maximumBuy={userSnapshot?.pkfBalance ? Number(userSnapshot?.pkfBalance) : 0}
              />
            )}
            {/* </div> */}
            <PoolDetailsAndQualifiedUserField poolDetail={poolDetails} />
            {openConnect && <ConnectWalletModal opened={openConnect} handleClose={() => setOpenConnect(false)} />}
          </div>
        </>
      );
    };
    return <>{canRender() ? content() : renderComingSoon()}</>;
  };

  const canRender = () => {
    const allowRenderByIds = ['1', '2', '3'];
    const id = params?.id;
    return allowRenderByIds.includes(id);
  };

  return <>{renderContent()}</>;
};
export default IDOProjectDetail;
