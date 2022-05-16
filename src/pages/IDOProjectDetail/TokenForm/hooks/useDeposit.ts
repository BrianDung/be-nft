import { BaseRequest } from './../../../../request/Request';
import { useWeb3React } from '@web3-react/core';
import { getContract } from 'utils/contract';
import { TRANSACTION_ERROR, TRANSACTION_ERROR_MESSAGE } from '../../../../constants/alert';
import axios from '../../../../services/axios';
import { useWalletSignatureAsync } from 'hooks/useWalletSignatureAsync';
import { useCallback, useState } from 'react';
import PreSalePool from '../../../../abi/PreSalePool.json';
import { NETWORK } from '../../../../constants';

const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || '';

interface DepositeHookParams {
    campaignId: string | number;
    connectedAccount?: string | null;
    captchaToken?: string;
    networkAvailable: string;
}

export const useDeposit = ({ campaignId, connectedAccount, captchaToken, networkAvailable }: DepositeHookParams) => {
    const { web3Sign } = useWalletSignatureAsync();
    const { library } = useWeb3React();
    const [tokenDepositTransaction, setTokenDepositTransaction] = useState('');

    async function getDepositSignature(signature: string, amount: string | number) {
        const config = {
            headers: {
                msgSignature: MESSAGE_INVESTOR_SIGNATURE,
            },
        };
        const response = await axios.post(
            '/user/deposit',
            {
                campaign_id: campaignId,
                wallet_address: connectedAccount,
                signature,
                captcha_token: captchaToken,
                amount: amount,
            },
            config
        );

        if (!response.data || !response.status || response.status !== 200) {
            throw new Error(TRANSACTION_ERROR);
        }

        const { data, message, status } = response.data;

        if (message && status !== 200) {
            throw new Error(message);
        }

        return data;
    }

    const metaMaskDeposit = useCallback(
        async (poolAddress: string, acceptCurrency: string, amount: string | number) => {
            setTokenDepositTransaction("");
            
            const authSignature = await web3Sign();
            if (!authSignature) {
                throw new Error('Invalid signature');
            }

            const depositSignature = await getDepositSignature(authSignature, amount);
            if (!depositSignature) {
                return false;
            }

            const { signature, amount: requestAmount } = depositSignature;

            if (!connectedAccount) {
                throw new Error(TRANSACTION_ERROR_MESSAGE);
            }

            if (signature && amount) {
                const abiUse = PreSalePool;
                const poolContract = getContract(poolAddress, abiUse, library, connectedAccount as string);

                const method =
                    acceptCurrency === 'ETH' ? 'buyTokenByEtherWithPermission' : 'buyTokenByTokenWithPermission';

                let buyCurr = 'ETH';
                switch (networkAvailable) {
                    case NETWORK.POLYGON:
                        if (acceptCurrency === 'USDT') {
                            buyCurr = process.env.REACT_APP_USDT_POLYGON_SMART_CONTRACT || '';
                        }
                        if (acceptCurrency === 'USDC') {
                            buyCurr = process.env.REACT_APP_USDC_POLYGON_SMART_CONTRACT || '';
                        }
                        break;

                    case NETWORK.ETHEREUM:
                        if (acceptCurrency === 'USDT') {
                            buyCurr = process.env.REACT_APP_USDT_SMART_CONTRACT || '';
                        }
                        if (acceptCurrency === 'USDC') {
                            buyCurr = process.env.REACT_APP_USDC_SMART_CONTRACT || '';
                        }
                        break;
                }

                const params = [buyCurr, requestAmount, connectedAccount, signature];

                // let overrides = fixGasLimitWithProvider(library, 'buy');
                const transaction = await poolContract[method](...params);
                setTokenDepositTransaction(transaction.hash);

                await transaction.wait(1);

                const request = new BaseRequest();
                await request.post('user/transaction', {
                    campaign_id: campaignId,
                    wallet_address: connectedAccount,
                    transaction_hash: transaction.hash,
                    amount: amount
                });

                return true;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [connectedAccount, web3Sign, library, networkAvailable]
    );

    return {
        tokenDepositTransaction,
        deposit: metaMaskDeposit,
    };
};
