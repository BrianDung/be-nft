import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useWeb3React } from '@web3-react/core';

type ReturnType = {
  isAuth: boolean;
  connectedAccount: string;
  wrongChain: boolean;
  logout: () => Promise<void>;
};

const useAuth = (): ReturnType => {
  const [isAuth, setIsAuth] = useState(false);
  const { active, account, chainId } = useWeb3React();
  const { logout: web3Logout, isWhiteList } = useWeb3ReactLocal();

  const walletsInfo = useTypedSelector((state) => state.wallet).entities;
  const user = useTypedSelector((state) => state.user).data;
  const connectorName = useTypedSelector((state) => state.connector).data;
  const { appChainID } = useTypedSelector((state: any) => state.appNetwork).data;
  const activeWallet = connectorName ? walletsInfo[connectorName] : '';

  useEffect(() => {
    setIsAuth(active && !!activeWallet && isWhiteList);
  }, [active, activeWallet, user, isWhiteList]);

  const wrongChain = appChainID?.toString() !== chainId?.toString();
  const connectedAccount = isAuth ? account : '';

  return { isAuth, connectedAccount: connectedAccount ?? '', wrongChain, logout: web3Logout };
};

export default useAuth;
