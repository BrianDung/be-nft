import styles from '../style.module.scss';
import CardProject from 'components/Base/CardProject';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import CarouselCards from 'components/Base/CarouseCards';
import axios from 'services/axios';
import useScreenResize from 'pages/BuyToken/hooks/useScreenWidth';
import CardProjectSmall from 'components/Base/CardProject/CardProjectSmall';

// const IMAGE = "images/landing/NFTrade-1.png";

export default function NextToLaunch() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getPools = async () => {
      try {
        const resp = (await axios.get('/pools/v3/next-to-launch-pools?limit=8')) as any;
        const data = get(resp, 'data.data.data', []);
        setProjects(data);
      } catch (err: any) {
        console.error(err);
      }
    };
    getPools();
  }, []);

  useEffect(() => {
    const getPools = async () => {
      try {
        const resp = (await axios.get('/pools/v3/next-to-launch-pools')) as any;
        const data = get(resp, 'data.data.data', []);
        setProjects(data);
      } catch (err: any) {
        console.error(err);
      }
    };
    getPools();
  }, []);

  const [screenWidth] = useScreenResize();

  if (!projects?.length) return null;

  return (
    <div className={styles.infoArea}>
      <div className={styles.wrapText}>
        <p className={styles.mediumTitle}>Next to launch</p>
      </div>
      {projects.length <= 4 && screenWidth === 'lg' ? (
        <div className={styles.listCard}>
          {projects.map((data: any) => {
            return <CardProject key={data.id} data={data} />;
          })}
        </div>
      ) : (
        <div className={styles.listCardMobile}>
          <CarouselCards length={projects.length}>
            {projects.map((data: any) => {
              return <CardProjectSmall key={data.id} data={data} />;
            })}
          </CarouselCards>
        </div>
      )}
    </div>
  );
}
