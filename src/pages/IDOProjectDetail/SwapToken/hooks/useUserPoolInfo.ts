import { alertFailure } from '../../../../store/actions/alert';
import { useDispatch } from 'react-redux';
import { BaseRequest } from '../../../../request/Request';
import { useEffect, useState } from 'react';

export interface UserJoinedPoolSnapshot {
    isJoined?: boolean,
    point: string | number;
}

export interface UserSnapshot {
    campaignId: number;
    createdAt: any;
    id: number;
    point: number;
    lotteryTicket: number;
    pkfBalance: string;
    updatedAt: any;
    walletAddress: string;
}

const http = new BaseRequest();

export const useUserPoolInfo = (poolId: string, connectedAccount?: string | null) => {
    const [userJoinedPoolSnapshot, setUserJoinedSnapshot] = useState<UserJoinedPoolSnapshot>({
        isJoined: false,
        point: -998
    });
    const [userSnapshot, setUserSnapshot] = useState<UserSnapshot | undefined>(undefined);
    const dispatch = useDispatch();

    async function isJoinPool() {
        try {
            const res = await http.get(
                `/user/check-whitelist-user?wallet_address=${connectedAccount}&campaign_id=${poolId}`
            );
            const { status, data } = await res.json();

            if (status !== 200) {
                throw new Error(data.message);
            }

            if (!data) {
                return;
            }

            setUserJoinedSnapshot({
                isJoined: data.isJoined,
                point: data.tier
            });
        } catch (e: any) {
            dispatch(alertFailure(e.message));
        }
    }

    async function getUserSnapshot() {
        try {
            const res = await http.get(`/user/data-snapshot?wallet_address=${connectedAccount}&campaign_id=${poolId}`);

            const { status, data } = await res.json();

            if (status !== 200) {
                throw new Error(data.message);
            }

            if (!data) {
                return;
            }

            setUserSnapshot({
                id: data.id,
                campaignId: data.campaign_id,
                point: data.level,
                lotteryTicket: data.lottery_ticket,
                pkfBalance: data.pkf_balance,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
                walletAddress: data.wallet_address,
            });
        } catch (e: any) {
            console.error(e);
            dispatch(alertFailure(e.message));
        }
    }

    useEffect(() => {
        if (!connectedAccount || !poolId) {
            return;
        }

        isJoinPool();
        getUserSnapshot();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [poolId, connectedAccount]);

    return {
        userJoinedPoolSnapshot,
        userSnapshot
    };
};
