import { BorderOutline } from '../BorderOutline';
import Countdown from '../Countdown';
import MintForm from '../MintForm';
import SoldProgress from '../SoldProgress';
import { useStyles } from './style';
interface Props {
  countDownDate?: Date | undefined;
}
const InfoLandingPage = (props: Props) => {
  const { countDownDate } = props;
  const styles = useStyles();
  const active = 1;

  return (
    <div className={styles.xborgPageWrapper}>
      <div className={styles.timer}>
        <BorderOutline>
          <div className={styles.roundInfo}>
            <p className={styles.roundType}>Pre-Sale Round</p>
            {active ? (
              <p className={styles.activeStatus}>
                Live <p className="blinkDot"></p>
              </p>
            ) : (
              <p className={styles.deActiveStatus}>Live soon</p>
            )}
          </div>
        </BorderOutline>
        <Countdown startDate={countDownDate} />
      </div>

      <SoldProgress />
      <div>
        <span className={styles.priceBigSize}>0.08 ETH</span>
        <span className={styles.priceMediumSize}>/ NFT</span>
      </div>
      <MintForm maxAllow={9} disabled={false} />
    </div>
  );
};

export default InfoLandingPage;
