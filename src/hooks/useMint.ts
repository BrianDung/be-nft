import { MintTimeLine } from 'constants/mint';
import { getContractInstance } from 'services/web3';
import Web3 from 'web3';

export function useMint() {
  async function getTotalSupply() {
    try {
      const contract = getContractInstance();
      if (!contract) {
        throw new Error('Cannot get contract');
      }

      const totalSupply = await contract?.methods.totalSupply().call();

      return totalSupply;
    } catch (e: any) {
      console.log(e);
      return 0;
    }
  }

  async function getMintInfo() {
    const contract = getContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }

    const isSale = await contract.methods.saleIsActive().call();
    const isPublicSale = await contract.methods.PublicsaleIsActive().call();
    const rate = await contract.methods.NFT_PRICE().call();

    let status = MintTimeLine.PublicSaleRound;
    if (!isSale && !isPublicSale) {
      status = MintTimeLine.PreSaleRound;
    }

    if (isSale && !isPublicSale) {
      status = MintTimeLine.SaleRound;
    }

    return { status, rate: Web3.utils.fromWei(rate) };
  }

  return {
    getTotalSupply,
    getMintInfo,
  };
}
