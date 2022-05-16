import { useEffect, useState } from 'react';
import { ETH_CHAIN_ID, POLYGON_CHAIN_ID } from '../../../constants/network';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { diffDate, inTime, unixTime, unixToDate } from '../../../utils/convertDate';
import { PoolStatus } from '../../../utils/getPoolStatus';
import useStyles from './styles';

const poolImage = '/images/pool_circle.svg';
const greenDot = '/images/icons/green_dot.svg';

interface IDOProjectHeaderProps {
  poolDetailsMapping: any;
  poolDetails: any;
}

// eslint-disable-next-line
const IDOProjectHeader = (props: IDOProjectHeaderProps) => {
  const { poolDetailsMapping, poolDetails } = props;

  const styles = useStyles();
  // const [copiedAddress, setCopiedAddress] = useState(false);
  // const navHeader = useState(poolDetailsMapping);

  const [, setDisableAllButton] = useState<boolean>(false);
  const { appChainID } = useTypedSelector((state) => state.appNetwork).data;

  useEffect(() => {
    let appNetwork;
    switch (appChainID) {
      case POLYGON_CHAIN_ID:
        appNetwork = 'polygon';
        break;
      case ETH_CHAIN_ID:
        appNetwork = 'eth';
        break;
    }

    setDisableAllButton(appNetwork !== poolDetails?.networkAvailable);
  }, [appChainID, poolDetails]);

  var minTierDisplay = poolDetailsMapping?.minTier?.display;
  // const TBAStatus =
  //   !poolDetails?.startRegisterTime &&
  //   !poolDetails?.endRegisterTime &&
  //   !poolDetails?.startBuyTime &&
  //   !poolDetails?.endBuyTime;
  const registerCowndown = poolDetails?.startRegisterTime ? inTime(unixToDate(poolDetails?.startRegisterTime)) : null;
  const launchCowndown = poolDetails?.startBuyTime ? inTime(unixToDate(poolDetails?.startBuyTime)) : null;
  const today = unixTime(new Date());

  const displayProjectStatus = () => {
    switch (poolDetails?.campaignStatus) {
      case PoolStatus.TBA:
        return 'TBA';
      case PoolStatus.Upcoming:
        if (!poolDetails?.startBuyTime) {
          return 'TBA';
        }
        if (today < poolDetails?.startRegisterTime) {
          if (diffDate(poolDetails?.startRegisterTime, today) < 1) {
            return <span>Registration in less than a day</span>;
          }
          return <span>Registration {registerCowndown}</span>;
        }
        if (today < poolDetails?.startBuyTime) {
          if (diffDate(poolDetails?.startBuyTime, today) < 1) {
            return <span>Launching in less than a day</span>;
          }
          return <span> Launch {launchCowndown}</span>;
        }
        return;
      case PoolStatus.Progress:
        return 'Swapping';
      case PoolStatus.Claimable:
        return 'Claimable';
      case PoolStatus.Closed:
        return 'Ended';
      default:
        return;
    }
  };

  return (
    <>
      <div className={`${styles.top}`}>
        <img className={styles.iconToken} src={poolDetails?.tokenImages || poolImage} alt="" />
        <h2 className={styles.title}>{poolDetails?.poolName}</h2>
      </div>

      {/* {poolDetails?.tokenDetails?.address && (
        <div className={styles.address}>
          <a
            target="_blank"
            href={getEtherscanTransactionAddress({
              appChainID: poolDetails?.networkAvailable,
              address: poolDetails?.tokenDetails?.address,
            })}
            rel="noreferrer"
          >
            {poolDetails?.tokenDetails?.address.slice(0, 9)}...
            {poolDetails?.tokenDetails?.address.slice(-8)}
          </a>

          <CopyToClipboard
            text={poolDetails?.tokenDetails?.address}
            onCopy={() => {
              setCopiedAddress(true);
              setTimeout(() => {
                setCopiedAddress(false);
              }, 2000);
            }}
          >
            {!copiedAddress ? (
              <img src={copyImage} alt="copy-icon" />
            ) : (
              <p style={{ color: "#6398FF", marginLeft: 10 }}>Copied</p>
            )}
          </CopyToClipboard>
        </div>
      )} */}

      <ul className={styles.navHeaderComponent}>
        <li className={styles.item}>
          <img className={styles.iconItem} src={`${poolDetailsMapping?.deposited?.image}`} alt="" />
          {poolDetailsMapping?.deposited?.display}
        </li>

        {/* <Hidden smDown> */}
        <li className={styles.item}>
          <img className={styles.iconItem} src={`${poolDetailsMapping?.minTier?.image}`} alt="" />
          {minTierDisplay ? minTierDisplay + ' at Min Tier' : 'Min Tier TBD'}
          {/* &nbsp;{(minTierDisplay !== "No tier & KYC required" && minTierDisplay !== 'No tier required') ?  : ""} */}
        </li>

        <li className={styles.item}>
          <img className={styles.iconItem} src={poolDetails?.networkIcon} alt="" />
          {(() => {
            switch (poolDetails?.networkAvailable) {
              case 'bsc':
                return 'Binance Smart Chain';
              case 'polygon':
                return 'Polygon';
              case 'eth':
              default:
                return 'Ethereum';
            }
          })()}
          {/* {poolDetails?.networkAvailable === 'eth' ? 'Ethereum' : 'Binance Smart Chain'} */}
        </li>
        {/* </Hidden> */}

        {/* <Hidden mdUp> */}
        {displayProjectStatus() && (
          <li className={styles.item}>
            <img className={styles.iconItem} src={greenDot} alt="" />
            {displayProjectStatus()}
          </li>
        )}
      </ul>

      {/*</section>*/}
    </>
  );
};

export default IDOProjectHeader;
