import { Input } from '@material-ui/core';
import { useState } from 'react';
import { BorderOutline } from '../BorderOutline';
import { useStyles } from './style';

const MintForm = () => {
  const styles = useStyles();
  const [amount, setAmount] = useState<any>(1);
  return (
    <div>
      <div className={styles.formControl}>
        <div className={styles.boxNumber}>
          <BorderOutline>
            <Input className={styles.input} value={amount} onChange={(e)=>setAmount(e.target.value)}/>
          </BorderOutline>

          <button
            className={styles.quantity}
            // style={{cursor: `${count <=1 ? 'not-allowed' :'pointer'}`}}
            onClick={() => setAmount(+amount - 1)}
          >
            -
          </button>
        </div>
        <button
          className={styles.quantitysum}
          //  style={{cursor: `${count >=5 ? 'not-allowed' :'pointer'}`}}
            onClick={() => setAmount(+amount + 1)}
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