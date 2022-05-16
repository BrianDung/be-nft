import useAuth from 'hooks/useAuth';
import { useSelectedNetwork } from 'hooks/useSelectedNetwork';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import axios from 'services/axios';
import { get } from 'lodash';

const defaultData = {
  isJoined: false,
  canJoin: false,
};

export const useCheckJoinCampaign = (campaignId: number) => {
  const { publicKey } = useWallet();
  const { connectedAccount: address } = useAuth();
  const { isSelectedSolana } = useSelectedNetwork();
  const addressWallet = isSelectedSolana ? publicKey?.toBase58() ?? '' : address;
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const checkJoinCampaign = async () => {
      try {
        const response = await axios.get(`/user/check-join-campaign/${campaignId}?wallet_address=${addressWallet}`);
        setData(get(response, 'data.data', defaultData));
      } catch (err: any) {
        console.error(err);
      }
    };
    if (addressWallet) {
      checkJoinCampaign();
    }
  }, [addressWallet, campaignId]);

  return data || defaultData;
};
