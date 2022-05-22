import BigNumber from 'bignumber.js';
import { useMint } from 'hooks/useMint';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MINT_INFO } from 'store/constants/mint';
import { BorderOutline } from '../BorderOutline';
import { useStyles } from './style';

interface SoldProgressProps {}

const SoldProgress = (props: SoldProgressProps) => {
  const styles = useStyles();
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const { getTotalSupply } = useMint();
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(async () => {
      const totalSupply = await getTotalSupply();
      dispatch({
        type: MINT_INFO.UPDATE_MINT_INFO,
        payload: {
          totalSupply: Number(totalSupply),
        },
      });

      setTotalSupply(totalSupply);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress = new BigNumber((totalSupply === 0 ? 1 : totalSupply) - 1).div(5500).multipliedBy(100).toNumber();

  return (
    <div>
      <p className={styles.xborgTitle}>XBORG</p>

      <div className={styles.soldProgress}>
        <div className={styles.jubValue}>
          <div className={styles.leftBotSec}>{progress.toFixed(2)}% of Xborg Sold</div>
          <div className={styles.rightBotSec}>{totalSupply}/5500</div>
        </div>
        <BorderOutline>
          <div className={styles.progress}>
            <div
              className={`${styles.achieved} ${progress === 100 ? styles.progressFull : ''}`}
              style={{ width: `calc(${progress}% - 8px)` }}
            ></div>
          </div>
        </BorderOutline>
      </div>
    </div>
  );
};

export default SoldProgress;
