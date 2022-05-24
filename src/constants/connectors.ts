import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { APP_NETWORKS_NAME } from './network';

const METAMASK_DEEPLINK = process.env.REACT_APP_METAMASK_DEEPLINK;

export const injected = new InjectedConnector({});

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
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
};

export const connectorsByName: { [key: string]: AbstractConnector } = {
  [ConnectorNames.MetaMask]: injected,
};

export const connectorsSupportByNetwork: { [key: string]: { [key: string]: WalletInfo } } = {
  [APP_NETWORKS_NAME.METAMASK]: SUPPORTED_WALLETS,
};
