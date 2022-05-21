import { Input } from '@material-ui/core';
import { useRef, useState } from 'react';
import { BorderOutline } from '../BorderOutline';
import { useStyles } from './style';

interface MintFormProps {
  maxAllow: number;
}

const MintForm = ({ maxAllow }: MintFormProps) => {
  const styles = useStyles();
  const [amount, setAmount] = useState<number>(1);
  const lastValidInput = useRef(1);

  function reValidate() {
    const currentValue = Number(amount);
    if (isNaN(currentValue)) {
      setAmount(lastValidInput.current);
      return;
    }

    lastValidInput.current = Number(amount);
    setAmount(Number(amount));
  }

  function updateAmount(value: string | number) {
    setAmount((amount) => {
      const currentAmount = Number(amount);
      const newValue = Number(value);

      if (isNaN(newValue)) {
        return lastValidInput.current;
      }

      if (newValue > maxAllow || newValue < 0) {
        lastValidInput.current = currentAmount;
        return currentAmount;
      }

      lastValidInput.current = newValue;
      return newValue;
    });
  }

  return (
    <div>
      <div className={styles.formControl}>
        <div className={styles.boxNumber}>
          <BorderOutline>
            <Input
              onBlur={reValidate}
              className={styles.input}
              value={amount}
              onChange={(e) => updateAmount(e.target.value)}
            />
          </BorderOutline>

          <button
            className={styles.quantity}
            // style={{cursor: `${count <=1 ? 'not-allowed' :'pointer'}`}}
            onClick={() => updateAmount(Number(amount) - 1)}
          >
            -
          </button>
        </div>
        <button
          className={styles.quantitysum}
          //  style={{cursor: `${count >=5 ? 'not-allowed' :'pointer'}`}}
          onClick={() => updateAmount(Number(amount) + 1)}
        >
          +
        </button>
      </div>
      <div className={styles.boxMint}>
        <button className={styles.nameMint}>MINT</button>
      </div>
    </div>
  );
};

export default MintForm;
