import { withRouter } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import styles from './style.module.scss';
//@ts-ignore
import IDOProject from './IDOProject';
import IncommingProjects from './IncommingProjects';
import KeyFeatures from './NextToLaunch';
import { Button } from '../../components/Base/Form/Button';
import Banner from './Banner';

const PLANE_ARROW = 'images/icons/plane-icon.svg';

const Landing = () => {
  return (
    <>
      <Banner />
      <div className={styles.container}>
        <IDOProject />
        <KeyFeatures />
        <IncommingProjects />
      </div>
      <div className={styles.footer}>
        <div className={styles.kickStartProject}>
          Launch your project in minutes on
          <br />
          VispX Launchpad
          <br />
          <Button shape="rounded" startIcon={<img src={PLANE_ARROW} alt="Kick start" />} className={styles.centerBtn}>
            <span style={{fontSize: 16}}>Kickstart your project</span>
          </Button>
        </div>
        <div className={styles.copyRight}>Copyright © 2022 . All rights reserved.</div>
      </div>
    </>
  );
};

export default withWidth()(withRouter(Landing));
