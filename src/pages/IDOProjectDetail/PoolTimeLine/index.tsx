import { useEffect, useMemo, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { convertTimeToStringFormat, unixToDate } from '../../../utils/convertDate';
import { PoolStatus, poolStatus } from '../../../utils/getPoolStatus';
import Countdown from '../../../components/Base/Countdown';
import useStyles from './styles';
import { ClickAwayListener, Hidden } from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment';

interface PoolTimeLineProps {
  currentStatus?: poolStatus | undefined;
  display: string | undefined;
  poolDetails: any;
  countDownDate: Date | undefined;
  soldProgress: string;
}

interface StatusBarStep {
  name: string;
  active: string;
  tooltip: string;
}

const checkIcon = 'images/icons/check-icon.svg';

// eslint-disable-next-line
export default (props: PoolTimeLineProps) => {
  const { display, poolDetails, countDownDate, soldProgress } = props;

  const [avtiveTooltTip, setAvtiveTooltTip] = useState(-1);
  const styles = useStyles();
  const joinTimeInDate = poolDetails?.startRegisterTime ? unixToDate(poolDetails?.startRegisterTime) : undefined;
  const startBuyTimeInDate = poolDetails?.startBuyTime ? unixToDate(poolDetails?.startBuyTime) : undefined;
  const endBuyTime = _.get(poolDetails, 'endBuyTime', undefined);

  const claimTimeStart = poolDetails?.campaignClaimConfig[0]?.start_time
    ? unixToDate(poolDetails?.campaignClaimConfig[0]?.start_time)
    : undefined;
  const currentStatus = _.get(poolDetails, 'campaignStatus', 'TBA');
  const now = moment();

  const statusBarStepsInit: StatusBarStep[] = [
    {
      name: 'Upcoming',
      active: 'Upcoming',
      tooltip: `This status is displayed before the pool is opened for swapping. 
                You must register to join the pool.<br/> 
                ${`Registration begins: <span>${
                  joinTimeInDate ? convertTimeToStringFormat(joinTimeInDate) : 'TBA'
                }</span>`}`,
    },
    {
      name: 'Swap',
      active: 'Swap',
      tooltip: `You can start buying Tokens when the pool is changed to Swap status.<br/> 
                ${`Token Swap Time: <span>${
                  startBuyTimeInDate ? convertTimeToStringFormat(startBuyTimeInDate) : 'TBA'
                }</span>`}`,
    },
    {
      name: 'Public sell',
      active: 'Public_Sell',
      tooltip: '<span>You can buy more Tokens when the project is in Public Sell status.</span>',
    },
    {
      name: 'Claimable',
      active: 'Claimable',
      tooltip: `You can claim your purchased tokens when the pool has Claimable status.<br/> 
      <span>${
        claimTimeStart
          ? `Token claim time: ${convertTimeToStringFormat(claimTimeStart)}`
          : `Token Claim time will be annouced soon.`
      }</span>`,
    },
    {
      name: 'Ended',
      active: 'Ended',
      tooltip: `The pool will become End after users have claimed their Tokens.`,
    },
  ];

  const startFreeUnix = poolDetails?.freeBuyTimeSetting?.start_buy_time;

  const startFreeBuyTime = useMemo(() => (startFreeUnix ? unixToDate(startFreeUnix) : undefined), [startFreeUnix]);

  const timeline = useMemo(() => {
    const isEndSwap =
      (poolDetails?.campaignStatus === PoolStatus.Progress || poolDetails?.campaignStatus === PoolStatus.PublicSell) &&
      now.isAfter(endBuyTime * 1000);

    return statusBarStepsInit
      .map((item) => {
        if (isEndSwap && item.active === PoolStatus.Progress) {
          return {
            ...item,
            tooltip: 'Swap ended. Please wait to claim your Tokens',
          };
        }

        if (!startFreeBuyTime && item.active === PoolStatus.PublicSell) {
          return null;
        }

        return item;
      })
      .filter((item): item is StatusBarStep => !!item); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startFreeBuyTime, endBuyTime, poolDetails, soldProgress]);
 

  const onClickOutItemTooltip = (index: number) => {
    console.log(index);
    // if(index !== avtiveTooltTip) {
    //   setOpenToolTip(true)
    // }
  };

  const renderMessage = () => {
    switch (currentStatus) {
      case PoolStatus.TBA:
        if(poolDetails?.startRegisterTime && now.isBefore(poolDetails?.startRegisterTime * 1000)) {
          return 'Registration Starts Soon ';
        } 
        return;
      case PoolStatus.Upcoming:
        return 'Registration Successful';
      case PoolStatus.Progress:
        if (now.isAfter(endBuyTime * 1000)) {
          return 'Swap ends';
        }
        return;
      case PoolStatus.Filled:
        return 'Token swap ends';
      case PoolStatus.Claimable:
        return 'Pool is Claimable';
      case PoolStatus.Closed:
        return 'Pool is ended';
      default:
        return;
    }
  };
  const [currentStep, setCurrentStep] = useState<number>(1);
  // const [statusBarSteps, setStatusBarSteps] = useState<StatusBarStep[]>(statusBarStepsInit);

  useEffect(() => {
    setCurrentStep(timeline.findIndex((ele) => ele.active === currentStatus) + 1);
    // eslint-disable-next-line
  }, [currentStatus, timeline]);

  return (
    <section className={styles.sectionBuyTokenPoolTimeLine}>
      <h2 className={styles.title}>Pool Timeline</h2>
      <div className={styles.borderBottom}></div>
      <ul className={styles.statusBarSteps}>
        {timeline?.map((item, index) => {
          return (
            <li
              key={index}
              className={`${styles.itemStatusBarSteps} ${item.active === currentStatus ? 'active' : ''}
                            ${index + 1 < currentStep ? 'checkedList' : ''}
                            `}
            >
              <Hidden mdUp>
                <ClickAwayListener onClickAway={() => onClickOutItemTooltip(index)}>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={() => setAvtiveTooltTip(-1)}
                    open={avtiveTooltTip === index}
                    disableTouchListener
                    title={
                      <span>
                        <div className={styles.nameToolTip}>{item.name}</div>
                        <div className={styles.desToolTip} dangerouslySetInnerHTML={{ __html: item.tooltip }}></div>
                      </span>
                    }
                    classes={{ tooltip: styles.customToolTip }}
                    placement="bottom-start"
                  >
                    <span
                      onClick={() => setAvtiveTooltTip(index)}
                      className={`${styles.itemValue} ${item.active === currentStatus ? 'active' : ''}`}
                    >
                      {index + 1 < currentStep ? <img src={checkIcon} alt="checkIcon" /> : index + 1}
                    </span>
                  </Tooltip>
                </ClickAwayListener>
              </Hidden>

              <Hidden smDown>
                <Tooltip
                  title={
                    <span>
                      <div className={styles.nameToolTip}>{item.name}</div>
                      <div className={styles.desToolTip} dangerouslySetInnerHTML={{ __html: item.tooltip }}></div>
                    </span>
                  }
                  classes={{ tooltip: styles.customToolTip }}
                  placement="bottom"
                >
                  <span className={`${styles.itemValue} ${item.active === currentStatus ? 'active' : ''}`}>
                    {index + 1 < currentStep ? <img src={checkIcon} alt="checkIcon" /> : index + 1}
                  </span>
                </Tooltip>
              </Hidden>
              <span className={`${styles.itemName} ${item.active === currentStatus ? 'active' : ''} itemName`}>
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>

      <h2 className={styles.title2}>{display}</h2>
      {display ? (
        <Countdown startDate={countDownDate} />
      ) : (
        <>
          <span className={styles.erroCountdown}>{renderMessage()}</span>
        </>
      )}
    </section>
  );
};

// export default BuyTokenPoolTimeLine;
