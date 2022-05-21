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
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                '&>div:first-child': {
                    width: '100%'
                }
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
            [theme.breakpoints.down('sm')]: {
                height: 40,
              },
            '&>input': {
                textAlign: 'center',
                width: '66%',
                margin: 10,
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                },
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
            [theme.breakpoints.down('sm')]: {
                height: 40,
                width: 40,
                borderWidth: '3px'   
              },
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
            [theme.breakpoints.down('sm')]: {
              width: 40,
              height: 40,
              borderWidth: '3px'
            },
        },
        boxMint: {
            background: '#60A444',
            border: '4px solid #FFFFFF',
            borderRadius: '7px',
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 345,
            marginTop: '20px',
            cursor: 'pointer',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                height: 65,
                maxWidth: '100%'
            },
        },
        nameMint: {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: '34px',
            lineHeight: '26px',
            color: '#FFFFFF',
            marginBottom: 0,
            cursor: 'not-allowed',
            background: 'none',
            border: 'none',
            [theme.breakpoints.down('sm')]: {
                fontSize: '28px'
            },
        },
    }
});