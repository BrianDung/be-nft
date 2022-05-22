import { BorderOutline } from '../../../BorderOutline/index';
import { Button } from 'components/Base/Form/Button';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { isInteger } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alert } from 'store/actions/alert';
import { Mint } from 'store/reducers/mint';
import { useStyles } from './styles';

interface MintFormProps {
  maxAllow: number;
  disabled?: boolean;
  onSubmit: (amount: number) => Promise<boolean>;
}

const MintForm = ({ maxAllow, disabled, onSubmit }: MintFormProps) => {
  const styles = useStyles();
  const [amount, setAmount] = useState<number | string>(1);
  const [disabling, setDisabling] = useState(false);
  const lastValidInput = useRef(1);

  const dispatch = useDispatch();
  const { totalSupply } = useTypedSelector((state) => state.mint) as Mint;

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
    if (totalSupply + Number(amount) > 5500) {
      setDisabling(true);
      dispatch(alert('Total NFT are over than maximum supply'));
    }

    setDisabling(false);
  }, [amount, dispatch, totalSupply]);

  function handleSumit() {
    setDisabling(true);

    return onSubmit(Number(amount)).finally(() => {
      setDisabling(false);
    });
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
                disabled={disabled || disabling}
              />
            </BorderOutline>
            <Button
              className={`${styles.quantity} form`}
              // style={{cursor: `${count <=1 ? 'not-allowed' :'pointer'}`}}
              onClick={() => updateAmount(Number(amount) - 1)}
              disabled={disabled || disabling}
            >
              -
            </Button>
          </div>
          <Button
            className={styles.quantity}
            //  style={{cursor: `${count >=5 ? 'not-allowed' :'pointer'}`}}
            onClick={() => updateAmount(Number(amount) + 1)}
            disabled={disabled || disabling}
          >
            +
          </Button>
        </div>
        <Button
          className={styles.max}
          //  style={{cursor: `${count >=5 ? 'not-allowed' :'pointer'}`}}
          onClick={() => updateAmount(maxAllow)}
          disabled={disabled || disabling}
        >
          MAX
        </Button>
      </div>
      <Button disabled={disabled || disabling} onClick={handleSumit} className={styles.mint}>
        MINT
      </Button>
    </div>
  );
};

export default MintForm;
