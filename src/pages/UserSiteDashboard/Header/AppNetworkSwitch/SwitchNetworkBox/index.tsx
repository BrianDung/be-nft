import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from './style';
import { NetworkInfo } from '../../../../../constants/network';

interface SwitchNetworkBoxProps {
    appNetwork: NetworkInfo;
    onClick: (networkId: string) => void;
    handleClose?: () => void;
}

const SwitchNetworkBox: React.FC<SwitchNetworkBoxProps> = ({ appNetwork, onClick }: SwitchNetworkBoxProps) => {
    const styles = useStyles();
    const { appChainID } = useSelector((state: any) => state.appNetwork).data;
    const { name, icon, id } = appNetwork;

    return (
        <div
            className={`${appChainID === id && styles.activeNetwork} ${styles.switchNetworkBox}`}
            onClick={() => {
                onClick(id as string);
            }}
        >
            <div className={`${styles.switchNetworkBox}__content`}>
                {<img src={icon} alt={name} className={styles.walletBoxIcon} />}
                <p className={styles.boxTitle}>{name}</p>
            </div>
            {appChainID === id && (
                <img
                    alt=""
                    src={`/images/circle_done.svg`}
                    style={{ color: '#212a3b' }}
                    className={styles.activeMark}
                />
            )}
        </div>
    );
};

export default SwitchNetworkBox;
