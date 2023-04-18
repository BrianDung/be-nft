export const CONTRACT_ADDRESS = process.env.REACT_APP_MINT_CONTRACT || '';
export const CONTRACT_ADDRESS_MINT_AND_SWAP = process.env.REACT_APP_SWAP_AND_MINT || '';
export const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || '';
export const TOTAL_SOLD = Number(process.env.REACT_APP_TOTAL_SOLD || 0);
export const USER_SIGNATURE_KEY = 'user_signature';
export const SALE_RATE = 0.008;
export const PUBLIC_SALE_RATE = 0.0095;

export enum MintTimeLine {
  NotSet,
  WLMintPhase1,
  WLMintPhase2,
  WLMintPhase3,
  PublicMint,
}

export const NUMBER_NFTS_CAN_SWAP = {
  WL1: 50,
  WL2: 120,
  WL3: 200,
  PUBLIC: 225,
  AIRDROP: 250,
};

export const NOT_SET = 'not-set';
export const SETTED = 'setted';

export const MESSAGES = {
  BE1: 'Please connect your wallet.',
  SWAP_SUCCESS: 'Congratulations on swapping your BeNFT.',
  MINT_SUCCESS: 'Congratulations on minting your BeNFT.',
  WRONG_CHAIN: 'Wrong chain! Please connect to Ethereum chain.',
  INSUFFICIENT_AMOUNT: 'Insufficient USDT balance, please top-up and try again.',
  MAX_ALLOW_SALE_ROUND: 'Pre-sale NFT limit per wallet has been reached. Please come back during Public Sale.',
  MAX_ALLOW_PUBLIC_SALE: 'NFT limit per wallet has been reached.',
  NOT_CONNECT_WALLET: 'Please connect your ERC20 wallet.',
  SOLD_OUT: 'Xborgs sold out!',
  MC1: 'Stand back non holder, your time to mint is yet to come',
  MC2: 'Stand back, your time to mint is yet to come',
  MC3: 'XBorg HODLERS round sold out',
  MC4: 'ALL of our XBorgs have found a home',
  MC5: 'Mint coming soon!',
  MC6: 'Congratulation you are in the holders list, holders mint will be live soon',
  MC7: 'Congratulation you are in the WL, WL mint will be live soon',
};
