import Header from '../Components/Header';
import Grid from '@material-ui/core/Grid';
import { useCardStyles, useStyles } from './style';

interface CardProps {
  phase: string;
  listEvent: string[];
  backgroundImage?: string;
  month: string;
}

const listPhase = [
  {
    phase: 'Phase 1',
    month: 'March',
    listEvent: ['Xborg art design and VISPX brand mascot'],
    backgroundImage: `url(/images/newLanding/roadmap/image-1.svg)`,
  },
  {
    phase: 'Phase 2',
    month: 'April',
    listEvent: [
      'Genesis creation of 6000 unique Xborg NFTs',
      'Whitelisting and OG selection',
      'Game partnership announcement',
      'Giveaway and airdrop campaigns',
    ],
    backgroundImage: `url(/images/newLanding/roadmap/image-2.svg)`,
  },
  {
    phase: 'Phase 3',
    month: 'May',
    listEvent: ['Minting goes live!', 'NFT integration with VISPX launchpad', 'Dao access unlocking'],
    backgroundImage: `url(/images/newLanding/roadmap/image-3.svg)`,
  },
  {
    phase: 'Phase 4',
    month: 'June',
    listEvent: ['Stacking mechanics and Yield box goes live', 'Xborg farming pool live'],
    backgroundImage: `url(/images/newLanding/roadmap/image-4.svg)`,
  },
  {
    phase: 'Phase 5',
    month: 'July',
    listEvent: ['XBORG Marketplace'],
    backgroundImage: `url(/images/newLanding/roadmap/image-5.svg)`,
  },
];
const Section7 = () => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <Header content="Roadmap" />
      {listPhase.map((element, index) => {
        return <Card {...element} key={index}/>;
      })}
    </section>
  );
};

const Card = (props: CardProps) => {
  const { phase, month, listEvent , backgroundImage } = props;
  const classes = useCardStyles({ backgroundImage });
  return (
    <div className={classes.cardContainer}>
      <Grid container>
        <Grid item>
          <p className={classes.phaseText}>{phase}</p>
          <p className={classes.monthText}>{month}</p>
        </Grid>
        <Grid item className={classes.eventFieldGrid}>
          {listEvent.map((element: string, index: number) => {
            return (
              <div key={index} className={classes.eventField}>
                <p className={classes.eventText}>{element}</p>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default Section7;
