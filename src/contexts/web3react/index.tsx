import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import { createContext, FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alert, clearAlert } from 'store/actions/alert';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { ConnectorNames, connectorsByName } from 'constants/connectors';
import { ETH_CHAIN_ID } from 'constants/network';
import { switchNetwork } from 'utils/setupNetwork';
import { NetworkUpdateType, settingAppNetwork, settingCurrentConnector } from 'store/actions/appNetwork';
import { connectWalletSuccess, disconnectWallet } from 'store/actions/wallet';
import getAccountBalance from 'utils/getAccountBalance';
import BigNumber from 'bignumber.js';
import { WalletConnectionState } from 'store/reducers/wallet';
import { updateUserSignature } from 'store/actions/user';
import { MESSAGES } from 'constants/mint';

interface Web3ReactLocalContextValues {
  logout: () => Promise<void>;
  balance: string | number;
  connector?: AbstractConnector;
  library: any;
  connectWallet: (connector: AbstractConnector, walletName: string) => Promise<any>;
  account: string;
  walletName: string;
  connected: boolean;
  connecting: boolean;
  getUserBalance: () => Promise<void>;
}

export interface MintedData {
  maxNumberMinted: number;
  type: number;
}

export const Web3ReactLocalContext = createContext<Web3ReactLocalContextValues>({
  balance: 0,
  library: undefined,
  logout: () => Promise.resolve(),
  connectWallet: () => Promise.resolve(false),
  account: '',
  walletName: '',
  connected: false,
  connecting: false,
  getUserBalance: () => Promise.resolve(),
});

export const USER_SIGNATURE_KEY = 'user_signature';

export const Web3ReactLocalProvider: FC = ({ children }) => {
  const { appChainID, walletChainID } = useTypedSelector((state) => state.appNetwork).data;
  const walletsInfo = useTypedSelector((state) => state.wallet).entities;
  const { account: connectedAccount, activate, active, error, deactivate, library, chainId } = useWeb3React();
  const dispatch = useDispatch();

  const [currentConnector, setCurrentConnector] = useState<AbstractConnector | undefined>();
  const [balance, setBalance] = useState('0');
  const [walletName, setWalletName] = useState<string>('');
  const [connecting, setConnecting] = useState(false);

  const connectWallet = useCallback(
    async (connector: AbstractConnector, wallet: string) => {
      setConnecting(true);
      setCurrentConnector(connector);
      setWalletName(wallet);

      if (wallet === ConnectorNames.MetaMask) {
        await switchNetwork(ETH_CHAIN_ID, wallet);
      }

      if (!connector || !wallet) {
        return false;
      }

      try {
        return await activate(connector, undefined, true).then(() => {
          dispatch(settingCurrentConnector(wallet));
        });
      } catch (error: any) {
        dispatch(disconnectWallet());
        setWalletName('');

        throw error;
      } finally {
        setConnecting(false);
      }
    },
    [activate, dispatch]
  );

  const clearWalletState = useCallback(() => {
    dispatch(disconnectWallet());
    dispatch(settingCurrentConnector(undefined));
    dispatch(settingAppNetwork(NetworkUpdateType.Wallet, undefined));
    setBalance('0');

    dispatch(updateUserSignature(null));
    sessionStorage.removeItem(USER_SIGNATURE_KEY);
    setWalletName('');
    setCurrentConnector(undefined);
  }, [dispatch]);

  const logout = useCallback(() => {
    return new Promise<void>((resolve) => {
      deactivate();
      clearWalletState();
      resolve();
    });
  }, [deactivate, clearWalletState]);

  // Setup event for web3react
  useEffect(() => {
    if (!currentConnector || active || error) {
      return;
    }

    const handleWeb3ReactUpdate = (updated: any) => {
      if (!updated?.chainId) {
        return;
      }

      const chainId = Number(updated.chainId).toString();
      if (chainId === ETH_CHAIN_ID) {
        return;
      }

      logout();
    };

    const hanldWeb3ReactChangeAccount = (updated: any) => {
      if (!updated?.account) {
        return;
      }

      dispatch(updateUserSignature(null));
      sessionStorage.removeItem(USER_SIGNATURE_KEY);
    };

    const handleWeb3ReactError = (err: any) => {
      if (err === 'NaN ChainId') {
        dispatch(settingAppNetwork(NetworkUpdateType.Wallet, undefined));
      }
    };

    const handleWeb3ReactDisconnect = () => {
      clearWalletState();
    };

    currentConnector.on('Web3ReactUpdate', handleWeb3ReactUpdate);
    currentConnector.on('Web3ReactUpdate', hanldWeb3ReactChangeAccount);
    currentConnector.on('Web3ReactError', handleWeb3ReactError);
    currentConnector.on('Web3ReactDeactivate', handleWeb3ReactDisconnect);

    return () => {
      if (currentConnector && currentConnector.removeListener && active) {
        currentConnector.removeListener('Web3ReactUpdate', hanldWeb3ReactChangeAccount);
        currentConnector.removeListener('Web3ReactUpdate', handleWeb3ReactUpdate);
        currentConnector.removeListener('Web3ReactError', handleWeb3ReactError);
        currentConnector.removeListener('Web3ReactDeactivate', handleWeb3ReactDisconnect);
      }
    };
  }, [currentConnector, connectedAccount, active, appChainID, dispatch, error, clearWalletState, logout]);

  const getAccountDetails = async () => {
    if (!active || !appChainID || !connectedAccount) {
      return;
    }

    const accountBalance = await getAccountBalance(appChainID, walletChainID, connectedAccount as string, walletName);

    const userBalance = new BigNumber(accountBalance._hex).div(new BigNumber(10).pow(18)).toFixed(5);

    dispatch(
      connectWalletSuccess(walletName, [connectedAccount], {
        [connectedAccount]: userBalance,
      })
    );

    dispatch(clearAlert());

    setBalance(userBalance);
  };

  // Get account balance when change network
  useEffect(() => {
    getAccountDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, appChainID, active, walletChainID, dispatch, walletName]);

  // Check and init wallet connect
  useEffect(() => {
    if (!walletsInfo) {
      return;
    }

    const connectedWallet = Object.keys(walletsInfo).find((wallet) => {
      const walletInfo = walletsInfo[wallet];

      return walletInfo.addresses.length > 0 && walletInfo.connectionState === WalletConnectionState.CONNECTED;
    });

    if (!connectedWallet) {
      logout();
      return;
    }

    connectWallet(connectorsByName[connectedWallet], connectedWallet).catch((e) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switch network when appChainId change
  useEffect(() => {
    if (!active || connecting || !walletName || appChainID !== ETH_CHAIN_ID) {
      return;
    }

    switchNetwork(appChainID, walletName).catch(() => {});
  }, [appChainID, walletName, active, connecting]);

  useEffect(() => {
    function handleChainChange(newChainId: string) {
      if (Number(newChainId).toString() !== ETH_CHAIN_ID) {
        dispatch(alert(MESSAGES.WRONG_CHAIN));
      }
    }

    const windowObj = window as any;
    const { ethereum } = windowObj;

    if (!active && !!ethereum?.chainId) {
      handleChainChange(ethereum.chainId);
    }

    if (!ethereum) {
      return;
    }

    ethereum.on('chainChanged', handleChainChange);

    return () => {
      ethereum.removeListener('chainChanged', handleChainChange);
    };
  }, [dispatch, active]);

  useEffect(() => {
    chainId && dispatch(settingAppNetwork(NetworkUpdateType.Wallet, chainId.toString()));
  }, [chainId, dispatch]);

  return (
    <Web3ReactLocalContext.Provider
      value={{
        balance,
        logout,
        connectWallet,
        connector: currentConnector,
        library,
        account: connectedAccount ?? '',
        walletName,
        connected: active,
        connecting,
        getUserBalance: getAccountDetails,
      }}
    >
      {children}
    </Web3ReactLocalContext.Provider>
  );
};
