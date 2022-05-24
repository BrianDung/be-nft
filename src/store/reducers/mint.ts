import { MintedData } from './../../hooks/useUserMinted';
import { NOT_SET } from './../../constants/mint';
import { CLEAR_USER_MINTED, UPDATE_TOTAL_SUPPLY, UPDATE_USER_MINTED } from './../constants/mint';
import { AnyAction } from 'redux';

export interface TotalSupply {
  totalSupply: number;
}

const initState: TotalSupply = {
  totalSupply: 0,
};

export const totalSupplyReducer = (state: TotalSupply = initState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_TOTAL_SUPPLY:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      return state;
    }
  }
};

export interface UserMinted {
  status: string;
  data: MintedData | null;
  error?: any;
}

const mintedDataInit: UserMinted = {
  status: NOT_SET,
  data: {
    maxNumberMinted: 0,
    type: 0,
  },
};

export const userMintedReducer = (state: UserMinted = { ...mintedDataInit }, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USER_MINTED:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_USER_MINTED: {
      return {
        ...mintedDataInit,
      };
    }
    default: {
      return state;
    }
  }
};
