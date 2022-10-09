import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'bignumber.js';
import { CONTRACT_ADDRESS, PUBLIC_KEY } from 'constants/mint';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { getContractInstance } from 'services/web3';

export interface MintedData {
  maxNumberMinted: number;
  type: number;
}

export const PREV_ACCOUNT = 'prev_account';

export function useUserMinted() {
  const { account } = useWeb3ReactLocal();
  const { library } = useWeb3React();

  async function atomicMint(amount: number, rate: number) {
    if (!PUBLIC_KEY || !CONTRACT_ADDRESS) {
      throw new Error('Invalid public key or contract address');
    }

    const contract = getContractInstance(library);

    if (!contract) {
      throw new Error('Failed to get contract');
    }

    const totalAmount = new BigNumber(amount).multipliedBy(rate);
    const result = await contract?.methods.AtomicMint(amount, 1, PUBLIC_KEY).send({
      from: account,
      value: new BigNumber(totalAmount).toString(),
    });

    return result;
  }

  return {
    atomicMint,
  };
}
