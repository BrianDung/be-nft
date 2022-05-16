import React from 'react';
import { useStyles } from './style';

const logoIcon = '/images/dashboard/icon-logo.svg';
const iconNetworks = '/images/newPage/ethereum-active.svg'; 

const HeaderPage = () => {
  const classes = useStyles();
  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logoField}>
          <img alt="logo-icon" src={logoIcon} />
        </div>
        <div className={classes.pageHeader}>
            <div className={`${classes.logNetworks} ${classes.networks} `}>
                <img style={{width:'20px',height:'20px'}} src={iconNetworks} alt='iconNetworks' />
            </div>
            <div className={`${classes.logNetworks} ${classes.balance} `}>
                <button className={classes.textbalance}>Connect wallet</button>
            </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
