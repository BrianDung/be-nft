import { useWallet } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { ConnectorNames, connectorNames } from '../constants/connectors';

const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || '';

const rawMessage = MESSAGE_INVESTOR_SIGNATURE;
const rawMessageLength = new Blob([rawMessage]).size;
const message = ethers.utils.toUtf8Bytes('\x19Ethereum Signed Message:\n' + rawMessageLength + rawMessage);
const messageHash = ethers.utils.keccak256(message);

export const getParamsWithConnector = (connectedAccount: string) => ({
  [ConnectorNames.WalletConnect]: {
    method: 'eth_sign',
    params: [connectedAccount, MESSAGE_INVESTOR_SIGNATURE],
  },
  [ConnectorNames.WalletLinkConnect]: {
    method: 'eth_sign',
    params: [connectedAccount, MESSAGE_INVESTOR_SIGNATURE],
  },
  [ConnectorNames.MetaMask]: {
    method: 'personal_sign',
    params: [MESSAGE_INVESTOR_SIGNATURE, connectedAccount],
  },
});

export const useWalletSignatureAsync = () => {
  const connector = useTypedSelector((state) => state.connector).data;
  const { library, account: connectedAccount } = useWeb3React();
  const { signMessage } = useWallet();

  const web3Sign = useCallback(
    async (walletName?: string, account?: string) => {
      if (!connectedAccount || !library) {
        throw new Error('Wallet has not connected');
      }

      const wallet = walletName ?? connector;
      const signAccount = account ?? connectedAccount;
      const paramsWithConnector = getParamsWithConnector(signAccount)[wallet as connectorNames];
      const provider = library.provider;

      if (wallet === ConnectorNames.WalletConnect) {
        const params = [signAccount, messageHash];
        await (library as any).provider.enable();

        return await (library as any).provider.wc.signMessage(params);
      }

      if (wallet === ConnectorNames.WalletLinkConnect) {
        const params = [MESSAGE_INVESTOR_SIGNATURE, signAccount];
        await (library as any).provider.enable();
        const wlProvider = (library as any).provider;
        const signature = await wlProvider._personal_sign(params);

        return signature?.result;
      }

      return new Promise<string | undefined>(async (resolve, reject) => {
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
              resolve(result?.result);
            }
          }
        );
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [library, connector, connectedAccount]
  );

  const solanaSign = useCallback(async () => {
    const encodedMessage = new TextEncoder().encode(MESSAGE_INVESTOR_SIGNATURE);
    return await signMessage!(encodedMessage).catch((error) => {
      throw error;
    });
  }, [signMessage]);

  return {
    web3Sign,
    solanaSign,
  };
};
