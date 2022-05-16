import { MAX_INT } from '../../../../services/web3';
import { getContract } from 'utils/contract';
import { TokenType } from '../../../../utils/token';
import { BigNumber } from 'bignumber.js';
import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import ERC20_ABI from '../../../../abi/Erc20.json';

export const useApproveToken = (
  token: TokenType | undefined,
  owner: string | null | undefined,
  spender: string | null | undefined
) => {
  const [transactionHash, setTransactionHash] = useState('');
  const { library, account } = useWeb3React();

  const approveToken = useCallback(
    async (amount?: BigNumber) => {
      setTransactionHash('');
      if (
        token &&
        spender &&
        owner &&
        ethers.utils.isAddress(owner) &&
        ethers.utils.isAddress(spender) &&
        ethers.utils.isAddress(token.address)
      ) {
        const contract = getContract(token.address, ERC20_ABI, library, account as string);

        if (!contract) {
          return false;
        }

        const transaction = await contract.approve(spender, MAX_INT);
        setTransactionHash(transaction.hash);
        await transaction.wait(1);

        return true;
      }

      return false;
    },
    [account, library, owner, spender, token]
  );

  return {
    approveToken,
    transactionHash,
  };
};
