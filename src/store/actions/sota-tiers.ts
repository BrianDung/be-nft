import { sotaTiersActions } from "../constants/sota-tiers";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { convertFromWei, convertToWei, getContractInstance, SmartContractMethod } from "../../services/web3";
import { getContract } from "../../utils/contract";
import { BaseRequest } from "../../request/Request";
import RedKite from "../../abi/RedKiteTiers.json";
import { getBalance } from "./balance";
import { Web3Provider } from "@ethersproject/providers";
import { alertFailure, alertSuccess } from "../../store/actions/alert";

import { getAllowance } from "./sota-token";
import { getTokenStakeSmartContractInfo, getTokenStakeAPIInfo } from "../../utils/campaign";

export const resetTiers = () => {
  return {
    type: sotaTiersActions.USER_TIER_RESET,
  };
};

export interface UserTier {
  id: number;
  tierId: string | number;
  name: string;
  minCommon: number;
  minRare: number;
  minElite: number;
  total: number;
  createdAt?: string | Date;
  updatedAt?: string;
  poolWeight: number;
}

export const getTiers = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: sotaTiersActions.TIERS_LOADING });
    try {
      // const { appChainID } = getState().appNetwork.data;
      // const connector  = getState().connector.data;
      // const contract = getContractInstance(
      //   RedKite.abi,
      //   process.env.REACT_APP_TIERS as string,
      //   connector,
      //   appChainID,
      //   SmartContractMethod.Read,
      //   forceUsingEther === 'eth'
      // );
      // let result = await contract?.methods.getTiers().call();

      const baseRequest = new BaseRequest();
      const response = (await baseRequest.get(`/get-tiers`)) as any;
      const resObj = await response.json();

      if (!resObj.status || resObj.status !== 200 || !resObj.data) {
        dispatch({
          type: sotaTiersActions.TIERS_FAILURE,
          payload: new Error("Invalid tiers payload"),
        });
        return;
      }

      let result = resObj.data;

      result = result.filter((e: any) => e?.toString() !== "0");
      result = result.map((e: any) => {
        return parseFloat(convertFromWei(e));
      });

      dispatch({
        type: sotaTiersActions.TIERS_SUCCESS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: sotaTiersActions.TIERS_FAILURE,
        payload: error,
      });
    }
  };
};

export const getUserTier = (address: string, forceUsingEther: string = "eth") => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: sotaTiersActions.USER_TIER_LOADING });
    try {
      // const { appChainID } = getState().appNetwork.data;
      // const connector = getState().connector.data;

      // const contract = getContractInstance(
      //   RedKite.abi,
      //   process.env.REACT_APP_TIERS as string,
      //   connector,
      //   appChainID,
      //   SmartContractMethod.Read,
      //   forceUsingEther === 'eth'
      // );

      // const {
      //   tokenStakes,
      //   rateSettings,
      //   rateStakeInfo
      // } = await getTokenStakeSmartContractInfo(contract, address);
      // await dispatch(getRates(rateSettings));
      // // console.log('tokenStakesInfo:', tokenStakes, rateSettings, rateStakeInfo);

      // // Find Tier of user
      // // let tiers = (await contract?.methods.getTiers().call()) || [];

      // let tiers = [];
      // const baseRequest = new BaseRequest();
      // const response = await baseRequest.get(`/get-tiers`) as any;
      // const resObj = await response.json();

      // if (resObj.status && resObj.status === 200 && resObj.data) {
      //   tiers = resObj.data;
      // }
      // tiers = tiers.slice(0, 4);

      // console.log('tokenStakesInfo-tiers:', tiers);
      // // @ts-ignore
      // const pkfEq = new BigNumber(tokenStakes?.totalStaked || 0).multipliedBy(Math.pow(10, 18));
      // let userTier = 0;
      // tiers.map((pkfRequire: any, index: number) => {
      //   if (pkfEq.gte(pkfRequire)) {
      //     userTier = index + 1;
      //   }
      // });

      let userTier = {
        id: -9999,
        tierId: 0,
        name: "",
        minCommon: 0,
        minRare: 0,
        minElite: 0,
        total: 0,
        createdAt: null,
        updatedAt: "",
        poolWeight: 0,
      };
      const baseRequest = new BaseRequest();
      const response = (await baseRequest.get(`/user/get-tier?owner=${address}`)) as any;
      const resObj = await response.json();

      if (resObj.status && resObj.status === 200 && resObj?.data && resObj.data.tier) {
        const tier = resObj.data.tier;

        userTier = {
          id: tier.id,
          tierId: Number(tier.tier_id),
          name: tier.name,
          minCommon: tier.min_common,
          minRare: tier.min_rare,
          minElite: tier.min_elite,
          total: tier.total,
          createdAt: tier.created_at,
          updatedAt: tier.updated_at,
          poolWeight: tier.pool_weight,
        };
      }

      dispatch({
        type: sotaTiersActions.USER_TIER_SUCCESS,
        payload: userTier,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: sotaTiersActions.USER_TIER_FAILURE,
        payload: error,
      });
    }
  };
};

export const getUserInfo = (address: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: sotaTiersActions.USER_INFO_LOADING });
    try {
      const { tokenStakes, rateSettings, userTier } = await getTokenStakeAPIInfo(address);
      await dispatch(getRates(rateSettings));

      dispatch({
        type: sotaTiersActions.USER_TIER_SUCCESS,
        payload: userTier,
      });

      dispatch({
        type: sotaTiersActions.USER_INFO_SUCCESS,
        payload: tokenStakes,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: sotaTiersActions.USER_INFO_FAILURE,
        payload: error,
      });
    }
  };
};

export const getUserInfoLegacy = (address: string, forceUsingEther: string = "eth", tokenAddress: string = "") => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: sotaTiersActions.USER_INFO_LOADING });
    try {
      const { appChainID } = getState().appNetwork.data;
      const connector = undefined;

      const contract = getContractInstance(
        RedKite.abi,
        process.env.REACT_APP_TIERS as string,
        connector,
        appChainID,
        SmartContractMethod.Read,
        forceUsingEther === "eth"
      );

      const { tokenStakes } = await getTokenStakeSmartContractInfo(contract, address);

      dispatch({
        type: sotaTiersActions.USER_INFO_LEGACY_SUCCESS,
        payload: tokenStakes,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: sotaTiersActions.USER_INFO_LEGACY_FAILURE,
        payload: error,
      });
    }
  };
};

export const deposit = (
  address: string | null | undefined,
  amount: string,
  library: Web3Provider,
  tokenAddress: string
) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: sotaTiersActions.DEPOSIT_LOADING });
    try {
      let result = {} as any;
      const contract = getContract(process.env.REACT_APP_TIERS as string, RedKite.abi, library, address || "");

      // Fake Gas Limit for Wallet Link
      // let overrides = fixGasLimitWithProvider(library, 'deposit');
      // result = await contract?.depositERC20(tokenAddress, convertToWei(amount), overrides);
      result = await contract?.depositERC20(tokenAddress, convertToWei(amount));

      dispatch({
        type: sotaTiersActions.DEPOSIT_SUCCESS,
        payload: result,
      });
      await result.wait(1);
      if (result) {
        dispatch(getBalance(address || ""));
        dispatch(getAllowance(address || ""));
        dispatch(getUserTier(address || ""));
        dispatch(getUserInfo(address || ""));
      }
      dispatch(alertSuccess("You have successfully staked."));
      dispatch(redirectToMyTier);
    } catch (error) {
      console.log(error);
      dispatch(alertFailure("Transaction submited failure"));

      dispatch({
        type: sotaTiersActions.DEPOSIT_FAILURE,
        payload: error,
      });
    }
  };
};

const redirectToMyTier = () => {
  window.location.href = "/#/account?tab=1";
};

export const withdraw = (
  address: string | null | undefined,
  amount: string,
  library: Web3Provider,
  tokenAddress: string
) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: sotaTiersActions.WITHDRAW_LOADING });
    try {
      let result = {} as any;

      const contract = getContract(process.env.REACT_APP_TIERS as string, RedKite.abi, library, address || "");
      result = await contract?.withdrawERC20(tokenAddress, convertToWei(amount));

      dispatch({
        type: sotaTiersActions.WITHDRAW_SUCCESS,
        payload: result,
      });

      await result.wait(1);
      if (result) {
        dispatch(getBalance(address || ""));
        dispatch(getAllowance(address || ""));
        dispatch(getUserTier(address || ""));
        dispatch(getUserInfo(address || ""));
      }
      dispatch(alertSuccess("You have successfully unstaked."));
      dispatch(redirectToMyTier);
    } catch (error) {
      console.log(error);
      dispatch(alertFailure("Transaction submit failure"));
      dispatch({
        type: sotaTiersActions.WITHDRAW_FAILURE,
        payload: error,
      });
    }
  };
};

export const getWithdrawFee = (address: string | null | undefined, amount: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: sotaTiersActions.WITHDRAW_FEE_LOADING });
    try {
      const { appChainID } = getState().appNetwork.data;
      const connector = getState().connector.data;
      let data = {};
      const contract = getContractInstance(RedKite.abi, process.env.REACT_APP_TIERS as string, connector, appChainID);

      data = await contract?.methods
        .calculateWithdrawFee(address, process.env.REACT_APP_PKF, convertToWei(amount))
        .call();

      const fee = convertFromWei(data);
      const feePercent = (parseFloat(fee || "0") * 100) / parseFloat(amount || "0");

      const result = {
        fee: fee,
        feePercent: feePercent,
      };

      dispatch({
        type: sotaTiersActions.WITHDRAW_FEE_SUCCESS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: sotaTiersActions.WITHDRAW_FEE_FAILURE,
        payload: error,
      });
    }
  };
};

export const getWithdrawPercent = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: sotaTiersActions.WITHDRAW_PERCENT_LOADING });
    try {
      const { appChainID } = getState().appNetwork.data;
      const { connector } = getState().connector.data || "Metamask";
      let result = {};
      let data = [];
      const contract = getContractInstance(RedKite.abi, process.env.REACT_APP_TIERS as string, connector, appChainID);

      result = await contract?.methods.withdrawFeePercent(0).call();
      data.push(result);
      result = await contract?.methods.withdrawFeePercent(1).call();
      data.push(result);
      result = await contract?.methods.withdrawFeePercent(2).call();
      data.push(result);
      result = await contract?.methods.withdrawFeePercent(3).call();
      data.push(result);
      result = await contract?.methods.withdrawFeePercent(4).call();
      data.push(result);
      result = await contract?.methods.withdrawFeePercent(5).call();
      data.push(result);

      result = {
        ...result,
        penaltiesPercent: data,
      };

      dispatch({
        type: sotaTiersActions.WITHDRAW_PERCENT_SUCCESS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: sotaTiersActions.WITHDRAW_PERCENT_FAILURE,
        payload: error,
      });
    }
  };
};

export const getRates = (tokens: any) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: sotaTiersActions.RATES_LOADING });
    try {
      const { appChainID } = getState().appNetwork.data;
      const { connector } = getState().connector.data || "Metamask";
      getContractInstance(
        RedKite.abi,
        process.env.REACT_APP_TIERS as string,
        connector,
        appChainID,
        SmartContractMethod.Read,
        true
      );

      let data = [] as any;
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        // Disable get rate from smart contract
        // const result = await contract?.methods.externalToken(token.address).call();
        // const rate = (new BigNumber(result.rate)).div(new BigNumber(10**result.decimals)).toString();
        // data.push({rate, symbol: token.symbol, name: token.name})

        data.push({ rate: token.rate, symbol: token.symbol, name: token.name });
      }
      const result = {
        data: data,
      };

      dispatch({
        type: sotaTiersActions.RATES_SUCCESS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: sotaTiersActions.RATES_FAILURE,
        payload: error,
      });
    }
  };
};
