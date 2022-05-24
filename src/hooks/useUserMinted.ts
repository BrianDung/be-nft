import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { setUserHasNoMinted, updateUserMinted } from 'store/actions/mint';
import { updateUserSignature } from 'store/actions/user';
import { useDispatch } from 'react-redux';
import { BigNumber } from 'bignumber.js';
import { USER_SIGNATURE_KEY } from './../contexts/web3react/index';
import { useWalletSignatureAsync } from 'hooks/useWalletSignatureAsync';
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
  const { web3Sign } = useWalletSignatureAsync();
  const { account, logout } = useWeb3ReactLocal();
  const dispatch = useDispatch();

  const retrieveUserMinted = useCallback(
    async (account: string): Promise<any> => {
      try {
        const baseRequest = new BaseRequest();
        const storagedSignature = sessionStorage.getItem(USER_SIGNATURE_KEY);
        const prevAccount = sessionStorage.getItem(PREV_ACCOUNT);

        const signature =
          !storagedSignature || prevAccount !== account
            ? await web3Sign(account)
            : sessionStorage.getItem(USER_SIGNATURE_KEY);

        if (!signature) {
          dispatch(setUserHasNoMinted());
          return;
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
    [dispatch, logout, web3Sign]
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
    retrieveUserMinted,
    mint,
  };
}
