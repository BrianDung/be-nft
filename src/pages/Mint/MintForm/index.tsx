import { MintTimeLine, NOT_SET } from 'constants/mint';
import { MintedData, useUserMinted } from 'hooks/useUserMinted';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MintForm from './components/Form';
import { useStyles } from '../style';
import { alert } from 'store/actions/alert';

const initialMintData = {
  status: NOT_SET,
  maxNumberMinted: 1,
  type: 0,
};

interface MintFormContainerProps {
  rate: number | string;
  currentTimeline: MintTimeLine;
}

const MintFormContainer = ({ rate, currentTimeline }: MintFormContainerProps) => {
  const styles = useStyles();
  const [userMinted, setUserMinted] = useState<(MintedData & { status?: string }) | null>({ ...initialMintData });

  const { account, connected, getUserBalance } = useWeb3ReactLocal();
  const dispatch = useDispatch();

  const { mint, getUserMinted } = useUserMinted();

  function retrieveUserMinted() {
    getUserMinted(account)
      .then((data) => {
        if (data?.maxNumberMinted === 0) {
          dispatch(alert('You have minted the maximum number of NFTs. Thank you for your support.'));
        }

        setUserMinted(data);
      })
      .catch((error: any) => {
        setUserMinted(null);
      });
  }

  async function userMint(amount: number) {
    try {
      if (!userMinted) {
        throw new Error('You are not on the whitelist. Public Sale starts June 2nd at 1pm UTC.');
      }

      await mint(amount, Number(rate));

      dispatch(alert('The NFTs have been minted successfully to your wallet address. Thank you for your support.'));

      await retrieveUserMinted();
      getUserBalance();

      return true;
    } catch (error: any) {
      dispatch(alert(error.message));

      return false;
    }
  }

  // Check user is whitelist user
  useEffect(() => {
    setUserMinted({ ...initialMintData });
    if (!account) {
      return;
    }

    retrieveUserMinted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    if (userMinted?.status === NOT_SET || currentTimeline === MintTimeLine.NotSet) {
      return;
    }

    if (!userMinted && currentTimeline > MintTimeLine.PreSaleRound) {
      dispatch(alert('You are not on the whitelist. Public Sale starts June 2nd at 1pm UTC.'));
      return;
    }
  }, [userMinted, currentTimeline, dispatch]);

  const formDisabled = (function () {
    if (!connected && currentTimeline > MintTimeLine.PreSaleRound) {
      return false;
    }

    return (
      currentTimeline === MintTimeLine.PreSaleRound ||
      currentTimeline === MintTimeLine.NotSet ||
      !userMinted ||
      userMinted.status === NOT_SET ||
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
