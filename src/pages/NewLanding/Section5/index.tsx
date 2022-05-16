import useWindowDimensions from 'hooks/useWindowDimensions';
import Header from '../Components/Header';
import { useStyles, useCardStyles } from './style';
interface CardProps {
  title: string;
  content: string[];
  backgroundColor?: string;
  index: number;
  backgroundImage: string;
  backgroundImageSmall: string;
}
const cardListContent = [
  {
    title: 'Access to IDO and IGOs',
    content: [
      'Holders of Xborg unlock the most important features in the VISPX ecosystem i.e., project IDOs and IGOs on ourlaunchpad with its tier-based system that is completely oriented towards the community.',
      'Holding a certain amount of Xborgs qualifies users to get the chance to participate in token offering on our launchpad for multiple projects.',
    ],
    backgroundColor: '#B7558F',
    backgroundImage: '/images/newLanding/holder/image-980-1.svg',
    backgroundImageSmall: '/images/newLanding/holder/image-320-1.svg',
  },
  {
    title: 'Yield box',
    content: [
      'Simple yield mechanics are applied in the staking pool to offer VISPX project tokens and partner project tokens for Xborg holders.',
      'These yield rewards are calculated using the multiplier coefficient, the rarity of a Xborg NFT and the staking period.',
      'Following are the yield multiplier co-efficient for XBorgs based on Rarity:',
      'Common: 0.5x',
      'Rare: 1x',
      'Elite: 2.5x',
    ],
    backgroundColor: '#1451AC',
    backgroundImage: '/images/newLanding/holder/image-980-2.svg',
    backgroundImageSmall: '/images/newLanding/holder/image-320-2.svg',
  },
  {
    title: 'Exclusive Dao Access',
    content: [
      'Owning a Xborg NFT makes you a member of the Vispx DAO with voting rights. You can also get access to the governance forum and discord-private channels.',
      'Here users can exercise their voting rights for various activities including vetting processes for incubated projects, community events, ecosystem economy etc.',
    ],
    backgroundColor: '#CDA209',
    backgroundImage: '/images/newLanding/holder/image-980-3.svg',
    backgroundImageSmall: '/images/newLanding/holder/image-320-3.svg',
  },
  {
    title: 'Gaming project perks',
    content: [
      'Xborg holders unlock an access pass for the alpha game play and exclusive NFTs from our partnered gaming projects',
    ],
    backgroundColor: '#3B8303',
    backgroundImage: '/images/newLanding/holder/image-980-4.svg',
    backgroundImageSmall: '/images/newLanding/holder/image-320-4.svg',
  },
];

const Section5 = () => {
  const classes = useStyles();
  return (
    <section className={classes.container}>
      <Header content="Holders Benefits" />
      {cardListContent.map((element, index) => {
        return <Card {...element} index={index} key={index}/>;
      })}
    </section>
  );
};

const Card = (props: CardProps) => {
  const { backgroundColor, index, backgroundImage, backgroundImageSmall } = props;
  const classes = useCardStyles({ backgroundColor, backgroundImage });
  const { width } = useWindowDimensions();
  return (
    <div className={index % 2 === 0 ? classes.cardField : classes.cardFieldOdd}>
      {/* <div className={classes.cardShape}>
        <img style={{ height: '100%' }} alt="Card shape" src={backgroundImage} />
      </div> */}
      {/* <div className={classes.cardShape}>
        <div className={classes.card}>
          <h3>{title}</h3>
          {content.map((element, index) => {
            return <p key={index}>{element}</p>;
          })}
        </div>
      </div> */}
      <div>
        <img
          style={{ width: '100%', height: '100%' }}
          alt="980"
          src={width >= 480 ? backgroundImage : backgroundImageSmall}
        />
      </div>
    </div>
  );
};

export default Section5;

/*Holders of Xborg unlock the most important features in the VISPX ecosystem i.e., project IDOs and IGOs on our launchpad with its tier-based system that is completely oriented towards the community. 

Holding a certain amount of Xborgs qualifies users to get the chance to participate in token offering on our launchpad for multiple projects. */
