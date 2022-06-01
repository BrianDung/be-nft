import styles from './styles.module.scss';

const bigLogo = 'images/bigLogo.svg';

const MaintainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}></div>
      <div className={styles.overlay}>
        <div className={styles.overlay__contentWrapper}>
          <img src={bigLogo} alt="Logo vispx" />
          <p className={styles.overlay__firstTitle}>We’ll be right back.</p>
          <p className={styles.overlay__secondTitle}>Updates are coming to the page. Check back soon.</p>
        </div>
      </div>
    </div>
  );
};

export default MaintainPage;
