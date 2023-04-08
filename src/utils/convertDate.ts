import { MintTimeLine } from 'constants/mint';

export const unixToDate = (time: number | string) => {
  return new Date(Number(time) * 1000);
};

export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export enum Rounds {
  NotSet,
  WhiteList,
  Public,
  Minting,
}

export const CheckCurrentRound = (saleStage: MintTimeLine, mintState: boolean) => {
  if (saleStage === MintTimeLine.NotSet && !mintState) {
    return Rounds.NotSet;
  } else if (saleStage <= MintTimeLine.WLMintPhase3 && saleStage >= MintTimeLine.WLMintPhase1 && !mintState) {
    return Rounds.WhiteList;
  } else if (saleStage > MintTimeLine.WLMintPhase3 && !mintState) {
    return Rounds.Public;
  } else {
    return Rounds.Minting;
  }
};
