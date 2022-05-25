import { FC } from 'react';
import mobile from 'is-mobile';
import { AbstractConnector } from '@web3-react/abstract-connector';
import useStyles from './style';
import { ConnectorNames, WalletInfo } from '../../../../../constants/connectors';

interface ConnectWalletBoxPropsType {
  wallet: WalletInfo;
  onConnectWallet: (name: ConnectorNames, connector: AbstractConnector) => void;
}

export const ConnectWalletBox: FC<ConnectWalletBoxPropsType> = ({
  wallet,
  onConnectWallet,
}: ConnectWalletBoxPropsType) => {
  const styles = useStyles();

  const connectWallet = () => {
    onConnectWallet(wallet.name, wallet.connector as AbstractConnector);
  };

  const { name, icon } = wallet;

  return (
    <div
      className={`${styles.walletBox}`}
      onClick={() => {
        if (mobile() && wallet?.deepLink) {
          window.open(wallet.deepLink);
          return;
        }

        connectWallet();
      }}
      style={{
        cursor: 'pointer',
      }}
    >
      <div className={styles.walletBoxIconWrap}>
        <img src={icon} alt={name} className={styles.walletBoxIcon} />
      </div>
      <p className={styles.walletBoxText}>{name}</p>
    </div>
  );
};

export default ConnectWalletBox;
