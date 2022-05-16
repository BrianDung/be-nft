import { Button } from 'components/Base/Form/Button';
import { formatDuration, formatTime } from 'constants/formatDate';
import { get } from 'lodash';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { withRouter } from 'react-router';
import { nFormatter } from 'utils/formatNumber';
import { ProgressBar } from '../ProgressBar';
import useStyles from './style';

const IMAGE = 'images/landing/NFTrade-1.png';
const clockIcon = 'images/landing/clock.svg';
const iconPolygon = '/images/icons/icon-header.svg';
const iconEthereum = '/images/ethereum-active.svg';
const iconSolana = '/images/solana-active.svg';
function getLabelCard(is_private: number) {
  switch (is_private) {
    case 0:
      return 'Public';
    case 1:
      return 'Private';
    default:
      return 'Community';
  }
}

function CardProject(props: any) {
  const styles = useStyles({ size: get(props, 'size', 'small'), isFlexStart: get(props, 'isFlexStart', false) });
  const [statusItem, setStatusItem] = useState({
    supported: false,
    launchIn: false,
    progressBar: false,
    swapEndsIn: false,
    publicSell: false,
    claimToken: false,
    swapNow: false,
    register: false,
  });

  const {
    id,
    campaign_status,
    is_private,
    network_available,
    total_sold_coin,
    token_conversion_rate,
    name,
    symbol,
    accept_currency,
    finish_time,
    start_join_pool_time,
    end_join_pool_time,
    banner,
    token_sold,
    start_time,
  } = get(props, 'data', {});
  // eslint-disable-next-line
  const exchangeRate = `1 ${symbol} = ${token_conversion_rate} ${accept_currency} `;
  // eslint-disable-next-line
  const TotalRaise = total_sold_coin * token_conversion_rate;
  useEffect(() => {
    if (campaign_status === 'Swap') {
      setStatusItem({
        ...statusItem,
        progressBar: true,
        swapNow: true,
        swapEndsIn: true,
      });
    } else if (campaign_status === 'Upcoming') {
      setStatusItem({
        ...statusItem,
        supported: true,
        register: true,
      });
    } else if (campaign_status === 'Public_Sell') {
      setStatusItem({
        ...statusItem,
        progressBar: true,
        publicSell: true,
      });
    } else if (campaign_status === 'Claimable') {
      setStatusItem({
        ...statusItem,
        progressBar: true,
        claimToken: true,
      });
    } else if (campaign_status === 'Ended') {
      setStatusItem({
        ...statusItem,
        progressBar: true,
        swapNow: false,
        swapEndsIn: false,
        launchIn: false,
      });
    } else if (campaign_status === 'Next_To_Launch') {
      setStatusItem({
        ...statusItem,
        progressBar: false,
        swapNow: false,
        swapEndsIn: false,
        launchIn: true,
        supported: true,
      });
    } else if (campaign_status === 'TBA') {
      setStatusItem({
        ...statusItem,
        supported: true,
        register: true,
      });
    } else {
      setStatusItem({
        ...statusItem,
        supported: true,
        register: true,
      });
    }
    // eslint-disable-next-line
  }, [campaign_status]);

  const percentSold = (parseFloat(token_sold) * 100) / parseFloat(total_sold_coin);
  const today = moment().unix();
  const { tabIndex } = props;
  const [text, setText] = useState('');
  const startjoinTimeInDate = parseInt(start_join_pool_time);
  const endJoinTimeInDate = parseInt(end_join_pool_time);
  const data = props?.data;
  const startPublicSellTime = parseInt(data?.freeBuyTimeSetting?.start_buy_time);
  const endPublicSellTime = parseInt(data?.freeBuyTimeSetting?.end_buy_time);
  const startClaimTime = parseInt(data?.campaignClaimConfig[0]?.start_time);
  const swapEndsTime = parseInt(data?.finish_time) - today;
  const LaunchInTime = parseInt(start_time) - today;
  //
  const duration = useMemo(() => {
    if (today < startjoinTimeInDate) {
      setText('starts');
      return today - startjoinTimeInDate;
    }
    if (endJoinTimeInDate > today) {
      setText('ends');
      return endJoinTimeInDate - today;
    }
  }, [today, startjoinTimeInDate, endJoinTimeInDate]);

  //
  const durationPublicSell = useMemo(() => {
    if (today < startPublicSellTime) {
      return today - startPublicSellTime;
    }
    if (endPublicSellTime > today) {
      return endPublicSellTime - today;
    }
  }, [today, startPublicSellTime, endPublicSellTime]);

  //
  const durationClaim = useMemo(() => {
    if (today < startClaimTime) {
      return today - startClaimTime;
    }
  }, [today, startClaimTime]);

  //
  const renderText = useMemo(() => {
    if (duration) {
      return `Registration ${text} in`;
    }
    if (LaunchInTime) {
      return 'Launch in';
    }
    return '';
  }, [duration, text, LaunchInTime]);

  const now = moment();
  const hasPublicSell = !!data?.freeBuyTimeSetting;
  const start_buy_time = data?.freeBuyTimeSetting?.start_buy_time;
  const end_buy_time = data?.freeBuyTimeSetting?.end_buy_time;
  const start_time_claim = data?.campaignClaimConfig[0]?.start_time;

  const renderTextInprogress = useMemo(() => {
    if (now.isAfter(formatTime(start_time)) && now.isBefore(formatTime(finish_time))) {
      return 'Swaps ends in';
    }

    if (hasPublicSell && now.isAfter(formatTime(finish_time)) && now.isBefore(formatTime(start_buy_time))) {
      return 'Public sell in';
    }

    if (hasPublicSell && now.isAfter(formatTime(start_buy_time)) && now.isBefore(formatTime(end_buy_time))) {
      return 'Public sell ends in';
    }

    // if (hasPublicSell && now.isAfter(formatTime(end_buy_time)) && now.isBefore(formatTime(start_time_claim))) {
    //   return 'Claim in';
    // }

    if (now.isAfter(formatTime(finish_time)) && now.isBefore(formatTime(start_time_claim))) {
      return 'Claim in';
    }

    if (now.isAfter(formatTime(start_time_claim))) {
      return '';
    }
  }, [now, start_time, finish_time, hasPublicSell, start_buy_time, end_buy_time, start_time_claim]);

  const renderButtonUpcomming = useMemo(() => {
    if ((!start_join_pool_time && !end_join_pool_time) || (!start_time && !finish_time)) {
      return <></>;
    }

    if (
      now.isBefore(start_join_pool_time) ||
      (now.isAfter(formatTime(start_join_pool_time)) && now.isBefore(formatTime(end_join_pool_time)))
    ) {
      return <></>;
    }
  }, [start_join_pool_time, end_join_pool_time, start_time, finish_time, now]);

  const renderButtonNextolaunch = useMemo(() => {
    if (now.isAfter(end_join_pool_time) && now.isBefore(start_time)) {
      return <></>;
    }
  }, [end_join_pool_time, start_time, now]);

  const renderButtonInProgress = useMemo(() => {
    if (now.isAfter(formatTime(start_time)) && now.isBefore(formatTime(finish_time))) {
      return <div className={`${styles.cardFooter}__btnSwap`}>Swap Now</div>;
    }

    if (hasPublicSell && now.isAfter(formatTime(finish_time)) && now.isBefore(formatTime(start_buy_time))) {
      return (
        <Button variant="outlined" shape="rounded" style={{ width: '100%' }}>
          Details
        </Button>
      );
    }

    if (hasPublicSell && now.isAfter(formatTime(start_buy_time)) && now.isBefore(formatTime(end_buy_time))) {
      return <div className={`${styles.cardFooter}__btnSwap`}>Swap Now</div>;
    }

    if (hasPublicSell && now.isAfter(formatTime(end_buy_time)) && now.isBefore(formatTime(start_time_claim))) {
      return (
        <Button variant="outlined" shape="rounded" style={{ width: '100%' }}>
          Details
        </Button>
      );
    }

    if (now.isAfter(formatTime(finish_time)) && now.isBefore(formatTime(start_time_claim))) {
      return (
        <Button variant="outlined" shape="rounded" style={{ width: '100%' }}>
          Details
        </Button>
      );
    }

    if (now.isAfter(formatTime(start_time_claim))) {
      return <div className={`${styles.cardFooter}__btnSwap`}>Claim Now</div>;
    }
  }, [now, start_time, finish_time, hasPublicSell, start_buy_time, end_buy_time, start_time_claim, styles.cardFooter]);

  const renderButtonEnded = useMemo(() => {
    return (
      <Button variant="outlined" shape="rounded" style={{ width: '100%' }}>
        Details
      </Button>
    );
  }, []);

  const renderButtonTabIndexAll = useMemo(() => {
    if (campaign_status === 'Upcomming' || campaign_status === 'TBA') {
      return renderButtonUpcomming;
    }
    if (campaign_status === 'Next_To_Launch') {
      return renderButtonNextolaunch;
    }
    if (campaign_status === 'Public_Sell' || campaign_status === 'Swap' || campaign_status === 'Claime') {
      return renderButtonInProgress;
    }
    if (campaign_status === 'Ended') {
      return renderButtonEnded;
    }
  }, [campaign_status, renderButtonUpcomming, renderButtonNextolaunch, renderButtonInProgress, renderButtonEnded]);

  const renderButtonTabIndex = (() => {
    switch (tabIndex) {
      case 0:
        return renderButtonUpcomming;
      case 1:
        return renderButtonNextolaunch;
      case 2:
        return renderButtonInProgress;
      case 3:
        return renderButtonEnded;
      default:
        return renderButtonTabIndexAll;
    }
  })();

  return (
    <div className={styles.cardContainer} onClick={() => props.history.push(`/deals/ido-projects/${id}`)}>
      <div className={`${styles.cardCoverImage}`}>
        <img
          className={`${styles.fallbackImage}`}
          src={banner || IMAGE}
          alt="cover"
          onError={(e: any) => (e.target.src = IMAGE)}
        />
        <span className={`${styles.cardCoverImage}--label`}>{getLabelCard(is_private)}</span>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardRow}>
          <span className={`${styles.cardContent}__tokenName`}>
            {name || 'N/A'}({symbol})
          </span>
          <span className={`${styles.cardRow}__right`}>
            <img
              className={`${styles.cardContent}__tokenLogo`}
              src={(() => {
                switch (network_available) {
                  case 'eth':
                    return iconEthereum;
                  case 'polygon':
                    return iconPolygon;
                  case 'sol':
                    return iconSolana;
                  default:
                    return IMAGE;
                }
              })()}
              alt="logo"
              onError={(e: any) => (e.target.src = IMAGE)}
            />
          </span>
        </div>
        <div className={styles.cardRow}>
          <span className={`${styles.cardRow}__left`}>Total Raise</span>
          {/* <span className={`${styles.cardRow}__right`}>${nFormatter(TotalRaise.toString()) ?? '-'}</span> */}
          <span className={`${styles.cardRow}__right`}>TBA</span>
        </div>
        <div className={styles.cardRow}>
          <span className={`${styles.cardRow}__left`}>EXCH Rate</span>
          {/* <span className={`${styles.cardRow}__right`}>{exchangeRate}</span> */}
          <span className={`${styles.cardRow}__right`}>TBA</span>
        </div>
        {campaign_status === 'Swap' && <div className={`${styles.cardRow} ${styles.cardLine}`}></div>}
        {campaign_status === 'Ended' && <div className={`${styles.cardRow} ${styles.cardLine}`}></div>}
        {campaign_status === 'Public_Sell' && <div className={`${styles.cardRow} ${styles.cardLine}`}></div>}
        {campaign_status === 'Claimable' && <div className={`${styles.cardRow} ${styles.cardLine}`}></div>}
        {statusItem.progressBar && (
          <>
            <div className={styles.cardRow}>
              <span className={`${styles.cardRow}__left`}>Progress</span>
              <span className={`${styles.cardRow}__right`}>
                <span className={`${styles.cardRow}__highlight`}>
                  ({percentSold}%){token_sold.replace('.00', '')}
                </span>
                <span>/{nFormatter(total_sold_coin)}</span>
              </span>
            </div>
            <div>
              <ProgressBar currentValue={parseFloat(token_sold)} totalValue={total_sold_coin} icon={<span />} />
            </div>
          </>
        )}
        {statusItem.supported && (
          <div className={`${styles.cardRow}`}>
            <span className={`${styles.cardRow}__left `}>Supported</span>
            <span className={`${styles.cardRow}__right`}>{accept_currency}</span>
          </div>
        )}
        {statusItem.swapEndsIn && (
          <div className={styles.cardRow}>
            <span className={`${styles.cardRow}__left `}>{renderTextInprogress}</span>
            <span className={`${styles.cardRow}__timeBox`}>
              <img src={clockIcon} alt="clock" />
              <span>{formatDuration(swapEndsTime * 1000)}</span>
            </span>
          </div>
        )}
        {statusItem.publicSell && (
          <div className={styles.cardRow}>
            <span className={`${styles.cardRow}__left `}>{renderTextInprogress}</span>
            <span className={`${styles.cardRow}__timeBox`}>
              <img src={clockIcon} alt="clock" />

              <span>{durationPublicSell && formatDuration(durationPublicSell * 1000)}</span>
            </span>
          </div>
        )}
        {statusItem.claimToken && (
          <div className={styles.cardRow}>
            <span className={`${styles.cardRow}__left `}>{renderTextInprogress}</span>
            {hasPublicSell && now.isAfter(formatTime(end_buy_time)) && now.isBefore(formatTime(start_time_claim)) && (
              <span className={`${styles.cardRow}__timeBox`}>
                <img src={clockIcon} alt="clock" />
                <span>{durationClaim && formatDuration(durationClaim * 1000)}</span>
              </span>
            )}
          </div>
        )}
        {campaign_status === 'Next_To_Launch' && <div className={`${styles.cardRow} ${styles.cardLine}`}></div>}
        {statusItem.launchIn && (
          <div className={`${styles.cardRow}`}>
            <span className={`${styles.cardRow}__left`}>{renderText}</span>
            <span className={`${styles.cardRow}__timeBox`}>
              <img src={clockIcon} alt="clock" />
              <span>{formatDuration(LaunchInTime * 1000)}</span>
            </span>
          </div>
        )}
        {campaign_status === 'Upcoming' && <div className={`${styles.cardRow} ${styles.cardLine}`}></div>}
        {campaign_status === 'TBA' && <div className={`${styles.cardRow} ${styles.cardLine}`}></div>}
        {statusItem.register && (
          <div className={`${styles.cardRow}`}>
            <span className={`${styles.cardRow}__left`}>{renderText}</span>
            <span className={`${styles.cardRow}__timeBox`}>
              <img src={clockIcon} alt="clock" />
              <span>{duration ? formatDuration(duration * 1000) : 'TBA'}</span>
            </span>
          </div>
        )}
        {renderButtonTabIndex}
      </div>
    </div>
  );
}

export default withRouter(CardProject);
