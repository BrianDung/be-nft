import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NetworkUpdateType, settingAppNetwork } from '../../../../../store/actions/appNetwork';
import { NetworkInfo } from '../../../../../constants/network';
import useStyles from './style';

interface ConnectWalletBoxPropsType {
  appNetwork: NetworkInfo;
  forceEnable?: boolean;
  termsAgree: boolean;
}

export const ConnectNetworkBox: FC<ConnectWalletBoxPropsType> = (props: ConnectWalletBoxPropsType) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { appNetwork, forceEnable, termsAgree } = props;
  const { appChainID } = useSelector((state: any) => state.appNetwork).data;

  const handleNetworkChange = (networkId: string) => {
    if (termsAgree || forceEnable) {
      dispatch(settingAppNetwork(NetworkUpdateType.App, networkId));
    }
  };

  const pointerStyle = {
    cursor: `${termsAgree || forceEnable ? 'pointer' : 'initial'}`,
  };

  const { name, icon, id, disableIcon } = appNetwork;
  const temporaryDisable = false; //name === APP_NETWORKS_NAME.BSC;

  return (
    <div
      className={`${appChainID === id && termsAgree && styles.activeNetwork} ${styles.walletBox}`}
      onClick={() => {
        !temporaryDisable && handleNetworkChange(id as string);
      }}
      style={pointerStyle}
    >
      <div className={styles.walletBoxIconWrap}>
        {
          <img
            src={`${(termsAgree || forceEnable) && !temporaryDisable ? icon : disableIcon}`}
            alt={name}
            className={`${styles.walletBoxIcon} ${styles.networkImage} ${
              (termsAgree || forceEnable) && !temporaryDisable ? '' : 'network-disabled'
            }`}
          />
        }
      </div>
      <p className={styles.walletBoxText}>{name}</p>
      {appChainID === id && termsAgree && (
        <img alt="" src={`/images/circle_done.svg`} style={{ color: '#212a3b' }} className={styles.walletBoxCheck} />
      )}
    </div>
  );
};
