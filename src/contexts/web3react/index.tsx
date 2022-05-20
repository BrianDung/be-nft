import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useWalletSignatureAsync } from 'hooks/useWalletSignatureAsync';
import { createContext, FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alertFailure } from 'store/actions/alert';
import { userActions } from 'store/constants/user';
import { walletActions } from 'store/constants/wallet';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { ConnectorNames, connectorsByName } from 'constants/connectors';
import { ETH_CHAIN_ID, NETWORK_NAME_MAPPINGS } from 'constants/network';
import { switchNetwork } from 'utils/setupNetwork';
import { NetworkUpdateType, settingAppNetwork, settingCurrentConnector } from 'store/actions/appNetwork';
import { connectWalletSuccess, disconnectWallet } from 'store/actions/wallet';
import { logout as logoutAction } from 'store/actions/user';
import { BaseRequest } from '../../request/Request';
import getAccountBalance from 'utils/getAccountBalance';
import BigNumber from 'bignumber.js';
import { WalletConnectionState } from 'store/reducers/wallet';
import { ERROR_CODE } from 'constants/alert';

interface Web3ReactLocalContextValues {
  logout: () => Promise<void>;
  balance: string | number;
  connector?: AbstractConnector;
  library: any;
  login: (account?: string) => Promise<any>;
  connectWallet: (connector: AbstractConnector, walletName: string) => Promise<any>;
  account: string;
  walletName: string;
  connected: boolean;
  connecting: boolean;
}

export const Web3ReactLocalContext = createContext<Web3ReactLocalContextValues>({
  balance: 0,
  library: undefined,
  login: () => Promise.resolve(false),
  logout: () => Promise.resolve(),
  connectWallet: () => Promise.resolve(false),
  account: '',
  walletName: '',
  connected: false,
  connecting: false,
});

export const WEB3_ACCESS_TOKEN = 'access_token';

export const Web3ReactLocalProvider: FC = ({ children }) => {
  const { appChainID, walletChainID } = useTypedSelector((state) => state.appNetwork).data;
  const walletsInfo = useTypedSelector((state) => state.wallet).entities;
  const { account: connectedAccount, activate, active, error, deactivate, library, chainId } = useWeb3React();
  const { web3Sign } = useWalletSignatureAsync();
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

        if (error instanceof UnsupportedChainIdError) {
          setCurrentConnector(undefined);
          localStorage.removeItem('walletconnect');

          const currentChainId = await connector?.getChainId();

          dispatch(
            alertFailure(
              `App network (${NETWORK_NAME_MAPPINGS[appChainID]}) doesn't mach to network selected in wallet: ${NETWORK_NAME_MAPPINGS[currentChainId]}. Please change network in wallet  or  change app network.`
            )
          );
        }

        throw error;
      } finally {
        setConnecting(false);
      }
    },
    [activate, dispatch, appChainID]
  );

  const clearWalletState = useCallback(() => {
    dispatch(disconnectWallet());
    dispatch(settingCurrentConnector(undefined));
    dispatch(settingAppNetwork(NetworkUpdateType.Wallet, undefined));

    localStorage.removeItem('walletconnect');
    setWalletName('');
    setCurrentConnector(undefined);
  }, [dispatch]);

  const logout = useCallback(() => {
    return new Promise<void>((resolve) => {
      deactivate();
      dispatch(logoutAction());
      clearWalletState();
      resolve();
    });
  }, [deactivate, dispatch, clearWalletState]);

  const login = useCallback(
    async (account?: string) => {
      try {
        const baseRequest = new BaseRequest();
        const signature = await web3Sign(walletName, account);
        if (!signature) {
          return false;
        }

        const response = await baseRequest.post(`/user/login`, {
          signature,
          wallet_address: account ?? connectedAccount,
        });

        const resultObj = await response.json();

        if (!resultObj) {
          throw new Error('Login fail');
        }

        if (resultObj.status !== 200) {
          throw new Error(resultObj.message);
        }

        const { token, user } = resultObj.data;

        localStorage.setItem(WEB3_ACCESS_TOKEN, token.token);

        dispatch({ type: walletActions.WALLET_CONNECT_LAYER2_SUCCESS });
        dispatch({
          type: userActions.USER_LOGIN_SUCCESS,
          payload: user,
        });

        return true;
      } catch (error: any) {
        logout();
        dispatch(alertFailure(error.message));
        dispatch({
          type: userActions.USER_LOGIN_FAILURE,
          message: '',
        });

        if (error?.code === ERROR_CODE.USER_REJECT) {
          throw error;
        }
      }
    },
    [connectedAccount, dispatch, web3Sign, walletName, logout]
  );

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

    const handleWeb3ReactError = (err: any) => {
      if (err === 'NaN ChainId') {
        dispatch(settingAppNetwork(NetworkUpdateType.Wallet, undefined));
      }
    };

    const handleWeb3ReactDisconnect = () => {
      clearWalletState();
    };

    currentConnector.on('Web3ReactUpdate', handleWeb3ReactUpdate);
    currentConnector.on('Web3ReactError', handleWeb3ReactError);
    currentConnector.on('Web3ReactDeactivate', handleWeb3ReactDisconnect);

    return () => {
      if (currentConnector && currentConnector.removeListener && active) {
        currentConnector.removeListener('Web3ReactUpdate', handleWeb3ReactUpdate);
        currentConnector.removeListener('Web3ReactError', handleWeb3ReactError);
        currentConnector.removeListener('Web3ReactDeactivate', handleWeb3ReactDisconnect);
      }
    };
  }, [currentConnector, connectedAccount, active, appChainID, dispatch, error, clearWalletState, logout]);

  // Get account balance when change network
  useEffect(() => {
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

      setBalance(userBalance);
    };

    getAccountDetails();
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

    connectWallet(connectorsByName[connectedWallet], connectedWallet);
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
    chainId && dispatch(settingAppNetwork(NetworkUpdateType.Wallet, chainId.toString()));
  }, [chainId, dispatch]);

  return (
    <Web3ReactLocalContext.Provider
      value={{
        balance,
        login,
        logout,
        connectWallet,
        connector: currentConnector,
        library,
        account: connectedAccount ?? '',
        walletName,
        connected: active,
        connecting,
      }}
    >
      {children}
    </Web3ReactLocalContext.Provider>
  );
};
