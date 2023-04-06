import { useWeb3React } from '@web3-react/core';
import { CONTRACT_ADDRESS_MINT_AND_SWAP, PUBLIC_KEY } from 'constants/mint';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { getBeNftContractInstance } from 'services/web3';

export interface MintedData {
  maxNumberMinted: number;
  type: number;
}

export const PREV_ACCOUNT = 'prev_account';

export function useUserMinted() {
  const { account } = useWeb3ReactLocal();
  const { library } = useWeb3React();

  async function atomicMint(amount: number) {
    if (!PUBLIC_KEY || !CONTRACT_ADDRESS_MINT_AND_SWAP) {
      throw new Error('Invalid public key or contract address');
    }

    const contract = getBeNftContractInstance(library);

    if (!contract) {
      throw new Error('Failed to get contract');
    }

    console.log('params', {
      amount,
      pub: PUBLIC_KEY,
      contract,
    });
    const result = await contract?.methods.swapCommitment(amount, 1, PUBLIC_KEY).send({
      from: account,
    });

    return result;
  }

  return {
    atomicMint,
  };
}
