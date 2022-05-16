import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import RightDefaultLayout from '../../../components/Base/RightDefaultLayout';
import Header from '../Header';
import NavLeft from '../LeftLayout/NavLeft';
import useStyles from './style';
import DrawerNavLeft from '../LeftLayout/DrawerNavLeft';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { useState, useEffect } from 'react';

const DefaultLayout = (props: any) => {
  const { sidebarCollapsed } = useSelector((state: any) => state.global);

  const { width } = useWindowDimensions();
  const [y, setY] = useState(window.scrollY);
  const [scrollingUp, setScrollingUp] = useState(false);
  const styles = useStyles({
    pathName: props.history.location.pathname,
    collapsed: sidebarCollapsed,
    pageYOffset: y,
    scrollingUp: scrollingUp,
  });

  const handleNavigation = (e: any) => {
    const window = e.currentTarget;
    if (y > window.scrollY) {
      setScrollingUp(true);
    } else if (y < window.scrollY) {
      setScrollingUp(false);
    }
    setY(window.scrollY);
  };

  useEffect(() => {
    setY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', (e) => handleNavigation(e));

    return () => {
      // return a cleanup function to unregister our function since its gonna run multiple times
      window.removeEventListener('scroll', (e) => handleNavigation(e));
    };
    // eslint-disable-next-line
  }, [y]);

  return (
    <div className={styles.backgroundComponent}>
      <div className={styles.DefaultLayout}>
        {width <= 960 && (
          <>
            <div className={styles.navigationField}>
              <DrawerNavLeft />
            </div>
            <div className={styles.marginTopField}></div>
          </>
        )}
        <div className={styles.NavLeft}>
          <img src={'/images/icon_nav_left/icon-x.svg'} className={styles.iconX} alt="icon" />
          <NavLeft />
        </div>
        <div className={styles.RightLayout}>
          <Header classNames={styles.headerLayout} />
          <RightDefaultLayout>{props.children}</RightDefaultLayout>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DefaultLayout);
