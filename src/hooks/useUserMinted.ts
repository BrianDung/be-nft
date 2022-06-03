import { useWeb3React } from '@web3-react/core';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { setUserHasNoMinted, updateUserMinted } from 'store/actions/mint';
import { useDispatch } from 'react-redux';
import { BigNumber } from 'bignumber.js';
import { useCallback } from 'react';
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
        const contract = getContractInstance();
        if (!contract) {
          throw new Error('Cannot get contract');
        }

        const maxAllow = await contract?.methods.MaxMintPerWallet().call();
        const userSupply = await contract?.methods.numberMinted(account).call();
        const userMinted = Number(maxAllow) - Number(userSupply);

        const result = {
          maxNumberMinted: userMinted,
          type: 1,
        };

        dispatch(
          updateUserMinted({
            status: SETTED,
            data: { ...result },
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

    const contract = getContractInstance(library);

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
