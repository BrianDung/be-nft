import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ETH_CHAIN_ID, POLYGON_CHAIN_ID } from '../../../constants/network';
import useStyles from "./styles";
import { Hidden } from "@material-ui/core";

const poolImage = "/images/pool_circle.svg";

interface HeaderPoolProps {
  poolDetailsMapping: any;
  poolDetails: any;
};

// eslint-disable-next-line
export default (props: HeaderPoolProps) =>{
  const { poolDetailsMapping, poolDetails } = props; 
  const styles = useStyles();
  // const [copiedAddress, setCopiedAddress] = useState(false);
  const navHeader = useState(poolDetailsMapping);
  const [, setDisableAllButton] = useState<boolean>(false);

  const { appChainID } = useTypedSelector(state => state.appNetwork).data;


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
  }, [appChainID, poolDetails])

  var minTierDisplay = navHeader[0]?.minTier?.display;

  var currentTime = new Date();
  var eventEndTime = new Date(Number(poolDetails?.startBuyTime) * 1000);
  var duration = eventEndTime.valueOf() - currentTime.valueOf();
  var durationShow = Math.ceil(duration / (1000 * 60 * 60 * 24));

  // console.log('durationShow', durationShow)

  return (
  <>
    {/*<section className={styles.headerComponent}>*/}

      <div className={`${styles.top}`} >
        <img
          className={styles.iconToken}
          src={poolDetails?.banner || poolImage}
          alt=""
        />
        <h2 className={styles.title}>{poolDetails?.title}</h2>
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
          <img
            className={styles.iconItem}
            src={`${navHeader[0]?.deposited?.image}`}
            alt=""
          />
          {navHeader[0]?.deposited?.display}
        </li>

        <Hidden smDown>
          <li className={styles.item}>
            <img
              className={styles.iconItem}
              src={`${navHeader[0]?.minTier?.image}`}
              alt=""
            />
            {minTierDisplay}
            &nbsp;{(minTierDisplay !== "No tier & KYC required" && minTierDisplay !== 'No tier required') ? "at Min Tier" : ""}
          </li>

          <li className={styles.item}>
            <img
              className={styles.iconItem}
              src={poolDetails?.networkIcon}
              alt=""
            />
            {
              (() => {
                switch(poolDetails?.networkAvailable) {
                  case 'bsc': 
                    return 'Binance Smart Chain';
                  case 'polygon':
                    return 'Polygon';
                  case 'eth':
                  default:
                    return 'Ethereum';
                }
              })()
            }
            {/* {poolDetails?.networkAvailable === 'eth' ? 'Ethereum' : 'Binance Smart Chain'} */}
          </li>
        </Hidden>

        <Hidden mdUp>
          <li className={styles.item}>
            <img
              className={styles.iconItem}
              src={poolDetails?.networkIcon}
              alt=""
            />
            {
              (() => {
                switch(poolDetails?.networkAvailable) {
                  case 'bsc': 
                    return 'Binance Smart Chain';
                  case 'polygon':
                    return 'Polygon';
                  case 'eth':
                  default:
                    return 'Ethereum';
                }
              })()
            }
          </li>
          <li className={styles.item}>
            <img
              className={styles.iconItem}
              src={`${navHeader[0]?.minTier?.image}`}
              alt=""
            />
            {minTierDisplay}
            &nbsp;{(minTierDisplay !== "No tier & KYC required" && minTierDisplay !== "No tier required") ? "at Min Tier" : ""}
          </li>
        </Hidden>

        {durationShow > 1 && (
          <li className={styles.item}>
            <img
              className={styles.iconItem}
              src="/images/icons/icon_launching.svg"
              alt=""
            />
            Launching in {durationShow} day
          </li>
        )}
      </ul>

    {/*</section>*/}
  </>
  );
};
