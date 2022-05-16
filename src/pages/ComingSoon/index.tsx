import React from 'react';
import { withRouter } from 'react-router-dom';
import useStyles from './style';

const ComingSoon = (props: any) => {
    const styles = useStyles();
    return <div className={styles.comingSoonWrapper}>
        <div>
            <img className={styles.imageComingSoon} src='/images/coming-soon.svg' alt='' />
        </div>
        <div className={styles.boxCenter}>
            <img className={styles.imageComingSoon} src='/images/coming-soon-center.svg' alt='' />
        </div>
        <div>
            <img className={styles.imageComingSoon} src='/images/coming-soon.svg' alt='' />
        </div>
    </div>;
};

export default withRouter(ComingSoon);
