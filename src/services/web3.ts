import Web3 from 'web3';

export const getContractInstance = (ABIContract: any, contractAddress: string) => {
  const provider = (window as any).ethereum;

  if (provider) {
    const web3Instance = new Web3(provider);

    return new web3Instance.eth.Contract(ABIContract, contractAddress);
  }

  return;
};
