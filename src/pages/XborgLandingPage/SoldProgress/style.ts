import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
   return{
    soldProgress: {
       margin: '40px 0'
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
        [theme.breakpoints.down('sm')]: {
            fontSize: '80px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '70px',
        },
    },
    progressFull: {
        borderRadius:6
    }
   } 
}); 