import { MINT_INFO } from './../constants/mint';
import { MintTimeLine } from 'constants/mint';
import { AnyAction } from 'redux';
import { MintedData } from 'hooks/useUserMinted';

export interface Mint {
  totalSupply: number;
  timeLine: MintTimeLine;
  userMinted: MintedData | null;
}

const initState: Mint = {
  totalSupply: 0,
  timeLine: MintTimeLine.PreSaleRound,
  userMinted: null,
};

export const mintReducer = (state: Mint = initState, action: AnyAction) => {
  switch (action.type) {
    case MINT_INFO.UPDATE_MINT_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      return state;
    }
  }
};
