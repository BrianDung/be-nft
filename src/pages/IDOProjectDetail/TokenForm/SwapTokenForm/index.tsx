import { BigNumber } from 'bignumber.js';
import TransactionSubmitModal from 'components/Base/TransactionSubmitModal';
import { USER_CLOSE_EXTENSION_MESSAGE, TRANSACTION_ERROR } from 'constants/alert';
import { PurchaseCurrency } from 'constants/purchasableCurrency';
import useAuth from 'hooks/useAuth';
import { PoolDetails } from 'hooks/usePoolDetails';
import useTokenAllowance from 'hooks/useTokenAllowance';
import useTokenBalance from 'hooks/useTokenBalance';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alertFailure } from 'store/actions/alert';
import { connectWalletSuccess } from 'store/actions/wallet';
import { getUSDCAddress, getUSDTAddress } from 'utils/contractAddress/getAddresses';
import { formatRoundDown, formatRoundUp, numberWithCommas } from 'utils/formatNumber';
import getAccountBalance from 'utils/getAccountBalance';
import { PoolStatus } from 'utils/getPoolStatus';
import { getEtherscanName } from 'utils/network';
import { useApproveToken } from '../hooks/useApproveToken';
import { useDeposit } from '../hooks/useDeposit';
import useStyles from '../style';
import { SwapHeader } from './components/FormTitle';
import { SwapForm } from './components/SwapForm';

const getApproveToken = (appChainID: string, purchasableCurrency: string) => {
    if (purchasableCurrency && purchasableCurrency === PurchaseCurrency.USDT) {
        return {
            address: getUSDTAddress(appChainID),
            name: 'USDT',
            symbol: 'USDT',
            decimals: 18,
        };
    }

    if (purchasableCurrency && purchasableCurrency === PurchaseCurrency.USDC) {
        return {
            address: getUSDCAddress(appChainID),
            name: 'USDC',
            symbol: 'USDC',
            decimals: 18,
        };
    }

    if (purchasableCurrency && purchasableCurrency === PurchaseCurrency.ETH) {
        return {
            address: '0x00',
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
        };
    }
};

export enum SwapStep {
    Start,
    Approve,
    Swap,
    // When max bought token
    EndSwap,
}

type SwapTokenFormProps = {
    inBuyTime: boolean;
    maxAllocation: BigNumber;
    poolDetails: PoolDetails;
    userPurchased: BigNumber;
    remainingToken: BigNumber;
    currencyName: string;
    onFetchUserPurchased: () => Promise<any>;
    disabled: boolean;
};

export const SwapTokenForm: React.FC<SwapTokenFormProps> = ({
    inBuyTime,
    maxAllocation,
    poolDetails,
    userPurchased,
    remainingToken,
    currencyName,
    onFetchUserPurchased,
    disabled
}: SwapTokenFormProps) => {
    const {
        tokenDetails,
        poolAddress,
        isDeployed,
        purchasableCurrency,
        ethRate: rate,
        id,
        networkAvailable,
        campaignStatus
    } = poolDetails;
    const [tokenAllowance, setTokenAllowance] = useState<number | undefined>(undefined);
    const [tokenBalance, setTokenBalance] = useState<number>(0);
    const [openApproveModal, setOpenApproveModal] = useState(false);
    const [openDepositModal, setOpenDepositModal] = useState(false);

    const styles = useStyles();
    const dispatch = useDispatch();
    const { connectedAccount } = useAuth();
    const { appChainID, walletChainID } = useTypedSelector((state) => state.appNetwork).data;
    const connector = useTypedSelector((state) => state.connector).data;
    const { retrieveTokenAllowance } = useTokenAllowance();
    const tokenToApprove = getApproveToken(appChainID, purchasableCurrency?.toUpperCase() ?? '');
    const { retrieveTokenBalance } = useTokenBalance(tokenToApprove, connectedAccount);
    const { approveToken, transactionHash } = useApproveToken(tokenToApprove, connectedAccount, poolAddress);
    const { deposit, tokenDepositTransaction } = useDeposit({
        campaignId: id,
        connectedAccount,
        networkAvailable,
    });

    const etherscanName = getEtherscanName({ networkAvailable });
    const isMaxBought = remainingToken.isLessThanOrEqualTo(0);
    const currentStep = useMemo(() => {
        if (!isDeployed) {
            return SwapStep.Start;
        }

        if(!inBuyTime) {
            return SwapStep.EndSwap;
        }

        if (!tokenAllowance && !isMaxBought) {
            return SwapStep.Approve;
        }

        if (isMaxBought && campaignStatus === PoolStatus.Progress) {
            return SwapStep.Swap;
        }

        if (isMaxBought) {
            return SwapStep.EndSwap;
        }

        if (tokenAllowance) {
            return SwapStep.Swap;
        }

        return SwapStep.EndSwap;
    }, [tokenAllowance, isDeployed, isMaxBought ,inBuyTime, campaignStatus]);

    const fetchPoolDetails = useCallback(async () => {
        if (tokenDetails && poolAddress && connectedAccount && tokenToApprove) {
            setTokenAllowance((await retrieveTokenAllowance(tokenToApprove, connectedAccount, poolAddress)) as number);
            setTokenBalance((await retrieveTokenBalance(tokenToApprove, connectedAccount)) as number);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenDetails, connectedAccount, tokenToApprove, poolAddress]);

    useEffect(() => {
        fetchPoolDetails();
    }, [connectedAccount, appChainID, fetchPoolDetails]);

    const validateDeposit = (amount: string | number) => {
        const currencyUserBought = formatRoundUp(new BigNumber(userPurchased));
        const remainCurrencyAvailable = formatRoundDown(new BigNumber(maxAllocation).minus(currencyUserBought));
        const userInputAmount = new BigNumber(amount);

        if (tokenAllowance && userInputAmount.gt(new BigNumber(tokenAllowance))) {
            dispatch(alertFailure(`Not enough approval`));
            return false;
        }

        const isOverMaxBuy = userInputAmount.gt(remainCurrencyAvailable);
        if (isOverMaxBuy) {
            dispatch(
                alertFailure(`You can only buy up to ${numberWithCommas(remainCurrencyAvailable, 2)} ${currencyName}`)
            );
            return false;
        }

        // Check over Token
        const estimateTokens = userInputAmount.div(rate);
        const isOverRemainToken = new BigNumber(estimateTokens).gt(remainingToken);
        if (isOverRemainToken) {
            dispatch(
                alertFailure(
                    `Not enough token for sale, you can only buy up to ${numberWithCommas(
                        remainingToken.toFixed(),
                        2
                    )} ${tokenDetails?.symbol}`
                )
            );
            return false;
        }

        return true;
    };

    async function handleApprove(amount: string | number) {
        try {
            setOpenApproveModal(true);
            const requestAmount = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(tokenDetails.decimals));
            const result = await approveToken(requestAmount);
            if (!result || !connectedAccount) {
                return false;
            }

            setTokenAllowance((await retrieveTokenAllowance(tokenToApprove, connectedAccount, poolAddress)) as number);
            setTokenBalance((await retrieveTokenBalance(tokenToApprove, connectedAccount)) as number);

            return true;
        } catch (err: any) {
            console.log('[ERROR] - handleApprove:', err);
            const message = err?.code === 4001 ? USER_CLOSE_EXTENSION_MESSAGE : TRANSACTION_ERROR;
            dispatch(alertFailure(message));
            setOpenApproveModal(false);
        }
    }

    // Fetch User balance
    const fetchUserBalance = useCallback(async () => {
        if (appChainID && connectedAccount && connector) {
            const accountBalance = await getAccountBalance(
                appChainID,
                walletChainID,
                connectedAccount as string,
                connector
            );

            dispatch(
                connectWalletSuccess(connector, [connectedAccount], {
                    [connectedAccount]: new BigNumber(accountBalance._hex).div(new BigNumber(10).pow(18)).toFixed(5),
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connector, appChainID, walletChainID, connectedAccount]);

    async function handleDeposit(amount: string | number) {
        if (!validateDeposit(amount)) {
            return false;
        }

        try {
            setOpenDepositModal(true);
            const result = await deposit(poolAddress, purchasableCurrency.toUpperCase(), amount);
            if (!result) {
                return false;
            }

            await fetchUserBalance();
            await fetchPoolDetails();
            await onFetchUserPurchased();

            return true;
        } catch (err: any) {
            console.log('[ERROR] - handleDeposit:', err);
            const message = err?.code === 4001 ? USER_CLOSE_EXTENSION_MESSAGE : TRANSACTION_ERROR;
            dispatch(alertFailure(message));
            setOpenDepositModal(false);
        }
    }

    return (
        <div className={styles.rightBuyTokenForm}>
            <SwapHeader currentStep={currentStep} disabled={disabled}/>
            <div className={styles.title2}>
                Your Wallet Balance&nbsp;
                <div className={styles.currencyName}>
                    {numberWithCommas(parseFloat(tokenBalance.toString()).toFixed(6))}&nbsp;
                    {currencyName}
                </div>
            </div>
            <SwapForm
                inBuyTime={inBuyTime}
                currentStep={currentStep}
                poolDetails={poolDetails}
                remainingAmount={remainingToken}
                userWalletBalance={new BigNumber(tokenBalance ?? 0)}
                onApprove={handleApprove}
                onDeposit={handleDeposit}
                disabled={disabled}
            />
            <TransactionSubmitModal
                opened={openDepositModal}
                handleClose={() => {
                    setOpenDepositModal(false);
                }}
                transactionHash={tokenDepositTransaction}
            />
            <TransactionSubmitModal
                additionalText={`Please be patient and no need to approve again, you can check the transaction status on ${etherscanName}.`}
                opened={openApproveModal}
                handleClose={() => {
                    setOpenApproveModal(false);
                }}
                transactionHash={transactionHash}
            />
        </div>
    );
};
