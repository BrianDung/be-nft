import { useWeb3React } from '@web3-react/core';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { setUserHasNoMinted, updateUserMinted } from 'store/actions/mint';
import { useDispatch } from 'react-redux';
import { BigNumber } from 'bignumber.js';
import { useCallback } from 'react';
import { BaseRequest } from '../request/Request';
import XBORG_ABI from '../abi/Xborg.json';
import { CONTRACT_ADDRESS, PUBLIC_KEY, SETTED } from 'constants/mint';
import { getContractInstance } from 'services/web3';

export interface MintedData {
  maxNumberMinted: number;
  type: number;
}

export const PREV_ACCOUNT = 'prev_account';

export function useUserMinted() {
  const { account, logout } = useWeb3ReactLocal();
  const { library } = useWeb3React();
  const dispatch = useDispatch();

  const retrieveUserMinted = useCallback(
    async (account: string): Promise<any> => {
      try {
        const baseRequest = new BaseRequest();

        const response = await baseRequest.get(`/number-minted?wallet_address=${account}`);

        const resultObj = await response.json();

        if (!resultObj) {
          throw new Error('Check whitelist user fail');
        }

        if (resultObj.status !== 200) {
          throw new Error(resultObj.message);
        }

        dispatch(
          updateUserMinted({
            status: SETTED,
            data: { ...resultObj.data },
          })
        );
      } catch (error: any) {
        // 4001 is web error code, -32603 is mobile error code
        if (error.code === 4001 || error.code === -32603) {
          logout();
          return;
        }

        dispatch(setUserHasNoMinted(error));
      }
    },
    [dispatch, logout]
  );

  async function mint(amount: number, rate: number) {
    if (!PUBLIC_KEY || !CONTRACT_ADDRESS) {
      throw new Error('Invalid public key or contract address');
    }

    const contract = getContractInstance(library, XBORG_ABI, CONTRACT_ADDRESS);

    if (!contract) {
      throw new Error('Failed to get contract');
    }

    const totalAmount = new BigNumber(amount).multipliedBy(rate);
    const result = await contract?.methods.mint(amount, 1, PUBLIC_KEY).send({
      from: account,
      value: new BigNumber(totalAmount).multipliedBy(Math.pow(10, 18)).toString(),
    });

    return result;
  }

  return {
    retrieveUserMinted,
    mint,
  };
}
