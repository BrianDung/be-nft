/* eslint-disable @typescript-eslint/no-unused-vars */

import { useWallet } from '@solana/wallet-adapter-react';
import { useMyPoint } from 'hooks/useMyPoint';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/Base/Form/Button';
import { APP_NETWORKS, APP_NETWORKS_NAME, APP_NETWORKS_SUPPORT, ETH_CHAIN_ID } from '../../../constants/network';
import useAuth from '../../../hooks/useAuth';
import { useSelectedNetwork } from '../../../hooks/useSelectedNetwork';
import { useSolana } from '../../../hooks/useSolana';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getUserTier } from '../../../store/actions/sota-tiers';
import { AccountPopup } from './AccountPopup/AccountPopup';
import AppNetworkSwitch from './AppNetworkSwitch';
import ConnectWalletModal from './ConnectWalletModal';
import useStyles from './style';
import { ERROR_CODE } from 'constants/solana';
import { SignatureRequiredPopup } from './ConnectWalletModal/SignatureRequiredPopup';
import { updateMyPoint } from 'store/actions/global';
import { get } from 'lodash';
import axios from 'services/axios';

const iconlogo = '/images/icons/icon-header.svg';
const iconDropdown = '/images/icons/icon-dropdown.svg';
const iconMyPoint = '/images/icons/my-point.svg';

const NETWORKS: Record<number, string> = {
  [-1]: APP_NETWORKS_NAME.POLYGON,
  0: APP_NETWORKS_NAME.METAMASK,
  1: APP_NETWORKS_NAME.SOLANA,
};

function formatAddress(address: string) {
  if (!address) {
    return '';
  }

  const suffix = address.substring(0, 6);
  const prefix = address.slice(address.length - 3);

  return `${suffix}...${prefix}`;
}

const NetworkIcon: React.FC<{ networkName: string; className?: string }> = ({ className, networkName, children }) => {
  const styles = useStyles();
  const isSolana = networkName === APP_NETWORKS_NAME.SOLANA;
  const classes = [isSolana ? styles['network-icon'] : styles['eth-icon'], !isSolana ? 'eth' : '', className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

const Header = (props: any) => {
  const [openConnect, setOpenConnect] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [openAccount, setOpenAccount] = useState(false);
  const [openSwitchNetwork, setOpenSwitchNetwork] = useState(false);
  const [openSignatureRequired, setOpenSignatureRequired] = useState(false);

  const styles = useStyles();
  const { isAuth, connectedAccount } = useAuth();
  const dispatch = useDispatch();
  const { userPoint } = useSelector((state: any) => ({
    userPoint: state.global.userPoint,
  }));

  const { data } = useTypedSelector((state) => state.userTier);
  const { isSelectedSolana, appChainID } = useSelectedNetwork();

  const { walletName, account, balance, connecting: web3Connecting } = useWeb3ReactLocal();
  const { connected, connecting, publicKey, wallet } = useWallet();
  const { balanceSol } = useSolana();

  useMyPoint({ address: connectedAccount });

  useEffect(() => {
    setSelectedNetwork(() => {
      if (isSelectedSolana) {
        return NETWORKS[1];
      }

      if (appChainID === ETH_CHAIN_ID) {
        return NETWORKS[0];
      }

      return NETWORKS[-1];
    });
  }, [appChainID, connected, isSelectedSolana]);

  function getBalance() {
    const network = APP_NETWORKS_SUPPORT[appChainID];
    if (isSelectedSolana) {
      return `${balanceSol.formatted} ${network?.currency ?? 'SOL'}`;
    }

    return `${balance} ${network?.currency ?? 'ETH'}`;
  }

  function closeConnectWallet(payload?: any) {
    setOpenConnect(false);

    if (payload === ERROR_CODE.USER_REJECT) {
      setOpenSignatureRequired(true);
    }
  }

  const networkState = (function () {
    if (isSelectedSolana) {
      return {
        isAuthNetwork: isAuth,
        loading: connecting,
        currentWallet: wallet?.name ?? '',
        address: publicKey?.toString() ?? '',
      };
    }

    return {
      isAuthNetwork: isAuth,
      loading: web3Connecting,
      currentWallet: walletName ?? '',
      address: account ?? '',
    };
  })();

  const currentSelectedNetwork = APP_NETWORKS[selectedNetwork];
  const netWorkIcon = selectedNetwork === APP_NETWORKS_NAME.POLYGON ? iconlogo : currentSelectedNetwork?.icon;

  useEffect(() => {
    if (isAuth && networkState.address) {
      // dispatch(getUserTier(networkState.address));
    }
  }, [isAuth, appChainID, networkState.address, dispatch]);

  useEffect(() => {
    const getUserPoint = async (address: string) => {
      try {
        const response = await axios.get(`/user/get-score-nft?owner=${address}`);
        const score = get(response, 'data.data.score', '-');
        dispatch(updateMyPoint(score));
      } catch (e: any) {
        console.error(e);
      }
    };

    if (isAuth && networkState.address && connectedAccount) {
      getUserPoint(connectedAccount);
    }
  }, [isAuth, appChainID, networkState.address, dispatch, connectedAccount]);

  return (
    <div className={`${styles.pageSlider} header`}>
      {networkState.isAuthNetwork && (
        <div className={styles.accountInfo} onClick={() => setOpenAccount(true)}>
          <div className={`${styles.accountInfo}__networks`}>
            <img src={iconMyPoint} alt="" />
            <p>My point</p>
          </div>
          <p className={`${styles.accountInfo}__balance`}>{parseFloat(userPoint) || '--'}</p>
        </div>
      )}
      {networkState.isAuthNetwork && (
        <div className={styles.accountInfo} onClick={() => setOpenAccount(true)}>
          <div className={`${styles.accountInfo}__networks`}>
            <img src="/images/icons/wallet_icon.svg" alt="" />
            <p>{formatAddress(networkState.address)}</p>
          </div>
          <p className={`${styles.accountInfo}__balance`}>{getBalance()}</p>
        </div>
      )}
      <div className={styles['connect-wallet']}>
        <div className={styles.listnetwork} onClick={() => setOpenSwitchNetwork(true)}>
          <NetworkIcon networkName={selectedNetwork} className={styles['listNetwork-icon']}>
            <img src={netWorkIcon} alt="" />
          </NetworkIcon>
          <span className={`${styles.textnetworks} ${styles.textHeader}`}>{currentSelectedNetwork?.name}</span>
          <img src={iconDropdown} alt="" />
        </div>
        {!networkState.isAuthNetwork && (
          <Button className={styles.textHeader} shape="rounded" onClick={() => setOpenConnect(true)}>
            Connect wallet
          </Button>
        )}
      </div>

      {openConnect && <ConnectWalletModal opened={openConnect} handleClose={closeConnectWallet} />}
      {openAccount && (
        <AccountPopup
          open={openAccount}
          onClose={() => {
            setOpenAccount(false);
          }}
          rawAddress={networkState.address}
          balance={getBalance()}
          walletAddress={formatAddress(networkState.address)}
          currentWallet={networkState.currentWallet}
          network={currentSelectedNetwork}
          tier={data?.name}
        />
      )}
      {openSwitchNetwork && (
        <AppNetworkSwitch opened={openSwitchNetwork} handleClose={() => setOpenSwitchNetwork(false)} />
      )}
      {openSignatureRequired && (
        <SignatureRequiredPopup open={openSignatureRequired} onClose={() => setOpenSignatureRequired(false)} />
      )}
    </div>
  );
};
export default Header;
