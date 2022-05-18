import Header from '../Components/Header';
import { useStyles } from './style';

const Section7 = () => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      <Header content="Roadmap" />
      <div className={classes.imagesField}>
        {[...Array(5)].map((element, index) => {
          return (
            <span className={classes.imagesItem}>
              <img
                className={classes.image}
                src={`/images/newLanding/phase/phase-0${index + 1}.svg`}
                alt={`phase-${index + 1}`}
              />
            </span>
          );
        })}
      </div>
    </section>
  );
};

export default Section7;
