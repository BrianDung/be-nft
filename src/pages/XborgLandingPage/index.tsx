import HeaderPage from './Header';
import InfoLandingPage from './InfoPage';
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
          {/* <div className={styles.carousel}> */}
          <InfoLandingPage />
          {/* </div> */}
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
           
          {/* <div className={styles.carousel}>
            <div className="card">
              <div style={{ width: '100%', position: 'relative' }}>
                <ResponsiveContainer
                  carouselRef={ref}
                  render={(width, carouselRef) => {
                    let currentVisibleSlide = 5;
                    if (width >= 1440) currentVisibleSlide = 5;
                    if (width <= 720) currentVisibleSlide = 1;
                    return (
                      <StackedCarousel
                        ref={carouselRef}
                        slideComponent={CarouseImages}
                        slideWidth={250}
                        carouselWidth={width}
                        data={IMAGES}
                        currentVisibleSlide={currentVisibleSlide}
                        maxVisibleSlide={5}
                        disableSwipe
                        customScales={[1, 0.85, 0.7, 0.55]}
                        transitionTime={450}
                        customTransition={'all 450ms ease 0s'}
                        onActiveSlideChange={onCenterSlideDataIndexChange}
                      />
                    );
                  }}
                />
              </div>
              <Pagination updatePosition={updatePosition} centerSlideDataIndex={centerSlideDataIndex} />
            </div>
          </div> */}
      </div>
      {/* <div className={styles.pagelink}>
        <Link to={twitterLink} className={styles.link}>
          <img src="/images/newPage/icon-twiter.svg" alt="icon-link" />
        </Link>
        <Link to={telegramLink} className={styles.link}>
          <img src="/images/newPage/icon-telegram.svg" alt="icon-link" />
        </Link>
        <Link to={discordLink} className={styles.link}>
          <img src="/images/newPage/icon-linked.svg" alt="icon-link" />
        </Link>
      </div> */}
    </div>
  );
};

export default XborgLandingPage;
