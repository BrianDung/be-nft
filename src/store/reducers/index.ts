import { mintReducer } from './mint';
import { combineReducers } from 'redux';
import { alertReducer } from './alert';
import userReducer, {
  userConnectReducer,
  userRegisterReducer,
  investorReducer,
  investorRegisterReducer,
  userProfileReducer,
  userProfileUpdateReducer,
} from './user';
import { appNetworkReducer, connectorReducer } from './appNetwork';
import { walletReducer } from './wallet';

const rootReducer = combineReducers({
  user: userReducer,
  investor: investorReducer,
  investorRegister: investorRegisterReducer,
  userConnect: userConnectReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userProfileUpdate: userProfileUpdateReducer,
  alert: alertReducer,
  appNetwork: appNetworkReducer,
  connector: connectorReducer,
  wallet: walletReducer,
  mint: mintReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
