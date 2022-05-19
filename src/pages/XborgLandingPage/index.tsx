import React from 'react';
import { Link } from 'react-router-dom';
import CarouseImages from './CarouseImages';
import { IMAGES } from './CarouseImages/data';
import HeaderPage from './Header';
import InfoLandingPage from './InfoPage';
import { useStyles } from './style';
import { StackedCarousel, ResponsiveContainer } from 'react-stacked-center-carousel';

function Pagination(props: { centerSlideDataIndex: any; updatePosition?: any }) {
  const styles = useStyles();
  const { centerSlideDataIndex, updatePosition } = props;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: 20,
      }}
    >
      {IMAGES.map((_, index) => {
        const isCenterSlide = centerSlideDataIndex === index;
        return (
          <div
            key={index}
            onClick={() => {
              updatePosition(index);
            }}
            className={styles.dots}
            style={{
              background: isCenterSlide ? '#0062FF' : '#A0A0A0',
            }}
          />
        );
      })}
    </div>
  );
}

const twitterLink = 'https://twitter.com/VispX_official';
const discordLink = 'https://discord.com/invite/vispx';
const telegramLink = 'https://t.me/VispX_Official';

const XborgLandingPage = () => {
  const styles = useStyles();
  const ref: any = React.useRef(StackedCarousel);
  const [centerSlideDataIndex, setCenterSlideDataIndex] = React.useState(0);

  const onCenterSlideDataIndexChange = (newIndex: React.SetStateAction<number>) => {
    setCenterSlideDataIndex(newIndex);
  };

  const updatePosition = (index: number) => {
    ref?.current?.swipeTo(index - centerSlideDataIndex);
  };
  return (
    <div className={styles.newLandingPage}>
      <div className={styles.container}>
        <HeaderPage />
        <div className={styles.pageInfo}>
          <div className={styles.Info}>
            <InfoLandingPage />
          </div>
          <div className={styles.carousel}>
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
          </div>
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
