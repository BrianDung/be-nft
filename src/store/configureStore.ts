import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createFilter } from 'redux-persist-transform-filter';
import thunk from 'redux-thunk';

import rootReducer, { RootState } from './reducers';

const initialState = {};

const middlewares = [thunk];

const userStateFilter = createFilter('user', ['data']);
const investorStateFilter = createFilter('investor', ['data']);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
  whitelist: ['wallet', 'connector', 'appNetwork'],
  transforms: [userStateFilter, investorStateFilter],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

let store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
let persistor = persistStore(store);

const getStore = () => {
  return { store, persistor };
};

export default getStore;
