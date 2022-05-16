import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: any) => {
    return {
        root: {
            marginBottom: 24
        },
        content: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 30,
            color: 'white',
            [theme.breakpoints.down('sm')]: {
                fontSize: 18
            }
        },
        borderLine: {
            width: '100%',
            background: 'linear-gradient(90deg, #C4C4C4 -3.36%, rgba(137, 149, 255, 0.973958) -3.36%, rgba(62, 38, 205, 0) 98.74%)',
            height: 4,
            display: 'block',
            marginTop: 6
        }
    }
})