import { UPDATE_TOTAL_SUPPLY } from './../constants/mint';
import { AnyAction } from 'redux';

export interface Mint {
  totalSupply: number;
}

const initState: Mint = {
  totalSupply: 0,
};

export const totalSupplyReducer = (state: Mint = initState, action: AnyAction) => {
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
