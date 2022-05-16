import { useState } from 'react';
import useStyles from './styles';
import MyPools from './MyPools';
//import MyTierProfile from './MyTier';
import ProfileInfo from './ProfileInfo';
import { Button } from 'components/Base/Form/Button';
import ConnectWalletModal from 'pages/UserSiteDashboard/Header/ConnectWalletModal';
import useAuth from 'hooks/useAuth';

const MyProfile = (props: any) => {
    const styles = useStyles();
    const [openConnect, setOpenConnect] = useState(false);
    const { isAuth } = useAuth();

    return (
        <>
            {isAuth ? (
                <div className={styles.container}>
                    <p className={styles.titleprofile}>My profile</p>
                    <ProfileInfo />
                    {/* <MyTierProfile /> */}
                    <MyPools />
                </div>
            ) : (
                <div className={styles.NotConnected}>
                    <div className={styles.flexBox}>
                        <img style={{ width: '60px', height: '60px' }} src="/images/icons/icon-unlock.svg" alt="" />
                        <Button className={styles.textHeader} shape="rounded" onClick={() => setOpenConnect(true)}>
                            Connect wallet
                        </Button>
                    </div>
                </div>
            )}
            {openConnect &&<ConnectWalletModal opened={openConnect} handleClose={() => setOpenConnect(false)} />}
        </>
    );
};

export default MyProfile;
