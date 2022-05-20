import { Input } from 'antd';
import { useState } from 'react';
import Countdown from '../Countdown';
import SoldProgress from '../SoldProgress';
import { useStyles } from './style';
interface Props {
  countDownDate?: Date | undefined;
}
const InfoLandingPage = (props: Props) => {
  const { countDownDate } = props;
  const styles = useStyles();
  const [count, setCount] = useState(1);

  return (
    <div className={styles.xborgPageWrapper}>
      {/* <img src="/images/newPage/xborg.svg" alt="xborg" />
      <p className={styles.description}>
        Welcome to the VispX NFT collection powered by the brand mascot, XBORG. Holding the Xborg NFTs, unlock a
        Powerhouse of Benefits never seen before in the Launchpad Arena.
      </p>
      <Countdown startDate={countDownDate} />
      <p className={styles.name}>Public Sale Live</p>
      <div className={styles.saleActions}>
      <div className={styles.formControl}>
        <div className={styles.boxNumber}>
          <Input className={styles.input} value={count} />
          <button className={styles.quantity}
            style={{cursor: `${count <=1 ? 'not-allowed' :'pointer'}`}}
            onClick={() => setCount(count <= 1 ? 1 : count - 1)}
          >
            -
          </button>
        </div>
        <button className={styles.quantitysum} 
         style={{cursor: `${count >=5 ? 'not-allowed' :'pointer'}`}}
          onClick={() => setCount(count >= 5 ? 5 : count + 1)}
        >
          +
        </button>
      </div>
      <div className={styles.boxMint}>
        <button className={styles.nameMint}>MINT</button>
      </div>
      </div> */}
      <div className={styles.nftImage}>
        Image here
      </div>
      <div className={styles.pageInfo}>
        <SoldProgress/>
        <p>
        <span className={styles.priceBigSize}>0.08 ETH</span>
        <span className={styles.priceMediumSize}>/Per NFT</span>
      </p>
      </div>
     
    </div>
  );
};

export default InfoLandingPage;
