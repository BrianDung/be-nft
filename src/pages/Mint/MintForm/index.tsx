import { MESSAGES, MintTimeLine, NOT_SET } from 'constants/mint';
import { useUserMinted } from 'hooks/useUserMinted';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import MintForm from './components/Form';
import { useStyles } from '../style';
import { alert } from 'store/actions/alert';
import { clearUserMinted } from 'store/actions/mint';
import { useTypedSelector } from 'hooks/useTypedSelector';

interface MintFormContainerProps {
  rate: number | string;
  currentTimeline: MintTimeLine;
}

const MintFormContainer = ({ rate, currentTimeline }: MintFormContainerProps) => {
  const styles = useStyles();
  const { status, data: userMinted, error } = useTypedSelector((state) => state.userMinted);

  const delay = useRef<number>(0);

  const { account, connected, getUserBalance } = useWeb3ReactLocal();
  const dispatch = useDispatch();
  const { mint, retrieveUserMinted } = useUserMinted();

  async function userMint(amount: number) {
    try {
      if (!userMinted) {
        throw new Error('You are not on the whitelist. Public Sale starts June 2nd at 1pm UTC.');
      }

      await mint(amount, Number(rate));

      dispatch(alert(MESSAGES.MINT_SUCCESS));

      delay.current = 4500;
      await retrieveUserMinted(account);
      getUserBalance();

      return true;
    } catch (error: any) {
      dispatch(alert('Transaction failed'));

      return false;
    }
  }

  useEffect(() => {
    dispatch(clearUserMinted());
    if (!connected || !account) {
      return;
    }

    // Get user minted after wallet connected or user change account
    delay.current = 0;
    retrieveUserMinted(account);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, connected]);

  useEffect(() => {
    // If get user minted or get current time line api has not called
    if (status === NOT_SET || currentTimeline === MintTimeLine.NotSet) {
      return;
    }

    // If user is not whitelist user
    if (!userMinted && currentTimeline > MintTimeLine.PreSaleRound) {
      dispatch(alert(error?.message));
      return;
    }

    // If user has minted maximum nft
    if (userMinted?.maxNumberMinted === 0) {
      const message =
        currentTimeline === MintTimeLine.SaleRound ? MESSAGES.MAX_ALLOW_SALE_ROUND : MESSAGES.MAX_ALLOW_PUBLIC_SALE;

      setTimeout(() => {
        dispatch(alert(message));
      }, delay.current);
    }
  }, [userMinted, currentTimeline, dispatch, status, error]);

  const formDisabled = (function () {
    // Note : Behavior disconnected will disable form
    if (!connected) {
      return true;
    }

    if (!connected && currentTimeline > MintTimeLine.PreSaleRound) {
      return false;
    }

    return (
      currentTimeline === MintTimeLine.PreSaleRound ||
      currentTimeline === MintTimeLine.NotSet ||
      !userMinted ||
      status === NOT_SET ||
      userMinted.maxNumberMinted === 0
    );
  })();

  return (
    <>
      <div>
        <span className={styles.priceBigSize}>{rate} ETH</span>
        <span className={styles.priceMediumSize}>/ NFT</span>
      </div>
      <MintForm
        maxAllow={userMinted?.maxNumberMinted ?? 0}
        onSubmit={userMint}
        disabled={formDisabled}
        rate={Number(rate)}
      />
    </>
  );
};

export default MintFormContainer;
