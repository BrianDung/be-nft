import { CONTRACT_ADDRESS, CONTRACT_ADDRESS_MINT_AND_SWAP } from 'constants/mint';
import { NETWORK_URL } from 'constants/network';
import Web3 from 'web3';
import XBORG_ABI from '../abi/Mint-Phase2.json';
import BENFT_ABI from '../abi/Mint-BeNFT.json'

export const getContractInstance = (library?: any) => {
  if (!library) {
    const web3Instance = new Web3(NETWORK_URL || '');

    return new web3Instance.eth.Contract(XBORG_ABI as any, CONTRACT_ADDRESS);
  }

  const provider = library?.provider;

  if (provider) {
    const web3Instance = new Web3(provider);
    return new web3Instance.eth.Contract(XBORG_ABI as any, CONTRACT_ADDRESS);
  }

  return;
};

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
