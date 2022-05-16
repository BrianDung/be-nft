import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useStyles from './style';

export const images = [
  {
    id: 0,
    link: 'https://cdn.staging.helixmeta.org/input/collection-cover/1/1088/RogueShift.mp4',
    youtube: 'https://www.youtube.com/watch?v=TMWx5wtLuZA&t=1s&ab_channel=TheGamingZone',
    type: 'video',
    thumbnail: 'images/landing/game-shift.jpg',
    poster: 'images/landing/game-shift.jpg',
    title: 'Rogue Shift',
    network: 'Polygon',
    whitepaper: '',
    website: '',
    twitter: '',
    discord: '',
    telegram: '',
    status: 'Private',
    content:
      'ROGUE SHIFT is a high-intensity top-down shooter with rogue-lite elements and character progression, set on a harsh planet that will test your will to earn perks, NFT and the Rogue Shift token.',
  },
  {
    thumbnail: 'images/landing/game-shift.jpg',
    link: 'images/landing/game-shift.jpg',
    id: 1,
    title: 'Rogue Shift',
    website: '',
    twitter: '',
    youtube: 'https://www.youtube.com/watch?v=TMWx5wtLuZA&t=1s&ab_channel=TheGamingZone',
    discord: '',
    telegram: '',
    network: 'Polygon',
    status: 'Private',
    type: 'image',
    whitepaper: '',
    content:
      'ROGUE SHIFT is a high-intensity top-down shooter with rogue-lite elements and character progression, set on a harsh planet that will test your will to earn perks, NFT and the Rogue Shift token.',
  },
  {
    id: 2,
    thumbnail: 'images/landing/game-meta-thumbnail.jpg',
    link: 'https://cdn.staging.helixmeta.org/input/collection-cover/1/1088/meta-game-3.mp4',
    title: 'Meta Popit',
    network: 'Polygon',
    status: 'Private',
    type: 'video',
    website: 'https://www.metapopit.com/',
    twitter: 'https://twitter.com/MetaPopit',
    discord: 'https://discord.com/invite/hwDDtjnHS2',
    youtube: 'https://www.youtube.com/watch?v=-mnsskYseV4&t=4s',
    telegram: '',
    whitepaper: 'https://vispx.io/wp-content/uploads/2022/01/MetaPopit_Whitepaper_v1_0201',
    content:
      'Meta Popit are not just simple nft collectibles, Metapopit World is a complete magic universe! This is a world is full of mysteries and exciting adventures beyond space and time, where nothing is impossible.',
  },
  {
    id: 3,
    thumbnail: 'images/landing/game-meta-thumbnail.jpg',
    link: 'images/landing/game-meta.jpg',
    title: 'Meta Popit',
    network: 'Polygon',
    status: 'Private',
    type: 'image',
    website: 'https://www.metapopit.com/',
    twitter: 'https://twitter.com/MetaPopit',
    discord: 'https://discord.com/invite/hwDDtjnHS2',
    youtube: 'https://www.youtube.com/watch?v=-mnsskYseV4&t=4s',
    telegram: '',
    whitepaper: 'https://vispx.io/wp-content/uploads/2022/01/MetaPopit_Whitepaper_v1_0201',
    content:
      'Meta Popit are not just simple nft collectibles, Metapopit World is a complete magic universe! This is a world is full of mysteries and exciting adventures beyond space and time, where nothing is impossible.',
  },
  {
    id: 4,
    link: 'https://cdn.staging.helixmeta.org/input/collection-cover/1/1088/game-vispx.mp4',
    type: 'video',
    poster: 'images/landing/game-vipsx-2.png',
    thumbnail: 'images/landing/game-vipsx-1.png',
    title: 'VISPX',
    network: 'Ethereum',
    status: 'Private',
    twitter: 'https://twitter.com/JamboMamboLand',
    discord: 'https://discord.com/invite/jambomambo',
    telegram: 'https://t.me/VispX_Official',
    youtube: '',
    whitepaper: '',
    website: 'https://www.jambomambo.com/',
    content:
      'VispX The first ever Launchpad powered by the VispX NFT and $VXP Token. We aim to kickstart up and coming projects via our XPAD tech through multi-chain solutions',
  },
  {
    id: 5,
    thumbnail: 'images/landing/game-vipsx-2.png',
    link: 'images/landing/game-vipsx-2.png',
    title: 'VISPX',
    whitepaper: '',
    network: 'Ethereum',
    status: 'Private',
    website: 'https://www.jambomambo.com/',
    twitter: 'https://twitter.com/JamboMamboLand',
    discord: 'https://discord.com/invite/jambomambo',
    telegram: 'https://t.me/VispX_Official',
    youtube: '',
    type: 'image',
    content:
      'VispX The first ever Launchpad powered by the VispX NFT and $VXP Token. We aim to kickstart up and coming projects via our XPAD tech through multi-chain solutions',
  },
];

const activeArrowBig = 'images/landing/next-arrow-big.svg';
const activeArrowPrevBig = 'images/landing/prev-arrow-enable.svg';

const DELAY_TIME = 15000;
const SLIDE_PER_PAGE = 3;

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <img
      className={`${className}`}
      src={activeArrowBig}
      alt="prev"
      onClick={onClick}
      style={{ ...style, display: 'block', width: '28px', height: '28px', right: '-28px' }}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <img
      className={`${className}`}
      src={activeArrowPrevBig}
      alt="prev"
      onClick={onClick}
      style={{
        ...style,
        display: 'block',
        width: '28px',
        height: '28px',
        left: '-28px',
        transform: 'rotate(35deg) !important',
      }}
    />
  );
}

export default function CarouselImages({ onClickImage }: any) {
  const [imageIdSelected, setImageIdSelected] = useState<number>(0);

  const refSlider = useRef(null);

  let idTimer: any;

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 200,
      slidesToShow: SLIDE_PER_PAGE,
      slidesToScroll: SLIDE_PER_PAGE,
      autoplay: false,
      fade: false,
      prevArrow: <SamplePrevArrow isPrev={true} />,
      nextArrow: <SampleNextArrow isNext={true} />,
    }),
    // eslint-disable-next-line
    []
  );
  const classes = useStyles({});

  const handleSelectImage = useCallback((image: any) => {
    clearTimeout(idTimer);

    const indexSlide = image.id;

    const nextImageIndex = (indexSlide + 1) % images.length;

    onClickImage(image);
    setImageIdSelected(indexSlide);

    // eslint-disable-next-line
    idTimer = setTimeout(() => {
      handleSelectImage(images[nextImageIndex]);
    }, DELAY_TIME);

    if (indexSlide === 0 || indexSlide === 3) {
      const slider = refSlider.current as never as any;
      slider.slickGoTo(indexSlide);
    }
  }, []);

  useEffect(() => {
    handleSelectImage(images[0]);
    return () => clearTimeout(idTimer);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.container} id="carousel-thumbnail">
      <Slider {...settings} ref={refSlider}>
        {images.map((image) => {
          if (image.id % 2 === 1) {
            return null;
          }
          let cx = classes.thumbnail;

          if (image.id === imageIdSelected || image.id + 1 === imageIdSelected) {
            cx += ` ${classes.highlight}`;
          }

          return (
            <div key={image.id} onClick={() => handleSelectImage(image)}>
              <img src={image.thumbnail} alt="banner" className={cx} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
