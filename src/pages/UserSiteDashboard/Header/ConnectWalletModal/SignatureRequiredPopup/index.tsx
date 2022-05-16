import { Dialog } from '@material-ui/core';
import useStyles from './styles';

interface SignatureRequiredPopupProps {
  open: boolean;
  onClose: () => void;
}

export function SignatureRequiredPopup({ open, onClose }: SignatureRequiredPopupProps) {
  const styles = useStyles();

  return (
    <Dialog className={styles.signatureModal} open={open} onClose={onClose}>
      <img
        className={`${styles.signatureModal}__icon`}
        src="/images/landing/red-warning.svg"
        alt="signature required"
      />
      <h4 className={`${styles.signatureModal}__title`}>Signature Required</h4>
      <p className={`${styles.signatureModal}__message`}>Please sign on your wallet to confirm</p>
    </Dialog>
  );
}
