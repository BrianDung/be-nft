import { Web3ReactLocalContext } from 'contexts/web3react';
import { useContext } from 'react';

export const useWeb3ReactLocal = () => useContext(Web3ReactLocalContext);
