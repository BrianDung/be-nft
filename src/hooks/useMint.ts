import { getContractInstance } from 'services/web3';
import Web3 from 'web3';

export function useMint() {
  async function getMaxMintIndex() {
    try {
      const contract = getContractInstance();
      if (!contract) {
        throw new Error('Cannot get contract');
      }

      const max = await contract?.methods.MaxMintIndex().call();

      return Number(max);
    } catch (e: any) {
      console.log(e);
      return 0;
    }
  }

  async function getMintInfo() {
    const price = await getPriceWithSaleSatage();
    const status = await getSaleStage();
    return { status: Number(status), rate: Number(Web3.utils.fromWei(price)) };
  }

  async function getSaleStage() {
    const contract = getContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    const status = await contract.methods.saleStage().call();
    return status;
  }

  async function getPriceWithSaleSatage() {
    const contract = getContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    const price = await contract.methods.NFT_PRICE().call();
    return price;
  }

  async function getCurrentMintIndex() {
    const contract = getContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    const index = await contract.methods.CurrentMintIndex().call();
    return Number(index);
  }

  async function getEndMintIndex () {
    const contract = getContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    const end = await contract.methods.EndMintIndex().call();
    return Number(end);
  }

  async function getMaxMintPerTX () {
    const contract = getContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    const max = await contract.methods.MaxMintPerTX().call();
    return Number(max);
  }

  async function getStartMintIndex () {
    const contract = getContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    const max = await contract.methods.StartMintIndex().call();
    return Number(max);
  }

  return {
    getMaxMintIndex,
    getMintInfo,
    getSaleStage,
    getCurrentMintIndex,
    getEndMintIndex,
    getMaxMintPerTX,
    getStartMintIndex
  };
}
