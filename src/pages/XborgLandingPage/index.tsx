import HeaderPage from './Header';
import { ProjectImage } from './ProjectImage';
import { useStyles } from './style';

const twitterLink = 'https://twitter.com/VispX_official';
const discordLink = 'https://discord.com/invite/vispx';
const telegramLink = 'https://t.me/VispX_Official';

const XborgLandingPage = () => {
  const styles = useStyles();

  return (
    <div className={styles.newLandingPage}>
      <div className={styles.container}>
        <HeaderPage />
        <div className={styles.pageInfo}>
          <ProjectImage />
          <div className={styles.carousel}></div>
        </div>
        <footer className={styles.pagelink}>
          <a href={twitterLink} target="_blank" rel="noreferrer" className={styles.link}>
            <img src="/images/newPage/twitter.svg" alt="icon-link" />
          </a>
          <a href={telegramLink} target="_blank" rel="noreferrer" className={styles.link}>
            <img src="/images/newPage/telegram.svg" alt="icon-link" />
          </a>
          <a href={discordLink} target="_blank" rel="noreferrer" className={styles.link}>
            <img src="/images/newPage/discord.svg" alt="icon-link" />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default XborgLandingPage;
