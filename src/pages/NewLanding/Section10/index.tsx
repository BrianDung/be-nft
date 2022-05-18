import { Grid } from '@material-ui/core';
import Header from '../Components/Header';
import { useStyles } from './style';

const Section10 = () => {
  const classes = useStyles();
  return (
    <section className={classes.container}>
      <Header content="Partners" />
      <Grid container direction="column" spacing={4}>
        <Grid item container>
          <Grid item xs={12} md>
            <div className={classes.member}>
              <div className={`${classes.imgField}__img`}>
                <img className={classes.img} src="/images/newLanding/partner/partner-1.png" alt="partner" />
              </div>
              <p className={classes.name}>ROGUE SHIFT</p>
            </div>
          </Grid>
          <Grid item xs={12} md>
            <div className={classes.member}>
              <div className={`${classes.imgField}__img`}>
                <img className={classes.img} src="/images/newLanding/partner/partner-2.png" alt="partner" />
              </div>
              <p className={classes.name}>METAPOPIT</p>
            </div>
          </Grid>
          <Grid item xs={12} md>
            <div className={classes.member}>
              <div className={`${classes.imgField}__img`}>
                <img className={classes.img} src="/images/newLanding/partner/partner-6.jpg" alt="partner" />
              </div>
              <p className={classes.name}>DEGEN PASS</p>
            </div>
          </Grid>
          <Grid item xs={12} md>
            <div className={classes.member}>
              <div className={`${classes.imgField}__img`}>
                <img className={classes.img} src="/images/newLanding/partner/partner-3.png" alt="partner" />
              </div>
              <p className={classes.name}>METAVOLUTION</p>
            </div>
          </Grid>
          <Grid item xs={12} md>
            <div className={classes.member}>
              <div className={`${classes.imgField}__img`}>
                <img className={classes.img} src="/images/newLanding/partner/partner-5.png" alt="partner" />
              </div>
              <p className={classes.name}>SLEEPY SNIPER SOCIETY</p>
            </div>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={12}>
            <div className={classes.member}>
              <div className={classes.imgFieldLogistics}>
                <img className={classes.imgLogistics} src="/images/newLanding/partner/partner-4.png" alt="partner" />
              </div>
              <p className={classes.name}>ILLOGICS</p>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

export default Section10;
