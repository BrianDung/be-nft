import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { APP_NETWORKS_NAME, ETH_CHAIN_ID, NETWORK_URL, POLYGON_CHAIN_ID } from './network'

const METAMASK_DEEPLINK = process.env.REACT_APP_METAMASK_DEEPLINK;

export const injected = new InjectedConnector({});

// mainnet only
export const walletLinkConnect = new WalletLinkConnector({
  url: process.env.REACT_APP_NETWORK_URL || '',
  appName: 'Red Kite',
  appLogoUrl: 'https://redkite.polkafoundry.com/images/logo-red-kite.svg',
  darkMode: true,
  // supportedChainIds: [1,4,5],
});

// mainnet only
export const walletConnect = new WalletConnectConnector({
  rpc: { [Number(ETH_CHAIN_ID)]: NETWORK_URL as string },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 10000
});

export const walletConnectPolygon = new WalletConnectConnector({
  rpc: { [Number(POLYGON_CHAIN_ID)]: 'https://rpc-mainnet.maticvigil.com' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 10000
});

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  // iconName: string
  description: string
  href: string | null
  // color: string
  primary?: true
  mobile?: true
  mobileOnly?: true,
  disableIcon: string;
  icon: string;
  deepLink?: string;
}

export enum ConnectorNames {
  MetaMask = "MetaMask",
  WalletConnect = "WalletConnect",
  WalletConnectBsc = "WalletConnect",
  WalletConnectPolygon = "WalletConnectPolygon",
  WalletLinkConnect = "Coinbase Wallet",
  Sollet = "Sollet",
  Phantom = "Phantom"
}

export type connectorNames = Extract<ConnectorNames, ConnectorNames.MetaMask | ConnectorNames.WalletConnect | ConnectorNames.WalletLinkConnect>;

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: ConnectorNames.MetaMask,
    icon: '/images/metamask-wallet.svg',
    disableIcon: '/images/metamask-disabled.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    mobile: true,
    deepLink: METAMASK_DEEPLINK
  },
  WALLETCONNECT: {
    connector: walletConnect,
    name: ConnectorNames.WalletConnect,
    icon: '/images/WalletConnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    disableIcon: '/images/wallet-connect-disabled.svg',
    href: null,
    mobile: true
  },
};

export const SUPPORTED_WALLETS_POLYGON: { [key: string]: WalletInfo } = {
  METAMASK: SUPPORTED_WALLETS.METAMASK,
  WALLETCONNECT: {
    connector: walletConnectPolygon,
    name: ConnectorNames.WalletConnect,
    icon: '/images/WalletConnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    disableIcon: '/images/wallet-connect-disabled.svg',
    href: null,
  },
}

export const SUPPORTED_WALLETS_SOLANA: { [key: string]: WalletInfo } = {
  PHANTOM: {
    connector: {} as any,
    name: ConnectorNames.Phantom,
    icon: '/images/phantom-wallet.svg',
    description: 'Connect to phantom...',
    disableIcon: '/images/wallet-connect-disabled.svg',
    href: null,
  },
  SOLLET: {
    connector: {} as any,
    name: ConnectorNames.Sollet,
    icon: '/images/sollet-wallet.svg',
    description: 'Connect to sollet...',
    disableIcon: '/images/wallet-connect-disabled.svg',
    href: null,
  },
}

export const connectorsByName: { [key: string]: AbstractConnector } = {
  [ConnectorNames.MetaMask]: injected,
  [ConnectorNames.WalletConnect]: walletConnect,
  [ConnectorNames.WalletConnectPolygon]: walletConnectPolygon,
  [ConnectorNames.WalletLinkConnect]: walletLinkConnect,
}

export const connectorsSupportByNetwork: { [key: string]: { [key: string]: WalletInfo } } = {
  [APP_NETWORKS_NAME.METAMASK]: SUPPORTED_WALLETS,
  [APP_NETWORKS_NAME.POLYGON]: SUPPORTED_WALLETS_POLYGON,
  [APP_NETWORKS_NAME.SOLANA]: SUPPORTED_WALLETS_SOLANA,
};

