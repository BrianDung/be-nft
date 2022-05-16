import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ESolletEnv } from '../constants/solana/sollet';
import { SOLLET_CONFIG, SOLLET_ENV } from '../utils/solana/sollet/config';
import { ISolletChain } from '../utils/solana/sollet/interface';

const { SOLLET_CHAINS } = SOLLET_CONFIG;


export const transformLamportsToSOL = (lamports: number): number => {
  return lamports / LAMPORTS_PER_SOL;
};

export const getCurrentChain = (): ISolletChain => {
  let matched: ISolletChain | null;
  const defaultChain = SOLLET_CHAINS.find((slc: any) => slc.name === ESolletEnv.TESTNET)!;

  if (SOLLET_ENV && (SOLLET_ENV as ESolletEnv)) {
    matched = SOLLET_CHAINS.find((slc: any) => slc.name === SOLLET_ENV) || null;
  } else {
    matched = null;
  }

  if (matched) {
    return matched;
  }

  return defaultChain;
};

const numberFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 5,
  maximumFractionDigits: 5,
});

const isSmallNumber = (val: number) => {
  return val < 0.001 && val > 0;
};

export const formatNumber = {
  format: (val?: number, useSmall?: boolean) => {
    if (!val && val !== 0) {
      return '--';
    }
    if (useSmall && isSmallNumber(val)) {
      return 0.001;
    }

    return numberFormatter.format(val);
  },
};