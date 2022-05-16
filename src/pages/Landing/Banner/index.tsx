import { Button } from 'components/Base/Form/Button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CarouselImages from '../../../components/Base/CarouseImages';
import useStyles from './style';

const iconMuted = 'images/landing/muted.svg';
const iconUnMuted = 'images/landing/loudspeaker.svg';
const iconPlayGame = 'images/landing/icon-play-game.svg';

const defaultBanner = {
  id: 0,
  link: 'https://cdn.staging.helixmeta.org/input/collection-cover/1/1088/RogueShift.mp4',
  youtube: 'https://www.youtube.com/watch?v=TMWx5wtLuZA&t=1s&ab_channel=TheGamingZone',
  type: 'video',
  thumbnail: 'images/landing/draft-banner.png',
  poster: '',
  title: 'Rogue Shift',
  network: 'TBA',
  whitepaper: '',
  website: '',
  twitter: '',
  discord: '',
  telegram: '',
  status: 'Private',
  content:
    'ROGUE SHIFT is a high-intensity top-down shooter with rogue-lite elements and character progression, set on a harsh planet that will test your will to earn perks, NFT and the Rogue Shift token.',
};

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(defaultBanner);
  const [muted, setMuted] = useState<boolean>(true);
  const { sidebarCollapsed } = useSelector((state: any) => state.global);

  const styles = useStyles({
    url: currentBanner.link || '',
    muted,
    type: currentBanner.type,
    collapsed: sidebarCollapsed,
  });
  const onClickImage = (data: any) => {
    setCurrentBanner(data);
  };

  const mainClass = styles.sidebar;

  const toggleVolume = () => {
    setMuted(!muted);
  };

  const onClickYoutubeLink = (banner: any) => {
    if (banner?.type === 'video') {
      window.open(banner.youtube);
    }
  };

  return (
    <div className={styles.container}>
      <div id="videoBanner" className={styles.banner}>
        {currentBanner.type === 'video' ? (
          <div>
            <video
              key={String(currentBanner.id)}
              width="100%"
              autoPlay={true}
              muted={muted}
              loop
              poster={currentBanner.poster || currentBanner.thumbnail}
            >
              <source src={currentBanner.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div>
            <img src={currentBanner.link} alt="" />
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.overlay}>
          <div className={mainClass}>
            <span className={`${mainClass}__status`}>{currentBanner.status || 'Private'}</span>
            <div className={`${mainClass}__title`}>{currentBanner.title}</div>
            <div className={`${mainClass}__network`}>
              <span className={`${mainClass}__network--name`}>Blockchain:&nbsp;</span>
              <span className={`${mainClass}__network--value`}>{currentBanner.network}</span>
            </div>
            <div className={`${mainClass}__content`}>{currentBanner.content}</div>

            <div className={`${mainClass}__footer`}>
              <Button
                variant="outlined"
                shape="rounded"
                style={{ marginRight: 15 }}
                onClick={() => onClickYoutubeLink(currentBanner)}
              >
                <img src={currentBanner.type === 'video' ? 'images/landing/game.svg' : iconPlayGame} alt="" /> &nbsp;
                &nbsp;
                <span className={`${mainClass}__text`}>
                  {currentBanner.type === 'video' ? 'Play trailer' : 'Play game'}
                </span>
              </Button>
              <Button variant="outlined" shape="rounded" style={{ marginRight: 15 }}>
                <img src={'images/landing/download.svg'} alt="" /> &nbsp;&nbsp;
                <span className={`${mainClass}__text`}>White paper</span>
              </Button>
              <Button variant="outlined" shape="rounded" style={{ marginRight: 15 }}>
                <img src={'images/landing/official.svg'} alt="" /> &nbsp;&nbsp;
                <span className={`${mainClass}__text`}>Official website</span>
              </Button>

              {currentBanner.type === 'video' && (
                <img
                  key={String(currentBanner.id)}
                  className={`${mainClass}__muted`}
                  onClick={toggleVolume}
                  src={muted ? iconMuted : iconUnMuted}
                  alt="speakerLoud"
                  width={42}
                  height={42}
                />
              )}
            </div>
          </div>
          <div className={styles.carousels}>
            <CarouselImages onClickImage={onClickImage} />
          </div>
        </div>
      </div>
      <div className={styles.socials}>
        <div className={`${styles.socials}__container`}>
          <a
            className={`${styles.socials}__container--item`}
            href={currentBanner.twitter}
            key={1}
            target="_blank"
            rel="noreferrer"
          >
            <img src={'images/landing/twitter.svg'} alt="" />
          </a>

          <a
            className={`${styles.socials}__container--item`}
            href={currentBanner.discord}
            key={2}
            target="_blank"
            rel="noreferrer"
          >
            <img src={'images/landing/discord.svg'} alt="" />
          </a>

          <a
            className={`${styles.socials}__container--item`}
            href={currentBanner.telegram}
            key={3}
            target="_blank"
            rel="noreferrer"
          >
            <img src={'images/landing/telegram.svg'} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
