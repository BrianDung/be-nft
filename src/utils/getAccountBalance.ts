import { ethers } from 'ethers';

const ETH_RPC_URL = process.env.REACT_APP_NETWORK_URL || '';

const getAccountBalance = async (
  appChainID: string,
  walletChainID: string,
  connectedAccount: string,
  connector: string
) => {
  if (appChainID && connectedAccount && connector) {
    const exactNetwork = appChainID === walletChainID;

    const provider = new ethers.providers.JsonRpcProvider(ETH_RPC_URL);

    const accountBalance = exactNetwork ? await provider.getBalance(connectedAccount) : { _hex: '0x00' };

    return accountBalance;
  }

  return { _hex: '0x00' };
};

export default getAccountBalance;
