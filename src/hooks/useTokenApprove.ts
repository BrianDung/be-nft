import { MAX_INT } from './../services/web3';
import { BigNumber } from 'bignumber.js';
import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';

import { USER_CLOSE_EXTENSION_MESSAGE, TRANSACTION_ERROR, TRANSACTION_SUCCESS } from '../constants/alert';
import { alert } from '../store/actions/alert';
import { getContract } from '../utils/contract';
import { TokenType } from '../hooks/useTokenDetails';

import ERC20_ABI from '../abi/Erc20.json';

const useTokenAllowance = (
  token: TokenType | undefined,
  owner: string | null | undefined,
  spender: string | null | undefined,
  sotaABI: false,
  reload: boolean | null | undefined
) => {
  const [tokenApproveLoading, setTokenApproveLoading] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState("");
  const dispatch = useDispatch();

  const { library, account } = useWeb3React();

    const approveToken = useCallback(async (amount?: BigNumber) => {
      setTransactionHash("");

      try {
        if (token && spender && owner
            && ethers.utils.isAddress(owner)
            && ethers.utils.isAddress(spender)
            && ethers.utils.isAddress(token.address)
           ) {
             setTokenApproveLoading(true);

             const contract = getContract(token.address, ERC20_ABI, library, account as string);

             if (contract) {
               // let overrides = fixGasLimitWithProvider(library, 'approve');
               // const transaction = await contract.approve(spender, MAX_INT, overrides);
               const transaction = await contract.approve(spender, amount ?? MAX_INT);

               setTransactionHash(transaction.hash);

               await transaction.wait(1);

               dispatch(alert(TRANSACTION_SUCCESS));
               if (reload) {
                 setTimeout( () => {
                   window.location.reload()
                 }, 1000)
               }
             }
           }
      } catch (err: any) {
        console.log('[ERROR] - useTokenAllowance:', err);
        const message = err?.code === 4001 ? USER_CLOSE_EXTENSION_MESSAGE : TRANSACTION_ERROR;
        dispatch(alert(message));
        throw new Error(err.message);
      } finally {
        setTokenApproveLoading(false);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner, spender, token]);

  return {
    tokenApproveLoading,
    approveToken,
    setTokenApproveLoading,
    transactionHash
  }
}

export default useTokenAllowance;
