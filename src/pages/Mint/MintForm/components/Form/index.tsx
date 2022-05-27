import { BorderOutline } from '../../../BorderOutline/index';
import { Button } from 'components/Base/Form/Button';
import { isInteger } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alert } from 'store/actions/alert';
import { useStyles } from './styles';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { MESSAGES } from 'constants/mint';

interface MintFormProps {
  maxAllow: number;
  disabled?: boolean;
  onSubmit: (amount: number) => Promise<boolean>;
  rate: number;
}

const MintForm = ({ maxAllow, disabled, rate, onSubmit }: MintFormProps) => {
  const styles = useStyles();
  const [amount, setAmount] = useState<number | string>(1);
  const lastValidInput = useRef(1);
  const { balance, connected } = useWeb3ReactLocal();

  const dispatch = useDispatch();

  function reValidate() {
    let currentValue = Number(amount);
    if (isNaN(currentValue)) {
      setAmount(lastValidInput.current);
      return;
    }

    if (!isInteger(currentValue)) {
      currentValue = Math.trunc(currentValue);
    }

    lastValidInput.current = currentValue;
    updateAmount(currentValue);
  }

  function updateAmount(value: string | number) {
    setAmount(() => {
      const newValue = Number(value);

      if (newValue > maxAllow) {
        lastValidInput.current = maxAllow;
        return maxAllow;
      }

      if (newValue < 1) {
        lastValidInput.current = 1;
        return 1;
      }

      lastValidInput.current = newValue;
      return newValue;
    });
  }

  useEffect(() => {
    if (disabled) {
      setAmount(1);
    }
  }, [disabled]);

  function validate(amount: number | string) {
    if (!connected) {
      dispatch(alert(MESSAGES.NOT_CONNECT_WALLET));
      return false;
    }

    if (Number(amount) * rate > Number(balance)) {
      dispatch(alert(MESSAGES.INSUFFICIENT_AMOUNT));
      return false;
    }

    return true;
  }

  function handleSumit() {
    if (!validate(amount)) {
      return;
    }

    return onSubmit(Number(amount))
      .then((success) => {
        if (success) {
          setAmount(1);
        }
      })
      .finally(() => {});
  }

  return (
    <div>
      <div className={styles.mintForm}>
        <div className={styles.formControl}>
          <div className={styles.boxNumber}>
            <BorderOutline>
              <input
                onBlur={reValidate}
                type="text"
                className={styles.input}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={disabled}
              />
            </BorderOutline>
            <Button
              className={`${styles.quantity} form`}
              onClick={() => updateAmount(Number(amount) - 1)}
              disabled={disabled}
            >
              -
            </Button>
          </div>
          <Button className={styles.quantity} onClick={() => updateAmount(Number(amount) + 1)} disabled={disabled}>
            +
          </Button>
        </div>
        <Button className={styles.max} onClick={() => updateAmount(maxAllow)} disabled={disabled}>
          MAX
        </Button>
      </div>
      <Button disabled={disabled} onClick={handleSumit} className={styles.mint}>
        MINT
      </Button>
    </div>
  );
};

export default MintForm;
