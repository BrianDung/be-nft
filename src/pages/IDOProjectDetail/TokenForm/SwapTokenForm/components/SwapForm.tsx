import { NumberInput } from 'components/Base/Form/NumberInput';
import BigNumber from 'bignumber.js';
import useAuth from 'hooks/useAuth';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useStyles from '../../style';
import { formatRoundDown, numberWithCommas } from 'utils/formatNumber';
import { SwapStep } from '../index';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { NETWORK_AVAILABLE_MAP } from 'constants/network';
import { PoolDetails } from 'hooks/usePoolDetails';
import { Button } from 'components/Base/Form/Button';
import { BeatLoader } from 'react-spinners';

interface SwapFormProps {
  onApprove: (amount: number | string) => Promise<any>;
  onDeposit: (amount: number | string) => Promise<any>;
  currencyName?: string;
  remainingAmount: BigNumber;
  userWalletBalance: BigNumber;
  currentStep: SwapStep;
  poolDetails: PoolDetails;
  inBuyTime: boolean;
  disabled: boolean;
}

const REGEX_NUMBER = /^-?[0-9]{0,}[.]{0,1}[0-9]{0,6}$/;

export const SwapForm = ({
  onApprove,
  onDeposit,
  currencyName,
  remainingAmount,
  userWalletBalance,
  currentStep,
  poolDetails,
  inBuyTime,
  disabled,
}: SwapFormProps) => {
  const { networkAvailable, ethRate: rate, isDeployed, tokenDetails } = poolDetails;
  const [approveLoading, setApproveLoading] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);

  const styles = useStyles();
  const { wrongChain } = useAuth();
  const { appChainID } = useTypedSelector((state) => state.appNetwork).data;
  // Current network not match with project define network
  const isMatchNetwork = NETWORK_AVAILABLE_MAP[appChainID] === networkAvailable;
  // User has bought maximum token.
  const isMaxBought = new BigNumber(remainingAmount).isLessThanOrEqualTo(0);

  // Disable all form
  const forceDisable = !isMatchNetwork || isMaxBought || !isDeployed || !inBuyTime || disabled;

  const matchNetworkError = useMemo(() => (isMatchNetwork ? '' : 'Unavaiable network!'), [isMatchNetwork]);

  const { control, errors, watch, setValue, handleSubmit, setError } = useForm({
    defaultValues: {
      userAmount: '',
    },
    mode: 'onChange',
  });
  const userInputAmount = watch('userAmount');

  const estimateTokens = useMemo(() => {
    if (!userInputAmount || isNaN(Number(userInputAmount))) {
      return new BigNumber(0);
    }

    return new BigNumber(userInputAmount ?? 0).div(rate);
  }, [userInputAmount, rate]);

  const maximalApproval = useMemo(() => {
    if (remainingAmount.gt(userWalletBalance)) {
      return userWalletBalance.gt(0) ? formatRoundDown(userWalletBalance) : 0;
    }

    return remainingAmount.gt(0) ? formatRoundDown(remainingAmount) : 0;
  }, [remainingAmount, userWalletBalance]);

  const handleInputChange = (e: any, setValue: (value: string) => void) => {
    const value = e.target.value.replaceAll(',', '');
    if (value === '' || REGEX_NUMBER.test(value)) {
      setValue(value);
    }
  };

  const rules = {
    required: 'Please input amount',
    validate: (value: string) => {
      const currentInput = new BigNumber(value);
      if (value && Number(value) <= 0) {
        return 'The amount must be the greater than 0';
      }

      if (currentInput.gt(remainingAmount)) {
        return 'Invalid amount';
      }

      if (currentInput.gt(userWalletBalance)) {
        return 'Not enough balance';
      }

      return true;
    },
  };

  function handleApprove(data: { userAmount: string | number }) {
    setApproveLoading(true);
    onApprove(data.userAmount)
      .then((success: boolean) => {
        if (success) {
          setValue('userAmount', '');
        }
      })
      .finally(() => {
        setApproveLoading(false);
      });
  }

  function handleDeposit(data: { userAmount: string | number }) {
    setSwapLoading(true);
    onDeposit(data.userAmount)
      .then((success: boolean) => {
        if (success) {
          setValue('userAmount', '');
        }
      })
      .finally(() => {
        setSwapLoading(false);
      });
  }

  return (
    <>
      <div className={styles.buyTokenInputForm}>
        <div className={styles.buyTokenInputWrapper}>
          <NumberInput
            className={styles.buyTokenInput}
            placeholder="Enter amount"
            thousandSeparator={true}
            decimalScale={5}
            value={userInputAmount}
            max={maximalApproval}
            min={0}
            maxLength={255}
            disabled={wrongChain || forceDisable || swapLoading || approveLoading}
            control={control}
            name="userAmount"
            onChange={handleInputChange}
            rules={rules}
          />
          <span className={styles.purchasableCurrency}>
            {currencyName}
            <button
              className={styles.purchasableCurrencyMax}
              onClick={() => {
                setValue('userAmount', formatRoundDown(maximalApproval));
                setError('userAmount', {
                  message: '',
                });
              }}
              disabled={currentStep >= SwapStep.Swap}
            >
              Max
            </button>
          </span>
        </div>
      </div>
      <div className={styles.buyTokenEstimate}>
        <p className={styles.title2}>You will get approximately</p>
        <strong className={styles.buyTokenEstimateAmount}>
          {numberWithCommas(`${estimateTokens || 0}`, 2)} {tokenDetails.symbol}
        </strong>
      </div>

      {isMatchNetwork && errors?.userAmount?.message && (
        <p className={styles.poolErrorBuy}>{errors.userAmount.message}</p>
      )}

      {matchNetworkError && <p className={styles.poolErrorBuy}>{matchNetworkError}</p>}

      <p className={styles.approveWarning}>You need to Approve once (and only once) before you can start purchasing.</p>

      <div className={styles.btnGroup}>
        <Button
          label="Approve"
          disabled={currentStep !== SwapStep.Approve || forceDisable}
          onClick={handleSubmit(handleApprove)}
          loading={approveLoading}
          className={styles.approvedBtn}
        >
          {approveLoading ? <BeatLoader color={'white'} size={10} /> : 'Approve'}
        </Button>
        <Button
          label="Swap"
          disabled={currentStep !== SwapStep.Swap || forceDisable}
          onClick={handleSubmit(handleDeposit)}
          loading={swapLoading}
          className={styles.swapBtn}
          variant="outlined"
        >
          {swapLoading ? <BeatLoader color={'white'} size={10} /> : 'Swap'}
        </Button>
      </div>
    </>
  );
};
