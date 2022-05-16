import { Checkbox, Dialog, FormHelperText, Button } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-wallets';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ConnectorNames, connectorsSupportByNetwork, SUPPORTED_WALLETS } from '../../../../constants/connectors';
import {
  appNetworkType,
  APP_NETWORKS,
  APP_NETWORKS_NAME,
  ETH_CHAIN_ID,
  POLYGON_CHAIN_ID,
  SOLANA_CHAIN_ID,
} from '../../../../constants/network';
import { isMetaMaskInstalled } from '../../../../services/web3';
import { SupportSolanaWallet } from '../../../../utils/solana/sollet/interface';
import { ConnectNetworkBox } from './ConnectWalletBox/ConnectNetworkBox';
import ConnectWalletBox from './ConnectWalletBox/ConnectWalletBox';
import { ComponentProps, ContentSection, DialogContent, DialogTitle } from '../Modal';
import useStyles from './style';
import { useSolana } from '../../../../hooks/useSolana';
import useAuth from '../../../../hooks/useAuth';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { isPhantomInstalled, isSolletInstalled } from 'services/solana';
import { ERROR_CODE } from 'constants/solana';

const WALLET_INSTALL: Record<string, string> = {
  [ConnectorNames.MetaMask]: 'https://metamask.io/download/',
  [WalletName.Phantom]: 'https://phantom.app/download',
  [WalletName.SolletExtension]: 'https://chrome.google.com/webstore/detail/sollet/fhmfendgdocmcbmfikdcogofphimnkno',
};

const ConnectWalletModal: React.FC<ComponentProps> = ({ opened, handleClose }: ComponentProps) => {
  const { appChainID } = useSelector((state: any) => state.appNetwork).data;
  const { select, wallet, ready, connect, publicKey, connected: solanaConnected, connecting } = useWallet();
  const { login: solanaLogin } = useSolana();
  const { connectWallet: web3ConnectWallet, walletName, login: w3Login, account, connected } = useWeb3ReactLocal();
  const styles = useStyles();
  const { isAuth } = useAuth();

  const [downloadLink, setDownloadLink] = useState<any>();
  const [termsAgree, setTermsAgree] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const connectorsByNetwork = (() => {
    switch (appChainID) {
      case POLYGON_CHAIN_ID:
        return connectorsSupportByNetwork[APP_NETWORKS_NAME.POLYGON];
      case ETH_CHAIN_ID:
        return SUPPORTED_WALLETS;
      default:
        return connectorsSupportByNetwork[APP_NETWORKS_NAME.SOLANA];
    }
  })();

  function checkExtensionAvailable(walletName: string) {
    if (walletName === ConnectorNames.MetaMask && !isMetaMaskInstalled()) {
      return false;
    }

    if (walletName === WalletName.Phantom && !isPhantomInstalled()) {
      return false;
    }

    if (walletName === WalletName.SolletExtension && !isSolletInstalled()) {
      return false;
    }

    return true;
  }

  const handleCheckTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAgree(event.target.checked);
  };

  // Connect to solana network before login
  function connectSolana() {
    connect().catch(() => {
      setAuthenticating(false);
    });
  }

  function solanaAuthen() {
    return solanaLogin()
      .then((result: boolean) => {
        if (!result) {
          return;
        }

        handleClose();
      })
      .catch((error) => {
        if(error.code === ERROR_CODE.USER_REJECT) {
          handleClose(ERROR_CODE.USER_REJECT);
        }
      })
      .finally(() => {
        setAuthenticating(false);
      });
  }

  // Handle solana wallet connect
  function connectSolanaWallet(name: SupportSolanaWallet) {
    if (name !== wallet?.name) {
      select(name);
      return;
    }

    if (ready && solanaConnected) {
      solanaAuthen();
      return;
    }

    connectSolana();
  }

  // Handle another wallet login
  function web3Login() {
    return w3Login()
      .then((result: boolean) => {
        if (!result) {
          return;
        }

        handleClose();
      })
      .catch((error) => {
        if(error.code === ERROR_CODE.USER_REJECT) {
          handleClose(ERROR_CODE.USER_REJECT);
        }
      })
      .finally(() => {
        setAuthenticating(false);
      });
  }

  // Connect to web3 wallet before login
  function connectWeb3Wallet(wallet: string, connector: AbstractConnector) {
    if (connected && account && wallet === walletName) {
      web3Login();
      return;
    }

    web3ConnectWallet(connector, wallet).catch((e) => {
      setAuthenticating(false);
    });
  }

  // When wallet has been selected
  useEffect(() => {
    if (!termsAgree || !ready) {
      return;
    }

    connectSolana();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  // If solana wallet connected => login
  useEffect(() => {
    if (!ready || !solanaConnected || !publicKey || !authenticating) {
      return;
    }

    solanaAuthen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, solanaConnected, publicKey]);

  // If web3 wallet has been connected => login
  useEffect(() => {
    if (!connected || !account || !authenticating) {
      return;
    }

    web3Login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, connected]);

  function connectWallet(name: string | SupportSolanaWallet, connector: AbstractConnector) {
    setDownloadLink('');
    const isAvailable = checkExtensionAvailable(name);

    if (!isAvailable) {
      setDownloadLink(WALLET_INSTALL[name ?? '']);
      return;
    }

    setAuthenticating(true);
    if (appChainID === SOLANA_CHAIN_ID) {
      connectSolanaWallet(name as SupportSolanaWallet);
      return;
    }

    connectWeb3Wallet(name, connector);
  }

  useEffect(() => {
    if (isAuth) {
      handleClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const walletLoading = connecting || authenticating;

  return (
    <Dialog open={opened} onClose={handleClose} className={styles.dialog}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose} customClass={styles.dialogTitle}>
        Connect Wallet
      </DialogTitle>
      <DialogContent dividers>
        <ContentSection title="1. Accept" className={styles.dialogPrivacy}>
          <Checkbox
            checked={termsAgree}
            onChange={handleCheckTerm}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            className={styles.dialogCheckbox}
            icon={<img src="/images/icons/unchecked-box.svg" alt="" />}
            checkedIcon={<img src="/images/icons/checked-box.svg" alt="" />}
          />
          <span className={styles.dialogPrivacyText}>
            I read and accept the&nbsp;
            <Link className={styles.dialogPrivacyHighlight} to="/terms" target="_blank">
              Terms of Service&nbsp;
            </Link>
            and&nbsp;
            <Link className={styles.dialogPrivacyHighlight} to="/privacy" target="_blank">
              Privacy Policy&nbsp;
            </Link>
          </span>
        </ContentSection>
        <ContentSection title="2. Choose Network" className={styles.dialogNetworks}>
          {Object.keys(APP_NETWORKS).map((key: string) => {
            const network = APP_NETWORKS[key as appNetworkType];
            return <ConnectNetworkBox termsAgree={termsAgree} key={key} appNetwork={network} />;
          })}
        </ContentSection>
        <ContentSection title="3. Choose Wallet" className={styles.dialogNetworks}>
          {Object.keys(connectorsByNetwork).map((key: string) => {
            const network = connectorsByNetwork[key];
            const isSolanaWallet = network.name === ConnectorNames.Phantom || network.name === ConnectorNames.Sollet;
            const currentWallet: any = isSolanaWallet ? wallet?.name ?? '' : walletName;

            return (
              <ConnectWalletBox
                key={key}
                wallet={network}
                connectWalletLoading={walletLoading}
                walletName={currentWallet}
                termsAgree={termsAgree}
                onConnectWallet={connectWallet}
                disabled={authenticating}
              />
            );
          })}
        </ContentSection>
        {downloadLink && (
          <div className={styles.error}>
            <FormHelperText error={true}>
              <img src="/images/icons/circle-infor.svg" alt="" /> Unavailable extension.
            </FormHelperText>
            <Button variant="outlined" color="secondary" href={downloadLink} target="_blank" rel="noreferrer">
              Install Now
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default withWidth()(ConnectWalletModal);
