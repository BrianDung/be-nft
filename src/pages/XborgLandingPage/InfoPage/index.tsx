import { MintTimeLine } from 'constants/mint';
import useFetch from 'hooks/useFetch';
import { useMint } from 'hooks/useMint';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unixToDate } from 'utils/convertDate';
import { BorderOutline } from '../BorderOutline';
import Countdown from '../Countdown';
import MintFormContainer from '../MintForm';
import SoldProgress from '../SoldProgress';
import { useStyles } from './style';
interface Props {
  countDownDate?: Date | undefined;
}
const InfoLandingPage = (props: Props) => {

  const styles = useStyles();
  const [currentTimeline, setCurrentTimeline] = useState<MintTimeLine>(MintTimeLine.SaleRound);

  const { checkTimeline } = useMint();
  const dispatch = useDispatch();

  const { data: currentTime } = useFetch<any>(`/current-time`);

  const startPreSaleTime = process.env.REACT_APP_START_PRE_SALE_TIME;
  
  useEffect(() => {
    checkTimeline()
      .then((data) => {
        setCurrentTimeline(data);
      })
      .catch((error) => {
        dispatch(alert(error.message));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.xborgPageWrapper}>
      <div className={styles.timer}>
        <BorderOutline>
          <div className={styles.roundInfo}> <p className={styles.roundType}>{currentTimeline === MintTimeLine.PublicSaleRound ? 'Public sale round' : 'Pre-Sale Round'}</p>
            {currentTimeline === MintTimeLine.PreSaleRound ? (
              <p className={styles.deActiveStatus}>Live soon</p>
            ) : (
              <p className={styles.activeStatus}>
                Live <p className="blinkDot"></p>
              </p>
            )}
          </div>
        </BorderOutline>
        {currentTimeline === MintTimeLine.SaleRound && startPreSaleTime && <Countdown currentDate={new Date(currentTime)} startDate={unixToDate(startPreSaleTime)} />}
      </div>

      <SoldProgress />
      <div>
        <span className={styles.priceBigSize}>0.08 ETH</span>
        <span className={styles.priceMediumSize}>/ NFT</span>
      </div>
      <MintFormContainer />
    </div>
  );
};

export default InfoLandingPage;
