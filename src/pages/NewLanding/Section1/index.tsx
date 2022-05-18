import { useStyles } from './style';
import styles from './style.module.scss';
import Button from '@material-ui/core/Button';

const OpenSeaIcon = () => {
  return (
    <span>
      <img alt="Opensea Icon" src="/images/newLanding/openseaIcon.svg"></img>
    </span>
  );
};
const Section1 = () => {
  const classes = useStyles();

  return (
    <section className={styles.section1}>
      <div className={classes.texthedear}>
        <p className={classes.title}>XBorg</p>
        <p className={classes.name}>Powerhouse Utility NFT</p>
      </div>
      <div className={`${classes.container} ${styles.container}`}>
        <div className={styles.buttonItem}>
          <Button className={classes.buttonTheMint} style={{ textTransform: 'none' }}>
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
