import { APP_NETWORKS_SUPPORT, NetworkInfo } from '../constants/network';
import { ConnectorNames } from '../constants/connectors';

export const switchNetwork = async (chainId: string, walletName: string) => {
  const provider = (window as any).ethereum;
  if (!provider) {
    throw new Error('Invalid provider');
  }

  const networkInfo = APP_NETWORKS_SUPPORT[+chainId];

  if (walletName !== ConnectorNames.MetaMask || !networkInfo) {
    return true;
  }

  return provider
    .request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: networkInfo.details?.chainId }],
    })
    .catch((error: any) => {
      if (error.code === 4902) {
        return addConnection(provider, networkInfo);
      }

      throw error;
    });
};

export const addConnection = async (provider: any, networkInfo: NetworkInfo) => {
  return provider.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        ...(networkInfo.details || {}),
      },
    ],
  });
};
