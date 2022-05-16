import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        newLandingPage: {
            // backgroundImage: `url(/images/newPage/bg-banner-home.svg)`,
            // backgroundRepeat:'no-repeat',
            // backgroundSize:'100%',
            background: '#121327',
            minHeight: '100vh',
        },
        pageInfo:{
            display: 'flex',
            alignItems:'center',
            [theme.breakpoints.down('sm')]: {
                flexDirection:'column',
            }
        },
        Info:{
           width: '40%',
           [theme.breakpoints.down('sm')]: {
            width: '100%',
            }
        },
        carousel:{
            width: '60%',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                },
        },
        container:{
            padding: '0 50px',
        }
    }
})