import { Input } from 'antd';
import { useState } from 'react';
import Countdown from '../Countdown';
import { useStyles } from './style';
interface Props {
  countDownDate?: Date | undefined;
}
const InfoLandingPage = (props: Props) => {
  const { countDownDate } = props;
  const styles = useStyles();
  const [count, setCount] = useState(1);

  return (
    <div className={styles.InfoPage}>
      <img src="/images/newPage/xborg.svg" alt="xborg" />
      <p className={styles.description}>
        Welcome to the VispX NFT collection powered by the brand mascot, XBORG. Holding the Xborg NFTs, unlock a
        Powerhouse of Benefits never seen bẻoe in the Launchpad Arena.
      </p>
      <Countdown startDate={countDownDate} />
      <p className={styles.name}>Public Sale Live</p>
      <div className={styles.formControl}>
        <div className={styles.boxNumber}>
          <Input className={styles.input} value={count} />
          <button className={styles.quantity}
            onClick={() => setCount(count <= 1 ? 1 : count - 1)}
          >
            -
          </button>
        </div>
        <button className={styles.quantitysum} 
          onClick={() => setCount(count >= 5 ? 5 : count + 1)}
        >
          +
        </button>
      </div>
      <div className={styles.boxMint}>
        <button className={styles.nameMint}>MINT</button>
      </div>
    </div>
  );
};

export default InfoLandingPage;
