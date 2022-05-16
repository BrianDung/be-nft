/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useStyles } from './styles';
import { adminRoute } from '../../../utils';
import { logout } from '../../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
const logo = '/images/dashboard/icon-logo.svg';
const nav = [
  {
    title: 'My profile',
    part: adminRoute('/my-profile'),
    icon: 'user-profile',
  },
  {
    title: 'KYC',
    part: adminRoute('/list-user'),
    icon: 'icon-kyc',
  },
  {
    title: 'Deals',
    part: adminRoute('/deals'),
    icon: 'icon-deals',
  },
  {
    title: 'Pools',
    part: adminRoute('/tier'),
    icon: 'icon-pools',
  },
  {
    title: 'My tier',
    part: adminRoute('/tier'),
    icon: 'icon-my-tier',
  },
];

const NavLeftLayout = (props: any) => {
  const { sidebarCollapsed } = useSelector((state: any) => state.global);
  const styles = useStyles({
    collapsed: sidebarCollapsed,
  });
  const dispatch = useDispatch();
  const { smallLeft, location } = props;
  const [navLeft] = React.useState(nav);

  const logoutUser = () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Do you want logout?')) {
      return false;
    }
    dispatch(logout());
  };

  console.log({smallLeft});
  

  return (
    <>
      <img className={styles.image} src={logo} alt="" />
      <ul className={`${styles.navLeft} ${smallLeft ? styles.smallNav: ''}`}>
        {navLeft.map((item, index) => {
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
        })}

        <li className={styles.itemNavLeft}>
          <a onClick={logoutUser} className={styles.linkItemNavLeft}>
            <i className={(smallLeft && ' icon-small') + ' icon icon-setting'}></i>
            {!smallLeft && 'Logout'}
          </a>
        </li>
      </ul>
    </>
  );
};

export default withRouter(NavLeftLayout);
