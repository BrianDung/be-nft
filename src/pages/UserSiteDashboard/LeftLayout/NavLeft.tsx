import { useCallback, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { adminRoute } from "../../../utils";
import { useStyles } from './styles';
import cx from 'classnames';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
// import DrawerNavLeft from './DrawerNavLeft';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, setSidebarShow } from 'store/actions/global';
import HomeIcon from 'svgs/HomeIcon';
import UserIcon from 'svgs/UserIcon';
import DealIcon from 'svgs/DealIcon';
import PoolIcon from 'svgs/PoolIcon';
import GuideIcon from 'svgs/GuideIcon';

const logo = '/images/dashboard/icon-logo.svg';
const logoMin = '/images/dashboard/icon-logo-min-2.png';

// const Userprofile = '/images/icon_nav_left/user-profile.svg';
// const iconHome = '/images/icon_nav_left/home.svg';
// const iconPool = '/images/icon_nav_left/icon-pools.svg';
// const iconPoolMin = '/images/icon_nav_left/icon-pool-min.svg';

// const iconDeals = '/images/icon_nav_left/icon-deals.svg';
// const iconDealsMin = '/images/icon_nav_left/icon-deals-min.svg';

// const iconGuides = '/images/icon_nav_left/icon-guides.svg';
const iconDropdown = '/images/icons/icon-dropdown.svg';

const collapseLeft = '/images/icons/collapse-left.svg';
const collapseRight = '/images/icons/collapse-right.svg';
const goldActiveIcon = 'images/gold.svg';
const executiveActive = 'images/ExecutiveLounge.svg';

const NavLeft = (props: any) => {
  const { sidebarCollapsed } = useSelector((state: any) => state.global);
  const { width } = useWindowDimensions();
  const styles = useStyles({
    collapsed: sidebarCollapsed,
  });
  const dispatch = useDispatch();

  const onToggle = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);
  const handleShowSidebar = useCallback(() => {
    dispatch(setSidebarShow());
  }, [dispatch]);

  useEffect(() => {
    if (width <= 960) {
      handleShowSidebar();
    }
  }, [width, handleShowSidebar]);
  //TODO: display logo by collapse sidebar
  return (
    <div className={styles.pageSlider}>
      {width >= 960 && (
        <Link to={'/'}>
          {sidebarCollapsed ? (
            <img
              className={styles.image}
              src={logoMin}
              alt=""
              style={{ width: 46, height: 55, marginLeft: '16px', marginTop: '-2px', marginBottom: '45px' }}
            />
          ) : (
            <img className={styles.imageFull} src={logo} alt="" />
          )}
        </Link>
      )}
      <img
        className={styles.arrow}
        src={sidebarCollapsed ? collapseLeft : collapseRight}
        alt="arrow"
        onClick={onToggle}
      />
      <div className={`${styles.navMenu} ${sidebarCollapsed ? styles.smallNavMenu : ''}`}>
        <NavMenu />
      </div>
      {/* <DrawerNavLeft /> */}
    </div>
  );
};

const NavMenuInit = (props: any) => {
  const [isShowManageDeal, setIsShowManageDeal] = useState(false);
  const [isShowManagePool, setIsShowManagePool] = useState(false);
  const { location } = props;
  const { sidebarCollapsed } = useSelector((state: any) => state.global);
  const styles = useStyles({
    collapsed: sidebarCollapsed,
    isShowManageDeal,
    isShowManagePool,
  });

  // const [screenWidth] = useScreenResize();

  // useEffect(() => {
  //   if (sidebarCollapsed && screenWidth === 'lg') {
  //     setIsShowManageDeal(false);
  //     setIsShowManagePool(false);
  //   }
  // }, [sidebarCollapsed]);

  return (
    <>
      <ul className={styles.navLeft}>
        <li className={styles.itemNavLeft}>
          <Link to={'/'} className={cx(styles.linkItemNavLeft, { active: location?.pathname === '/' })}>
            <HomeIcon active={location?.pathname === '/'} />
            <span className={styles.textNav}>Home</span>
          </Link>

          <div className={`${styles.itemNavLeftCollapse} itemNavLeftCollapse`}>
            <Link to={'/'} className={cx({ active: location?.pathname === '/' })}>
              <div className={`${styles.itemNavLeftCollapse}__header`}>Home</div>
            </Link>
          </div>
        </li>
        <li className={styles.itemNavLeft}>
          <Link to={'/profile'} className={cx(styles.linkItemNavLeft, { active: location?.pathname === '/profile' })}>
            <UserIcon active={location?.pathname === '/profile'} />
            <span className={styles.textNav}>My profile</span>
          </Link>
          <div className={`${styles.itemNavLeftCollapse} itemNavLeftCollapse`}>
            <Link to={'/profile'} className={cx({ active: location?.pathname === '/profile' })}>
              <div className={`${styles.itemNavLeftCollapse}__header`}>My Profile</div>
            </Link>
          </div>
        </li>
        <li className={styles.itemNavLeft}>
          <div
            className={`${styles.linkItemNavLeft} ${styles.dealDrop}`}
            onClick={() => setIsShowManageDeal(!isShowManageDeal)}
          >
            {/* <img src={iconDeals} alt="iconDeals" /> */}
            <DealIcon active={location?.pathname === '/deals/ido-projects'} collapsed={sidebarCollapsed} />
            <div className={styles.textNavField}>
              <span className={styles.textNav}>Deals</span>
              <img className={styles.imageDropdown} src={iconDropdown} alt="iconDropdown" />
            </div>
            <div className={`${styles.itemNavLeftCollapse} itemNavLeftCollapse ${styles.itemNavLeftMultipleLinks}`}>
              <div className={`${styles.itemNavLeftCollapse}__header`}>Deals</div>
              <div className={`${styles.itemNavLeftCollapse}__items`}>
                <div
                  className={cx(styles.deviderSecond, {
                    active: location?.pathname === '/deals/ido-projects',
                  })}
                ></div>
                <Link
                  to={'/deals/ido-projects'}
                  className={cx(styles.linkItemNavLeft, styles.linkIDOProjectsItemSecond, {
                    active: location?.pathname === '/deals/ido-projects',
                  })}
                >
                  IDO Projects
                </Link>
              </div>
            </div>
          </div>
          {/* {isShowManageDeal && ( */}
          <ul className={styles.DealMenu}>
            <li className={`${styles.itemNavLeft} ${styles.itemChild}`}>
              <div className={styles.secondMenuItem}>
                <div
                  className={cx(styles.devider, {
                    active: location?.pathname === '/deals/ido-projects',
                  })}
                ></div>
                <Link
                  to={'/deals/ido-projects'}
                  className={cx(styles.linkItemNavLeft, styles.linkIDOProjectsItem, {
                    active: location?.pathname === '/deals/ido-projects',
                  })}
                >
                  IDO Projects
                </Link>
              </div>
            </li>
          </ul>
          {/* )} */}
        </li>
        <li className={styles.itemNavLeft}>
          <div
            className={`${styles.linkItemNavLeft} ${styles.poolDrop}`}
            onClick={() => setIsShowManagePool(!isShowManagePool)}
          >
            {/* <img src={iconPool} alt="iconPools" /> */}
            <PoolIcon active={location?.pathname.includes('/pools')} collapsed={sidebarCollapsed} />
            <div className={styles.textNavField}>
              <span className={styles.textNav}>Pools</span>
              <img className={styles.imageDropdown} src={iconDropdown} alt="iconDropdown" />
            </div>
            <div className={`${styles.itemNavLeftCollapse} itemNavLeftCollapse ${styles.itemNavLeftMultipleLinks}`}>
              <div className={`${styles.itemNavLeftCollapse}__header`}>Pools</div>
              <div className={`${styles.itemNavLeftCollapse}__items`}>
                <div
                  className={cx(styles.deviderStakingPools, {
                    active: location?.pathname === '/pools/staking',
                  })}
                ></div>
                <Link
                  to={'/pools/staking'}
                  className={cx(styles.linkItemNavLeft, styles.linkStakingPoolsItemSecond, {
                    active: location?.pathname === '/pools/staking',
                  })}
                >
                  Staking pools
                </Link>
                <div
                  className={cx(styles.deviderFarmingPools, {
                    active: location?.pathname === '/pools/farming',
                  })}
                ></div>
                <Link
                  to={'/pools/farming'}
                  className={cx(styles.linkItemNavLeft, styles.linkFarmingPoolsItemSecond, {
                    active: location?.pathname === '/pools/farming',
                  })}
                >
                  Farming pools
                </Link>
              </div>
            </div>
          </div>
          {/* {isShowManagePool && ( */}
          <ul className={styles.poolMenu}>
            <li className={`${styles.itemNavLeft} ${styles.itemChild}`}>
              <div className={styles.secondMenuItem}>
                <div
                  className={cx(styles.devider, {
                    active: location?.pathname === '/pools/staking',
                  })}
                ></div>
                <Link
                  to={'/pools/staking'}
                  className={cx(styles.linkItemNavLeft, styles.linkStakingPoolsItem, {
                    active: location?.pathname === '/pools/staking',
                  })}
                >
                  Staking pools
                </Link>
              </div>
            </li>
            <li className={`${styles.itemNavLeft} ${styles.itemChild}`}>
              <div className={styles.secondMenuItem}>
                <div
                  className={cx(styles.devider, {
                    active: location?.pathname === '/pools/farming',
                  })}
                ></div>
                <Link
                  to={'/pools/farming'}
                  className={cx(styles.linkItemNavLeft, styles.linkFarmingPoolsItem, {
                    active: location?.pathname === '/pools/farming',
                  })}
                >
                  Farming pools
                </Link>
              </div>
            </li>
          </ul>
          {/* )} */}
        </li>
        <li className={styles.itemNavLeft}>
          <Link to={'/guides'} className={cx(styles.linkItemNavLeft, { active: location?.pathname === '/guides' })}>
            {/* <img src={iconGuides} alt="iconGuides" /> */}
            <GuideIcon active={location?.pathname === '/guides'} />
            <span className={styles.textNav}> Guides</span>
          </Link>
          <div className={`${styles.itemNavLeftCollapse} itemNavLeftCollapse`}>
            <Link to={'/guides'} className={cx({ active: location?.pathname === '/guides' })}>
              <div className={`${styles.itemNavLeftCollapse}__header`}>Guides</div>
            </Link>
          </div>
        </li>
        <li className={styles.itemNavLeft}>
          <Link
            to={'/executive-lounge'}
            className={cx(styles.linkItemNavLeft, { active: location?.pathname === '/executive-lounge' })}
          >
            <img src={goldActiveIcon} alt="" />
            <img src={executiveActive} alt="" className={styles.textNav} />
          </Link>
          <div className={`${styles.itemNavLeftCollapse} itemNavLeftCollapse`}>
            <Link to={'/executive-lounge'} className={cx({ active: location?.pathname === '/executive-lounge' })}>
              <img src={executiveActive} alt="" className={`${styles.itemNavLeftCollapse}__header`} />
            </Link>
          </div>
        </li>
      </ul>
    </>
  );
};
export const NavMenu = withRouter(NavMenuInit);
export default withRouter(NavLeft);
