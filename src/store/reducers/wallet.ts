import { ConnectorNames } from '../../constants/connectors';
import { walletActions } from '../constants/wallet';
import { AnyAction } from 'redux';

export enum WalletConnectionState {
  READY = "readyForConnection",
  CONNECTED = "connected"
}

export enum TwoFactors {
  Layer1 = "Layer1",
  Layer2 = "Layer2"
}

type connectorNames = Extract<ConnectorNames, ConnectorNames.WalletConnect | ConnectorNames.MetaMask>

type WalletState = {
  entities: { [key: string]: WalletType },
  loading: boolean,
  error: string,
  twoFactor: TwoFactors | undefined,
  walletConnect: boolean
}

const wallets = {
  [ConnectorNames.WalletConnect]: {
    title: "WalletConnect",
    typeId: "WalletConnect"
  },
  [ConnectorNames.WalletLinkConnect]: {
    title: "WalletLinkConnect",
    typeId: "wallet-coinbase-icon"
  },
  [ConnectorNames.MetaMask]: {
    title: "MetaMask",
    typeId: "metamask"
  },
}

export type WalletType = {
  addresses: string[];
  balances: {};
  connectionState: WalletConnectionState;
  title: string;
  typeId: string;
}

const walletInitialState = Object.keys(wallets).reduce<Record<string, WalletType>>((acc, key) => {
  const wallet = wallets[key as connectorNames];

  const walletsInfo = {
    ...acc,
    [key]: {
      ...wallet,
      balances: {},
      connectionState: WalletConnectionState.READY,
      addresses: []
    }
  }

  return walletsInfo;
}, {});

const initialState = {
  entities: walletInitialState,
  loading: false,
  error: '',
  twoFactor: undefined,
  walletConnect: false
}


export const walletReducer = (state: WalletState = initialState, action: AnyAction) => {
  switch (action.type) {
    case walletActions.ALL_WALLETS_INIT_LOADING: {
      return {
        ...state,
        loading: true
      }
    }

    case walletActions.ALL_WALLETS_INIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: walletInitialState
      }
    }

    case walletActions.ALL_WALLETS_INIT_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }

    case walletActions.WALLET_CONNECT_SUCCESS: {
      const { balances, addresses, entity } = action.payload;
      return {
        ...state,
        entities: Object.assign({ ...state.entities }, {
          [entity]: {
            ...state.entities[entity],
            balances,
            addresses,
            connectionState: WalletConnectionState.CONNECTED
          }
        }),
        twoFactor: TwoFactors.Layer1,
        walletConnect: true
      }
    }

    case walletActions.WALLET_UPDATE_BALANCE: {
      const { balances, addresses, entity } = action.payload;

      return {
        ...state,
        entities: Object.assign({ ...state.entities }, {
          [entity]: {
            ...state.entities[entity],
            balances,
            addresses,
            connectionState: WalletConnectionState.CONNECTED
          }
        }),
      }
    }

    case walletActions.WALLET_CONNECT_SUCCESS_WITHOUT_LAYER2: {
      return {
        ...state,
        walletConnect: false,
        twoFactor: TwoFactors.Layer1
      }
    }

    case walletActions.WALLET_CONNECT_LAYER2_SUCCESS: {
      return {
        ...state,
        twoFactor: TwoFactors.Layer2,
        walletConnect: false
      }
    }

    case walletActions.WALLET_DISCONNECT_SUCCESS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};