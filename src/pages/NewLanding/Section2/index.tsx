import { useStyles } from './style';
import Grid from '@material-ui/core/Grid';

const Section2 = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item sm={5} className={classes.imageFieldGrid}>
          <div className={classes.imageField}>
            <img style={{ width: '100%', height: '100%' }} alt="Card" src="/images/newLanding/listCard.svg" />
          </div>
        </Grid>
        <Grid item sm={7}>
          <div className={classes.textField}>
            <h3>What is Xborg</h3>
            <p>
              XBorgs’ are a genesis collection of 6,000 NFTs (non-fungible tokens) on Ethereum blockchain and brand
              mascot of VISPX.
            </p>
            <p>Our NFTs are made up of hundreds of hand-drawn exciting visual traits that make them unique.</p>
            <p>
              The objective of the XBorg NFT is to allow users the opportunity to access our launchpad IDOs & IGOs and
              to unlock exclusive benefits.
            </p>
            <p>
              Owning XBorg allows you to vote for community-driven features, new onboarding projects and events. This
              makes our roadmap dynamic and adaptable.
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Section2;
/*What is Xborg

XBorgs’ are a genesis collection of 6,000 NFTs (non-fungible tokens) on Ethereum blockchain and brand mascot of VISPX. 

Our NFTs are made up of hundreds of hand-drawn exciting visual traits that make  them unique. 

The objective of the XBorg NFT is to allow users the opportunity to access our launchpad IDOs & IGOs and to unlock exclusive benefits. 

Owning XBorg allows you to vote for community-driven features, new onboarding projects and events. This makes our roadmap dynamic and adaptable.
*/
