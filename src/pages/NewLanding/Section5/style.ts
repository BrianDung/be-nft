import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        container: {
            marginTop: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        cardField: {
            width: '65%',
            display: 'flex',
            flexDirection: 'row',
            // backgroundImage: `url(/images/newLanding/holder/image-1.svg)`,
            // backgroundRepeat:'no-repeat',
            // backgroundSize:'contain',
            // backgroundPosition:'left',
            //marginLeft:'40%',
            // [theme.breakpoints.down('sm')]: {
            //     marginLeft: '0%'
            // },
            borderLeft: ``
        },
       
        cardFieldOdd: {
            width: '65%',
            display: 'flex',
            flexDirection: 'row-reverse', 
            '&:not(:last-child)':{
                marginBottom: 45
            } 
        },
        cardFieldAccess: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 45
        },
        cardFieldGaming: {
             display: 'flex',
             flexDirection: 'row-reverse',
         },
    }
})

export const useCardStyles = makeStyles((theme: any) => {
    return {
        cardField: {
            width: '65%',
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 45,
            // borderLeft: (props: any) => `20vw solid ${props.backgroundColor}`,
            // borderTop: '5vw solid transparent',
            // borderBottom: '5vw solid transparent',
            [theme.breakpoints.down('sm')]: {
                width: '85%'
            }
        },
        cardFieldOdd: {
            width: '65%',
            display: 'flex',
            flexDirection: 'row-reverse',
            '&:not(:last-child)':{
                marginBottom: 45
            },
            // borderLeft: (props: any) => `20vw solid ${props.backgroundColor}`,
            // borderTop: '5vw solid transparent',
            // borderBottom: '5vw solid transparent',
            [theme.breakpoints.down('sm')]: {
                width: '85%'
            }
        },
        cardShape: {
            position: 'relative',
            //
            borderRadius: 20,
            // transform: "rotate(-2deg)",
            // borderTop: (props: any) => `120px solid ${props.backgroundColor}`,
            // borderBottom: (props: any) => `180px solid ${props.backgroundColor}`,
            // borderLeft: '8px solid transparent',
            // borderRight: '14px solid transparent',
            // height: 0,
            // marginTop: 60,
            // '&::before': {
            //     content: '',
            //     position: 'absolute',
            //     backgroundColor: (props: any) => props.backgroundColor,
            //     transform: 'rotate(2deg)'
            // }
            backgroundImage: (props: any) => `url(${props.backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            padding: '12px 0px'
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: 600,
            height: '100%',
            //padding: '12px 80px',
            color: 'white',
            // borderLeft: (props: any) => `40px solid ${props.backgroundColor}`,
            // borderTop: '5px solid transparent',
            // borderBottom: '5px solid transparent',
            [theme.breakpoints.down('sm')]: {
                padding: 12
            },
            // transform: 'rotate(2deg)',
            padding: '3.5% 10%',
            // gap: 6,
            '& h3': {
                color: 'white',
                fontSize: 30,
                fontFamily: 'Montserrat-Bold',
                marginBottom: 0,
                [theme.breakpoints.down('sm')]: {
                    fontSize: 18
                }
            },
            '& p': {
                fontFamily: 'Montserrat-Medium',
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 0,
                [theme.breakpoints.down('sm')]: {
                    fontSize: 12
                }
            }
        }
    }
})