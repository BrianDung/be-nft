import { createContext, FC, useEffect, useMemo, useState } from 'react';
import { getPhantomWallet, getSolletExtensionWallet, Wallet } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider } from './connection';
import { useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { useLocalStorageState } from '../../hooks/useSolletLocalStorate';
import { SOLANA_PUBLIC_KEY_STORAGE, SOLANA_ACCESS_TOKEN, ERROR_CODE } from '../../constants/solana';
import { useConnection } from '../../hooks/useConnection';
import { PublicKey } from '@solana/web3.js';
import { formatNumber, transformLamportsToSOL } from '../../shared/help';
import { useDispatch } from 'react-redux';
import { BaseRequest } from '../../request/Request';
import { alertFailure } from '../../store/actions/alert';
import { userActions } from '../../store/constants/user';
import { walletActions } from '../../store/constants/wallet';
import { useWalletSignatureAsync } from 'hooks/useWalletSignatureAsync';

interface SolanaLocalContextValues {
  logout: () => Promise<any>;
  balanceSol: {
    value: number;
    formatted: string;
  };
  updateCurrentBalance: () => void;
  login: () => Promise<any>;
  connected: boolean;
  wallet: Wallet | null;
  ready: boolean;
}

export const SolanaLocalContext = createContext<SolanaLocalContextValues>({
  logout: () => Promise.resolve(),
  balanceSol: {
    value: 0,
    formatted: '0',
  },
  updateCurrentBalance: () => {},
  login: () => Promise.resolve(true),
  connected: false,
  wallet: null,
  ready: false,
});

const SolanaLocalProvider: FC = ({ children }) => {
  const { disconnect, connected, wallet, publicKey, ready } = useWallet();
  const { connection } = useConnection();
  const dispatch = useDispatch();
  const [storagedPublicKey, setStoragedPublicKey] = useLocalStorageState(SOLANA_PUBLIC_KEY_STORAGE);
  const { solanaSign } = useWalletSignatureAsync();
  const [balanceSol, setBalanceSol] = useState({
    value: 0,
    formatted: '0',
  });

  useEffect(() => {
    if (ready) {
      return;
    }

    const timeoutId = setTimeout(() => {
      logout();
    }, 5000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  useEffect(() => {
    setStoragedPublicKey(publicKey?.toString() ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  useEffect(() => {
    updateCurrentBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storagedPublicKey]);

  async function login() {
    dispatch({
      type: userActions.USER_LOGIN_LOADING,
    });

    try {
      const baseRequest = new BaseRequest();
      const signature = await solanaSign();
      if (!signature) {
        return false;
      }

      const response = (await baseRequest.post(`/user/sol-login`, {
        signature: Buffer.from(signature),
        wallet_address: publicKey?.toString(),
      })) as any;

      const resultObj = await response.json();

      if (resultObj && resultObj.status && resultObj.status !== 200) {
        dispatch(alertFailure(resultObj.message));
        dispatch({ type: userActions.USER_LOGIN_FAILURE, payload: '' });
        return false;
      }

      const { token, user } = resultObj.data;
      localStorage.setItem(SOLANA_ACCESS_TOKEN, token.token);

      dispatch({ type: walletActions.WALLET_CONNECT_LAYER2_SUCCESS });

      dispatch({
        type: userActions.USER_LOGIN_SUCCESS,
        payload: user,
      });

      return true;
    } catch (error: any) {
      const errorMessage =
        error?.error.code === ERROR_CODE.USER_REJECT
          ? `${wallet?.name} Message Signature: ${error.message}`
          : error.message;
      dispatch(alertFailure(errorMessage));
      dispatch({
        type: userActions.USER_LOGIN_FAILURE,
        message: '',
      });

      if(error?.error.code === ERROR_CODE.USER_REJECT) {
        throw error.error;
      }
    }
  }

  const updateCurrentBalance = () => {
    const currentPublicKey = storagedPublicKey || publicKey;
    if (!currentPublicKey) {
      setBalanceSol({
        value: 0,
        formatted: '0',
      });

      return;
    }

    connection
      .getAccountInfo(new PublicKey(currentPublicKey))
      .then((response) => {
        const balanceResult = transformLamportsToSOL(response?.lamports ?? 0);
        setBalanceSol({
          value: balanceResult ?? 0,
          formatted: formatNumber.format(balanceResult) as string,
        });
      })
      .catch((err) => {});
  };

  function logout() {
    return new Promise<any>((resolve) => {
      disconnect().then(() => {
        setStoragedPublicKey(null);
        localStorage.removeItem(SOLANA_ACCESS_TOKEN);
        resolve(null);
      });
    });
  }

  return (
    <SolanaLocalContext.Provider
      value={{
        logout,
        balanceSol,
        updateCurrentBalance,
        login,
        connected,
        wallet,
        ready,
      }}
    >
      {children}
    </SolanaLocalContext.Provider>
  );
};

export const SolanaProvider: FC = ({ children }) => {
  const wallets = useMemo(() => [getPhantomWallet(), getSolletExtensionWallet()], []);
  const [, setStoragedPublicKey] = useLocalStorageState(SOLANA_PUBLIC_KEY_STORAGE);

  return (
    <ConnectionProvider>
      <WalletProvider
        autoConnect={true}
        wallets={wallets}
        onError={(e) => {
          if (e.name === 'WalletDisconnectedError') {
            setStoragedPublicKey(null);
          }
        }}
      >
        <SolanaLocalProvider>{children}</SolanaLocalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
