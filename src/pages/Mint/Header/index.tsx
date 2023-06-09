import useAuth from 'hooks/useAuth';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useState } from 'react';
import { AccountPopup } from '../AccountPopup/AccountPopup';
import { useStyles } from './style';
import { Button } from 'components/Base/Form/Button';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { Link } from 'react-router-dom';
import { ConnectWalletModal } from './ConnectWalletModal';
import { SUPPORTED_WALLETS } from 'constants/connectors';

const logoIcon = '/images/dashboard/icon-logo.svg';
const logoMobile = '/images/dashboard/icon-logo-mobile.svg';
const logoMobileShort = '/images/dashboard/icon-logo-mobile-2.png';

function formatAddress(address: string) {
  if (!address) {
    return '';
  }

  const suffix = address.substring(0, 6);
  const prefix = address.slice(address.length - 3);

  return `${suffix}...${prefix}`;
}

const HeaderPage = () => {
  const [openAccount, setOpenAccount] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);

  const classes = useStyles();
  const { isAuth } = useAuth();
  const { balance, account, walletName } = useWeb3ReactLocal();
  const { width } = useWindowDimensions();

  const connectWallet = () => {
    setOpenWallet(true);
  };

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logoField}>
          <Link to={'/'}>
            {width >= 960 ? (
              <img alt="logo-icon" src={logoIcon} style={{ width: '11vw' }} />
            ) : account ? (
              <img alt="logo-icon" src={logoMobileShort} width={38} height={48} />
            ) : (
              <img alt="logo-icon" src={logoMobile} />
            )}
          </Link>
        </div>
        <div className={classes.pageHeader}>
          {isAuth ? (
            <>
              <div onClick={() => setOpenAccount(true)} className={classes.accountInfo}>
                <img alt="eth" src="/images/newPage/ETH.svg" />
              </div>
              <div className={classes.accountInfo} onClick={() => setOpenAccount(true)}>
                <div className={`${classes.accountInfo}__networks`}>
                  <img src="/images/icons/wallet_icon.svg" alt="" />
                  <p>{formatAddress(account)}</p>
                </div>
                <p className={`${classes.accountInfo}__balance`}>{balance ?? 0} ETH</p>
              </div>
            </>
          ) : (
            <Button className="connect-btn" onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
      {openAccount && (
        <AccountPopup
          wallet={SUPPORTED_WALLETS[walletName.toUpperCase()]}
          open={openAccount}
          onClose={() => {
            setOpenAccount(false);
          }}
          rawAddress={account ?? ''}
          balance={balance}
          walletAddress={formatAddress(account)}
        />
      )}
      {openWallet && (
        <ConnectWalletModal
          open={openWallet}
          onClose={() => {
            setOpenWallet(false);
          }}
        />
      )}
    </header>
  );
};

export default HeaderPage;
