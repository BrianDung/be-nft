import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: any) => {
    return {
        formControl: {
            display: 'flex',
            alignItems: 'center',
            margin: '20px 0'
        },
        boxNumber: {
            display: 'flex',
            alignItems: 'center',
            // width: '60%',
            position: 'relative',
            [theme.breakpoints.down('xs')]: {
                // width: '100%',
            },
        },
        input: {
            borderRadius: '7px',
            height: 80,
            border: 'none',
            fontFamily: 'Montserrat-Medium',
            fontSize: '20px',
            color: '#FFFFFF',
            marginBottom: '0',
            '&>input': {
                textAlign: 'center',
                width: '73%',
            }
        },
        quantity: {
            background: 'none',
            height: 80,
            width: 70,
            fontFamily: 'Montserrat-Medium',
            fontSize: '20px',
            lineHeight: '26px',
            color: '#FFFFFF',
            position: 'absolute',
            right: 0,
            top: 0,
            cursor: 'pointer',
            border: '4px solid #FFFFFF',
            borderRadius: '10px',
        },
        quantitysum: {
            background: 'none',
            border: '4px solid #FFFFFF',
            borderRadius: '10px',
            height: 79,
            width: 70,
            padding: 11,
            fontFamily: 'Montserrat-Medium',
            fontSize: '20px',
            lineHeight: '13px',
            color: '#FFFFFF',
            cursor: 'pointer',
            marginLeft: '8px',
            // [theme.breakpoints.down('xs')]: {
            //   width: '40px',
            // },
        },
        boxMint: {
            background: '#60A444',
            border: '4px solid #FFFFFF',
            borderRadius: '7px',
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 325,
            marginTop: '20px',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
        nameMint: {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: '16px',
            lineHeight: '26px',
            color: '#FFFFFF',
            marginBottom: 0,
            cursor: 'not-allowed',
            background: 'none',
            border: 'none',
        },
    }
});