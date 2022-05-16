import { Link } from 'react-router-dom';
import { useStyles } from './style';


const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <div className={classes.footerLeft}>
            <div className={classes.title}>© 2022 |</div>
            <div className={classes.name}> XBorg </div>
            <div className={classes.title}>All rights reserved</div>
        </div> 
      <div className={classes.boxLink}>
        <Link to={'#'}>
            <p className={classes.title}>Terms</p>
        </Link>
        <Link to={'#'}>
            <p className={classes.title}>Privacy policy</p>
        </Link>
      </div>
    </div>
  );
};
export default Footer;