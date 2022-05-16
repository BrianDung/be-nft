import React, { useState, useEffect } from 'react';
import { useStyles, useDrawerStyles } from './styles';
import Drawer from '@material-ui/core/Drawer';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Header from '../Header';

import { NavMenu } from './NavLeft';

const iconHamburger = '/images/icons/hamburger.svg';
const logo = '/images/dashboard/icon-logo.svg';
const closeLogo = '/images/icons/closeIcon.svg';

interface CloseIconProps {
  handleClose: () => void;
}

const CloseIcon = (props: CloseIconProps) => {
  const { handleClose } = props;
  const classes = useStyles({});
  return (
    <div className={classes.closeIcon} onClick={handleClose}>
      <img src={closeLogo} alt="Icon Hamburger" />
    </div>
  );
};

const DrawerNavLeft = () => {
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const styles = useDrawerStyles({
    width,
  });
  useEffect(() => {
    if (width >= 960) {
      setOpen(false);
    }
  }, [width]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={styles.headerField}>
        <span className={styles.logoImage}>
          <img src={logo} alt="logo" />
        </span>
        <span className={styles.hamburgerImage}>
          <img
            src={iconHamburger}
            alt="Icon Hamburger"
            onClick={() => {
              setOpen(true);
            }}
          />
        </span>
      </div>
      <Drawer
        className={styles.root}
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className={styles.headerNavMenuMobile}>
          <CloseIcon handleClose={handleClose} />
        </div>
        <NavMenu />
        <Header classNames={styles.headerNav} />
        <span className={styles.xImage}>
          <img src={`/images/icon_nav_left/icon-x.svg`} alt="X" />
        </span>
      </Drawer>
    </>
  );
};
export default DrawerNavLeft;
