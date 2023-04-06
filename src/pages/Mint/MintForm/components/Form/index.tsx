import { Button } from 'components/Base/Form/Button';
import { MESSAGES, MintTimeLine } from 'constants/mint';
import { useERC20 } from 'hooks/useErc20';
import { useMintBeNft } from 'hooks/useMintBeNft';
import { useUserMinted } from 'hooks/useUserMinted';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import instance from 'services/axios';
import { alert } from 'store/actions/alert';
import { BorderOutline } from '../../../BorderOutline/index';
import './spin.scss';
import { useStyles } from './styles';
import BigNumber from 'bignumber.js';

interface MintFormProps {
  nftPrice: number;
  endSwapIndex: number;
  currentSwapIndex: number;
  saleState: number;
}

const MintForm = ({ nftPrice, endSwapIndex, currentSwapIndex, saleState }: MintFormProps) => {
  const styles = useStyles();
  const [amount, setAmount] = useState<number | string>(1);
  const [maxAmount, setMaxAmount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [, setUserCanJoinMint] = useState<boolean>(false);
  const [usdtAddress, setUsdtAddress] = useState<string>('');
  const [usdtDecimal, setUsdtDecimal] = useState<number>(0);
  const { connected, account } = useWeb3ReactLocal();
  const dispatch = useDispatch();
  const { getMaxMintPerTX, getAddressUSDT, getTokenDecimal } = useMintBeNft();
  const { atomicMint } = useUserMinted();
  const { balanceOf, approve, checkAllowance } = useERC20();

  const disableButtonMint = useMemo(() => {
    if (saleState === MintTimeLine.NotSet || !connected) {
      return true;
    }
    // const canNotBuyNftRound1 = currentMintIndex === endMintIndex && currentMintIndex === MintTimeLine.WLMintPhase1;
    // const soldOut = currentMintIndex === maxMintIndex;
    // const expireDateMint = new BigNumber(process.env.REACT_APP_API_END_MINT_NFT || 0).lte(timeServer / 1000);

    // if (!amount || !useCanJoinMint || !connected || canNotBuyNftRound1 || soldOut) {
    //   return true;
    // }
    return false;
  }, [saleState, connected]);

  const checkStateZero = async () => {
    if (saleState === MintTimeLine.NotSet) {
      const response = await instance.get(`check-state/${account}`);
      const message = response?.data?.data?.message;
      if (message) {
        console.log({ message });
        dispatch(alert(message));
      }
    }
  };

  const checkUserCanJoin = async () => {
    if (
      saleState === MintTimeLine.WLMintPhase2 ||
      saleState === MintTimeLine.WLMintPhase1 ||
      saleState === MintTimeLine.WLMintPhase3
    ) {
      const response = await instance.get(`check/${account}/${saleState}`);
      const isWL = response?.data?.data?.isWL;
      response.data && setUserCanJoinMint(isWL);
      // Handle message
      if (saleState === MintTimeLine.WLMintPhase1 && !isWL) {
        dispatch(alert(MESSAGES.MC1));
      }
      if (saleState === MintTimeLine.WLMintPhase1 && !isWL) {
        setTimeout(() => {
          dispatch(alert(MESSAGES.MC2));
        }, 1000);
      }
      if (currentSwapIndex > endSwapIndex) {
        if (saleState === MintTimeLine.WLMintPhase1) {
          setTimeout(() => {
            dispatch(alert(MESSAGES.MC3));
          }, 2000);
        }
        setTimeout(() => {
          dispatch(alert(MESSAGES.MC4));
        }, 3000);
      }
      console.log('USER CAN JOIN MINT', isWL, { saleState });
    }

    if (saleState === MintTimeLine.PublicMint) {
      setUserCanJoinMint(true);
      console.log('USER CAN JOIN MINT', 'TRUE');
    }

    if (saleState === MintTimeLine.NotSet) {
      setUserCanJoinMint(false);
      console.log('USER CAN JOIN MINT', 'FALSE');
    }
  };

  useEffect(() => {
    if (account) {
      checkStateZero();
      checkUserCanJoin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, saleState]);

  useEffect(() => {
    getAddressUSDT().then((address) => {
      console.log('USDT ADDRESS', address);
      setUsdtAddress(address);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (usdtAddress) {
      getTokenDecimal().then((decimals) => {
        console.log('USDT DECIMALS', decimals);
        setUsdtDecimal(decimals);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usdtAddress]);

  useEffect(() => {
    getMaxMintPerTX()
      .then((data) => {
        console.log('MAX AMOUNT PER TX', data);
        setMaxAmount(data);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function validate(amount: number | string) {
    try {
      const balance = await balanceOf(usdtAddress);
      const allowance = await checkAllowance(usdtAddress);
      const actualAllowance = new BigNumber(allowance).div(usdtDecimal).toNumber();
      const actualBalance = new BigNumber(balance).div(usdtDecimal).toNumber();

      console.log({
        balance,
        allowance,
        actualAllowance,
        actualBalance,
      });

      if (!connected) {
        dispatch(alert(MESSAGES.NOT_CONNECT_WALLET));
        return false;
      }

      if (new BigNumber(amount).multipliedBy(nftPrice).isGreaterThan(actualBalance)) {
        dispatch(alert(MESSAGES.INSUFFICIENT_AMOUNT));
        return false;
      }

      if (new BigNumber(amount).multipliedBy(nftPrice).isGreaterThan(actualAllowance)) {
        await approve(usdtAddress);
        return true;
      }

      return true;
    } catch (error: any) {
      dispatch(alert(error?.message));
      return false;
    }
  }

  async function handleSumit() {
    setLoading(true);
    if (!(await validate(amount))) {
      setLoading(false);
      return;
    }
    try {
      await atomicMint(Number(amount));
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
        {/* <Button className={styles.max} onClick={handleMax} disabled={loading || !connected}>
          MAX
        </Button> */}
      </div>
      <Button
        onClick={handleSumit}
        className={styles.mint}
        disabled={disableButtonMint || disableButtonMint || loading}
      >
        <span>{saleState <= MintTimeLine.WLMintPhase3 ? 'SWAP' : 'MINT'}</span>{' '}
        {loading && <span className="Spinner"></span>}
      </Button>
    </div>
  );
};

export default MintForm;
