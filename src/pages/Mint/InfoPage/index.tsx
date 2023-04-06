import { MintTimeLine } from 'constants/mint';
import { useMint } from 'hooks/useMint';
import { useMintBeNft } from 'hooks/useMintBeNft';
import { useEffect, useState } from 'react';
import instance from 'services/axios';
// import { BorderOutline } from '../BorderOutline';
import Countdown from '../Countdown';
import MintFormContainer from '../MintForm';
import SoldProgress from '../SoldProgress';
import { useStyles } from './style';
interface Props {
  countDownDate?: Date | undefined;
}
const InfoLandingPage = (props: Props) => {
  const styles = useStyles();
  const [currentTimeline, setCurrentTimeline] = useState<MintTimeLine>(-1);
  // price with sale state
  const [rate, setRate] = useState<number | string>(0);
  const [maxMintIndex, setMaxMintIndex] = useState<number>(0);
  const [currentMintIndex, setCurrentMintIndex] = useState<number>(0);
  const [startMintIndex, setStartMintIndex] = useState<number>(0);
  const [endMintIndex, setEndMintIndex] = useState<number>(0);
  const [timeServer, setTimeServer] = useState<number>(0);

  // be nft

  const [saleState, setSaleState] = useState<number>(-1);
  const { getMaxMintIndex, getCurrentMintIndex, getEndMintIndex, getMintInfo, getStartMintIndex } = useMint();
  const { getSaleStage } = useMintBeNft();
  const startPreSaleTime = process.env.REACT_APP_START_PRE_SALE_TIME;

  useEffect(() => {
    getSaleStage()
      .then((saleState) => {
        setSaleState(saleState);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getStartMintIndex()
      .then((start) => {
        console.log('START MINT INDEX', start);
        setStartMintIndex(start);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCurrentMintIndex()
      .then((current) => {
        console.log('CURRENT MINT INDEX', current);
        setCurrentMintIndex(current);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMaxMintIndex()
      .then((max) => {
        console.log('MAX MINT INDEX', max);
        setMaxMintIndex(max);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMintInfo()
      .then((data) => {
        const { status, rate } = data;
        console.log('MINT INFO:', { status, rate });
        setCurrentTimeline(status);
        setRate(rate);
      })
      .catch((error: any) => {
        console.error(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getEndMintIndex()
      .then((end) => {
        console.log('END MINT INDEX:', end);
        setEndMintIndex(end);
      })
      .catch((error: any) => {
        console.error(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTimeServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTimeServer = async () => {
    const response = await instance.get(`current-time`);
    response.data && setTimeServer(response?.data?.data);
    console.log('TIME SERVER', response?.data?.data);
  };

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

  return (
    <div className={styles.xborgPageWrapper}>
      <div className={styles.timer}>
        {/* <BorderOutline> */}
        <div className={styles.roundInfo}>
          <p className={styles.roundType}>{renderTitle()}</p>
          {saleState < MintTimeLine.WLMintPhase1 ? (
            <p className={styles.deActiveStatus}>Live soon</p>
          ) : (
            <p className={styles.activeStatus}>
              Live <p className="blinkDot"></p>
            </p>
          )}
        </div>
        {/* </BorderOutline> */}
        {saleState === MintTimeLine.NotSet && startPreSaleTime && (
          <Countdown currentDate={timeServer} startDate={startPreSaleTime} />
        )}
      </div>
      <SoldProgress startMintIndex={startMintIndex} currentMintIndex={currentMintIndex} maxMintIndex={maxMintIndex} />
      <MintFormContainer
        saleState={saleState}
        currentTimeline={currentTimeline}
        rate={rate}
        endMintIndex={endMintIndex}
        maxMintIndex={maxMintIndex}
        currentMintIndex={currentMintIndex}
        timeServer={timeServer}
        startMintIndex={startMintIndex}
      />
    </div>
  );
};

export default InfoLandingPage;
