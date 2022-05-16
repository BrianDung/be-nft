import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import useStyles from './styles';
import { adminRoute } from '../../../utils';
import { useSelector } from 'react-redux';

const nav = [
  {
    title: 'Home',
    part: adminRoute('/'),
    icon: 'icon-home',
  },
  {
    title: 'List Campaign',
    part: adminRoute('/campaigns'),
    icon: 'icon-list-campaign',
  },
  {
    title: 'History',
    part: adminRoute('/history'),
    icon: 'icon-history',
  },
  {
    title: 'Setting',
    part: adminRoute('/setting'),
    icon: 'icon-setting',
  },
];

const NavLeft = (props: any) => {
  const { sidebarCollapsed } = useSelector((state: any) => state.global);
  const styles = useStyles({
    collapsed: sidebarCollapsed,
  });
  const { smallLeft, location } = props;
  const [navLeft] = React.useState(nav);
  
  
  return (
    <ul className={`${styles.navLeft} ${smallLeft ? styles.smallNav: ''}`} >
      {/* {navLeft.map((item, index) => {
        return (
          <li key={index} className={styles.itemNavLeft + ' ' + (location?.pathname === item.part && 'active')}>
            <Link
              to={item.part}
              className={styles.linkItemNavLeft + ' ' + (location?.pathname === item.part && 'active')}
            >
              <i className={(smallLeft && ' icon-small') + ' icon ' + item.icon}></i>
              {!smallLeft && item.title}
            </Link>
          </li>
        );
      })} */}
    </ul>
  );
};

export default withRouter(NavLeft);
