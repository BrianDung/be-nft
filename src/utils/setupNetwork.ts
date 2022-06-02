import { APP_NETWORKS_SUPPORT, NetworkInfo } from '../constants/network';
import { ConnectorNames } from '../constants/connectors';
import detectEthereumProvider from '@metamask/detect-provider';

async function getProvider() {
  const provider: any = await detectEthereumProvider();

  if (!provider) {
    throw new Error('Invalid provider');
  }

  if (!!provider.providers && Array.isArray(provider.providers)) {
    const metamaskProvider = provider.providers?.find((provider: any) => provider.isMetaMask);
    provider.setSelectedProvider(metamaskProvider);

    return metamaskProvider;
  }

  return provider;
}

export const switchNetwork = async (chainId: string, walletName: string) => {
  const provider = await getProvider();
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
