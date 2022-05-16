import { FC } from 'react';
import { AbstractConnector } from '@web3-react/abstract-connector';
import mobile from 'is-mobile';
import useStyles from './style';
import { WalletInfo } from '../../../../../constants/connectors';
import { SupportSolanaWallet } from '../../../../../utils/solana/sollet/interface';
import { WalletName } from '@solana/wallet-adapter-wallets';

interface ConnectWalletBoxPropsType {
  wallet: WalletInfo;
  walletName?: (string | undefined)[];
  connectWalletLoading?: boolean;
  forceEnable?: boolean;
  disabled: boolean;
  termsAgree: boolean;
  onConnectWallet: (name: string | SupportSolanaWallet, connector: AbstractConnector) => void;
}

export const ConnectWalletBox: FC<ConnectWalletBoxPropsType> = ({
  wallet,
  walletName,
  connectWalletLoading,
  forceEnable,
  disabled,
  termsAgree,
  onConnectWallet,
}: ConnectWalletBoxPropsType) => {
  const styles = useStyles();

  const connectWallet = () => {
    if (!termsAgree && !forceEnable) {
      return;
    }

    const walletName = wallet.name === WalletName.Sollet ? WalletName.SolletExtension : wallet.name;
    // Handle when choose another wallet
    wallet && onConnectWallet(walletName, wallet.connector as AbstractConnector);
  };

  const pointerStyle = {
    cursor: `${termsAgree || forceEnable ? 'pointer' : 'initial'}`,
  };

  const { name, icon, disableIcon } = wallet;
  const isSelectedNetwork = walletName && walletName.indexOf(name) >= 0;
  const isLoading = connectWalletLoading && isSelectedNetwork;

  return (
    <div
      className={`${styles.walletBox} ${isLoading && styles.activeNetwork}`}
      onClick={() => {
        if (mobile() && wallet?.deepLink) {
          window.open(wallet.deepLink);
          return;
        }

        if (disabled) {
          return;
        }

        connectWallet();
      }}
      style={pointerStyle}
    >
      {isLoading && (
        <img alt="" src={`/images/circle_done.svg`} style={{ color: '#212a3b' }} className={styles.walletBoxCheck} />
      )}
      <div className={styles.walletBoxIconWrap}>
        {isLoading ? (
          <img alt="loading" src="/images/loading.png" />
        ) : (
          <img src={termsAgree ? icon : disableIcon} alt={name} className={styles.walletBoxIcon} />
        )}
      </div>
      <p className={styles.walletBoxText}>{name}</p>
      {/* {connectWalletLoading && walletName && walletName.indexOf(name) >= 0 && termsAgree && (
                <img
                    alt=""
                    src={`/images/circle_done.svg`}
                    style={{ color: '#212a3b' }}
                    className={styles.walletBoxCheck}
                />
            )} */}
    </div>
  );
};

export default ConnectWalletBox;
