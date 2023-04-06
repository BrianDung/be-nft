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

  async function getAddressUSDT() {
    const contract = getBeNftContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    try {
      const address = await contract.methods.USDT().call();
      return address;
    } catch (error) {
      return '';
    }
  }

  async function getTokenDecimal() {
    const contract = getBeNftContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    try {
      const index = await contract.methods.TokenDecimal().call();
      return Number(index);
    } catch (error) {
      return 0;
    }
  }

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
    const number = await contract.methods.swapTokensCount(address).call();
    return Number(number);
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
    try {
      const max = await contract.methods.maxSupply().call();
      return Number(max);
    } catch (error) {
      return 0;
    }
  }

  async function getMintedNftCount(address: string) {
    const contract = getBeNftContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    try {
      const max = await contract.methods.mintedTokensCount(address).call();
      return Number(max);
    } catch (error) {
      return 0;
    }
  }

  async function getMintState() {
    const contract = getBeNftContractInstance();
    if (!contract) {
      throw new Error('Cannot get contract');
    }
    try {
      const state = await contract.methods.mintState().call();
      return state;
    } catch (error) {
      return false;
    }
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
    getAddressUSDT,
    getTokenDecimal,
    getMintedNftCount,
    getMintState,
  };
}
