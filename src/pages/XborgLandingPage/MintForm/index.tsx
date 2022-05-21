import { Input } from '@material-ui/core';
import { BorderOutline } from '../BorderOutline';
import { useStyles } from './style';

const MintForm = () => {
  const styles = useStyles();
  return (
    <div>
      <div className={styles.formControl}>
        <div className={styles.boxNumber}>
          <BorderOutline>
            <Input className={styles.input} type='number'/>
          </BorderOutline>

          <button
            className={styles.quantity}
            // style={{cursor: `${count <=1 ? 'not-allowed' :'pointer'}`}}
            // onClick={() => setCount(count <= 1 ? 1 : count - 1)}
          >
            -
          </button>
        </div>
        <button
          className={styles.quantitysum}
          //  style={{cursor: `${count >=5 ? 'not-allowed' :'pointer'}`}}
          //   onClick={() => setCount(count >= 5 ? 5 : count + 1)}
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