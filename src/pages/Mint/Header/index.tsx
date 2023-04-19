import { Button } from 'components/Base/Form/Button';
import { SummitedModal } from 'components/Base/Modal/ModalSummited';
import { SUPPORTED_WALLETS } from 'constants/connectors';
import useAuth from 'hooks/useAuth';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import instance from 'services/axios';
import { alert } from 'store/actions/alert';
import { AccountPopup } from '../AccountPopup/AccountPopup';
import { ConnectWalletModal } from './ConnectWalletModal';
import { useStyles } from './style';

const logoIcon = '/images/dashboard/icon-logo.svg';
// const logoMobile = '/images/dashboard/icon-logo-mobile.svg';
const logoMobileShort = '/images/dashboard/icon-logo-mobile-2.png';

function formatAddress(address: string) {
  if (!address) {
    return '';
  }

  const suffix = address.substring(0, 8);
  const prefix = address.slice(address.length - 8);

  return `${suffix}...${prefix}`;
}

const HeaderPage = () => {
  const [openAccount, setOpenAccount] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);
  const [submittedOpen, setSubmittedOpen] = useState(false);

  const classes = useStyles();
  const { isAuth } = useAuth();
  const { balance, account, walletName } = useWeb3ReactLocal();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  const connectWallet = () => {
    setOpenWallet(true);
  };

  const handleSubmited = async (value: string) => {
    if (value) {
      const response = await instance.post(`addwhitelist-user`, {
        wallet_address: value,
      });

      const message = response.data.message;
      dispatch(alert(message));
    }
  };

  const isMobile = useMemo(() => {
    return width < 550;
  }, [width]);

  const renderPC = () => {
    return (
      <>
        <Button className="connect-btn" onClick={() => setSubmittedOpen(true)}>
          Wallet Submit
        </Button>
        {isAuth ? (
          <>
            <div className={classes.accountInfo} onClick={() => setOpenAccount(true)}>
              <div className={`${classes.accountInfo}__networks`}>
                <img src="/images/newPage/ETH.svg" alt="" style={{ width: 25, height: 25 }} />
                <p>{formatAddress(account)}</p>
              </div>
            </div>
          </>
        ) : (
          <Button className="connect-btn" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </>
    );
  };

  const renderMobile = () => {
    return (
      <>
        {isAuth ? (
          <>
            <div className={classes.accountInfo} onClick={() => setOpenAccount(true)}>
              <div className={`${classes.accountInfo}__networks`}>
                <img src="/images/newPage/ETH.svg" alt="" style={{ width: 25, height: 25 }} />
                <p>{formatAddress(account)}</p>
              </div>
            </div>
          </>
        ) : (
          <Button className="connect-btn" onClick={connectWallet} style={{ marginBottom: 10 }}>
            Connect Wallet
          </Button>
        )}
        <Button className="connect-btn" onClick={() => setSubmittedOpen(true)}>
          Wallet Submit
        </Button>
      </>
    );
  };

  return (
    <header className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logoField}>
          <Link to={'/'}>
            {width >= 960 ? (
              <img alt="logo-icon" src={logoIcon} style={{ width: '11vw' }} />
            ) : account ? (
              <img alt="logo-icon" src={logoMobileShort} width={100} height={48} style={{ marginTop: -20 }} />
            ) : (
              <img alt="logo-icon" src={logoMobileShort} style={{ marginTop: -20 }} />
            )}
          </Link>
        </div>
        <div className={classes.pageHeader} style={isMobile ? { flexDirection: 'column' } : {}}>
          {isMobile ? renderMobile() : renderPC()}
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
      {submittedOpen && (
        <SummitedModal
          visible={submittedOpen}
          title="SUBMIT YOUR WALLET ADDRESS"
          onSubmited={handleSubmited}
          onCancel={() => setSubmittedOpen(false)}
        />
      )}
    </header>
  );
};

export default HeaderPage;
