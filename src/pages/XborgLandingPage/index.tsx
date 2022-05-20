import { Link } from 'react-router-dom';
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
      </div>
      <div className={styles.pagelink}>
        <Link to={twitterLink} className={styles.link}>
          <img src="/images/newPage/icon-twiter.svg" alt="icon-link" />
        </Link>
        <Link to={telegramLink} className={styles.link}>
          <img src="/images/newPage/icon-telegram.svg" alt="icon-link" />
        </Link>
        <Link to={discordLink} className={styles.link}>
          <img src="/images/newPage/icon-linked.svg" alt="icon-link" />
        </Link>
      </div>
    </div>
  );
};

export default XborgLandingPage;
