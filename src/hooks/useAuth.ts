import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useState, useEffect, useCallback } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useWeb3React } from '@web3-react/core';
import { WEB3_ACCESS_TOKEN } from 'contexts/web3react';

type ReturnType = {
  isAuth: boolean;
  connectedAccount: string;
  wrongChain: boolean;
  getAccessToken: () => string | null;
  logout: () => Promise<void>;
};

const useAuth = (): ReturnType => {
  const [isAuth, setIsAuth] = useState(false);
  const { active, account, chainId } = useWeb3React();
  const { logout: web3Logout } = useWeb3ReactLocal();

  const walletsInfo = useTypedSelector((state) => state.wallet).entities;
  const user = useTypedSelector((state) => state.user).data;
  const connectorName = useTypedSelector((state) => state.connector).data;
  const { appChainID } = useTypedSelector((state: any) => state.appNetwork).data;
  const activeWallet = connectorName ? walletsInfo[connectorName] : '';

  const getAccessToken = useCallback(() => {
    return localStorage.getItem(WEB3_ACCESS_TOKEN);
  }, []);

  useEffect(() => {
    const hasToken = !!getAccessToken();

    setIsAuth(active && !!activeWallet && hasToken);
  }, [active, activeWallet, user, getAccessToken]);

  const wrongChain = appChainID?.toString() !== chainId?.toString();
  const connectedAccount = isAuth ? account : '';

  return { isAuth, connectedAccount: connectedAccount ?? '', wrongChain, getAccessToken, logout: web3Logout };
};

export default useAuth;
