import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '@media screen and (orientation: landscape)': {
                flexWrap: 'nowrap'
            }
        },
        buttonTheMint: {
            textTransform: 'none',
            padding: '12px 72px !important',
            border: '2px solid #5855EE !important',
            borderRadius: '30px !important',
            color: 'white !important',
            fontSize: '16px !important',
            fontFamily: 'Montserrat-Regular !important',
            background: 'rgba(196, 196, 196, 0.25) !important',
            whiteSpace:'nowrap',
            '@media only screen and (max-width: 750px) and (orientation: landscape)': {
                padding: '12px 48px !important'
            }
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
            },
            '@media only screen and (max-width: 750px) and (orientation: landscape)': {
                padding: '12px 48px !important'
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
            marginBottom: '3vh',
        },
        countDownField: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1vh'
        }
    }
});
