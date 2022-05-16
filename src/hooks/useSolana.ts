import { SolanaLocalContext } from './../contexts/solana/index';
import { useContext } from "react";

export const useSolana = () => useContext(SolanaLocalContext);