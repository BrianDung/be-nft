import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { APP_NETWORKS_NAME, ETH_CHAIN_ID, NETWORK_URL } from './network';

const METAMASK_DEEPLINK = process.env.REACT_APP_METAMASK_DEEPLINK;

export const injected = new InjectedConnector({});
export const walletConnect = new WalletConnectConnector({
  rpc: { [Number(ETH_CHAIN_ID)]: NETWORK_URL as string },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 10000,
});

export interface WalletInfo {
  connector?: AbstractConnector;
  name: ConnectorNames;
  // iconName: string
  description: string;
  href: string | null;
  // color: string
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
  disableIcon: string;
  icon: string;
  deepLink?: string;
}

export enum ConnectorNames {
  MetaMask = 'MetaMask',
  WalletConnect = 'WalletConnect',
}

export type connectorNames = Extract<ConnectorNames, ConnectorNames.MetaMask>;

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: ConnectorNames.MetaMask,
    icon: '/images/metamask-wallet.svg',
    disableIcon: '/images/metamask-disabled.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    mobile: true,
    deepLink: METAMASK_DEEPLINK,
  },
  WALLETCONNECT: {
    connector: walletConnect,
    name: ConnectorNames.WalletConnect,
    icon: '/images/WalletConnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    disableIcon: '/images/wallet-connect-disabled.svg',
    href: null,
    mobile: true,
  },
};

export const connectorsByName: { [key: string]: AbstractConnector } = {
  [ConnectorNames.MetaMask]: injected,
  [ConnectorNames.WalletConnect]: walletConnect,
};

export const connectorsSupportByNetwork: { [key: string]: { [key: string]: WalletInfo } } = {
  [APP_NETWORKS_NAME.METAMASK]: SUPPORTED_WALLETS,
};
