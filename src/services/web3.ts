import { CONTRACT_ADDRESS } from 'constants/mint';
import { NETWORK_URL } from 'constants/network';
import Web3 from 'web3';
import XBORG_ABI from '../abi/Xborg.json';

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
