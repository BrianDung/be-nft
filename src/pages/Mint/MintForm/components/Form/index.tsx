import { Button } from 'components/Base/Form/Button';
import { MESSAGES, MintTimeLine } from 'constants/mint';
import { useMint } from 'hooks/useMint';
import { useUserMinted } from 'hooks/useUserMinted';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import instance from 'services/axios';
import { alert } from 'store/actions/alert';
import { BorderOutline } from '../../../BorderOutline/index';
import { useStyles } from './styles';
import './spin.scss';
import BigNumber from 'bignumber.js';
interface MintFormProps {
  rate: number;
  currentTimeline: MintTimeLine;
  endMintIndex: number;
  maxMintIndex: number;
  currentMintIndex: number;
  timeServer: number;
  startMintIndex: number;
}

const MintForm = ({
  rate,
  currentTimeline,
  endMintIndex,
  maxMintIndex,
  currentMintIndex,
  timeServer,
  startMintIndex,
}: MintFormProps) => {
  const styles = useStyles();
  const [amount, setAmount] = useState<number | string>(1);
  const [maxAmount, setMaxAmount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [useCanJoinMint, setUserCanJoinMint] = useState<boolean>(false);
  const { balance, connected, account } = useWeb3ReactLocal();
  const dispatch = useDispatch();
  const { getMaxMintPerTX } = useMint();
  const { atomicMint } = useUserMinted();

  const disableButtonMint = useMemo(() => {
    const canNotBuyNftRound1 = currentMintIndex === endMintIndex && currentMintIndex === MintTimeLine.HolderMint;
    const soldOut = currentMintIndex === maxMintIndex;
    const expireDateMint = new BigNumber(process.env.REACT_APP_API_END_MINT_NFT || 0).lte(timeServer / 1000);
    if (!amount || !useCanJoinMint || !connected || canNotBuyNftRound1 || soldOut || expireDateMint) {
      return true;
    }
    return false;
  }, [amount, useCanJoinMint, connected, currentMintIndex, endMintIndex, maxMintIndex, timeServer]);

  const checkUserCanJoin = async () => {
    if (currentTimeline === MintTimeLine.WLMint || currentTimeline === MintTimeLine.HolderMint) {
      const response = await instance.get(`check/${account}/${currentTimeline}`);
      const isWL = response?.data?.data?.isWL;
      response.data && setUserCanJoinMint(isWL);
      // Handle message
      if (currentTimeline === MintTimeLine.HolderMint && !isWL) {
        dispatch(alert(MESSAGES.MC1));
      }
      if (currentTimeline === MintTimeLine.WLMint && !isWL) {
        setTimeout(() => {
          dispatch(alert(MESSAGES.MC2));
        }, 1000);
      }
      if (currentTimeline === MintTimeLine.HolderMint && currentMintIndex > endMintIndex) {
        setTimeout(() => {
          dispatch(alert(MESSAGES.MC3));
        }, 2000);
      }
      if (currentMintIndex > maxMintIndex) {
        setTimeout(() => {
          dispatch(alert(MESSAGES.MC4));
        }, 3000);
      }
      console.log('USER CAN JOIN MINT', isWL, { currentTimeline });
    }

    if (currentTimeline === MintTimeLine.PublicMint) {
      setUserCanJoinMint(true);
      console.log('USER CAN JOIN MINT', 'TRUE');
    }

    if (currentTimeline === MintTimeLine.NotSet) {
      setUserCanJoinMint(false);
      console.log('USER CAN JOIN MINT', 'FALSE');
    }
  };

  useEffect(() => {
    if (account) {
      checkUserCanJoin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, currentTimeline]);

  useEffect(() => {
    getMaxMintPerTX()
      .then((data) => {
        console.log('MAX AMOUNT PER TX', data);
        setMaxAmount(data);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  async function handleSumit() {
    setLoading(true);
    if (!validate(amount)) {
      setLoading(false);
      return;
    }
    try {
      await atomicMint(Number(amount), rate);
      dispatch(alert(MESSAGES.MINT_SUCCESS));
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error: any) {
      setLoading(false);
      dispatch(alert(error?.message));
    }
  }

  const handleChangeAmount = (e: any) => {
    const partten = /^[1-5]$/;
    const value = e.target.value;
    const pass = partten.test(value);
    console.log({ value, pass: partten.test(value) });
    if (pass || !value) {
      setAmount(e.target.value);
    }
  };

  const handleDecrease = () => {
    if (!amount || Number(amount) === 1) return;
    setAmount(Number(amount) - 1);
  };

  const handleIncrease = () => {
    if (!amount || Number(amount) === maxAmount) return;
    setAmount(Number(amount) + 1);
  };

  const handleMax = () => {
    setAmount(maxAmount);
  };

  return (
    <div>
      <div className={styles.mintForm}>
        <div className={styles.formControl}>
          <div className={styles.boxNumber}>
            <BorderOutline>
              <input
                type="number"
                min={1}
                max={5}
                className={styles.input}
                value={amount}
                onChange={handleChangeAmount}
                maxLength={1}
              />
            </BorderOutline>
            <Button
              className={`${styles.quantity} form`}
              onClick={handleDecrease}
              disabled={Number(amount) === 1 || disableButtonMint || loading}
            >
              -
            </Button>
          </div>
          <Button
            className={styles.quantity}
            onClick={handleIncrease}
            disabled={Number(amount) === maxAmount || disableButtonMint || loading}
          >
            +
          </Button>
        </div>
        <Button className={styles.max} onClick={handleMax} disabled={loading || !connected}>
          MAX
        </Button>
      </div>
      <Button
        onClick={handleSumit}
        className={styles.mint}
        disabled={disableButtonMint || disableButtonMint || loading}
      >
        <span>MINT</span> {loading && <span className="Spinner"></span>}
      </Button>
    </div>
  );
};

export default MintForm;
