/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSelectedNetwork } from '../../../hooks/useSelectedNetwork';
import { BaseRequest } from '../../../request/Request';
import { formatTime } from '../../../constants/formatDate';
import moment from 'moment';
import useWalletSignature from '../../../hooks/useWalletSignature';
import usePoolJoinAction from '../hooks/usePoolJoinAction';
import { alertFailure } from '../../../store/actions/alert';
import { useDispatch } from 'react-redux';
import useAuth from 'hooks/useAuth';

export default (props: any) => {
  const { poolDetails } = props;
  const { connectedAccount: address } = useAuth();

  const { publicKey } = useWallet();
  const dispatch = useDispatch();
  const { isSelectedSolana } = useSelectedNetwork();
  const addressWallet = isSelectedSolana ? publicKey?.toBase58() ?? '' : address;
  const [isCheckWhitelistUser, setIsCheckWhitelistUser] = useState<boolean>(false);
  const [isCheckUser, setIsCheckUser] = useState<any>({});
  const [tierUser, setTierUser] = useState<any>({});
  const joinTimeInDate = formatTime(poolDetails?.startRegisterTime);
  const endJoinTimeInDate = formatTime(poolDetails?.endRegisterTime);
  const now = moment();
  const validDate = joinTimeInDate.isValid() && endJoinTimeInDate.isValid();
  const nowIsBetweenRegisterTime = now.isAfter(joinTimeInDate) && now.isBefore(endJoinTimeInDate);
  const availableJoin = validDate ? nowIsBetweenRegisterTime : false;
  const { signature, signMessage } = useWalletSignature();
  const { poolJoinLoading } = usePoolJoinAction({ poolId: poolDetails?.id, poolDetails });

  //
  const getCheckWhitelistUser = async (campaignId: number | undefined, wallet_address: string) => {
    const baseRequest = new BaseRequest();
    let url = `user/check-whitelist-user?campaign_id=${campaignId}&wallet_address=${wallet_address}`;
    const response = (await baseRequest.get(url)) as any;
    const resObject = await response.json();
    return resObject;
  };

  const callCheckWhitelistUser = async () => {
    const res = await getCheckWhitelistUser(poolDetails?.id, addressWallet);
    if (res.status === 200) {
      setIsCheckWhitelistUser(res.data.isJoined);
      console.log('whitelist', res);
    } else {
      console.log(res.message);
    }
  };
  useEffect(() => {
    callCheckWhitelistUser();
  }, [addressWallet, poolDetails?.id]);
  //
  const getCurrentTier = async () => {
    const baseRequest = new BaseRequest();
    let url = `user/get-tier?owner=${addressWallet}` as any;
    const response = (await baseRequest.get(url)) as any;
    const resObject = await response.json();
    return resObject;
  };

  const callCurrentTier = async () => {
    const res = await getCurrentTier();
    if (res.status === 200) {
      setTierUser(res.data);
    } else {
      console.log(res.message);
    }
  };
  useEffect(() => {
    callCurrentTier();
  }, [addressWallet]);

  //

  const getUserJoinPool = async (signature: string) => {
    const baseRequest = new BaseRequest();
    let url = `/user/join-campaign`;
    const response = await baseRequest.post(url, {
      signature,
      wallet_address: addressWallet,
      campaign_id: poolDetails?.id,
    });
    const resObject = await response.json();
    return resObject;
  };

  const callUserJoinPool = async (signature: string) => {
    const res = await getUserJoinPool(signature);
    if (res.status === 200) {
      setIsCheckUser(res.data);
    } else {
      dispatch(alertFailure(res.message));
    }
  };
  //
  const userJoinPool = async () => {
    if (addressWallet) {
      try {
        await signMessage();
      } catch (err: any) {
        console.log('Error when signing: ', err.message);
      }
    }
  };

  useEffect(() => {
    if (signature) {
      callUserJoinPool(signature);
    }
  }, [poolDetails?.id, addressWallet, signature]);
  const checkMintier = parseInt(tierUser.tier?.tier_id) < poolDetails?.minTier;
  const disableButton = useMemo(() => {
    if (isCheckWhitelistUser) {
      return true;
    }
    return !availableJoin && checkMintier;
  }, [availableJoin, checkMintier, isCheckWhitelistUser]);

  const realyJoin = availableJoin && !checkMintier;

  return (
    <>
      <Button
        text={realyJoin ? 'Registered' : 'Register to join'}
        backgroundColor={realyJoin ? '#3232DC' : '#8203D0'}
        style={{
          width: 200,
          height: 42,
          borderRadius: 60,
          color: 'white',
          border: 'none',
          marginTop: 16,
          padding: 5,
          fontSize: 16,
          lineHeight: '24px',
          fontWeight: 400,
        }}
        loading={poolJoinLoading}
        onClick={userJoinPool}
        disabled={disableButton}
      />
    </>
  );
};
