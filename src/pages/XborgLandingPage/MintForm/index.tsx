import { Button } from 'components/Base/Form/Button';
import { useRef, useState } from 'react';
import { BorderOutline } from '../BorderOutline';
import { useStyles } from './style';

interface MintFormProps {
  maxAllow: number;
  disabled?: boolean;
}

const MintForm = ({ maxAllow, disabled }: MintFormProps) => {
  const styles = useStyles();
  const [amount, setAmount] = useState<number | string>(1);
  const lastValidInput = useRef(1);

  function reValidate() {
    const currentValue = Number(amount);
    if (isNaN(currentValue)) {
      setAmount(lastValidInput.current);
      return;
    }

    lastValidInput.current = Number(amount);
    updateAmount(Number(amount));
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
              // style={{cursor: `${count <=1 ? 'not-allowed' :'pointer'}`}}
              onClick={() => updateAmount(Number(amount) - 1)}
              disabled={disabled}
            >
              -
            </Button>
          </div>
          <Button
            className={styles.quantity}
            //  style={{cursor: `${count >=5 ? 'not-allowed' :'pointer'}`}}
            onClick={() => updateAmount(Number(amount) + 1)}
            disabled={disabled}
          >
            +
          </Button>
        </div>
        <Button
          className={styles.max}
          //  style={{cursor: `${count >=5 ? 'not-allowed' :'pointer'}`}}
          onClick={() => updateAmount(maxAllow)}
          disabled={disabled}
        >
          MAX
        </Button>
      </div>
      <Button disabled={disabled} className={styles.mint}>
        MINT
      </Button>
    </div>
  );
};

export default MintForm;
