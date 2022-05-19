import useAuth from 'hooks/useAuth';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import React, { useEffect, useState } from 'react';
import { AccountPopup } from '../AccountPopup/AccountPopup';
import { useStyles } from './style';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ConnectorNames } from 'constants/connectors';
const logoIcon = '/images/dashboard/icon-logo.svg';
const iconNetworks = '/images/newPage/ethereum-active.svg';

function formatAddress(address: string) {
  if (!address) {
    return '';
  }

  const suffix = address.substring(0, 6);
  const prefix = address.slice(address.length - 3);

  return `${suffix}...${prefix}`;
}
const HeaderPage = (props: any) => {
  const { handleClose } = props;
  const classes = useStyles();
  const injected = new InjectedConnector({});
  const { isAuth } = useAuth();
  const {
    balance,
    connectWallet: web3ConnectWallet,
    login: w3Login,
    account,
    connected,
  } = useWeb3ReactLocal();
  const [openAccount, setOpenAccount] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  function web3Login() {
    return w3Login()
      .then((result: boolean) => {
        if (!result) {
          return;
        }

        handleClose();
      })
      .catch((error) => {
      })
      .finally(() => {
        setAuthenticating(false);
      });
  }
  const connectWeb3Wallet = () => {
    if (connected && account) {
      web3Login();
      return;
    }
    web3ConnectWallet(injected, ConnectorNames.MetaMask).catch((e) => {
      setAuthenticating(false);
    });
  };
  const connectWallet = () => {
    setAuthenticating(true);
    connectWeb3Wallet();
  };


  useEffect(() => {
    if (!connected || !account || !authenticating) {
      return;
    }

    web3Login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, connected]);

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logoField}>
          <img alt="logo-icon" src={logoIcon} />
        </div>
        <div className={classes.pageHeader}>
          <div className={`${classes.logNetworks} ${classes.networks} `}>
            <img style={{ width: '20px', height: '20px' }} src={iconNetworks} alt="iconNetworks" />
          </div>
          {isAuth ? (
            <div className={`${classes.logNetworks} ${classes.balance} `} onClick={() => setOpenAccount(true)}>
              <p className={classes.textbalance}>{balance} ETH</p>
            </div>
          ) : (
            <div className={`${classes.logNetworks} ${classes.balance} `}>
              <button className={classes.textbalance} onClick={connectWallet}>
                Connect wallet
              </button>
            </div>
          )}
        </div>
      </div>
      {openAccount && (
        <AccountPopup
          open={openAccount}
          onClose={() => {
            setOpenAccount(false);
          }}
          balance={balance}
          walletAddress={formatAddress(account)}
        />
      )}
    </header>
  );
};

export default HeaderPage;
