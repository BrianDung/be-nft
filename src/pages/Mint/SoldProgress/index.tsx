import BigNumber from 'bignumber.js';
import { MESSAGES, TOTAL_SOLD } from 'constants/mint';
import { useMint } from 'hooks/useMint';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alert } from 'store/actions/alert';
import { UPDATE_TOTAL_SUPPLY } from 'store/constants/mint';
import { BorderOutline } from '../BorderOutline';
import { useStyles } from './style';

interface SoldProgressProps {}

const SoldProgress = (props: SoldProgressProps) => {
  const styles = useStyles();
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const { getTotalSupply } = useMint();
  const dispatch = useDispatch();

  useEffect(() => {
    let timeoutId: any = null;

    async function retrieveTotalSupply() {
      const requestTotalSupply = await getTotalSupply();

      dispatch({
        type: UPDATE_TOTAL_SUPPLY,
        payload: {
          totalSupply: Number(requestTotalSupply),
        },
      });

      setTotalSupply(() => Number(requestTotalSupply));
      clearTimeout(timeoutId);

      if (requestTotalSupply >= TOTAL_SOLD) {
        dispatch(alert(MESSAGES.SOLD_OUT));
        return;
      }

      timeoutId = setTimeout(() => retrieveTotalSupply(), 2000);
    }

    retrieveTotalSupply();

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress =
    totalSupply >= TOTAL_SOLD
      ? 100
      : new BigNumber(totalSupply <= 0 ? 1 : totalSupply).minus(1).div(TOTAL_SOLD).multipliedBy(100).toNumber();

  return (
    <div>
      <p className={styles.xborgTitle}>XBORG</p>

      <div className={styles.soldProgress}>
        <div className={styles.jubValue}>
          <div className={styles.leftBotSec}>{totalSupply >= TOTAL_SOLD ? 100 : progress.toFixed(2)}% of Xborg Sold</div>
          <div className={styles.rightBotSec}>
            {totalSupply >= TOTAL_SOLD ? TOTAL_SOLD : totalSupply <= 0 ? 0 : totalSupply - 1}/{TOTAL_SOLD}
          </div>
        </div>
        <BorderOutline>
          <div className={styles.progress} style={{ padding: `${progress <= 0.4 ? '6px 0' : '4px 0'}` }}>
            <div
              className={`${styles.achieved}  ${progress === 100 ? styles.progressFull : ''}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </BorderOutline>
      </div>
    </div>
  );
};

export default SoldProgress;
