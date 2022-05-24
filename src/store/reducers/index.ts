import { totalSupplyReducer, userMintedReducer } from './mint';
import { combineReducers } from 'redux';
import { alertReducer } from './alert';
import { userSignatureReducer } from './user';
import { appNetworkReducer, connectorReducer } from './appNetwork';
import { walletReducer } from './wallet';

const rootReducer = combineReducers({
  alert: alertReducer,
  appNetwork: appNetworkReducer,
  connector: connectorReducer,
  wallet: walletReducer,
  totalSupply: totalSupplyReducer,
  userSignature: userSignatureReducer,
  userMinted: userMintedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
