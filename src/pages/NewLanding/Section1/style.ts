import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'

        },
        buttonTheMint: {
            textTransform: 'none',
            padding: '12px 72px !important',
            border: '2px solid #5855EE !important',
            borderRadius: '30px !important',
            color: 'white !important',
            fontSize: '16px !important',
            fontFamily: 'Montserrat-Regular !important',
            background: 'rgba(196, 196, 196, 0.25) !important'
        },
        buttonOpensea: {
            textTransform: 'none',
            padding: '12px 72px !important',
            border: '2px solid #5855EE !important',
            borderRadius: '30px !important',
            color: 'white !important',
            fontSize: '16px !important',
            fontFamily: 'Montserrat-Regular !important',
            background: 'rgba(196, 196, 196, 0.25) !important',
            '& .MuiButton-startIcon': {
                position: 'absolute',
                left: 6
            }
        },
        title:{
            fontFamily: 'Mokoto',
            fontSize: 84,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            marginBottom: 0,
            textShadow: '2px 2px 4px #000000'
        },
        name: {
            fontFamily: 'Montserrat-Regular',
            fontSize: 20,
            color: '#FFFFFF',
        },
        texthedear:{
            textAlign:'center',
            paddingTop: '20vh',
            marginBottom: '6vh',
        },
    }
});
