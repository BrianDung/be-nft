/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import SchedulerByTierDialog from '../../SchedulerByTierDialog';
import { useStyles } from './style';
import { convertUnixTimeToDateTime } from '../../../../utils/convertDate';
const iconLinkWeb = '/images/icons/icon-website.svg';
const iconTelegram = '/images/icons/icon-telegram.svg';
const iconTwitter = '/images/icons/icon-twitter.svg';
const iconLink = '/images/icons/icon-link.svg';

const PoolDetails = (props: any) => {
  const styles = useStyles();
  const { poolDetails } = props;
  const [isOpenSheduler, setOpenScheduler] = useState<boolean>(false);

  // const onViewReleaseSchedule = () => {
  //   setOpenScheduler(true);
  // };

  const onCloseScheduler = () => {
    setOpenScheduler(false);
  };

  return (
    <>
      <div className={styles.poolDetails}>
        <div className={styles.flexDetails}>
          <div className={styles.boxToken}>
            <div className={styles.flexbox}>
              <p className={styles.text}>Token Swap Time:</p>
              <p className={styles.description}>
                {poolDetails?.startBuyTime ? convertUnixTimeToDateTime(poolDetails?.startBuyTime) : 'TBA'}
              </p>
            </div>
            <div className={styles.flexbox}>
              <p className={styles.text}>Type:</p>
              <p className={styles.description}>{poolDetails?.type}</p>
            </div>
            <div className={styles.flexbox}>
              <p className={styles.text}>Website:</p>
              <a 
                className={styles.description}
                target="_blank"
                href={poolDetails?.website}
                rel="noreferrer"
              >
                {poolDetails?.website}
                <img className={styles.image} src={iconLinkWeb} alt="iconLinkWeb" />
              </a>
            </div>
            <div className={styles.flexbox}>
              <p className={styles.text}>Token Claim Time:</p>
              <p className={styles.description}>
                {poolDetails?.campaignClaimConfig[0]?.start_time_formated || "TBA"}
              </p>
            </div>
          </div>
          <div className={styles.boxLink}>
            {/* <div className={styles.flexbox}>
              <p className={styles.text}>Schedule by Tiers:</p>
              <a className={styles.textLink} onClick={onViewReleaseSchedule}>
                Click here to see details
              </a>
            </div> */}
            <div className={styles.flexbox}>
              <p className={styles.text}>Total Raise:</p>
              <p className={styles.description}>{poolDetails?.totalSoldCoin * poolDetails?.ethRate} $</p>
            </div>
            <div className={styles.flexbox}>
              <p className={styles.text}>Lock Schedule;</p>
              <a className={styles.textLink} href={poolDetails?.lockSchedule} target="_blank" rel="noreferrer">
                View token release schedule
              </a>
            </div>
            <div className={styles.flexbox}>
              <p className={styles.text}>Social:</p>
              <p className={styles.description}>
                <a
                  target="_blank"
                  href={poolDetails?.socialNetworkSetting?.telegram_link}
                  className={styles.image}
                  rel="noreferrer"
                >
                  <img className={styles.image} src={iconTelegram} alt="iconLinkWeb" />
                </a>
                <a
                  target="_blank"
                  href={poolDetails?.socialNetworkSetting?.twitter_link}
                  className={styles.image}
                  rel="noreferrer"
                >
                  <img className={styles.image} src={iconTwitter} alt="iconLinkWeb" />
                </a>
                <a
                  target="_blank"
                  href={poolDetails?.socialNetworkSetting?.medium_link}
                  className={styles.image}
                  rel="noreferrer"
                >
                  <img className={styles.image} src={iconLink} alt="iconLinkWeb" />
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.borderBottom}></div>
        <p className={styles.textInfo}>Project Information:</p>
        <div className={styles.boxDes}>
          <p className={styles.textDescription}>{poolDetails?.description}</p>
        </div>
      </div>
      <SchedulerByTierDialog isOpen={isOpenSheduler} closeSchedulerByTier={onCloseScheduler} />
    </>
  );
};
export default PoolDetails;
