import useWindowDimensions from 'hooks/useWindowDimensions';
import HeaderPage from './Header';
import InfoLandingPage from './InfoPage';
import { ProjectImage } from './ProjectImage';
import { useStyles } from './style';

const twitterLink = 'https://twitter.com/benft_solutions';
const discordLink = 'https://www.benft.solutions/';
const telegramLink = 'https://t.me/benftsolutions';

const MintPage = () => {
  const styles = useStyles();
  const { width } = useWindowDimensions();

  return (
    <div
      className={`${
        width < 550 ? `${styles.newLandingPage} ${styles.newLandingPageMobile}` : `${styles.newLandingPage}`
      }`}
    >
      <div className={styles.container}>
        <HeaderPage />
        <div className={styles.pageInfo}>
          <ProjectImage />
          <InfoLandingPage />
        </div>
        <footer className={styles.pagelink}>
          <a href={discordLink} target="_blank" rel="noreferrer" className={styles.link}>
            <img src="/images/newPage/web.svg" alt="icon-link" />
          </a>
          <a href={telegramLink} target="_blank" rel="noreferrer" className={styles.link}>
            <img src="/images/newPage/telegram.svg" alt="icon-link" />
          </a>
          <a href={twitterLink} target="_blank" rel="noreferrer" className={styles.link}>
            <img src="/images/newPage/twitter.svg" alt="icon-link" />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default MintPage;
