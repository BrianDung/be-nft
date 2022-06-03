import BigNumber from 'bignumber.js';
import { MESSAGES } from 'constants/mint';
import { useMint } from 'hooks/useMint';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alert } from 'store/actions/alert';
import { UPDATE_TOTAL_SUPPLY } from 'store/constants/mint';
import { BorderOutline } from '../BorderOutline';
import { useStyles } from './style';

interface SoldProgressProps {}

const SoldProgress = (props: SoldProgressProps) => {
  const styles = useStyles();
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [totalMint, setTotalMint] = useState<number>(-1);
  const { getTotalSupply, getTotalMint } = useMint();
  const dispatch = useDispatch();
  const currentTotalSupply = useRef(0);

  useEffect(() => {
    getTotalMint()
      .then((totalMint: number) => {
        setTotalMint(totalMint);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeoutId: any = null;

    async function retrieveTotalSupply() {
      const requestTotalSupply = await getTotalSupply();

      if (currentTotalSupply.current < requestTotalSupply) {
        dispatch({
          type: UPDATE_TOTAL_SUPPLY,
          payload: {
            totalSupply: Number(requestTotalSupply),
          },
        });

        currentTotalSupply.current = Number(requestTotalSupply);
        setTotalSupply(() => Number(requestTotalSupply));
      }

      clearTimeout(timeoutId);

      if (requestTotalSupply >= totalMint) {
        dispatch(alert(MESSAGES.SOLD_OUT));
        return;
      }

      timeoutId = setTimeout(() => retrieveTotalSupply(), 2500);
    }

    if (totalMint < 0) {
      return;
    }

    retrieveTotalSupply();

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalMint]);

  const displayTotalSold = totalMint <= 0 ? 0 : totalMint;
  const progress =
    totalMint <= 0
      ? 0
      : totalSupply >= totalMint
      ? 100
      : new BigNumber(totalSupply <= 0 ? 1 : totalSupply).minus(1).div(totalMint).multipliedBy(100).toNumber();

  return (
    <div>
      <p className={styles.xborgTitle}>XBORG</p>

      <div className={styles.soldProgress}>
        <div className={styles.jubValue}>
          <div className={styles.leftBotSec}>{totalSupply >= totalMint ? 100 : progress.toFixed(2)}% of Xborg Sold</div>
          <div className={styles.rightBotSec}>
            {totalSupply >= totalMint ? displayTotalSold : totalSupply <= 0 ? 0 : totalSupply - 1}/{displayTotalSold}
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
