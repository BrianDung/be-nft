import CarouseImages from './CarouselImages';
import { useStyles } from './style';

const Section4 = () => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <CarouseImages />
    </section>
  );
};

export default Section4;
