import styles from '../style.module.scss';
import CardProject from 'components/Base/CardProject';
import { useEffect, useState } from 'react';
import { getActivePool } from 'request/pool';
import { get } from 'lodash';

// const IMAGE = "images/landing/NFTrade-1.png";

export default function IDOProject() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getDataActivePool = async () => {
      try {
        const resp = (await getActivePool('?limit=2')) as any;
        const response = await resp.json();
        const data = get(response, 'data.data', []);
        setProjects(data);
      } catch (err: any) {
        console.error(err);
      }
    };
    getDataActivePool();
  }, []);

  if (!projects?.length) return null;

  return (
    <div className={styles.infoArea}>
      <div className={styles.wrapText}>
        <p className={styles.mediumTitle}>Active projects</p>
      </div>
      <div className={styles.wrapData}>
        {projects.map((data: any) => {
          return <CardProject key={data.id} data={data} size="big" />;
        })}
      </div>
    </div>
  );
}
