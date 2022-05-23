import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './style';

const logoIcon = '/images/dashboard/icon-logo-new.svg';
const twitterIcon = '/images/newLanding/twitterIcon.svg';
const discordIcon = '/images/newLanding/discordIcon.svg';
const websiteIcon = '/images/newLanding/websiteIcon.svg';
const twitterLink = 'https://twitter.com/VispX_official';
const discordLink = 'https://discord.com/invite/vispx';
const websiteLink = 'https://vispx.io/';

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logoField}>
          <Link to={'/'}>
            <img alt="logo-icon" src={logoIcon} />
          </Link>
        </div>
        <div className={classes.linkField}>
          <div className={classes.linkItem}>
            <a href={twitterLink} target="blank">
              <img src={twitterIcon} alt="twitterIcon" />
            </a>
          </div>
          <div className={classes.linkItem}>
            <a href={discordLink} target="blank">
              <img src={discordIcon} alt="discordIcon" />
            </a>
          </div>
          <div className={classes.linkItem}>
            <a href={websiteLink} target="blank">
              <img src={websiteIcon} alt="websiteIcon" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
