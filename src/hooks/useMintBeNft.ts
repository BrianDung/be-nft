import { getBeNftContractInstance } from 'services/web3';
import Web3 from 'web3';

export function useMintBeNft() {
  async function getSaleStage() {
    try {
      const contract = getBeNftContractInstance();
      if (!contract) {
        throw new Error('Cannot get contract');
      }

      const saleStage = await contract?.methods.saleStage().call();

      return Number(saleStage);
    } catch (e: any) {
      console.log(e);
      return 0;
    }
  }

  // async function getMintInfo() {
  //   const price = await getPriceWithSaleSatage();
  //   const status = await getSaleStage();
  //   return { status: Number(status), rate: Number(Web3.utils.fromWei(price)) };
  // }

  async function getSwapCurrentIndex() {
    const contract = getBeNftContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    try {
      const index = await contract.methods.CurrentSwapIndex().call();
      return Number(index);
    } catch (error) {
      return 0;
    }
  }

  async function getNftPrice() {
    const contract = getBeNftContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    try {
      const price = await contract.methods.NFT_PRICE().call();
      return price;
    } catch (error) {
      return 0;
    }
  }

  async function getSwapTokensCount(address: string) {
    const contract = getBeNftContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    if (!address || !Web3.utils.isAddress(address)) {
      throw new Error('Cannot get address');
    }
    const index = await contract.methods.swapTokensCount(address).call();
    return Number(index);
  }

  async function getEndRoundSwapIndex() {
    const contract = getBeNftContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    const end = await contract.methods.EndRoundSwapIndex().call();
    return Number(end);
  }

  async function getMaxMintPerTX() {
    const contract = getBeNftContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    try {
      const max = await contract.methods.MaxMintPerWallet().call();
      return Number(max);
    } catch (error) {
      return 0;
    }
  }

  async function getMaxSwapIndex() {
    const contract = getBeNftContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    try {
      const max = await contract.methods.MaxSwapIndex().call();
      return Number(max);
    } catch (error) {
      return 0;
    }
  }

  async function getMaxSupply() {
    const contract = getBeNftContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    const max = await contract.methods.maxSupply().call();
    return Number(max);
  }

  return {
    getSaleStage,
    getSwapCurrentIndex,
    getMaxSwapIndex,
    getMaxSupply,
    getNftPrice,
    getEndRoundSwapIndex,
    getMaxMintPerTX,
    getSwapTokensCount,
  };
}
