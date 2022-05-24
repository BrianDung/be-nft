import { SETTED } from './../../constants/mint';
import { UPDATE_USER_MINTED, CLEAR_USER_MINTED } from './../constants/mint';
import { UserMinted } from 'store/reducers/mint';

export function updateUserMinted(data: UserMinted | null) {
  return {
    type: UPDATE_USER_MINTED,
    payload: data,
  };
}

export function setUserHasNoMinted(error?: any) {
  return updateUserMinted({
    status: SETTED,
    data: null,
    error: error,
  });
}

export function clearUserMinted() {
  return {
    type: CLEAR_USER_MINTED,
  };
}
