import { ETH_CHAIN_ID, POLYGON_CHAIN_ID, SOLANA_CHAIN_ID } from './../constants/network';
import { useTypedSelector } from "./useTypedSelector";

export enum SelectedNetWork {
    NONE = "",
    SOLANA = "Solana",
    ETH = "Metamask",
    POLYGON = "Polygon"
}

export function useSelectedNetwork() {
    const { appChainID } = useTypedSelector((state) => state.appNetwork).data;

    let selectedNetwork = SelectedNetWork.NONE;

    switch (appChainID) {
        case SOLANA_CHAIN_ID:
            selectedNetwork = SelectedNetWork.SOLANA;
            break;
        case ETH_CHAIN_ID:
            selectedNetwork = SelectedNetWork.ETH;
            break;
        case POLYGON_CHAIN_ID:
            selectedNetwork = SelectedNetWork.POLYGON;
            break;
        default:
            selectedNetwork = SelectedNetWork.NONE;
    }

    return { isSelectedSolana: selectedNetwork === SelectedNetWork.SOLANA, selectedNetwork, appChainID };
}