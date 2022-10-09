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
import BigNumber from 'bignumber.js';

interface MintFormProps {
  rate: number;
  currentTimeline: MintTimeLine;
  endMintIndex: number;
  maxMintIndex: number;
  currentMintIndex: number;
}

const MintForm = ({ rate, currentTimeline, endMintIndex, maxMintIndex, currentMintIndex }: MintFormProps) => {
  const styles = useStyles();
  const [amount, setAmount] = useState<number | string>(1);
  const [maxAmount, setMaxAmount] = useState<number>(1);
  const [timeServer, setTimeServer] = useState<number>(0);
  const [useCanJoinMint, setUserCanJoinMint] = useState<boolean>(false);
  const { balance, connected, account } = useWeb3ReactLocal();
  const dispatch = useDispatch();
  const { getMaxMintPerTX } = useMint();
  const { atomicMint } = useUserMinted();

  const timeCanJoinMint = useMemo(() => {
    const startTime = process.env.REACT_APP_START_PRE_SALE_TIME;
    return new BigNumber(timeServer / 1000).gte(Number(startTime));
  }, [timeServer]);

  const disableButtonMint = useMemo(() => {
    const canNotBuyNftRound1 = currentMintIndex === endMintIndex && currentMintIndex === MintTimeLine.HolderMint;
    const soldOut = currentMintIndex === maxMintIndex;
    if (soldOut) {
      dispatch(alert(MESSAGES.SOLD_OUT));
    }
    if (!amount || !useCanJoinMint || !connected || !timeCanJoinMint || canNotBuyNftRound1 || soldOut) {
      return true;
    }
    return false;
  }, [amount, useCanJoinMint, connected, timeCanJoinMint, currentMintIndex, endMintIndex, maxMintIndex, dispatch]);

  const getTimeServer = async () => {
    const response = await instance.get(`current-time`);
    response.data && setTimeServer(response?.data?.data);
    console.log('TIME SERVER', response?.data?.data);
  };

  const checkUserCanJoin = async () => {
    if (currentTimeline === MintTimeLine.WLMint || currentTimeline === MintTimeLine.HolderMint) {
      const response = await instance.get(`check/${account}/${currentTimeline}`);
      response.data && setUserCanJoinMint(response?.data?.data);
      console.log('USER CAN JOIN MINT', response?.data?.data, { currentTimeline });
    }

    if (currentTimeline === MintTimeLine.PublicMint) {
      setUserCanJoinMint(true);
      console.log('USER CAN JOIN MINT', 'TRUE');
    }
  };

  useEffect(() => {
    if (account) {
      getTimeServer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

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

  function handleSumit() {
    if (!validate(amount)) {
      return;
    }
    atomicMint(Number(amount), rate)
      .then((data) => {
        dispatch(alert(MESSAGES.MINT_SUCCESS));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        dispatch(alert(err));
      });
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
              disabled={Number(amount) === 1 || disableButtonMint}
            >
              -
            </Button>
          </div>
          <Button
            className={styles.quantity}
            onClick={handleIncrease}
            disabled={Number(amount) === maxAmount || disableButtonMint}
          >
            +
          </Button>
        </div>
        <Button className={styles.max} onClick={handleMax}>
          MAX
        </Button>
      </div>
      <Button onClick={handleSumit} className={styles.mint} disabled={disableButtonMint || disableButtonMint}>
        MINT
      </Button>
    </div>
  );
};

export default MintForm;
