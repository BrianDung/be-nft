import Header from '../Components/Header';
import { useStyles } from './style';
import Grid from '@material-ui/core/Grid';
const cards = [
  {
    title: 'Royalties',
    content:
      'VISPX will receive 5% of all secondary sales. These proceeds will be used to continue ecosystem development, fund operations, and deliver even more value to our community.',
  },
  {
    title: 'NGMI Tax',
    content:
      'Selling below the floor price on our future market place will incur 33.3% NGMI tax and the same to be used to buy back $VXP tokens from the market and burn them as deflationary mechanics.',
  },
  {
    title: 'Gas Optimization',
    content:
      'Our genesis collection is an ERC721X implementation build on ERC721 protocol minting, further designed to be scalable and gas-efficient and it provides batch minting at a fixed gas cost which drastically reduces the NFT minting gas up to 89% over the traditional minting.',
  },
];

const Section6 = () => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <Header content="Genesis Mechanics" />
      <Grid container spacing={4} className={classes.listCardGrid}>
        {cards.map((element, index) => {
          return (
            <Grid item sm={12} md={4} key={index}>
              <Card {...element} key={index} />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

const Card = (props: any) => {
  const { title, content } = props;
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <div className={classes.titleField}>{title}</div>
      <p className={classes.contentField}>{content}</p>
    </div>
  );
};

export default Section6;
