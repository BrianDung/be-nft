/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useWallet } from '@solana/wallet-adapter-react';
import { useSelectedNetwork } from 'hooks/useSelectedNetwork';
import { formatTime } from 'constants/formatDate';
import useWalletSignature from 'hooks/useWalletSignature';
import { alertFailure } from 'store/actions/alert';
import Button from 'pages/BuyToken/Button';
import { BaseRequest } from '../../../request/Request';
import useAuth from 'hooks/useAuth';
import { useCheckJoinCampaign } from 'hooks/useCheckJoinCampaign';

const REGISTERED = 'Registered';

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
  const [poolJoinLoading, setPoolJoinLoading] = useState(false);
  const [btnConfig, setBtnConfig] = useState({
    background: '#2B313A',
    disabled: true,
    btnName: 'Register to join',
  });

  const { isJoined, canJoin } = useCheckJoinCampaign(poolDetails?.id);

  useEffect(() => {
    if (canJoin && !isJoined) {
      setBtnConfig({
        background: 'linear-gradient(102.92deg, #B347FF 6.55%, #454CF9 47.11%, #0961FE 71.51%, #02ACD3 98.22%)',
        disabled: false,
        btnName: 'Register to join',
      });
    }
    if (isJoined) {
      setBtnConfig({
        background: '#07D600',
        disabled: false,
        btnName: REGISTERED,
      });
    }
  }, [canJoin, isJoined]);

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
    // callCurrentTier();
  }, [addressWallet]);

  //

  const getInfoPoolUser = async (signature: string) => {
    const baseRequest = new BaseRequest();
    let url = `/user/check-join-campaign/${poolDetails?.id}`;
    const response = await baseRequest.get(url);
    const resObject = await response.json();
    return resObject;
  };

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
    console.log({
      userJoinPool: addressWallet && btnConfig.btnName !== REGISTERED,
    });
    if (addressWallet && btnConfig.btnName !== REGISTERED) {
      try {
        await signMessage();
        setPoolJoinLoading(true);
      } catch (err: any) {
        setPoolJoinLoading(false);
        console.log('Error when signing: ', err.message);
      }
    }
  };

  useEffect(() => {
    if (signature) {
      callUserJoinPool(signature);
      getInfoPoolUser(signature);
    }
  }, [signature]);
  // const isMatchNetwork = NETWORK_AVAILABLE_MAP[appChainID] === networkAvailable;
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
        text={btnConfig.btnName}
        backgroundColor={btnConfig.background}
        style={{
          width: 200,
          height: 42,
          borderRadius: 60,
          color: 'white',
          border: 'none',
          marginTop: 16,
          padding: 5,
          fontSize: 14,
          lineHeight: '24px',
          fontFamily: 'Montserrat-Medium',
          fontWeight: 500,
        }}
        loading={poolJoinLoading}
        onClick={userJoinPool}
        disabled={btnConfig.disabled}
      />
    </>
  );
};
