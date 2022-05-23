import { UPDATE_USER_SIGNATURE } from '../constants/user';
import { AnyAction } from 'redux';
interface UserSignature {
  signature: string | null;
}

export const userSignatureReducer = (state: UserSignature = { signature: null }, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USER_SIGNATURE:
      return {
        signature: action.payload,
      };
    default: {
      return state;
    }
  }
};
