import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || '';
const MESSAGE_SIGNATURE = process.env.REACT_APP_MESSAGE_SIGNATURE || '';

const getSignMethod = (account: string, isAdmin?: boolean) => {
  return {
    method: 'personal_sign',
    params: [isAdmin ? MESSAGE_SIGNATURE : MESSAGE_INVESTOR_SIGNATURE, account],
  };
};

export const useWalletSignatureAsync = () => {
  const { library, account: connectedAccount } = useWeb3React();

  const web3Sign = useCallback(
    async (account?: string, isAdmin?: boolean) => {
      if (!connectedAccount || !library) {
        throw new Error('Wallet has not connected');
      }

      const signAccount = account ?? connectedAccount;
      const paramsWithConnector = getSignMethod(signAccount, isAdmin);
      const provider = library.provider;

      return new Promise<string>(async (resolve, reject) => {
        await (provider as any).sendAsync(
          {
            method: paramsWithConnector.method,
            params: paramsWithConnector.params,
          },
          async function (err: Error, result: any) {
            if (err || result.error) {
              const error = err || (err as any).error || result.error;
              reject(error);
            } else {
              resolve(result?.result || '');
            }
          }
        );
      });
    },
    [library, connectedAccount]
  );

  return {
    web3Sign,
  };
};
