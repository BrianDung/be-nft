import { BigNumber } from 'bignumber.js';
import { SESSION_STORAGE } from './../contexts/web3react/index';
import { useWeb3React } from '@web3-react/core';
import { useWalletSignatureAsync } from 'hooks/useWalletSignatureAsync';
import { useCallback } from 'react';
import { BaseRequest } from '../request/Request';
import XBORG_ABI from '../abi/Xborg.json';
import { CONTRACT_ADDRESS, PUBLIC_KEY } from 'constants/mint';
import { getContractInstance } from 'services/web3';

export interface MintedData {
  maxNumberMinted: number;
  type: number;
}

export function useUserMinted() {
  const { web3Sign } = useWalletSignatureAsync();
  const { account } = useWeb3React();

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

  async function mint(amount: number, rate: number) {
    if (!PUBLIC_KEY || !CONTRACT_ADDRESS) {
      throw new Error('Invalid public key or contract address');
    }

    const contract = getContractInstance(XBORG_ABI, CONTRACT_ADDRESS);

    if (!contract) {
      throw new Error('Failed to get contract');
    }

    const totalAmount = amount * rate;
    const result = await contract.methods.mint(amount, 1, PUBLIC_KEY).send({
      from: account,
      value: new BigNumber(totalAmount).multipliedBy(Math.pow(10, 18)),
    });

    return result;
  }

  return {
    getUserMinted,
    mint,
  };
}
