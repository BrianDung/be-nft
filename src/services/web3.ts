import { CONTRACT_ADDRESS_MINT_AND_SWAP } from 'constants/mint';
import { NETWORK_URL } from 'constants/network';
import Web3 from 'web3';
import BENFT_ABI from '../abi/Mint-BeNFT.json';
import ERC20_ABI from '../abi/ERC20.json';

export const getBeNftContractInstance = (library?: any) => {
  if (!library) {
    const web3Instance = new Web3(NETWORK_URL || '');

    return new web3Instance.eth.Contract(BENFT_ABI as any, CONTRACT_ADDRESS_MINT_AND_SWAP);
  }

  const provider = library?.provider;

  if (provider) {
    const web3Instance = new Web3(provider);
    return new web3Instance.eth.Contract(BENFT_ABI as any, CONTRACT_ADDRESS_MINT_AND_SWAP);
  }

  return;
};

export const getContractInstanceUSDT = (address: string, library?: any) => {
  if (!library) {
    const web3Instance = new Web3(NETWORK_URL || '');

    return new web3Instance.eth.Contract(ERC20_ABI as any, address);
  }

  const provider = library?.provider;

  if (provider) {
    const web3Instance = new Web3(provider);
    return new web3Instance.eth.Contract(ERC20_ABI as any, address);
  }

  return;
};
