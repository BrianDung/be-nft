import { MintTimeLine } from 'constants/mint';
import { useMint } from 'hooks/useMint';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { MintedData, useUserMinted } from 'hooks/useUserMinted';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { alert } from 'store/actions/alert';
import { Mint } from 'store/reducers/mint';
import MintForm from './components/Form';

const MintFormContainer = () => {
  const [userMinted, setUserMinted] = useState<MintedData | null>(null);
  const [currentTimeline, setCurrentTimeline] = useState<MintTimeLine>(MintTimeLine.PreSaleRound);

  const { account, connected } = useWeb3ReactLocal();
  const dispatch = useDispatch();
  const { totalSupply } = useTypedSelector((state) => state.mint) as Mint;

  const { getRate, checkTimeline } = useMint();
  const { mint, getUserMinted } = useUserMinted();

  function retrieveUserMinted() {
    getUserMinted(account)
      .then((data) => {
        setUserMinted(data);
      })
      .catch((error: any) => {
        if (currentTimeline !== MintTimeLine.PreSaleRound) {
          dispatch(alert(error.message));
        }

        setUserMinted(null);
      });
  }

  async function userMint(amount: number) {
    try {
      if (!userMinted) {
        throw new Error('You are not in the whitelist');
      }

      if (userMinted.maxNumberMinted === 0) {
        throw new Error('Total number of NFT mint over than limit per Wallet');
      }

      if (amount + totalSupply > 5500) {
        throw new Error('Total NFT are over than maximum supply');
      }

      const rate = await getRate();

      await mint(amount, Number(rate));

      await retrieveUserMinted();

      return true;
    } catch (error: any) {
      dispatch(alert(error.message));

      return false;
    }
  }

  // Check user is whitelist user
  useEffect(() => {
    if (!connected || !account) {
      setUserMinted(null);
      return;
    }

    retrieveUserMinted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, account]);

  useEffect(() => {
    checkTimeline()
      .then((data) => {
        setCurrentTimeline(data);
      })
      .catch((error) => {
        dispatch(alert(error.message));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formDisabled = currentTimeline === MintTimeLine.PreSaleRound || !userMinted;

  return <MintForm maxAllow={userMinted?.maxNumberMinted ?? 0} onSubmit={userMint} disabled={formDisabled} />;
};

export default MintFormContainer;
