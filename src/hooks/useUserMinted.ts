import { useWalletSignatureAsync } from 'hooks/useWalletSignatureAsync';
import { useCallback } from 'react';
import { BaseRequest } from '../request/Request';

export interface MintedData {
  maxNumberMinted: number;
  type: number;
}

export const SESSION_STORAGE = 'user_signature';

export function useUserMinted() {
  const { web3Sign } = useWalletSignatureAsync();

  const getUserMinted = useCallback(
    async (account: string, userSign?: boolean): Promise<MintedData | null> => {
      const baseRequest = new BaseRequest();
      const storagedSignature = sessionStorage.getItem(SESSION_STORAGE);
      const signature =
        userSign || !storagedSignature ? await web3Sign(account) : sessionStorage.getItem(SESSION_STORAGE);
      if (!signature) {
        return null;
      }

      sessionStorage.setItem(SESSION_STORAGE, signature);
      const response = await baseRequest.get(`/number-minted?wallet_address=${account}&signature=${signature}`);

      const resultObj = await response.json();

      if (!resultObj) {
        throw new Error('Check whitelist user fail');
      }

      if (resultObj.status !== 200) {
        throw new Error(resultObj.message);
      }

      return { ...resultObj.data } as MintedData;
    },
    [web3Sign]
  );

  return {
    getUserMinted,
  };
}
