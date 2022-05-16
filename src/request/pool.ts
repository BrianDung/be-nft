import { BaseRequest } from './Request';
import { apiRoute } from '../utils';
export const getActivePool = async (query = '') => {
    const baseRequest = new BaseRequest();

    const url = `/pools/v3/active-pools${query}`;
    const res = await baseRequest.get(url);
    return res;
};

export const joinPool = async (data: any) => {
    const baseRequest = new BaseRequest();

    const url = apiRoute('join-campaign');
    const res = await baseRequest.post(url, data, true);

    return res;
};

export const getListSnapShot = async (campaign_id:string, wallet_address?: string) => {
    const baseRequest = new BaseRequest();
    const url = `/user/data-campaign-snapshot?campaign_id=${campaign_id}&wallet_address=${wallet_address}`;
    const res = await  baseRequest.get(url);
    return res;
};


