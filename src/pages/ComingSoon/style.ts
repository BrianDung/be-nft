import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    comingSoonWrapper: {
      width: '100%',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    boxCenter: {
      margin: '60px 0 85px 0',
    },
    imageComingSoon: {
      width: '100%',
    },
  };
});

export default useStyles;
