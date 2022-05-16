import { useDispatch } from 'react-redux';
import { useState } from 'react';
import useAuth from 'hooks/useAuth';
import { useSelectedNetwork } from 'hooks/useSelectedNetwork';
import { BaseRequest } from './../../../../request/Request';
import { alertFailure } from 'store/actions/alert';

export const usePublicSellPurchased = () => {
  const { isSelectedSolana } = useSelectedNetwork();
  const { isAuth, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function getPublicSellPurchased(campaignId: string) {
    if (!isAuth || !campaignId) {
      return 0;
    }

    setLoading(true);
    try {
      const request = new BaseRequest(isSelectedSolana);
      const res = await request.get(`/user/check-purchaser-transaction?campaign_id=${campaignId}`);
      if (res.status !== 200) {
        throw new Error('Failed to load public sell purchased.');
      }

      const resData = await res.json();

      if (resData?.status === 401) {
        throw new Error('Unauthorize: Token expired.');
      }

      if (resData?.status !== 200) {
        throw new Error('Failed to load public sell purchased: ' + resData?.message);
      }

      return resData.data;
    } catch (e: any) {
      if (e.message?.includes('Unauthorize')) {
        logout();
      }

      dispatch(alertFailure(e.message));
      return 0;
    } finally {
      setLoading(false);
    }
  }

  return {
    getPublicSellPurchased,
    loading,
  };
};
