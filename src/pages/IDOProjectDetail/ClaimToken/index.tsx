import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import TransactionSubmitModal from '../../../components/Base/TransactionSubmitModal';
import useStyles from './style';

import { convertTimeToStringFormat } from '../../../utils/convertDate';
import { useDispatch } from 'react-redux';
import { alertFailure } from '../../../store/actions/alert';
import ClaimInfo from './ClaimInfo';
import BigNumber from 'bignumber.js';
import { updateUserClaimInfo } from '../../../store/actions/claim-user-info';
import { Tooltip } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import useTokenClaim from '../../BuyToken/hooks/useTokenClaim';
import useUserRemainTokensClaim from '../../BuyToken/hooks/useUserRemainTokensClaim';
import useDetectClaimConfigApplying from '../../BuyToken/hooks/useDetectClaimConfigApplying';
import { numberWithCommas } from '../../../utils/formatNumber';
import Button from '../../../components/Base/Button';

type ClaimTokenProps = {
  releaseTime: Date | undefined;
  ableToFetchFromBlockchain: boolean | undefined;
  buyTokenSuccess: boolean | undefined;
  disableAllButton: boolean;
  poolDetails: any;
  currencyName: any;
  startBuyTimeInDate: any;
  width: any;
  isPreOrderPool?: boolean;
  allowUserBuyPreOrder?: boolean;
  startBuyTimeNormal: any;
  maximumBuy: string | number;
};

const tickIcon = '/images/icons/tick_claim.svg';

const ClaimToken: React.FC<ClaimTokenProps> = (props: ClaimTokenProps) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const [openClaimModal, setOpenClaimModal] = useState<boolean>(false);
  const [userPurchased, setUserPurchased] = useState<number>(0);
  const [userClaimInfo, setUserClaimInfo] = useState<any>();

  const { account: connectedAccount } = useWeb3React();
  const {
    releaseTime,
    poolDetails,
    buyTokenSuccess,
    disableAllButton,
    currencyName,
    startBuyTimeInDate,
    isPreOrderPool,
    allowUserBuyPreOrder,
    startBuyTimeNormal,
    maximumBuy,
  } = props;

  const { networkAvailable, tokenDetails, poolAddress, id: poolId, campaignClaimConfig } = poolDetails;

  const maxAllocation = new BigNumber(maximumBuy ?? 0);

  const nowTime = new Date();
  const { claimToken, setClaimTokenLoading, transactionHash, claimTokenSuccess, loading, error } = useTokenClaim(
    poolAddress,
    poolId
  );
  const { retrieveClaimableTokens } = useUserRemainTokensClaim(tokenDetails, poolAddress, networkAvailable);

  // const availableClaim = releaseTime ? nowTime >= releaseTime : false;

  useEffect(() => {
    const fetchUserPurchased = async () => {
      if (connectedAccount && poolAddress) {
        const userClaimInformations = await retrieveClaimableTokens(connectedAccount);
        dispatch(updateUserClaimInfo(userClaimInformations));
        setUserClaimInfo(userClaimInformations);

        //user purchased remain
        setUserPurchased((userClaimInformations?.userPurchasedReturn || 0) as number);
      }
    };

    fetchUserPurchased();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, poolAddress, claimTokenSuccess, buyTokenSuccess]);

  useEffect(() => {
    if (error) {
      setOpenClaimModal(false);
      setClaimTokenLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const userPurchasedValue = userClaimInfo?.userPurchased || 0;
  const userClaimed = userClaimInfo?.userClaimed || 0;
  const { currentClaim, currentClaimIndex, nextClaim, nextClaimIndex, maximumTokenClaimUtilNow } =
    useDetectClaimConfigApplying(poolDetails, userPurchasedValue, userClaimed);

  const validateClaimable = () => {
    if (new BigNumber(userPurchased).lte(0)) {
      dispatch(alertFailure('You not enough claimable token!'));
      return false;
    }

    // if (!availableClaim) {
    //   dispatch(alertFailure("You can not claim token at current time!"));
    //   return false;
    // }

    if (nextClaim && new BigNumber(maximumTokenClaimUtilNow).lte(0)) {
      dispatch(alertFailure('Please wait until the next milestone to claim the tokens.'));
      return false;
    }

    if (
      !nextClaim &&
      new BigNumber(maximumTokenClaimUtilNow).lte(0) // maximumTokenClaimUtilNow <= 0
    ) {
      dispatch(alertFailure('You not enough claimable token!'));
      return false;
    }

    if (disableAllButton) {
      dispatch(alertFailure('Please switch to correct network before Claim!'));
      return false;
    }
    return true;
  };

  const handleTokenClaim = async () => {
    if (!validateClaimable()) {
      return;
    }
    try {
      setOpenClaimModal(true);
      await claimToken();
    } catch (err) {
      setOpenClaimModal(false);
    }
  };

  const [progress, setProgress] = useState([
    {},
    { percent: 100, marked: true, tokenAmount: 10000, date: new Date(), showInfo: true, maxPercent: 100 },
  ]);

  const [policy, setPolicy] = useState('');

  useEffect(() => {
    const userPurchased = userClaimInfo?.userPurchased || 0;
    const userClaimed = userClaimInfo?.userClaimed || 0;
    const percentClaimed = (userClaimed / userPurchased) * 100;

    //max_percent_claim
    let percent = 0;
    //last max_percent_claim
    let lastMaxPercent = 0;

    //caculated next claiming stage
    let nextClaim = campaignClaimConfig?.reduce((next: number, cfg: any) => {
      return +cfg.max_percent_claim <= percentClaimed ? next + 1 : next;
    }, 0);
    
    const config = campaignClaimConfig?.map((cfg: any, index: number) => {
      percent = +cfg.max_percent_claim;

      //show percent in progress
      const showPercent = +cfg.max_percent_claim + lastMaxPercent;
      lastMaxPercent = lastMaxPercent + +cfg.max_percent_claim;
      
      let date = null;
      let tokenAmount = null;
      date = new Date(cfg.start_time * 1000);
      tokenAmount = (showPercent / 100) * userPurchased;
      const marked = showPercent <= percentClaimed ;
      const showInfo = index === 0 || index === campaignClaimConfig?.length - 1 || index === nextClaim;
      return { percent: showPercent, tokenAmount, date, marked, showInfo, maxPercent: percent };
    });

    if (config) {
      config.unshift({
        percent: 0,
        date: new Date(campaignClaimConfig[0]?.start_time * 1000),
        tokenAmount: (+campaignClaimConfig[0]?.max_percent_claim / 100) * userPurchased,
        marked: config[0].marked,
      });

      setProgress(config);
    }

    //calculate policy
    //TODO: get policy from backend
    let policy =
      poolDetails?.claimPolicy ||
      'You can claim all tokens after ' +
        convertTimeToStringFormat(new Date(campaignClaimConfig[campaignClaimConfig?.length - 1]?.start_time * 1000));
    setPolicy(policy);
    // eslint-disable-next-line
  }, [poolDetails, userClaimInfo]);

  if (!startBuyTimeInDate || nowTime < startBuyTimeInDate) {
    return <></>;
  }

  // Check with PreOrder Pool
  if (isPreOrderPool && startBuyTimeNormal) {
    if (nowTime < startBuyTimeNormal) {
      if (!allowUserBuyPreOrder) {
        return <></>;
      }
    }
  }

  return (
    <div className={styles.poolDetailClaim}>
      <div className={styles.poolDetailClaimTitle}>Token Claim</div>

      <ClaimInfo
        poolDetails={poolDetails}
        tokenDetails={tokenDetails}
        userClaimInfo={userClaimInfo}
        releaseTime={releaseTime}
        currentClaim={currentClaim}
        currentClaimIndex={currentClaimIndex}
        nextClaim={nextClaim}
        nextClaimIndex={nextClaimIndex}
        maximumTokenClaimUtilNow={maximumTokenClaimUtilNow}
        policy={policy}
        currencyName={currencyName}
        maximumBuy={maxAllocation}
      />

      <ul className={styles.poolDetailClaimProgress}>
        <li className={`first-item ${progress[0]?.marked ? 'active' : ''}`}>
          <Tooltip
            title={
              <div>
                <p className={styles.toolTipClaim}>
                  You can claim {progress[0]?.percent}% more after{' '}
                  {progress[0]?.date && convertTimeToStringFormat(progress[0]?.date)}
                </p>
              </div>
            }
          >
            <div className="mark">{progress[0]?.marked && <img src={tickIcon} alt="" />}</div>
          </Tooltip>
          <div className="info">
            <div>{progress[0]?.percent || 0}%&nbsp;</div>
          </div>
        </li>
        {progress.slice(1, progress.length - 1).map((item, index) => {
          return (
            <li
              key={index}
              style={{ flex: `${item.maxPercent ? item.maxPercent / 10 : 2} 1 0` }}
              className={`item ${item.marked || (index === 0 && progress[0].marked) ? 'active' : ''} ${
                progress.length === 2 ?? 'solo'
              }`}
            >
              <Tooltip
                title={
                  <div>
                    <p className={styles.toolTipClaim}>
                      You can claim {item.percent}% more after{' '}
                      {progress[index + 1]?.date && convertTimeToStringFormat(progress[index + 2]?.date)}
                    </p>
                  </div>
                }
              >
                <div className="mark">{item.marked && <img src={tickIcon} alt="" />}</div>
              </Tooltip>

              <div
                className={`info ${
                  item.showInfo && !isWidthDown('xs', props.width) && progress.length > 2 ? 'show' : ''
                }`}
              >
                  <div>{numberWithCommas(item?.percent + '', 1)}%</div>
              </div>
            </li>
          );
        })}
        <li
          className={`item ${progress[progress.length - 1]?.marked ? 'active' : ''}`}
          style={{ flex: `${(progress[progress.length - 1]?.maxPercent || 0) / 10} 1 0` }}
        >
          <div className="mark">{progress[progress.length - 1]?.marked && <img src={tickIcon} alt="" />}</div>
          <div className="info">
            <div>{progress[progress.length - 1]?.percent || 0}% ({numberWithCommas(userClaimInfo?.userPurchased.toString())} {tokenDetails?.symbol})</div>
          </div>
        </li>
      </ul>

      <Button
        style={{ marginTop: 8 }}
        label={'Claim Tokens'}
        loading={loading}
        onClick={handleTokenClaim}
        className={styles.claimBtn}
        disabled={userClaimed === userClaimInfo?.userPurchased}
      />

      <TransactionSubmitModal
        opened={openClaimModal}
        handleClose={() => {
          setOpenClaimModal(false);
          setClaimTokenLoading(false);
        }}
        transactionHash={transactionHash}
        networkAvailable={networkAvailable}
      />
    </div>
  );
};

export default withWidth()(ClaimToken);
