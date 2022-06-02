import { useStyles } from './style';
import styles from './style.module.scss';
import Button from '@material-ui/core/Button';
import Countdown from '../../Mint/Countdown';
import useFetch from 'hooks/useFetch';
import { unixToDate } from 'utils/convertDate';

const OpenSeaIcon = () => {
  return (
    <span>
      <img alt="Opensea Icon" src="/images/newLanding/openseaIcon.svg"></img>
    </span>
  );
};
const Section1 = () => {
  const classes = useStyles();
  const { data: currentTime } = useFetch<any>(`current-time`);
  const startPublicSaleTime = process.env.REACT_APP_START_PRE_SALE_TIME;

  return (
    <section className={styles.section1}>
      <div className={classes.texthedear}>
        <p className={`${classes.title} ${styles.textXborg}`}>XBorg</p>
        <p className={classes.name}>A Powerhouse Utility NFT</p>
      </div>
      {startPublicSaleTime ? (
        <div className={styles.bigContainer}>
          <div className={classes.countDownField}>
            {startPublicSaleTime && unixToDate(startPublicSaleTime) > new Date(currentTime) && <Countdown currentDate={currentTime} startDate={startPublicSaleTime} landingPage />}
          </div>
          <div className={`${classes.container} ${styles.container}`}>
            <div className={styles.buttonItem}>
              <Button
                className={classes.buttonTheMint}
                style={{ textTransform: 'none' }}
                onClick={() => window.open('https://mint.vispx.io/','_self')}
              >
                The Mint
              </Button>
            </div>
            <div className={styles.buttonItem}>
              <Button  onClick={()=>window.open('https://opensea.io/collection/xborg-nft')} className={classes.buttonOpensea} style={{ textTransform: 'none' }} startIcon={<OpenSeaIcon />}>
                Opensea
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${classes.container} ${styles.container}`}>
          <div className={styles.buttonItem}>
            <Button
              className={classes.buttonTheMint}
              style={{ textTransform: 'none' }}
              onClick={() => window.open('https://mint.vispx.io/', '_self')}
            >
              The Mint
            </Button>
          </div>
          <div className={styles.buttonItem}>
            <Button className={classes.buttonOpensea} style={{ textTransform: 'none' }} startIcon={<OpenSeaIcon />}>
              Opensea
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Section1;
