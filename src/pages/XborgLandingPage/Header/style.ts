import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            width: '100%'
        },
        container: {
            paddingTop:'50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 72,
            [theme.breakpoints.down('sm')]: {
                flexDirection:'column',
                margin: '0 0 30px 0',
                gap:' 15px',
            }
        },
        logoField: {

        },
        pageHeader:{
            display: 'flex',
            alignContent:'center',
            gap: 15,
        },
        networks:{
            width: 62,
            maxWidth:'100%',
        },
        balance:{
            width: 145,
            maxWidth:'100%',
        },
        textbalance:{
            fontFamily:'Montserrat-Medium',
            fontSize: 14,
            color: '#FFFFFF',
            textAlign:'center',
            lineHeight:24,
            marginBottom: 0,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
        },
        logNetworks:{
            background: 'linear-gradient(90deg, #BD5BEB 0%, #1C2BAF 100%)',
            borderRadius: 8,
            display: 'flex',
            alignItems:'center',
            justifyContent:'center',
            height: 33,
            cursor: 'pointer',
        },
    }
})
