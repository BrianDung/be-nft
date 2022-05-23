import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
   return{
    soldProgress: {
       margin: '10px 0 20px'
    },
    jubValue: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 5,
        fontSize: '24px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px'
        },
    },
    leftBotSec:{

    },
    progress:{
        height: 47,
        textAlign: 'center',
        lineHeight: '35px',
        [theme.breakpoints.down('sm')]: {
            height: 30,
        },
    },
    achieved:{
      position: 'absolute',
      left: '4px',
      top: '4px',
      height: 'calc(100% - 8px)',
      background: '#60A444',
      borderTopLeftRadius: 6, 
      borderBottomLeftRadius: 6, 
    },
    rightBotSec:{

    },
    xborgTitle:{
        fontSize: '100px',
        fontWeight: 620,
        fontFamily: 'Mokoto',
        textShadow: '2px 2px 4px #000000',
        marginBottom: 0,
        marginTop: '15px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '80px',
        },
        "@media only screen and (min-width: 500px) and (max-width: 670px)": {
            fontSize: '75px !important'
          },
        [theme.breakpoints.down('xs')]: {
            fontSize: '70px',
            textAlign: 'center',
        },
    },
    progressFull: {
        borderRadius:6
    }
   } 
}); 