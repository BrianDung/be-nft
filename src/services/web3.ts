import Web3 from 'web3';
import { NETWORK_AVAILABLE } from '../constants';

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL || '';
export const MAX_INT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export enum SmartContractMethod {
  Write = 'Write',
  Read = 'Read',
}

export const isMetaMaskInstalled = () => {
  const windowObj = window as any;
  const { ethereum } = windowObj;
  return ethereum && ethereum.isMetaMask;
};

export const getContractInstance = (ABIContract: any, contractAddress: string) => {
  const provider = (window as any).ethereum;

  if (provider) {
    const web3Instance = new Web3(provider);

    return new web3Instance.eth.Contract(ABIContract, contractAddress);
  }

  return;
};

export const getContractInstanceWeb3 = (networkAvailable: string) => {
  let provider;
  switch (networkAvailable) {
    case NETWORK_AVAILABLE.ETH:
      provider = new Web3.providers.HttpProvider(NETWORK_URL);
      return new Web3(provider);

    default:
      return null;
  }
};

export const getContractInstanceWithEthereum = (ABIContract: any, contractAddress: string) => {
  const windowObj = window as any;
  const { ethereum } = windowObj;
  if (ethereum && ethereum.isMetaMask) {
    const web3Instance = new Web3(ethereum);
    return new web3Instance.eth.Contract(ABIContract, contractAddress);
  } else if (windowObj.web3) {
    const web3Instance = new Web3(windowObj.web3.currentProvider);
    return new web3Instance.eth.Contract(ABIContract, contractAddress);
  } else {
    return null;
  }
};

export const convertFromWei = (value: any, unit = 'ether') => {
  return Web3.utils.fromWei(value);
};

export const isValidAddress = (address: string) => {
  return Web3.utils.isAddress(address);
};

export const convertToBN = (number: string) => {
  return Web3.utils.toBN(number);
};
