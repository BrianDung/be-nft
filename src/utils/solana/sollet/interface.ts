import { ENV } from "@solana/spl-token-registry";
import { WalletName } from "@solana/wallet-adapter-wallets";
import { ESolletEnv } from "../../../constants/solana/sollet";

export interface ISolletChain {
  name: ESolletEnv;
  endpoint: string;
  chainID: ENV;
}


export type SupportSolanaWallet = WalletName.Phantom | WalletName.Sollet | WalletName.SolletExtension;