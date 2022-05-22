import { CONTRACT_ADDRESS, MintTimeLine } from 'constants/mint';
import { getContractInstance } from 'services/web3';
import XBORG_ABI from '../abi/Xborg.json';
import Web3 from 'web3';

export function useMint() {
  function retrieveContract() {
    if (!CONTRACT_ADDRESS) {
      throw new Error('Invalid contract address');
    }

    const contract = getContractInstance(XBORG_ABI, CONTRACT_ADDRESS);

    if (!contract) {
      throw new Error('Failed to get contract');
    }

    return contract;
  }

  async function getRate() {
    try {
      const contract = retrieveContract();
      const rate = await contract.methods.NFT_PRICE().call();

      return Web3.utils.fromWei(rate);
    } catch (e: any) {
      //dispatch(alert(e.message));
      console.log(e);
      return 0;
    }
  }

  async function getTotalSupply() {
    try {
      const contract = retrieveContract();
      const totalSupply = await contract.methods.totalSupply().call();

      return totalSupply;
    } catch (e: any) {
      //dispatch(alert(e.message));
      console.log(e);
      return 0;
    }
  }

  async function checkTimeline() {
    const contract = retrieveContract();

    const isSale = await contract.methods.saleIsActive().call();
    const isPublicSale = await contract.methods.PublicsaleIsActive().call();

    if (!isSale && !isPublicSale) {
      return MintTimeLine.PreSaleRound;
    }

    if (isSale && !isPublicSale) {
      return MintTimeLine.SaleRound;
    }

    return MintTimeLine.PublicSaleRound;
  }

  return {
    checkTimeline,
    getTotalSupply,
    getRate,
  };
}
