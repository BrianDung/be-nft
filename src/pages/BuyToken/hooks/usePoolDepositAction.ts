import { USER_CLOSE_EXTENSION_MESSAGE, TRANSACTION_ERROR } from "./../../../constants/alert";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";

import useUserPurchaseSignature from "../hooks/useUserPurchaseSignature";
import useWalletSignature from "../../../hooks/useWalletSignature";
import { alertSuccess, alertFailure } from "../../../store/actions/alert";
import { NETWORK } from "../../../constants";
import PreSalePool from "../../../abi/PreSalePool.json";
import { getContract } from "../../../utils/contract";
import { TRANSACTION_ERROR_MESSAGE } from "../../../constants/alert";
import axios from "../../../services/axios";

type PoolDepositActionParams = {
  poolAddress?: string;
  poolId?: number;
  purchasableCurrency: string;
  amount: string;
  isClaimable: boolean;
  networkAvailable: string;
  isInPreOrderTime: boolean;
  captchaToken: string;
};

const usePoolDepositAction = ({
  poolAddress,
  poolId,
  purchasableCurrency,
  amount,
  isClaimable,
  networkAvailable,
  isInPreOrderTime,
  captchaToken,
}: PoolDepositActionParams) => {
  const dispatch = useDispatch();

  const [depositError, setDepositError] = useState("");
  const [tokenDepositTransaction, setTokenDepositTransaction] = useState<string>("");
  const [tokenDepositLoading, setTokenDepositLoading] = useState<boolean>(false);
  const [tokenDepositSuccess, setTokenDepositSuccess] = useState<boolean>(false);

  const { account: connectedAccount, library } = useWeb3React();
  const { error, signMessage, signature: authSignature, setSignature } = useWalletSignature();
  const {
    signature,
    maxBuy,
    minBuy,
    error: buyError,
    setSignature: setUserPurchasedSignature,
    responseAmount,
  } = useUserPurchaseSignature(connectedAccount, poolId, authSignature, captchaToken, amount);

  useEffect(() => {
    poolAddress &&
      purchasableCurrency &&
      signature &&
      !depositError &&
      responseAmount &&
      depositWithSignature(poolAddress, purchasableCurrency, responseAmount, signature);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, poolAddress, purchasableCurrency, amount, depositError, responseAmount]);

  useEffect(() => {
    if (error || buyError) {
      const errorMessage = error || buyError;
      setDepositError(errorMessage as string);
      setTokenDepositLoading(false);
      setSignature("");
      setUserPurchasedSignature("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, buyError]);

  const depositWithSignature = useCallback(
    async (poolAddress: string, acceptCurrency: string, amount: string, signature: string) => {
      try {
        if(!connectedAccount) {
          throw new Error(TRANSACTION_ERROR_MESSAGE);
        }

        if (signature && amount) {
          const abiUse = PreSalePool;
          const poolContract = getContract(poolAddress, abiUse, library, connectedAccount as string);

          const method = acceptCurrency === "ETH" ? "buyTokenByEtherWithPermission" : "buyTokenByTokenWithPermission";

          let buyCurr = "ETH";
          switch (networkAvailable) {
            case NETWORK.POLYGON:
              if (acceptCurrency === "USDT") {
                buyCurr = process.env.REACT_APP_USDT_POLYGON_SMART_CONTRACT || "";
              }
              if (acceptCurrency === "USDC") {
                buyCurr = process.env.REACT_APP_USDC_POLYGON_SMART_CONTRACT || "";
              }
              break;

            case NETWORK.ETHEREUM:
              if (acceptCurrency === "USDT") {
                buyCurr = process.env.REACT_APP_USDT_SMART_CONTRACT || "";
              }
              if (acceptCurrency === "USDC") {
                buyCurr = process.env.REACT_APP_USDC_SMART_CONTRACT || "";
              }
              break;
          }
          // if (isBSC) {
          //   if (acceptCurrency === "USDT") {
          //     buyCurr = process.env.REACT_APP_USDT_BSC_SMART_CONTRACT || '';
          //   } else if (acceptCurrency === "USDC") {
          //     buyCurr = process.env.REACT_APP_USDC_BSC_SMART_CONTRACT || '';
          //   }
          // } else {
          //   if (acceptCurrency === "USDT") {
          //     buyCurr = process.env.REACT_APP_USDT_SMART_CONTRACT || '';
          //   } else if (acceptCurrency === "USDC") {
          //     buyCurr = process.env.REACT_APP_USDC_SMART_CONTRACT || '';
          //   }
          // }

          const params =
            acceptCurrency === "ETH"
              ? [
                  connectedAccount,
                  connectedAccount,
                  maxBuy,
                  minBuy,
                  signature,
                  {
                    value: new BigNumber(amount).multipliedBy(10 ** 18).toFixed(),
                  },
                ]
              : [
                  buyCurr,
                  amount,
                  connectedAccount,
                  signature,
                ];
          
          // let overrides = fixGasLimitWithProvider(library, 'buy');
          const transaction = await poolContract[method](...params);

          setUserPurchasedSignature("");
          setSignature("");
          setTokenDepositTransaction(transaction.hash);

          if (isInPreOrderTime) {
            updatePreOrderAmount({ minBuy, maxBuy, signature, amount, connectedAccount });
          }

          await transaction.wait(1);

          dispatch(alertSuccess("Token Deposit Successful!"));
          setTokenDepositSuccess(true);

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (err: any) {
        console.log("[ERROR] - depositWithSignature:", err);
        const message = err?.code === 4001 ? USER_CLOSE_EXTENSION_MESSAGE : TRANSACTION_ERROR;
        dispatch(alertFailure(message));
        setDepositError(message);
        setSignature("");
        setUserPurchasedSignature("");
      } finally {
        setTokenDepositLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [poolAddress, isClaimable, connectedAccount]
  );

  const updatePreOrderAmount = async (params: any) => {
    try {
      const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || "";
      const config = {
        headers: {
          msgSignature: MESSAGE_INVESTOR_SIGNATURE,
        },
      };
      const response = await axios.post(
        "/user/pre-order",
        {
          campaign_id: poolId,
          wallet_address: connectedAccount,
          signature: authSignature,
          amount,
        },
        config
      );

      if (response.data && response.status && response.status === 200) {
        const { data, message, status } = response.data;
        if (data && status === 200) {
          console.log("Update PreOrder success.");
        }
        if (message && status !== 200) {
          console.log(message);
        }
      }
    } catch (e) {
      console.log("ERROR: Error when update PreOrder Amount: ", e);
    }
  };

  const deposit = useCallback(async () => {
    if (amount && new BigNumber(amount).gt(0) && poolAddress) {
      try {
        setTokenDepositTransaction("");
        setDepositError("");
        setTokenDepositLoading(true);
        setTokenDepositSuccess(false);

        await signMessage();
      } catch (err: any) {
        console.log("[ERROR] - deposit:", err);
        const message = err?.code === 4001 ? USER_CLOSE_EXTENSION_MESSAGE : TRANSACTION_ERROR;
        dispatch(alertFailure(message));
        setDepositError(message);
        setSignature("");
        setTokenDepositLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccount, library, poolAddress, amount]);

  // const estimateFee = useCallback(async (amount: string, acceptCurrency: string) => {
  //   try {
  //     setEstimateFeeLoading(true);

  //     if (amount && new BigNumber(amount).gt(0) && poolAddress && acceptCurrency) {
  //       const gasPrice = await library.getGasPrice();
  //       const poolContract = getContract(poolAddress, Pool_ABI, library, connectedAccount as string);
  //       const gasPriceCal = new BigNumber(gasPrice._hex).div(new BigNumber(10).pow(18));

  //       const params = acceptCurrency === 'ETH' ? [
  //         connectedAccount,
  //         connectedAccount,
  //         "100000000000",
  //         "100000000000",
  //         "0x450859e7066471c9e38a481908e3547240285db6af24eed2615a3d825f043e5052bffc0815e98b6a4365526307e2f18b9552bb747739789d624ea666e4fb87ea1b",
  //         {
  //           value: new BigNumber(amount).multipliedBy(10 ** 18).toFixed()
  //         }
  //       ]: [
  //         connectedAccount,
  //         acceptCurrency ===  "USDT" ? USDT_ADDRESS: USDC_ADDRESS,
  //         new BigNumber(amount).multipliedBy(10 ** 18).toFixed(),
  //         connectedAccount,
  //         "100000000000",
  //         "299999999990",
  //         "0x450859e7066471c9e38a481908e3547240285db6af24eed2615a3d825f043e5052bffc0815e98b6a4365526307e2f18b9552bb747739789d624ea666e4fb87ea1b"
  //       ];

  //       const method = acceptCurrency === 'ETH' ? 'buyTokenByEtherWithPermission': 'buyTokenByTokenWithPermission';

  //       const estimateFee = await poolContract.estimateGas[method](...params);

  //       setEstimateErr("");
  //       setEstimateFeeLoading(false);

  //       return new BigNumber(estimateFee._hex).multipliedBy(gasPriceCal).toNumber();
  //     } else {
  //       setEstimateErr("");
  //       setEstimateFeeLoading(false);
  //       return 0;
  //     }

  //   } catch(err) {
  //     console.error(err.message);
  //     setEstimateFeeLoading(false);
  //     setEstimateErr(err.message);
  //   }
  // }, [poolAddress, connectedAccount]);

  return {
    tokenDepositSuccess,
    deposit,
    tokenDepositLoading,
    tokenDepositTransaction,
    setTokenDepositTransaction,
    setTokenDepositLoading,
    depositError,
  };
};

export default usePoolDepositAction;
