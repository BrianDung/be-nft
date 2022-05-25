import Web3 from 'web3';

export const getContractInstance = (library: any, ABIContract: any, contractAddress: string) => {
  const provider = library?.provider;

  if (provider) {
    const web3Instance = new Web3(provider);

    return new web3Instance.eth.Contract(ABIContract, contractAddress);
  }

  return;
};
