//import { useStyles } from './style';
import Footer from './Components/Footer';
import Header from './header';
import Section1 from './Section1';
import Section10 from './Section10';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';
import Section7 from './Section7';
import Section8 from './Section8';
import Section9 from './Section9';
import styles from './style.module.scss';

const Landing = () => {
  //const styles = useStyles();
  return (
    <div className={styles.newLandingPage}>
      <Header />
      <Section1 />
      <div className={styles.section2}>
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
        <Section9 />
        <Section10 />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
