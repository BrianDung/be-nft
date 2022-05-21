import { useStyles } from './style';
import styles from './style.module.scss';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

const OpenSeaIcon = () => {
  return (
    <span>
      <img alt="Opensea Icon" src="/images/newLanding/openseaIcon.svg"></img>
    </span>
  );
};
const Section1 = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <section className={styles.section1}>
      <div className={classes.texthedear}>
        <p className={`${classes.title} ${styles.textXborg}`}>XBorg</p>
        <p className={classes.name}>A Powerhouse Utility NFT</p>
      </div>
      <div className={`${classes.container} ${styles.container}`}>
        <div className={styles.buttonItem}>
          <Button
            className={classes.buttonTheMint}
            style={{ textTransform: 'none' }}
            onClick={() => history.push('/mint')}
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
    </section>
  );
};

export default Section1;
