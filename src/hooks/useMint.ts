import { useDispatch } from 'react-redux';
import { BaseRequest } from './../request/Request';
import { MintTimeLine } from 'constants/mint';
import Web3 from 'web3';
import { alert } from 'store/actions/alert';

export function useMint() {
  const dispatch = useDispatch();

  async function getTotalSupply() {
    try {
      const request = new BaseRequest();
      const res = await request.get('/total-supply');

      if (res.status !== 200) {
        throw new Error('Fail to get total supply');
      }

      const body = await res.json();

      if (body.status !== 200) {
        throw new Error(body.message);
      }

      return body.data.totalSupply;
    } catch (e: any) {
      dispatch(alert(e.message));
      console.log(e);
      return 0;
    }
  }

  async function getMintInfo() {
    const request = new BaseRequest();
    const res = await request.get('/get-status');

    if (res.status !== 200) {
      throw new Error('Fail to get total supply');
    }

    const body = await res.json();

    if (body.status !== 200) {
      throw new Error(body.message);
    }

    if (body.status !== 200) {
      throw new Error(body.message);
    }

    const { NFT_PRICE, PublicsaleIsActive, saleIsActive } = body.data;

    if (!saleIsActive && !PublicsaleIsActive) {
      return { status: MintTimeLine.PreSaleRound, rate: Web3.utils.fromWei(NFT_PRICE) };
    }

    if (saleIsActive && !PublicsaleIsActive) {
      return { status: MintTimeLine.SaleRound, rate: Web3.utils.fromWei(NFT_PRICE) };
    }

    return { status: MintTimeLine.PublicSaleRound, rate: Web3.utils.fromWei(NFT_PRICE) };
  }

  return {
    getTotalSupply,
    getMintInfo,
  };
}
