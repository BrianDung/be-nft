import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
  return {
    xborgPageWrapper: {
      paddingTop: '15px',
      color: '#FFFFFF',
      fontWeight: 500,
      width: '50%',
      "@media only screen and (min-width: 960px) and (max-width: 1370px)": {
        width: '60%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    nftImage: {
      width: '25vw',
      height: '200px',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    pageInfo: {
      marginLeft: '100px',
      [theme.breakpoints.down('md')]: {
        marginLeft: 0
      },
    },
    roundInfo: {
      padding: '13px',
      textAlign: 'center',
      borderRadius: '8px',
      width: 'fit-content',
      minWidth: '170px',
      [theme.breakpoints.up('lg')]: {
        minWidth: '270px',
      },
      '&>p': {
        marginBottom: 10,
        padding: '0 25px',
        width: 'fit-content',
        margin: '0 auto',
        borderRadius: '6px',
        [theme.breakpoints.down('xs')]: {
          margin: 0,
        },
      },
      '&>p:first-child':{
        padding: 0,
        fontSize: '34px',
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('md')]: {
          fontSize: '24px',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '20px',
        },
       
      },
      '&>p:last-child':{
        fontSize: '18px',
        textTransform: 'uppercase',
        [theme.breakpoints.down('sm')]: {
          padding: '0 15px',
        },
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
      },

    },
    roundType: {
      fontFamily: 'Montserrat-Medium',
    },
    deActiveStatus: {
      backgroundColor: '#AF47FF',
      marginBottom: '0 !important'
    },
    activeStatus: {
      backgroundColor: '#AF47FF',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0 !important'
    },
    timer: {
      display: 'flex',
      justifyContent: 'space-between',
      '&>div:nth-child(2)': {
        margin: 'auto'
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
      },
      "@media only screen and (min-width: 960px) and (max-width: 1370px)": {
        flexDirection: 'column',
        marginLeft: 0,
        '&>div:first-child': {
          width: 'fit-content'
        },
        '&>div:nth-child(2)': {
          marginTop: 20,
          marginLeft: 'unset'
        }
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        '&>div:nth-child(2)': {
          marginTop: 20,
          margin: 'auto'
        }
      },
     
    }
  };
});
