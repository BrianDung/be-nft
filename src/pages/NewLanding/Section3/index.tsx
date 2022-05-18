import Grid from '@material-ui/core/Grid';
import { useStyles } from './style';
import Header from '../Components/Header';
const Section3 = () => {
  const classes = useStyles();
  return (
    <section className={classes.container}>
      <Grid container direction="column">
        <Grid className={classes.headerItem}>
          <Header content="Supply" />
        </Grid>
        <Grid className={classes.imageField}>
          <div style={{maxWidth: '440px', width: '100%'}} className={classes.marginBottomImg}>
            <img style={{ width: '100%', height: '100%' }} alt="supply" src="/images/newLanding/supplyImage.svg" />
          </div>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid className={classes.headerItem}>
          <Header content="Distribution" />
        </Grid>
        <Grid className={classes.imageField}>
          <div>
            <img
              style={{ width: '100%', height: '100%' }}
              alt="distribution"
              src="/images/newLanding/distributionImage.png"
            />
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

export default Section3;
