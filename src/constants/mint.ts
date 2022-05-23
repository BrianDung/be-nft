export const CONTRACT_ADDRESS = process.env.REACT_APP_MINT_CONTRACT || '';
export const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || '';
export const SESSION_STORAGE = 'user_signature';
export const SALE_RATE = 0.008;
export const PUBLIC_SALE_RATE = 0.0095;

export enum MintTimeLine {
  NotSet,
  PreSaleRound,
  SaleRound,
  PublicSaleRound,
}

export const NOT_SET = 'not-set';
