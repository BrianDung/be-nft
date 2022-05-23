import { updateUserSignature } from 'store/actions/user';
import { useDispatch } from 'react-redux';
import { BigNumber } from 'bignumber.js';
import { USER_SIGNATURE_KEY } from './../contexts/web3react/index';
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

export const PREV_ACCOUNT = 'prev_account';

export function useUserMinted() {
  const { web3Sign } = useWalletSignatureAsync();
  const { account } = useWeb3React();
  const dispatch = useDispatch();

  const getUserMinted = useCallback(
    async (account: string, userSign?: boolean): Promise<MintedData | null> => {
      const baseRequest = new BaseRequest();
      const storagedSignature = sessionStorage.getItem(USER_SIGNATURE_KEY);
      const prevAccount = sessionStorage.getItem(PREV_ACCOUNT);

      const signature =
        userSign || !storagedSignature || prevAccount !== account
          ? await web3Sign(account)
          : sessionStorage.getItem(USER_SIGNATURE_KEY);
      if (!signature) {
        return null;
      }

      sessionStorage.setItem(PREV_ACCOUNT, account);
      sessionStorage.setItem(USER_SIGNATURE_KEY, signature);
      dispatch(updateUserSignature(signature));
      const response = await baseRequest.get(`/number-minted?wallet_address=${account}&signature=${signature}`);

      const resultObj = await response.json();

      if (!resultObj) {
        throw new Error('Check whitelist user fail');
      }

      if (resultObj.status !== 200) {
        throw new Error('You are not in the whitelist');
      }

      return { ...resultObj.data } as MintedData;
    },
    [dispatch, web3Sign]
  );

  async function mint(amount: number, rate: number) {
    if (!PUBLIC_KEY || !CONTRACT_ADDRESS) {
      throw new Error('Invalid public key or contract address');
    }

    const contract = getContractInstance(XBORG_ABI, CONTRACT_ADDRESS);

    if (!contract) {
      throw new Error('Failed to get contract');
    }

    const totalAmount = new BigNumber(amount).multipliedBy(rate);
    console.log({
      value: new BigNumber(totalAmount).multipliedBy(Math.pow(10, 18)).toString(),
    });
    const result = await contract.methods.mint(amount, 1, PUBLIC_KEY).send({
      from: account,
      value: new BigNumber(totalAmount).multipliedBy(Math.pow(10, 18)).toString(),
    });

    return result;
  }

  return {
    getUserMinted,
    mint,
  };
}
