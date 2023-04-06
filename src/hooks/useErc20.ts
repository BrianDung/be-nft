import { useWeb3React } from '@web3-react/core';
import { CONTRACT_ADDRESS_MINT_AND_SWAP } from 'constants/mint';
import { constants } from 'ethers';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { getContractInstanceUSDT } from 'services/web3';

export interface MintedData {
  maxNumberMinted: number;
  type: number;
}

export function useERC20() {
  const { account } = useWeb3ReactLocal();
  const { library } = useWeb3React();

  async function checkAllowance(usdtAddress: string) {
    const contract = getContractInstanceUSDT(usdtAddress, library);

    if (!contract) {
      throw new Error('Failed to get contract');
    }

    try {
      const result = await contract?.methods.allowance(account, CONTRACT_ADDRESS_MINT_AND_SWAP).call();
      return result;
    } catch (error) {
      console.log({ error });
    }
  }

  async function approve(usdtAddress: string) {
    const contract = getContractInstanceUSDT(usdtAddress, library);

    if (!contract) {
      throw new Error('Failed to get contract');
    }

    try {
      const result = await contract?.methods.approve(CONTRACT_ADDRESS_MINT_AND_SWAP, constants.MaxInt256).send({
        from: account,
      });
      return result;
    } catch (error) {
      console.log({ error });
    }
  }

  async function balanceOf(usdtAddress: string) {
    const contract = getContractInstanceUSDT(usdtAddress, library);
    if (!contract) {
      throw new Error('Failed to get contract');
    }

    try {
      const result = await contract?.methods.balanceOf(account).call();
      return result;
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    checkAllowance,
    approve,
    balanceOf,
  };
}
