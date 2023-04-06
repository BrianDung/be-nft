import { MintTimeLine } from 'constants/mint';
import { useMintBeNft } from 'hooks/useMintBeNft';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import instance from 'services/axios';
import { unixToDate } from 'utils/convertDate';
import Countdown from '../Countdown';
import MintFormContainer from '../MintForm';
import SoldProgress from '../SoldProgress';
import { useStyles } from './style';

interface Props {
  countDownDate?: Date | undefined;
}
const InfoLandingPage = (props: Props) => {
  const styles = useStyles();
  // price with sale state
  const [nftPrice, setNftPrice] = useState<number | string>(0);
  const [maxSwapIndex, setMaxSwapIndex] = useState<number>(0);
  const [currentSwapIndex, setCurrentSwapIndex] = useState<number>(0);
  const [maxSupply, setMaxSupply] = useState<number>(0);
  const [mintedCount, setMintedCount] = useState<number>(0);
  const [timeServer, setTimeServer] = useState<number>(0);
  const { account } = useWeb3ReactLocal();
  const [numberNftSwaped, setNumerNftSwaped] = useState<number>(0);
  const [mintState, setMintState] = useState<boolean>(false);

  // be nft

  const [saleState, setSaleState] = useState<number>(-1);
  const {
    getSaleStage,
    getSwapCurrentIndex,
    getMaxSwapIndex,
    getMaxSupply,
    getNftPrice,
    getMintedNftCount,
    getSwapTokensCount,
    getMintState,
  } = useMintBeNft();
  const startWLTime = process.env.REACT_APP_START_WL_TIME;

  useEffect(() => {
    getSaleStage()
      .then((saleState) => {
        setSaleState(saleState);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMaxSupply()
      .then((start) => {
        setMaxSupply(start);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSwapCurrentIndex()
      .then((current) => {
        setCurrentSwapIndex(current);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMaxSwapIndex()
      .then((max) => {
        setMaxSwapIndex(max);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getNftPrice()
      .then((price) => {
        setNftPrice(price);
      })
      .catch((error: any) => {
        console.error(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (account) {
      getMintedNftCount(account)
        .then((end) => {
          setMintedCount(end);
        })
        .catch((error: any) => {
          console.error(error.message);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    getTimeServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (account) {
      getSwapTokensCount(account).then((number) => {
        setNumerNftSwaped(number);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const getTimeServer = async () => {
    const response = await instance.get(`current-time`);
    response.data && setTimeServer(response?.data?.data);
  };

  useEffect(() => {
    getMintState().then((data) => {
      setMintState(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTitle = () => {
    switch (saleState) {
      case MintTimeLine.NotSet:
        return 'Whitelist Round';
      case MintTimeLine.WLMintPhase1:
        return 'Whitelist Round 1';
      case MintTimeLine.WLMintPhase2:
        return 'Whitelist Round 2';
      case MintTimeLine.WLMintPhase3:
        return 'Whitelist Round 3';
      case MintTimeLine.PublicMint:
        return 'Public Round';
      default: {
        return 'Public Round';
      }
    }
  };

  const publicTime = unixToDate(process.env.REACT_APP_START_PUBLIC_SALE as string);

  const isLiveSoon = useMemo(() => {
    return saleState < MintTimeLine.WLMintPhase1 || (mintState && moment().isBefore(publicTime));
  }, [saleState, mintState, publicTime]);

  return (
    <div className={styles.xborgPageWrapper}>
      <div className={styles.timer}>
        <div className={styles.roundInfo}>
          <p className={styles.roundType}>{mintState ? 'Minting Round' : renderTitle()}</p>
          {isLiveSoon ? (
            <p className={styles.deActiveStatus}>Live soon</p>
          ) : (
            <p className={styles.activeStatus}>
              Live <p className="blinkDot"></p>
            </p>
          )}
        </div>
        {saleState === MintTimeLine.NotSet && startWLTime && (
          <Countdown currentDate={timeServer} startDate={startWLTime} />
        )}
      </div>
      <SoldProgress
        maxSupply={maxSupply}
        currentSwapIndex={currentSwapIndex}
        maxSwap={maxSwapIndex}
        saleState={saleState}
      />
      <MintFormContainer
        saleState={saleState}
        nftPrice={nftPrice}
        maxSwapIndex={maxSwapIndex}
        currentSwapIndex={currentSwapIndex}
        mintedCount={mintedCount}
        numberNftSwaped={numberNftSwaped}
        mintState={mintState}
      />
    </div>
  );
};

export default InfoLandingPage;
