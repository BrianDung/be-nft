import { Grid } from '@material-ui/core';
import Header from '../Components/Header';
import { useStyles } from './style';

const Section9 = () => {
  const classes = useStyles();
  return (
    <section className={classes.container}>
      <Header content="Core Team" />
      <Grid container spacing={4} className={classes.teamWrapper}>
        <Grid item sm={12} md={4}>
          <div className={classes.member}>
            <div className={`${classes.imgField}__img`}>
              <img className={classes.img} src="/images/newLanding/profile-1.png" alt="coreteam" />
            </div>
            <p className={classes.title}>Addy Singh </p>
            <span className={classes.name}>Co-Founder and CTO</span>
            <a href='https://twitter.com/cryptonite_lad' target="_blank" rel="noreferrer" className={classes.socialMedia}>
              <img src="/images/newLanding/icon-twiter.png" alt="" />
            </a>
          </div>
        </Grid>
        <Grid item sm={12} md={4}>
          <div className={classes.member}>
            <div className={`${classes.imgField}__img`}>
              <img className={classes.img} src="/images/newLanding/profile-2.png" alt="coreteam" />
            </div>
            <p className={classes.title}>Ash Harris </p>
            <span className={classes.name}>Co-founder and CEO</span>
            <a href='https://www.linkedin.com/in/ash-harris-25911426/' target="_blank" rel="noreferrer" className={classes.socialMedia}>
              <img src="/images/newLanding/icon-in.png" alt="" />
            </a>
          </div>
        </Grid>
        <Grid item sm={12} md={4}>
          <div className={classes.member}>
            <div className={`${classes.imgField}__img`}>
              <img className={classes.img} src="/images/newLanding/profile-3.png" alt="coreteam" />
            </div>
            <p className={classes.title}>Netina Beukes</p>
            <span className={classes.name}>Creative Director</span>
            <a href='https://instagram.com/rat_around' target="_blank" rel="noreferrer" className={classes.socialMedia}>
              <img src="/images/newLanding/white-insta.svg" alt="" />
            </a>
          </div>
        </Grid>
      </Grid>
    </section>
  );
};

export default Section9;
