import { MintTimeLine } from 'constants/mint';
import { useMint } from 'hooks/useMint';
import { useEffect, useState } from 'react';
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
  const [currentTimeline, setCurrentTimeline] = useState<MintTimeLine>(MintTimeLine.NotSet);
  const [rate, setRate] = useState<number | string>(0);

  const { getMintInfo } = useMint();

  const startPreSaleTime = process.env.REACT_APP_START_PRE_SALE_TIME;

  useEffect(() => {
    getMintInfo()
      .then((data) => {
        setCurrentTimeline(data.status);
        setRate(data.rate);
      })
      .catch((error: any) => {
        console.log(error.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.xborgPageWrapper}>
      <div className={styles.timer}>
        <BorderOutline>
          <div className={styles.roundInfo}>
            <p className={styles.roundType}>
              {currentTimeline === MintTimeLine.PublicSaleRound ? 'Public Sale Round' : 'Pre-Sale Round'}
            </p>
            {currentTimeline <= MintTimeLine.PreSaleRound ? (
              <p className={styles.deActiveStatus}>Live soon</p>
            ) : (
              <p className={styles.activeStatus}>
                Live <p className="blinkDot"></p>
              </p>
            )}
          </div>
        </BorderOutline>
        {currentTimeline === MintTimeLine.PreSaleRound && startPreSaleTime && (
          <Countdown currentDate={0} startDate={startPreSaleTime} />
        )}
      </div>
      <SoldProgress />
      <MintFormContainer currentTimeline={currentTimeline} rate={rate} />
    </div>
  );
};

export default InfoLandingPage;
