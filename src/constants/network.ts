export const ETH_CHAIN_ID = process.env.REACT_APP_ETH_CHAIN_ID as string;
export const ETHERSCAN_URL = process.env.REACT_APP_ETHERSCAN_BASE_URL || '';

export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
}

export type chainId = Extract<
  ChainId,
  ChainId.MAINNET | ChainId.ROPSTEN | ChainId.RINKEBY | ChainId.GOERLI | ChainId.KOVAN
>;

export const ChainIdNameMapping: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: 'Mainnet',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GOERLI]: 'Goerli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.RINKEBY]: 'Rinkeby',
};

export const NETWORK_NAME_MAPPINGS: any = {
  '1': 'Mainnet',
  '3': 'Ropsten',
  '5': 'Goerli',
  '42': 'Kovan',
  '4': 'Rinkeby',
  '56': 'BSC Mainnet',
  '97': 'BSC Testnet',
  '137': 'Polygon Mainnet',
  '80001': 'Mumbai Testnet',
};

export interface NetworkInfo {
  name: string;
  id?: string | undefined;
  icon: string;
  disableIcon: string;
  currency?: string;
  [k: string]: any;
}

export enum APP_NETWORKS_NAME {
  METAMASK = 'METAMASK',
}

export type appNetworkType = Extract<APP_NETWORKS_NAME, APP_NETWORKS_NAME.METAMASK>;

export const APP_NETWORKS: { [key: string]: NetworkInfo } = {
  [APP_NETWORKS_NAME.METAMASK]: {
    name: 'Ethereum',
    id: ETH_CHAIN_ID,
    icon: '/images/ethereum-active.svg',
    disableIcon: '/images/ethereum-disabled.svg',
  },
};

export const APP_NETWORKS_ID: (string | undefined)[] = [ETH_CHAIN_ID];
export const NETWORK_URL = process.env.REACT_APP_NETWORK_URL;
export const NETWORK_ETH_NAME = process.env.REACT_APP_NETWORK_ETH_NAME;

export const appNetwork: { [key: string]: string } = {
  [ETH_CHAIN_ID]: NETWORK_ETH_NAME as string,
};

export const APP_NETWORKS_SUPPORT: { [key: number]: NetworkInfo } = {
  [ETH_CHAIN_ID]: {
    name: 'Ethereum',
    id: ETH_CHAIN_ID,
    icon: '/images/ethereum.svg',
    disableIcon: '/images/ethereum-disabled.png',
    currency: 'ETH',
    networkName: NETWORK_NAME_MAPPINGS[ETH_CHAIN_ID],
    details: {
      chainId: `0x${(+ETH_CHAIN_ID).toString(16)}`,
      chainName: NETWORK_NAME_MAPPINGS[ETH_CHAIN_ID],
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: [],
      blockExplorerUrls: [],
    },
  },
};

export const NETWORK_AVAILABLE = {
  ETH: 'eth',
};

export const NETWORK_AVAILABLE_MAP = {
  [ETH_CHAIN_ID]: NETWORK_AVAILABLE.ETH,
};
