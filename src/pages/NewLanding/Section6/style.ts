import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        card: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleField: {
            width: '100%',
            borderRadius: '10px 10px 0px 0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#A7176C',
            height: 60,
            color: 'white',
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 18
        },
        contentField: {
            backgroundColor: '#B7558F',
            padding: '24px 8px 0px 8px',
            color: 'white',
            fontFamily: 'Montserrat-Medium',
            height: 320,
            [theme.breakpoints.down('sm')]: {
                height: 240
            },
            [theme.breakpoints.down('xs')]:{
                height: 380
            },
            fontSize: 18,
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:72,
            [theme.breakpoints.down('xs')]:{
                marginTop: 45
            },
        },
        listCardGrid: {
            width: '80%'
        }
    }
})