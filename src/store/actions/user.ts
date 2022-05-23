import { UPDATE_USER_SIGNATURE } from '../constants/user';

export function updateUserSignature(data: string | null) {
  return {
    type: UPDATE_USER_SIGNATURE,
    payload: data,
  };
}
