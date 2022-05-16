/* eslint-disable react-hooks/exhaustive-deps */

import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'services/axios';
import { updateMyPoint } from 'store/actions/global';
import { nFormatter } from 'utils/formatNumber';


interface IProps {
  address: string;
}

export const useMyPoint = (props: IProps) => {
  const { address } = props;

  const [flagRefresh, setFlagRefresh] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const getUserPoint = async (address: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/user/get-score-nft?owner=${address}`);
        const score = get(response, 'data.data', '0');
        dispatch(updateMyPoint(nFormatter(score)));
      } catch (e: any) {
        console.error(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      getUserPoint(address);
    }
  }, [flagRefresh, address]);

  return {
    refreshMyPoint: () => setFlagRefresh(Date.now()),
    loading,
    error,
  };
};
