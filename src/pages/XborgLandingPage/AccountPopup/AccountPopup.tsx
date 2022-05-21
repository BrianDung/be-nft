import { Button, ClickAwayListener, Dialog, Tooltip } from '@material-ui/core';
import useStyles from './styles';
import { useState } from 'react';
import useAuth from 'hooks/useAuth';
import { CardData } from 'components/Base/Card';

interface AccountPopupProps {
  open: boolean;
  onClose: () => void;
  walletAddress: string;
  balance: any;
  rawAddress: string;
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
  walletAddress,
  rawAddress,
  balance,
}: AccountPopupProps) {
  const { logout } = useAuth();
  const [openTooltip, setOpenTooltip] = useState(false);
  function handleDisconect() {
    logout().then(() => {
      onClose();
    });
  }
  const styles = useStyles();

  return (
    <Dialog className={styles.dialog} open={open} onClose={onClose}>
      <div className={styles['dialog-container']}>
        <div className={styles['dialog-header']}>
          <h6>Account</h6>{' '}
          <img
            src="/images/icons/redirect-icon.svg"
            alt="redirec"
          />
        </div>
        <div className={styles['account-info']}>
            <>
              <WalletIcon icon={'/images/metamask-wallet.svg'} name={'Ethereum'} />
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
        </div>
        <div className={styles['user-info']}>
          <div>
            <CardData className={styles.data} title="Balance" value={`${balance} ETH`} />
            <CardData className={styles.data} title="Network" value={'Ethereum'} />
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
