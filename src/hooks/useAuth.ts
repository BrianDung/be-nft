import { useSolana } from './useSolana';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useWallet } from '@solana/wallet-adapter-react';
import { ACCESS_TOKEN_KEY } from './../store/actions/user';
import { ETH_CHAIN_ID, POLYGON_CHAIN_ID } from './../constants/network';
import { useState, useEffect, useCallback } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useWeb3React } from '@web3-react/core';
import { SOLANA_CHAIN_ID } from '../constants/network';
import { SOLANA_ACCESS_TOKEN } from '../constants/solana';
import { useSelectedNetwork } from './useSelectedNetwork';

type ReturnType = {
  isAuth: boolean;
  connectedAccount: string;
  wrongChain: boolean;
  getAccessToken: () => string | null;
  logout: () => Promise<void>;
};

const useAuth = (): ReturnType => {
  const [isAuth, setIsAuth] = useState(false);
  const { isSelectedSolana } = useSelectedNetwork();
  const { active, account, chainId } = useWeb3React();
  const { logout: web3Logout } = useWeb3ReactLocal();
  const { connected, publicKey } = useWallet();
  const { logout: solanaLogout } = useSolana();

  const walletsInfo = useTypedSelector((state) => state.wallet).entities;
  const user = useTypedSelector((state) => state.user).data;
  const connectorName = useTypedSelector((state) => state.connector).data;
  const { appChainID } = useTypedSelector((state: any) => state.appNetwork).data;
  const activeWallet = connectorName ? walletsInfo[connectorName] : '';

  const getAccessToken = useCallback(() => {
    const chainIdStr = appChainID?.toString() ?? '';

    if (chainIdStr === SOLANA_CHAIN_ID) {
      return localStorage.getItem(SOLANA_ACCESS_TOKEN);
    }

    if (chainIdStr === ETH_CHAIN_ID || chainIdStr === POLYGON_CHAIN_ID) {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    return null;
  }, [appChainID]);

  useEffect(() => {
    const hasToken = !!getAccessToken();
    if (isSelectedSolana) {
      setIsAuth(connected && hasToken);
      return;
    }

    setIsAuth(active && !!activeWallet && hasToken);
  }, [active, activeWallet, user, getAccessToken, isSelectedSolana, connected]);

  const wrongChain = appChainID?.toString() !== chainId?.toString();
  const connectedAccount = isAuth ? (isSelectedSolana ? publicKey?.toString() : account) : '';
  const logout = isSelectedSolana ? solanaLogout : web3Logout;

  return { isAuth, connectedAccount: connectedAccount ?? '', wrongChain, getAccessToken, logout };
};

export default useAuth;
