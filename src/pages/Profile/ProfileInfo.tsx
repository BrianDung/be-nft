import { Tooltip } from '@material-ui/core';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useMemo, useState } from 'react';
import { useSelectedNetwork } from '../../hooks/useSelectedNetwork';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStyles from './styles';
import { Button } from '../../components/Base/Form/Button';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useSelector } from 'react-redux';
const iconCopy = '/images/icons/icon-copy.svg';
const iconPolygon = '/images/icons/icon-header.svg';
const iconEthereum = '/images/ethereum-active.svg';
const iconSolana = '/images/icons/icon-logo-solana.svg';
const iconDone = '/images/icons/icon-success-connect.svg';
const iconFail = '/images/icons/icon-error-connect.svg';
const iconKyc = '/images/icons/icon-unver.svg';
const iconNext = '/images/icons/icon-next.svg';
function formatAddress(address: string) {
  if (!address) {
    return '';
  }

  const suffix = address.substring(0, 6);
  const prefix = address.slice(address.length - 3);

  return `${suffix}...${prefix}`;
}

const useWindowResizeMobile = (inerWidth: number) => {
  const widthMobile = inerWidth || 575;
  const [isMobile, setIsMobile] = useState(window?.innerWidth < widthMobile);

  useEffect(() => {
    const windowResizeListener = window.addEventListener('resize', () => {
      setIsMobile(window?.innerWidth < widthMobile);
    });

    return () => window.removeEventListener('resize', windowResizeListener as any);
  }, [widthMobile]);

  return [isMobile];
};

const ProfileInfo = (props: any) => {
  const { isSelectedSolana } = useSelectedNetwork();
  const { account: addressMetamask } = useWeb3ReactLocal();
  const styles = useStyles();
  const { userPoint } = useSelector((state: any) => ({
    userPoint: state.global.userPoint,
  }));
  const { publicKey } = useWallet();
  const [isMobile] = useWindowResizeMobile(767);
  const addressSolana = publicKey?.toBase58() ?? '';
  const address = isSelectedSolana ? addressSolana : addressMetamask;
  const isConnectWalletMetamask = useMemo(() => {
    if (addressMetamask && addressMetamask.length > 0) {
      return true;
    }

    return false;
  }, [addressMetamask]);
  const isConnectWalletSolana = useMemo(() => {
    if (addressSolana && addressSolana.length > 0) {
      return true;
    }

    return false;
  }, [addressSolana]);

  return (
    <div className={styles.page}>
      <div className={styles.pageLeft}>
        <div className={styles.profile}>
          <p className={styles.textprofile}>My profile</p>
          <div className={styles.borderbottom}></div>
          <div className={styles.mywallet}>
            <p className={styles.walletaddress}>My wallet address:</p>
            <div className={styles.boxAddress}>
              <span className={styles.address}>{isMobile ? formatAddress(address) : address}</span>
              <img
                onClick={() => {
                  navigator.clipboard.writeText(address);
                  toast.success('Copied!', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}
                style={{ cursor: 'pointer' }}
                src={iconCopy}
                alt=""
              />
            </div>
            <ToastContainer />
            <div className={styles.borderbottom}></div>
            <div className={styles.flexbox}>
              <p className={styles.walletaddress}>KYC status:</p>
            </div>
            <div className={styles.flexKYC}>
              <div className={styles.boxUnver}>
                <img src={iconKyc} alt="" />
                <span className={styles.textunver}>Coming soon</span>
              </div>
              <Button
                variant="outlined"
                shape="rounded"
                endIcon={<img src={iconNext} alt="Kyc now" />}
                style={{ padding: '2px 28px', height: '28px' }}
              >
                KYC Now
              </Button>
            </div>
            <div className={styles.borderbottom}></div>
            <div className={styles.boxEmail}>
              <p className={styles.walletaddress}>Email address: </p>
              <div className={styles.boxAddress}>
                <span className={styles.address}></span>
              </div>
            </div>
            <div className={styles.borderbottom}></div>
            <div className={styles.boxEmail}>
              <p className={styles.walletaddress}>My point: </p>
              <div className={styles.boxAddress}>
                <span className={styles.address}>{userPoint}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wallet}>
          <p className={styles.textprofile}>Wallet details</p>
          <div className={styles.borderbottom}></div>
          <div className={styles.walletinfor}>
            <div className={styles.flexboxnetwork}>
              <div className={styles.flexWallet}>
                <div className={styles.flexImage}>
                  {!isConnectWalletMetamask ? (
                    <>
                      <img className={styles.imagenetwork} src={iconFail} alt="iconFail" />
                      <img className={styles.image} src={iconEthereum} alt="iconEthereum" />
                    </>
                  ) : (
                    <>
                      <img className={styles.imagenetwork} src={iconDone} alt="iconDone" />
                      <img className={styles.image} src={iconEthereum} alt="iconEthereum" />
                    </>
                  )}
                </div>
                <div className={styles.walletName}>
                  <p className={styles.walletaddress}>Ethereum</p>
                  {isConnectWalletMetamask && isMobile ? (
                    <Tooltip
                      title={addressMetamask}
                      placement="top"
                      arrow={true}
                      classes={{ tooltip: styles.customToolTip }}
                    >
                      <p className={styles.address}>
                        {isConnectWalletMetamask
                          ? isMobile
                            ? formatAddress(addressMetamask)
                            : addressMetamask
                          : 'Not Connected'}
                      </p>
                    </Tooltip>
                  ) : (
                    <p className={styles.address}>
                      {isConnectWalletMetamask
                        ? isMobile
                          ? formatAddress(addressMetamask)
                          : addressMetamask
                        : 'Not Connected'}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.borderbottom}></div>
              <div className={styles.flexWallet}>
                <div className={styles.flexImage}>
                  {!isConnectWalletMetamask ? (
                    <>
                      <img className={styles.imagenetwork} src={iconFail} alt="iconFail" />
                      <img className={styles.image} src={iconPolygon} alt="iconPolygon" />
                    </>
                  ) : (
                    <>
                      <img className={styles.imagenetwork} src={iconDone} alt="iconDone" />
                      <img className={styles.image} src={iconPolygon} alt="iconPolygon" />
                    </>
                  )}
                </div>
                <div className={styles.walletName}>
                  <p className={styles.walletaddress}>Polygon</p>
                  {isConnectWalletMetamask && isMobile ? (
                    <Tooltip
                      title={addressMetamask}
                      placement="top"
                      arrow={true}
                      classes={{ tooltip: styles.customToolTip }}
                    >
                      <p className={styles.address}>
                        {isConnectWalletMetamask
                          ? isMobile
                            ? formatAddress(addressMetamask)
                            : addressMetamask
                          : 'Not Connected'}
                      </p>
                    </Tooltip>
                  ) : (
                    <p className={styles.address}>
                      {isConnectWalletMetamask
                        ? isMobile
                          ? formatAddress(addressMetamask)
                          : addressMetamask
                        : 'Not Connected'}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.borderbottom}></div>
              <div className={styles.flexWallet}>
                <div className={styles.flexImage}>
                  {!isConnectWalletSolana ? (
                    <>
                      <img className={styles.imagenetwork} src={iconFail} alt="iconFail" />
                      <img className={styles.image} src={iconSolana} alt="iconSolana" />
                    </>
                  ) : (
                    <>
                      <img className={styles.imagenetwork} src={iconDone} alt="iconDone" />
                      <img className={styles.image} src={iconSolana} alt="iconSolana" />
                    </>
                  )}
                </div>
                <div className={styles.walletName}>
                  <p className={styles.walletaddress}>Solana</p>
                  {isConnectWalletSolana && isMobile ? (
                    <Tooltip
                      title={addressSolana}
                      placement="top"
                      arrow={true}
                      classes={{ tooltip: styles.customToolTip }}
                    >
                      <p className={styles.address}>
                        {isConnectWalletSolana
                          ? isMobile
                            ? formatAddress(addressSolana)
                            : addressSolana
                          : 'Not Connected'}
                      </p>
                    </Tooltip>
                  ) : (
                    <p className={styles.address}>
                      {isConnectWalletSolana
                        ? isMobile
                          ? formatAddress(addressSolana)
                          : addressSolana
                        : 'Not Connected'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
