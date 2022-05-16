import { Button, ClickAwayListener, Dialog, Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CardData } from '../../../../components/Base/Card';
import { connectorsSupportByNetwork, SUPPORTED_WALLETS } from '../../../../constants/connectors';
import { APP_NETWORKS_NAME, ETH_CHAIN_ID, NetworkInfo, POLYGON_CHAIN_ID } from '../../../../constants/network';
import useStyles from './styles';
import { useState } from 'react';
import useAuth from 'hooks/useAuth';

interface AccountPopupProps {
  open: boolean;
  onClose: () => void;
  currentWallet: string;
  walletAddress: string;
  balance: string;
  network: NetworkInfo;
  tier: string;
  rawAddress?: string;
}

const WalletIcon = ({ icon, name }: { icon: string; name: string }) => {
  return (
    <img
      src={icon}
      style={{
        width: 40,
      }}
      alt={name}
    />
  );
};

export function AccountPopup({
  open,
  onClose,
  currentWallet,
  walletAddress,
  balance,
  network,
  tier,
  rawAddress,
}: AccountPopupProps) {
  const history = useHistory();
  const { logout } = useAuth();
  const { appChainID } = useSelector((state: any) => state.appNetwork).data;
  const [openTooltip, setOpenTooltip] = useState(false);

  function handleDisconect() {
    logout().then(() => {
      onClose();
    });
  }

  const connectorsByNetwork = (() => {
    switch (appChainID) {
      case POLYGON_CHAIN_ID:
        return connectorsSupportByNetwork[APP_NETWORKS_NAME.POLYGON];
      case ETH_CHAIN_ID:
        return SUPPORTED_WALLETS;
      default:
        return connectorsSupportByNetwork[APP_NETWORKS_NAME.SOLANA];
    }
  })();

  const connectedWallet = connectorsByNetwork[currentWallet.toUpperCase()];
  const styles = useStyles();

  return (
    <Dialog className={styles.dialog} open={open} onClose={onClose}>
      <div className={styles['dialog-container']}>
        <div className={styles['dialog-header']}>
          <h6>Account</h6>{' '}
          <img
            src="/images/icons/redirect-icon.svg"
            alt="redirec"
            onClick={() => {
              history.push('/profile');
              onClose();
            }}
          />
        </div>
        <div className={styles['account-info']}>
          {rawAddress && (
            <>
              <WalletIcon icon={connectedWallet?.icon ?? ''} name={connectedWallet?.name} />
              <p>{walletAddress}</p>
              <ClickAwayListener onClickAway={() => setOpenTooltip(false)}>
                <Tooltip
                  PopperProps={{
                    disablePortal: openTooltip,
                  }}
                  onClose={() => setOpenTooltip(false)}
                  title={openTooltip ? 'Copied' : 'Copy address'}
                  arrow
                  placement="top"
                >
                  <img
                    src="/images/icons/copy.svg"
                    alt="copy"
                    onClick={() => {
                      navigator.clipboard.writeText(rawAddress);
                      setOpenTooltip(true);
                    }}
                  />
                </Tooltip>
              </ClickAwayListener>
            </>
          )}
        </div>
        <div className={styles['user-info']}>
          <div>
            <CardData className={styles.data} title="Balance" value={balance} />
            <CardData className={styles.data} title="Network" value={network?.name} />
            <CardData className={styles.data} title="Tier" value={tier} />
          </div>
          {walletAddress && (
            <Button
              onClick={handleDisconect}
              variant="outlined"
              endIcon={<img alt="disconect" src="/images/disconect.svg" />}
            >
              Disconnect
            </Button>
          )}
        </div>
      </div>
    </Dialog>
  );
}
