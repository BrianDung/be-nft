import Web3 from 'web3';
import { NETWORK_AVAILABLE } from '../constants';

const POOL_ABI = require('../abi/Pool.json');

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL || '';
const POLYGON_NETWORK_URL = process.env.REACT_APP_POLYGON_RPC_URL || '';
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
    // case NETWORK_AVAILABLE.BSC:
    //   provider = new Web3.providers.HttpProvider(BSC_NETWORK_URL);
    //   return new Web3(provider);

    case NETWORK_AVAILABLE.POLYGON:
      provider = new Web3.providers.HttpProvider(POLYGON_NETWORK_URL);
      return new Web3(provider);

    case NETWORK_AVAILABLE.ETH:
      provider = new Web3.providers.HttpProvider(NETWORK_URL);
      return new Web3(provider);

    default:
      return null;
  }
};

export const getPoolContract = ({ networkAvailable, poolHash }: any) => {
  const web3Instance = getContractInstanceWeb3(networkAvailable);
  if (!web3Instance) {
    return null;
  }

  return new web3Instance.eth.Contract(POOL_ABI, poolHash);
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
