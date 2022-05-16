import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    container: {
      width: '90%',
      margin: 'auto',
    },
    thumbnail: {
      cursor: 'pointer',
      borderRadius: '5px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      objectFit: 'cover',
      width: '90%',
      height: '70px',
      [theme.breakpoints.up(600)]: {
        height: '100px',
      },
      [theme.breakpoints.up(1200)]: {
        height: '120px',
      },
      [theme.breakpoints.up(1440)]: {
        height: '60px',
      },
      margin: 'auto',
    },
    highlight: {
      border: '1px solid #A84DFF',
    },
    rotate: {
      transform: 'rotate(180deg) !important',
    },
  };
});

export default useStyles;
