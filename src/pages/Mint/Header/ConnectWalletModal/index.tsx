import { Dialog } from '@material-ui/core';
import { ConnectorNames, SUPPORTED_WALLETS } from 'constants/connectors';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import ConnectWalletBox from './ConnectWalletBox';
import useStyles from './styles';

interface ConnectWalletModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConnectWalletModal({ open, onClose }: ConnectWalletModalProps) {
  const styles = useStyles();
  const { connectWallet: web3ConnectWallet } = useWeb3ReactLocal();

  function connectWallet(name: ConnectorNames, connector: AbstractConnector) {
    web3ConnectWallet(connector, name)
      .then(() => {
        onClose();
      })
      .catch((e: any) => {
        console.log(e.message);
      });
  }

  return (
    <Dialog className={styles.dialog} open={open} onClose={onClose}>
      <div className={`${styles.dialog}__container`}>
        <div className={`${styles.dialog}__header`}>
          <h6>Connect Wallet</h6>
        </div>
        <div className={`${styles.dialog}__content`}>
          {Object.values(SUPPORTED_WALLETS).map((item) => (
            <ConnectWalletBox key={item.name} wallet={item} onConnectWallet={connectWallet} />
          ))}
        </div>
      </div>
    </Dialog>
  );
}
