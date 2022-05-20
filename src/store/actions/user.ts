import { SOLANA_ACCESS_TOKEN } from './../../constants/solana/index';
import { ConnectorNames } from '../../constants/connectors';
import { userActions } from '../constants/user';

const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || '';

export const INVESTOR_ACCESS_TOKEN_KEY = 'investor_access_token';
export const ACCESS_TOKEN_KEY = 'access_token';

export const getParamsWithConnector = (connectedAccount: string) => ({
  [ConnectorNames.WalletConnect]: {
    method: 'eth_sign',
    params: [connectedAccount, MESSAGE_INVESTOR_SIGNATURE],
  },
  [ConnectorNames.WalletLinkConnect]: {
    method: 'eth_sign',
    params: [connectedAccount, MESSAGE_INVESTOR_SIGNATURE],
  },
  [ConnectorNames.MetaMask]: {
    method: 'personal_sign',
    params: [MESSAGE_INVESTOR_SIGNATURE, connectedAccount],
  },
});

export const logout = (isSolana: boolean = false) => {
  isSolana ? localStorage.removeItem(SOLANA_ACCESS_TOKEN) : localStorage.removeItem(ACCESS_TOKEN_KEY);

  return {
    type: userActions.USER_LOGOUT,
  };
};