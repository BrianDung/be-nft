import CarouseImages from "./CarouseImages";
import { IMAGES } from "./CarouseImages/data";
import HeaderPage from "./Header";
import InfoLandingPage from "./InfoPage";
import { useStyles } from "./style";

const XborgLandingPage = () => {
    const styles = useStyles();
    return (
        <div className={styles.newLandingPage}>
            <div className={styles.container}>
            <HeaderPage />
            <div className={styles.pageInfo}>
                <div className={styles.Info}>
                    <InfoLandingPage />
                </div>
                <div className={styles.carousel}>
                    <CarouseImages images={IMAGES} slidesToShow={5} />
                </div>
            </div>
            </div>
        </div>
    );
  };
  
  export default XborgLandingPage;
  