import BigNumber from 'bignumber.js';
import { Button } from 'components/Base/Form/Button';
import { MESSAGES, MintTimeLine } from 'constants/mint';
import { useERC20 } from 'hooks/useErc20';
import { useMintBeNft } from 'hooks/useMintBeNft';
import { useUserMinted } from 'hooks/useUserMinted';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import instance from 'services/axios';
import { alert } from 'store/actions/alert';
import { unixToDate } from 'utils/convertDate';
import { BorderOutline } from '../../../BorderOutline/index';
import './spin.scss';
import { useStyles } from './styles';

interface MintFormProps {
  nftPrice: number;
  maxSwapIndex: number;
  currentSwapIndex: number;
  saleState: number;
  numberNftSwaped: number;
  mintedCount: number;
  mintState: boolean;
}

const MintForm = ({
  nftPrice,
  maxSwapIndex,
  currentSwapIndex,
  saleState,
  numberNftSwaped,
  mintedCount,
  mintState,
}: MintFormProps) => {
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
  const { mint, swapCommitment } = useUserMinted();
  const { balanceOf, approve, checkAllowance } = useERC20();

  const remainingSwap = useMemo(() => {
    return maxAmount - numberNftSwaped;
  }, [maxAmount, numberNftSwaped]);

  const remainingMint = useMemo(() => {
    return numberNftSwaped - mintedCount;
  }, [numberNftSwaped, mintedCount]);

  const disableButtonSwap = useMemo(() => {
    if (saleState > MintTimeLine.WLMintPhase3) {
      return false;
    }
    const soldOut = saleState < MintTimeLine.PublicMint && currentSwapIndex === maxSwapIndex;
    if (saleState === MintTimeLine.NotSet || !connected || remainingSwap === 0 || !amount || soldOut) {
      return true;
    }

    return false;
  }, [saleState, connected, remainingSwap, amount, currentSwapIndex, maxSwapIndex]);

  const disableButtonMint = useMemo(() => {
    if (remainingMint === 0 && mintState) {
      return true;
    }
    return false;
  }, [remainingMint, mintState]);

  const checkUserCanJoin = async () => {
    if (
      saleState === MintTimeLine.WLMintPhase2 ||
      saleState === MintTimeLine.WLMintPhase1 ||
      saleState === MintTimeLine.WLMintPhase3
    ) {
      const response = await instance.get(`check/${account}/${saleState}`);
      const data = response?.data?.data;
      const isWL = data?.isWL;
      response.data && setUserCanJoinMint(isWL);
      if (!isWL) {
        const startPublic = unixToDate(process.env.REACT_APP_START_PUBLIC_SALE || '');
        const endPublic = unixToDate(process.env.REACT_APP_END_PUBLIC_SALE || '');
        if (moment(startPublic).isValid() && moment(endPublic).isValid() && moment(startPublic).isBefore(endPublic)) {
          dispatch(
            alert(`You are not on the whitelist.
          Public Sale starts on ${moment(startPublic).format('LL')} at ${moment(endPublic).format('LT')}.
          `)
          );
        }
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
  }, [usdtAddress, account]);

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

      if (numberNftSwaped === maxAmount) {
        dispatch(alert(MESSAGES.MAX_ALLOW_PUBLIC_SALE));
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

  const swapNft = async () => {
    if (!(await validate(amount))) {
      setLoading(false);
      return;
    }
    try {
      await swapCommitment(Number(amount));
      dispatch(alert(MESSAGES.SWAP_SUCCESS));
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error: any) {
      setLoading(false);
      dispatch(alert(error?.message));
    }
  };

  const mintNft = async () => {
    try {
      await mint();
      dispatch(alert(MESSAGES.MINT_SUCCESS));
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error: any) {
      setLoading(false);
      dispatch(alert(error?.message));
    }
  };

  async function handleSumit() {
    setLoading(true);
    if (mintState) {
      mintNft();
    } else {
      await swapNft();
    }
  }

  const handleChangeAmount = (e: any) => {
    console.log({
      maxAmount,
      numberNftSwaped,
    });
    const value = e.target.value;
    if (Number(value) < 0) {
      return;
    }
    if (remainingSwap >= 1) {
      if (Number(value) === 1) {
        setAmount(1);
      } else {
        if (Number(value) <= remainingSwap) {
          setAmount(value);
        }
      }
    }
    if (!value) {
      setAmount(e.target.value);
    }
  };

  const handleDecrease = () => {
    if (!amount || Number(amount) === 1) return;
    setAmount(Number(amount) - 1);
  };

  const handleIncrease = () => {
    const remaining = maxAmount - numberNftSwaped;
    if (!amount || Number(amount) === remaining) return;
    setAmount(Number(amount) + 1);
  };

  return (
    <div>
      <div className={styles.mintForm}>
        {saleState <= MintTimeLine.WLMintPhase3 && (
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
                disabled={Number(amount) === 1 || disableButtonSwap || loading}
              >
                -
              </Button>
            </div>
            <Button
              className={styles.quantity}
              onClick={handleIncrease}
              disabled={Number(amount) === remainingSwap || disableButtonSwap || loading}
            >
              +
            </Button>
          </div>
        )}
      </div>
      <Button
        onClick={handleSumit}
        className={styles.mint}
        disabled={mintState ? disableButtonMint : disableButtonSwap || loading}
      >
        <span>{saleState <= MintTimeLine.WLMintPhase3 ? 'SWAP' : 'MINT'}</span>{' '}
        {loading && <span className="Spinner"></span>}
      </Button>
    </div>
  );
};

export default MintForm;
